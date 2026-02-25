import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { supabaseAdmin } from "@/lib/supabase.server";
import { Broker } from "@/types/broker";
import PropertyCarousel from "@/components/PropertyCarousel";

export const metadata = {
  title: "Efrat Project | Jerusalem Heritage Realty",
};

export default async function EfratProjectPage() {
  const SCHEDULE_CALL_HREF = "/contact";
  const ENQUIRY_HREF = "/contact";
  const EFRAT_HIGHLIGHTS = [
    {
      label: "Community",
      value: "Warm, family-focused, and consistently growing",
    },
    {
      label: "Lifestyle",
      value: "Parks, schools, shuls, and everyday services nearby",
    },
    {
      label: "Access",
      value: "Connected to Jerusalem while offering more space and calm",
    },
    {
      label: "Outlook",
      value: "Strong long-term demand from local and overseas buyers",
    },
  ] as const;

  const EFRAT_BULLETS = [
    "A neighborhood rhythm that balances community life with modern convenience.",
    "A practical fit for families planning future aliyah or building a Jerusalem-area base now.",
    "Guided support from first conversation through due diligence and closing.",
  ] as const;

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

          <PropertyCarousel
            key="efrat-project-carousel"
            carouselId="efrat-carousel"
            title="Efrat Project"
            images={SLIDES}
            imageSizes="(min-width: 1024px) 960px, 100vw"
          />
        </section>

        {/* Header */}
        <section className="mb-10 mt-6">
          <h1 className="text-3xl font-semibold mb-3">Efrat Project</h1>

          <p className="text-base text-slate-700 leading-relaxed max-w-3xl">
            Efrat is one of the most sought-after and steadily expanding
            communities in the Jerusalem corridor, known for its family-friendly
            atmosphere, high quality of life, and strong long-term value.
          </p>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {EFRAT_HIGHLIGHTS.map((item) => (
                <div key={item.label} className="bg-slate-50 rounded-xl p-3">
                  <div className="text-[0.6875rem] uppercase tracking-[0.12em] text-gray-500">
                    {item.label}
                  </div>
                  <div className="text-sm font-semibold text-slate-900 leading-snug mt-1">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <ul className="list-disc pl-5 mt-4 space-y-2">
              {EFRAT_BULLETS.map((bullet) => (
                <li key={bullet} className="text-sm text-slate-700 leading-relaxed">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

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
