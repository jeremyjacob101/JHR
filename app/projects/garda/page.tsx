import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PropertyCarousel from "@/components/PropertyCarousel";
import ProjectVideoPlayer from "@/components/ProjectVideoPlayer";
import { getBrokersByIds, getBrokerImageUrl } from "@/lib/brokers";

export const metadata = {
  title: "Garda Project | Jerusalem Heritage Realty",
};

const GARDA_IMAGES = [
  "/pictures/garda-1/0.jpg",
  "/pictures/garda-1/1.jpg",
  "/pictures/garda-1/2.jpg",
  "/pictures/garda-1/3.jpg",
  "/pictures/garda-1/4.jpg",
  "/pictures/garda-1/5.jpg",
  "/pictures/garda-1/6.jpg",
  "/pictures/garda-1/7.jpg",
  "/pictures/garda-1/8.jpg",
  "/pictures/garda-1/9.jpg",
] as const;

const GARDA_HIGHLIGHTS = [
  {
    label: "Setting",
    value: "Renewed Ir Ganim with direct access to key Jerusalem routes",
  },
  {
    label: "Scale",
    value: "5 luxury towers: 3 towers at 30 floors and 2 towers at 32 floors",
  },
  {
    label: "Lifestyle",
    value: "A vast park, half-acre lake, retail boulevard, and shared amenities",
  },
  {
    label: "Residences",
    value: "2-6 room apartments, park apartments, and view penthouses",
  },
] as const;

const GARDA_BULLETS = [
  "A rare Jerusalem residential concept inspired by Lake Garda in northern Italy.",
  "Combines first-class urban living with unusual outdoor scale, greenery, and family amenities.",
  "Designed for buyers who want both strong access and a more complete live-work-host environment.",
] as const;

const LOCATION_POINTS = [
  "At the meeting point of Kolitz Road, the light rail route, and the new Geoni Road.",
  "Fast access to Park Promenade, Malha Mall, the Biblical Zoo, and the Technology Park.",
  "Convenient daily connectivity for commuting, family routines, and leisure.",
] as const;

const COMPLEX_FEATURES = [
  "Luxurious resident lobbies",
  "Gym",
  "Spa in select buildings",
  "Synagogue",
  "Shopping boulevard",
  "Community center allocation",
  "Kindergartens and elementary schools",
] as const;

const APARTMENT_POINTS = [
  "Stylish 2-6 room apartments",
  "Large 20-40 m² sun balconies",
  "Spacious park apartments",
  "Magnificent penthouses with broad Jerusalem views",
] as const;

const UNIT_MODELS = [
  "Model A | 4 Rooms",
  "Model B | 5 Rooms",
  "Model D | 4 Rooms",
  "Model J | 6 Rooms",
] as const;

type ProjectSplitSectionProps = {
  eyebrow: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  imageSide?: "left" | "right";
  children: ReactNode;
};

function ProjectSplitSection({
  eyebrow,
  title,
  imageSrc,
  imageAlt,
  imageSide = "right",
  children,
}: ProjectSplitSectionProps) {
  const textOrder = imageSide === "left" ? "lg:order-2" : "lg:order-1";
  const imageOrder = imageSide === "left" ? "lg:order-1" : "lg:order-2";

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)]">
        <div className={`p-6 sm:p-7 ${textOrder}`}>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-3">
            {eyebrow}
          </p>
          <h2 className="text-2xl sm:text-[2rem] font-semibold text-slate-900 mb-4">
            {title}
          </h2>
          <div className="space-y-3">{children}</div>
        </div>

        <div
          className={`relative min-h-[280px] sm:min-h-[360px] ${imageOrder}`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-center brightness-[1.04] saturate-[1.06]"
          />
        </div>
      </div>
    </section>
  );
}

export default async function GardaProjectPage() {
  const SCHEDULE_CALL_HREF = "/contact";
  const ENQUIRY_HREF = "/contact";
  const brokers = getBrokersByIds(["b1", "b2"]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main
        id="main-content"
        className="flex-1 min-h-0 max-w-6xl mx-auto px-5 py-16 font-sans w-full"
      >
        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#eef2f7_55%,#f8f6f1_100%)] shadow-sm">
          <div className="absolute inset-0 opacity-50">
            <div className="absolute -left-12 top-12 h-44 w-44 rounded-full bg-amber-100/80 blur-3xl" />
            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-sky-100/70 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-emerald-100/50 blur-3xl" />
          </div>

          <div className="relative grid grid-cols-1 xl:grid-cols-[minmax(0,1.15fr)_340px] gap-6 p-5 sm:p-6">
            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-6 sm:p-7 shadow-sm backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-3">
                  Jerusalem Development
                </p>
                <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-3">
                  Garda Project
                </h1>

                <p className="max-w-3xl text-base text-slate-700 leading-relaxed">
                  Garda is a distinctive new residential complex in Jerusalem,
                  inspired by the atmosphere of Lake Garda in northern Italy and
                  translated into a highly ambitious urban setting in renewed Ir
                  Ganim.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {GARDA_HIGHLIGHTS.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-200 bg-slate-50/90 p-3"
                    >
                      <div className="text-[0.6875rem] uppercase tracking-[0.12em] text-gray-500">
                        {item.label}
                      </div>
                      <div className="text-sm font-semibold text-slate-900 leading-snug mt-1">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                <ul className="list-disc pl-5 mt-5 space-y-2">
                  {GARDA_BULLETS.map((bullet) => (
                    <li
                      key={bullet}
                      className="text-sm text-slate-700 leading-relaxed"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>

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
              </div>

              <section className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="p-6 sm:p-7 border-b border-slate-100">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-2">
                    Overview Video
                  </p>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Garda in motion
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    A larger project overview video placed front and center.
                  </p>
                </div>

                <div className="relative overflow-hidden bg-slate-100 aspect-video">
                  <ProjectVideoPlayer
                    src="/pictures/garda-1/video-1.mp4"
                    poster="/pictures/garda-1/0.jpg"
                    title="Garda Overview"
                  />
                </div>
              </section>
            </div>

            <aside className="grid grid-cols-2 xl:grid-cols-1 gap-4 auto-rows-[180px] sm:auto-rows-[220px] xl:h-full xl:grid-rows-5 xl:auto-rows-auto">
              {[
                "/pictures/garda-1/0.jpg",
                "/pictures/garda-1/2.jpg",
                "/pictures/garda-1/3.jpg",
                "/pictures/garda-1/6.jpg",
                "/pictures/garda-1/9.jpg",
              ].map((src, idx) => (
                <div
                  key={src}
                  className={`relative overflow-hidden rounded-[1.5rem] border border-white/70 shadow-md xl:h-full ${
                    idx === 0 ? "col-span-2 xl:col-span-1" : ""
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Garda project highlight ${idx + 1}`}
                    fill
                    sizes="(min-width: 1280px) 340px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/5 to-black/35" />
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 sm:p-7 border-b border-slate-100">
            <h2 className="text-xl font-semibold text-slate-900">
              Project Gallery
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Browse the Garda renderings and project imagery below.
            </p>
          </div>

          <PropertyCarousel
            key="garda-project-carousel"
            carouselId="garda-carousel"
            title="Garda Project"
            images={[...GARDA_IMAGES]}
            imageSizes="(min-width: 1024px) 1120px, 100vw"
          />
        </section>

        <div className="mt-8 space-y-6">
          <ProjectSplitSection
            eyebrow="Our Story"
            title="A project concept with unusual scale for Jerusalem"
            imageSrc="/pictures/garda-1/4.jpg"
            imageAlt="Garda architectural rendering"
          >
            <p className="text-sm text-slate-700 leading-relaxed">
              Garda introduces a more expansive residential language than most
              Jerusalem projects, bringing together a major park setting, a
              half-acre lake, hospitality-style shared spaces, and a varied
              residential mix within one master-planned complex.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              The intention is not only to deliver apartments, but to shape a
              complete daily environment with movement, amenities, retail,
              community infrastructure, and strong family usability.
            </p>
          </ProjectSplitSection>

          <ProjectSplitSection
            eyebrow="Location"
            title="Connected access, day to day"
            imageSrc="/pictures/garda-1/1.jpg"
            imageAlt="Garda location rendering"
            imageSide="left"
          >
            {LOCATION_POINTS.map((point) => (
              <p key={point} className="text-sm text-slate-700 leading-relaxed">
                {point}
              </p>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Park Promenade",
                "Malha Mall",
                "Biblical Zoo",
                "Technology Park",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900"
                >
                  {item}
                </div>
              ))}
            </div>
          </ProjectSplitSection>

          <ProjectSplitSection
            eyebrow="Architecture"
            title="A five-tower ensemble"
            imageSrc="/pictures/garda-1/5.jpg"
            imageAlt="Garda tower rendering"
          >
            <p className="text-sm text-slate-700 leading-relaxed">
              Garda is planned as a unified architectural composition of five
              luxury towers, with three 30-story buildings and two 32-story
              buildings designed to work together as one coherent urban address.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              The result is a wide range of residential options while
              maintaining a consistent visual identity and an elevated,
              high-spec feel across the project.
            </p>
          </ProjectSplitSection>

          <ProjectSplitSection
            eyebrow="The Complex"
            title="Shared amenities with real daily value"
            imageSrc="/pictures/garda-1/2.jpg"
            imageAlt="Garda complex rendering"
            imageSide="left"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COMPLEX_FEATURES.map((feature) => (
                <div
                  key={feature}
                  className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-800"
                >
                  {feature}
                </div>
              ))}
            </div>
          </ProjectSplitSection>

          <ProjectSplitSection
            eyebrow="The Apartments"
            title="A broad residential mix"
            imageSrc="/pictures/garda-1/7.jpg"
            imageAlt="Garda apartment rendering"
          >
            {APARTMENT_POINTS.map((point) => (
              <p key={point} className="text-sm text-slate-700 leading-relaxed">
                {point}
              </p>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {UNIT_MODELS.map((model) => (
                <div
                  key={model}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <div className="text-sm font-semibold text-slate-900">
                    {model}
                  </div>
                  <div className="text-xs uppercase tracking-[0.12em] text-slate-500 mt-1">
                    Apartment plan available on request
                  </div>
                </div>
              ))}
            </div>
          </ProjectSplitSection>
        </div>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm mb-12">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-3">
            The Developers
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            Built by experienced Jerusalem urban-renewal partners
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Avisror Moshe & Sons and Keshet Real Estate joined forces to advance
            urban renewal and elevate construction standards in Jerusalem. Garda
            reflects that ambition through scale, amenities, and a clearly
            differentiated residential concept.
          </p>

          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-950 leading-relaxed">
            All renderings and promotional imagery are illustrative only and
            remain subject to legal approvals, final plans, and signed contract
            specifications.
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-8">Your team</h2>

          {brokers.length === 0 ? (
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
                        src={getBrokerImageUrl(b.photoUrl)}
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
