import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

type ManualProperty = {
  id: "nachlaot";
  title: string;
  subtitle: string;
  headerTagline: string;
  backdropImage: string; // must be 1.jpg
  galleryImages: string[]; // 0..N
  mapQuery: string;
  quickFacts: { label: string; value: string }[];
  overview: string[];
  highlights: string[];
  sections?: { title: string; body: string[] }[];
};

const sqmToSqft = (sqm: number) => Math.round(sqm * 10.7639);

const PROPERTIES: Record<ManualProperty["id"], ManualProperty> = {
  nachlaot: {
    id: "nachlaot",
    title: "Artist House",
    subtitle: "Nachlaot • Jerusalem",
    headerTagline:
      "A fully updated, design-forward 3-story townhouse with rooftop living in the heart of the city.",
    backdropImage: "/pictures/nachlaot-1/1.jpg",
    galleryImages: [
      "/pictures/nachlaot-1/0.jpg",
      "/pictures/nachlaot-1/1.jpg",
      "/pictures/nachlaot-1/2.jpg",
      "/pictures/nachlaot-1/3.jpg",
      "/pictures/nachlaot-1/4.jpg",
      "/pictures/nachlaot-1/5.jpg",
      "/pictures/nachlaot-1/6.jpg",
    ],
    mapQuery: "Nachlaot, Jerusalem, Israel",
    quickFacts: [
      { label: "Size", value: `~180 m² (${sqmToSqft(180)} ft²)` },
      { label: "Type", value: "Private Nachlaot townhouse" },
      { label: "Floors", value: "3 stories" },
      { label: "Bedrooms", value: "3 large bedrooms (each en-suite)" },
      { label: "Hosting", value: "Comfortably hosts 7–8 guests" },
      { label: "Dining", value: "Table capacity ~18–20" },
      { label: "Kitchen", value: "Designer kosher kitchen" },
      {
        label: "Rooftop",
        value: "Private balcony + rooftop garden (sukka-friendly)",
      },
    ],
    overview: [
      "Located in quiet and pastoral Nachlaot, just footsteps from Jerusalem’s energy, markets, and city-center life.",
      "This 3-story townhouse is fully updated and equipped to high standards, with design choices that match the creativity and spirit of the neighborhood.",
      "A rooftop balcony and rooftop garden create an exceptional “open sky” experience in the center of the city.",
    ],
    highlights: [
      "5 minutes walk (or less): Shuk Machane Yehuda, Ben Yehuda Promenade, Rechavia.",
      "15 minutes walk (or less): Mamilla / Old City, Gan Sacher, Great Synagogue, major Rechavia shuls, Geula / Mea Shearim, and city-center restaurants and hotels.",
      "Large sit-in living room with books and games.",
      "Guest bathroom on the main floor (in addition to en-suite bathrooms).",
    ],
  },
};

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const key = (id ?? "").toLowerCase() as ManualProperty["id"];
  const property = PROPERTIES[key];

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main
          id="main-content"
          className="flex-1 min-h-0 max-w-5xl mx-auto px-5 py-10"
        >
          <p className="mb-3">Property not found.</p>
          <Link
            href="/properties"
            className="text-sm text-gray-600 hover:underline"
          >
            ← Back to properties
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    property.mapQuery,
  )}&output=embed`;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Backdrop "thingy" at top must be 1.jpg */}
      <section className="relative h-[260px] mb-0 overflow-hidden">
        <Image
          src={property.backdropImage}
          alt={`${property.title} backdrop`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-linear-to-b from-[#0b1f3a]/40 to-[#0b1f3a]/75" />

        <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col justify-end px-5 pb-6 text-white">
          <p className="mb-1">
            <Link
              href="/properties"
              className="text-xs text-gray-200 hover:underline"
            >
              ← Back to properties
            </Link>
          </p>

          <h1 className="text-[1.75rem] md:text-[1.875rem] font-semibold mb-1">
            {property.title}
          </h1>

          <p className="text-sm text-gray-200 mb-2">{property.subtitle}</p>

          <p className="text-sm text-gray-100 max-w-3xl leading-relaxed">
            {property.headerTagline}
          </p>
        </div>
      </section>

      <main
        id="main-content"
        className="flex-1 min-h-0 max-w-5xl mx-auto px-5 pt-5 pb-16 font-sans"
      >
        <section className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-7 mt-2">
          <div>
            {/* Gallery slider */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-[1.25rem] font-semibold">Photo Gallery</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Click arrows or dots — it also auto-advances every 3 seconds.
                </p>
              </div>

              <div
                id="property-carousel"
                className="relative w-full select-none"
                style={{ paddingBottom: "56.25%" }}
                data-index="0"
                aria-label={`${property.title} image carousel`}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    data-track
                    className="h-full w-full flex transition-transform duration-500 ease-out"
                    style={{ transform: "translateX(0%)" }}
                  >
                    {property.galleryImages.map((src, i) => (
                      <div
                        key={src}
                        data-slide
                        className="relative h-full w-full shrink-0"
                        aria-hidden={i === 0 ? "false" : "true"}
                      >
                        <Image
                          src={src}
                          alt={`${property.title} photo ${i + 1}`}
                          fill
                          sizes="(min-width: 768px) 66vw, 100vw"
                          className="object-cover object-center"
                          priority={i === 0}
                        />
                      </div>
                    ))}
                  </div>

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

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {property.galleryImages.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        data-dot
                        data-index={i}
                        aria-label={`Go to image ${i + 1}`}
                        aria-current={i === 0 ? "true" : "false"}
                        className="h-2.5 w-2.5 rounded-full border border-slate-200 bg-white/80 hover:bg-white transition"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <Script id="property-carousel-script" strategy="afterInteractive">
                {`
                  (() => {
                    const root = document.getElementById("property-carousel");
                    if (!root) return;

                    const track = root.querySelector("[data-track]");
                    const slides = Array.from(root.querySelectorAll("[data-slide]"));
                    const dots = Array.from(root.querySelectorAll("[data-dot]"));
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
                      });
                    };

                    const render = () => {
                      track.style.transform = "translateX(-" + (index * 100) + "%)";
                      root.setAttribute("data-index", String(index));
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

                    prevBtn && prevBtn.addEventListener("click", () => {
                      goTo(index - 1);
                      reset();
                    });

                    nextBtn && nextBtn.addEventListener("click", () => {
                      goTo(index + 1);
                      reset();
                    });

                    dots.forEach((dot) => {
                      dot.addEventListener("click", () => {
                        const i = Number(dot.getAttribute("data-index") || "0");
                        goTo(i);
                        reset();
                      });
                    });

                    root.addEventListener("mouseenter", stop);
                    root.addEventListener("mouseleave", start);
                    root.addEventListener("focusin", stop);
                    root.addEventListener("focusout", start);

                    document.addEventListener("visibilitychange", () => {
                      if (document.hidden) stop();
                      else start();
                    });

                    let startX = null;
                    root.addEventListener("pointerdown", (e) => { startX = e.clientX; });
                    root.addEventListener("pointerup", (e) => {
                      if (startX == null) return;
                      const dx = e.clientX - startX;
                      startX = null;
                      if (Math.abs(dx) < 50) return;
                      if (dx < 0) goTo(index + 1);
                      else goTo(index - 1);
                      reset();
                    });

                    render();
                    start();
                  })();
                `}
              </Script>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-100 rounded-2xl px-4 py-3 mb-6">
              {property.quickFacts.slice(0, 4).map((f) => (
                <div key={f.label}>
                  <span className="text-[0.6875rem] uppercase tracking-[0.12em] text-gray-500">
                    {f.label}
                  </span>
                  <div className="text-[1rem] font-semibold text-slate-900">
                    {f.value}
                  </div>
                </div>
              ))}
            </div>

            <section className="mb-7">
              <h2 className="text-[1.25rem] font-semibold mb-2">
                Property Overview
              </h2>
              <div className="space-y-3">
                {property.overview.map((p, idx) => (
                  <p
                    key={idx}
                    className="text-sm text-gray-600 leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>

            <section className="mb-7">
              <h2 className="text-[1.25rem] font-semibold mb-2">Highlights</h2>
              <ul className="list-disc pl-5 space-y-2">
                {property.highlights.map((h, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-gray-600 leading-relaxed"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            {property.sections?.map((s) => (
              <section key={s.title} className="mb-7">
                <h2 className="text-[1.25rem] font-semibold mb-2">{s.title}</h2>
                <div className="space-y-3">
                  {s.body.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-sm text-gray-600 leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section>
              <h2 className="text-[1.25rem] font-semibold mb-2">Location</h2>
              <p className="text-sm text-gray-600">{property.mapQuery}</p>
              <div className="mt-3 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  title="Property location"
                  src={mapSrc}
                  className="border-0 w-full h-[260px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </section>
          </div>

          {/* Right rail: simple CTA box (manual, no broker) */}
          <aside className="md:pl-1">
            <div className="bg-slate-50 rounded-2xl p-5 shadow-md">
              <h3 className="text-sm uppercase tracking-[0.16em] text-gray-500 mb-3">
                Next Steps
              </h3>

              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                Request availability, schedule a viewing, or ask for a full
                brochure pack (plans, specs, and additional photos).
              </p>

              <div className="flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 text-[#FAF9F6] text-sm font-medium px-5 py-3 hover:bg-slate-800 active:bg-slate-950 transition"
                >
                  Schedule A Call
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium px-5 py-3 hover:bg-slate-50 transition"
                >
                  Send An Inquiry
                </Link>
              </div>

              <div className="mt-5 pt-5 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-slate-900 mb-2">
                  Key Specs (Expanded)
                </h4>
                <div className="space-y-2">
                  {property.quickFacts.map((f) => (
                    <div
                      key={f.label}
                      className="flex items-start justify-between gap-3"
                    >
                      <span className="text-xs uppercase tracking-[0.12em] text-gray-500">
                        {f.label}
                      </span>
                      <span className="text-sm text-slate-900 font-medium text-right">
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}
