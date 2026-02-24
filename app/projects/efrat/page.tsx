import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { supabaseAdmin } from "@/lib/supabase.server";
import { Broker } from "@/types/broker";

export const metadata = {
  title: "Efrat Project | Jerusalem Heritage Realty",
};

export default async function EfratProjectPage() {
  const SCHEDULE_CALL_HREF = "/contact";
  const ENQUIRY_HREF = "/contact";

  // Slider frames (public/)
  const SLIDES = Array.from({ length: 8 }, (_, i) => {
    const n = i + 1;
    return `/pictures/efrat-1/efratPic${n}.jpg`;
  });

  // pull only these two brokers (edit to match your DB values)
  const TARGET_BROKER_NAMES = ["Natanel Moshe Junger", "Yaakov Mechlovitz"];

  const { data: brokers, error } = await supabaseAdmin
    .from("brokers")
    .select("*")
    .in("name", TARGET_BROKER_NAMES)
    .order("id")
    .overrideTypes<Broker[], { merge: false }>();

  const brokerImageUrl = (path?: string | null) => {
    const safePath = path?.trim() ? path.trim() : "defaultAvatar.jpg";
    return supabaseAdmin.storage.from("brokers").getPublicUrl(safePath).data
      .publicUrl;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main
        id="main-content"
        className="flex-1 min-h-0 max-w-5xl mx-auto px-5 py-16 font-sans w-full"
      >
        {/* Project Overview Slider */}
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 sm:p-7 border-b border-slate-100">
            <h2 className="text-xl font-semibold text-slate-900">
              Project Overview
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Browse the project images below.
            </p>
          </div>

          {/* Same 16:9 box as the old Canva embed */}
          <div
            id="efrat-carousel"
            className="relative w-full select-none"
            style={{ paddingBottom: "56.25%" }}
            data-index="1"
            dir="ltr"
            aria-label="Efrat Project image carousel"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div
                data-track
                className="h-full w-full flex flex-row transition-transform duration-500 ease-out"
                style={{ transform: "translateX(0%)", direction: "ltr" }}
              >
                {SLIDES.map((src, i) => (
                  <div
                    key={src}
                    data-slide
                    className="relative h-full w-full shrink-0"
                    aria-hidden={i === 0 ? "false" : "true"}
                  >
                    <Image
                      src={src}
                      alt={`Efrat frame ${i + 1} of ${SLIDES.length}`}
                      fill
                      sizes="(min-width: 1024px) 960px, 100vw"
                      className="object-cover object-center"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>

              {/* Prev / Next */}
              <button
                type="button"
                data-prev
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border border-slate-200 shadow px-3 py-2 text-slate-900 hover:bg-white transition"
              >
                ‹
              </button>

              <button
                type="button"
                data-next
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border border-slate-200 shadow px-3 py-2 text-slate-900 hover:bg-white transition"
              >
                ›
              </button>

              {/* Current frame */}
              <div
                data-counter
                className="absolute top-3 right-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white"
                aria-live="polite"
              >
                1 / {SLIDES.length}
              </div>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    data-dot
                    data-index={i}
                    data-active={i === 0 ? "true" : "false"}
                    aria-label={`Go to frame ${i + 1}`}
                    aria-current={i === 0 ? "true" : "false"}
                    className="h-2.5 w-2.5 rounded-full border border-slate-200 bg-white/80 hover:bg-white transition data-[active=true]:bg-slate-900 data-[active=true]:border-slate-900 data-[active=true]:scale-110"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Browser-side carousel behavior (autoplay + click controls) */}
          <Script id="efrat-carousel-script" strategy="afterInteractive">
            {`
              (() => {
                const root = document.getElementById("efrat-carousel");
                if (!root) return;

                const track = root.querySelector("[data-track]");
                const slides = Array.from(root.querySelectorAll("[data-slide]"));
                const dots = Array.from(root.querySelectorAll("[data-dot]"));
                const counter = root.querySelector("[data-counter]");
                const prevBtn = root.querySelector("[data-prev]");
                const nextBtn = root.querySelector("[data-next]");

                if (!track || slides.length === 0) return;

                const total = slides.length;
                let index = 0;
                let timer = null;

                const reduceMotion = window.matchMedia &&
                  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

                const setA11y = (activeIndex) => {
                  slides.forEach((s, i) => {
                    s.setAttribute("aria-hidden", i === activeIndex ? "false" : "true");
                  });
                  dots.forEach((d, i) => {
                    d.setAttribute("aria-current", i === activeIndex ? "true" : "false");
                    d.setAttribute("data-active", i === activeIndex ? "true" : "false");
                  });
                  if (counter) {
                    counter.textContent = (activeIndex + 1) + " / " + total;
                  }
                };

                const render = () => {
                  track.style.transform = "translateX(-" + (index * 100) + "%)";
                  root.setAttribute("data-index", String(index + 1));
                  setA11y(index);
                };

                const goTo = (next) => {
                  index = ((next % total) + total) % total;
                  render();
                };

                const start = () => {
                  if (reduceMotion) return;
                  if (timer) return;
                  timer = window.setInterval(() => goTo(index + 1), 3000);
                };

                const stop = () => {
                  if (!timer) return;
                  window.clearInterval(timer);
                  timer = null;
                };

                const reset = () => {
                  stop();
                  start();
                };

                // Buttons
                prevBtn && prevBtn.addEventListener("click", () => {
                  goTo(index - 1);
                  reset();
                });

                nextBtn && nextBtn.addEventListener("click", () => {
                  goTo(index + 1);
                  reset();
                });

                // Dots
                dots.forEach((dot) => {
                  dot.addEventListener("click", () => {
                    const i = Number(dot.getAttribute("data-index") || "0");
                    goTo(i);
                    reset();
                  });
                });

                // Pause on hover/focus
                root.addEventListener("mouseenter", stop);
                root.addEventListener("mouseleave", start);
                root.addEventListener("focusin", stop);
                root.addEventListener("focusout", start);

                // Pause when tab is hidden
                document.addEventListener("visibilitychange", () => {
                  if (document.hidden) stop();
                  else start();
                });

                // Simple swipe support
                let startX = null;
                root.addEventListener("pointerdown", (e) => {
                  startX = e.clientX;
                });
                root.addEventListener("pointerup", (e) => {
                  if (startX == null) return;
                  const dx = e.clientX - startX;
                  startX = null;
                  if (Math.abs(dx) < 50) return;
                  if (dx < 0) goTo(index + 1);
                  else goTo(index - 1);
                  reset();
                });

                // Init
                render();
                start();
              })();
            `}
          </Script>
        </section>

        {/* Header */}
        <section className="mb-10 mt-6">
          <h1 className="text-3xl font-semibold mb-3">Efrat Project</h1>

          <p className="text-base text-slate-700 leading-relaxed max-w-3xl">
            Get guided access, availability, and next steps.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href={SCHEDULE_CALL_HREF}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 text-[#FAF9F6] text-sm font-medium px-5 py-3 hover:bg-slate-800 active:bg-slate-950 transition"
            >
              Schedule A Call
            </Link>

            <Link
              href={ENQUIRY_HREF}
              className="inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium px-5 py-3 hover:bg-slate-50 transition"
            >
              Send An Inquiry
            </Link>
          </div>
        </section>

        {/* Brokers (Natanel + Yaakov) */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-8">Your team</h2>

          {error ? (
            <p className="text-red-600">Error loading brokers.</p>
          ) : !brokers || brokers.length === 0 ? (
            <p className="text-gray-500">
              No matching brokers found (Natanel / Yaakov).
            </p>
          ) : (
            <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {brokers.map((b) => (
                <Link
                  key={b.id}
                  href={`/team/${b.id}`}
                  className="no-underline text-inherit"
                >
                  <div className="bg-slate-50 px-5 py-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
                    <div className="relative w-28 h-28 rounded-full mx-auto mb-4 overflow-hidden">
                      <Image
                        src={brokerImageUrl(b.photoUrl)}
                        alt={`${b.name} headshot`}
                        fill
                        sizes="112px"
                        className="object-cover object-center"
                      />
                    </div>

                    <h2 className="text-xl font-semibold mb-1">{b.name}</h2>
                    <p className="text-sm text-gray-500 mb-3">{b.area}</p>

                    <p className="text-sm text-gray-700">
                      <strong>IL</strong> {b.phone}
                    </p>

                    <p className="text-sm text-gray-700">
                      {b.phone_us && <strong>US</strong>}{" "}
                      {b.phone_us ?? "\u00A0"}
                    </p>

                    <p className="text-sm text-gray-700 mt-3">{b.role}</p>
                    <p className="text-sm text-gray-700 mt-3">{b.email}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
