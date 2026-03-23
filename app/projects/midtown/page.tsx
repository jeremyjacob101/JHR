import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PropertyCarousel from "@/components/PropertyCarousel";
import { getBrokersByIds, getBrokerImageUrl } from "@/lib/brokers";

export const metadata = {
  title: "Midtown Project | Jerusalem Heritage Realty",
};

const MIDTOWN_IMAGES = [
  "/pictures/projects/midtown-1/0.jpeg",
  "/pictures/projects/midtown-1/1.jpeg",
  "/pictures/projects/midtown-1/2.jpeg",
  "/pictures/projects/midtown-1/3.jpeg",
  "/pictures/projects/midtown-1/4.jpeg",
  "/pictures/projects/midtown-1/5.jpeg",
  "/pictures/projects/midtown-1/6.jpeg",
] as const;

const MIDTOWN_HIGHLIGHTS = [
  {
    label: "Location",
    value: "Jaffa Street, Jerusalem",
  },
  {
    label: "Architecture",
    value: "D-blk Architects",
  },
  {
    label: "Interior Design",
    value: "Dana Oberson",
  },
  {
    label: "Project Scale",
    value: "4 buildings • 900 residential units",
  },
] as const;

const MIDTOWN_BULLETS = [
  "A flagship mixed-use complex at the heart of Jerusalem’s most connected urban corridor.",
  "Brings together luxury residential towers, elegant hotels, retail frontage, and an iconic office component.",
  "Designed as a true metropolitan center where transport, business, government, culture, and dining meet.",
] as const;

const LOCATION_POINTS = [
  "Positioned directly on Jaffa Street in the center of Jerusalem.",
  "At the meeting point of major transportation arteries, civic institutions, employment centers, and city life.",
  "A location defined by walkability, access, and strong long-term urban relevance.",
] as const;

const CONCEPT_POINTS = [
  "Luxury residential towers",
  "Elegant hotel components",
  "Bustling retail avenue",
  "Iconic office tower",
] as const;

const DESIGN_POINTS = [
  "Architecture by D-blk Architects",
  "Interior design by Dana Oberson",
  "An urban identity intended to feel modern, elevated, and globally fluent",
  "A skyline presence meant to crown central Jerusalem with a more metropolitan expression",
] as const;

const PROFILE_POINTS = [
  "4 buildings",
  "900 residential units",
  "Mixed-use urban program",
  "Prime Jerusalem city-center address",
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
            className="object-cover object-center brightness-[1.04] saturate-[1.05]"
          />
        </div>
      </div>
    </section>
  );
}

export default async function MidtownProjectPage() {
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
          <div className="absolute inset-0 opacity-45">
            <div className="absolute -left-10 top-10 h-44 w-44 rounded-full bg-amber-100/80 blur-3xl" />
            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-sky-100/70 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-slate-200/80 blur-3xl" />
          </div>

          <div className="relative grid grid-cols-1 xl:grid-cols-[minmax(0,1.15fr)_340px] gap-6 p-5 sm:p-6">
            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-slate-200 bg-white/85 p-6 sm:p-7 shadow-sm backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-3">
                  Jerusalem Flagship
                </p>
                <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-3">
                  Midtown Jerusalem
                </h1>

                <p className="max-w-3xl text-base text-slate-700 leading-relaxed">
                  On Jaffa Street, at the very heart of the capital, Midtown
                  Jerusalem is envisioned as an iconic mixed-use complex that
                  crowns Jerusalem with a stronger metropolitan center.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {MIDTOWN_HIGHLIGHTS.map((item) => (
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
                  {MIDTOWN_BULLETS.map((bullet) => (
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

              <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
                <div className="p-6 sm:p-7 border-b border-slate-100">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-2">
                    Signature View
                  </p>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    A central Jerusalem skyline statement
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Midtown is positioned as a defining city-center address with
                    a more global urban expression.
                  </p>
                </div>

                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <Image
                    src="/pictures/projects/midtown-1/1.jpeg"
                    alt="Midtown Jerusalem signature rendering"
                    fill
                    sizes="(min-width: 1024px) 1120px, 100vw"
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </section>
            </div>

            <aside className="grid grid-cols-2 xl:grid-cols-1 gap-4 auto-rows-[180px] sm:auto-rows-[220px] xl:h-full xl:grid-rows-5 xl:auto-rows-auto">
              {[
                "/pictures/projects/midtown-1/0.jpeg",
                "/pictures/projects/midtown-1/2.jpeg",
                "/pictures/projects/midtown-1/3.jpeg",
                "/pictures/projects/midtown-1/5.jpeg",
                "/pictures/projects/midtown-1/6.jpeg",
              ].map((src, idx) => (
                <div
                  key={src}
                  className={`relative overflow-hidden rounded-[1.5rem] border border-white/70 shadow-md xl:h-full ${
                    idx === 0 ? "col-span-2 xl:col-span-1" : ""
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Midtown project highlight ${idx + 1}`}
                    fill
                    sizes="(min-width: 1280px) 340px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/5 to-black/30" />
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
              Browse the Midtown Jerusalem renderings and project imagery below.
            </p>
          </div>

          <PropertyCarousel
            key="midtown-project-carousel"
            carouselId="midtown-carousel"
            title="Midtown Jerusalem"
            images={[...MIDTOWN_IMAGES]}
            imageSizes="(min-width: 1024px) 1120px, 100vw"
          />
        </section>

        <div className="mt-8 space-y-6">
          <ProjectSplitSection
            eyebrow="Urban Concept"
            title="An iconic complex at the heart of the capital"
            imageSrc="/pictures/projects/midtown-1/4.jpeg"
            imageAlt="Midtown Jerusalem architectural rendering"
          >
            <p className="text-sm text-slate-700 leading-relaxed">
              Midtown Jerusalem is designed as more than a single development.
              It is intended as a concentrated urban center where movement,
              work, hospitality, retail, and residential life all intersect in
              one powerful city address.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Like the Midtown districts of other major global cities, it aims
              to create a modern, energetic, and inspiring environment at the
              meeting point of Jerusalem&apos;s key civic and commercial flows.
            </p>
          </ProjectSplitSection>

          <ProjectSplitSection
            eyebrow="Location"
            title="Jaffa Street, directly in the center of Jerusalem"
            imageSrc="/pictures/projects/midtown-1/2.jpeg"
            imageAlt="Midtown Jerusalem location rendering"
            imageSide="left"
          >
            {LOCATION_POINTS.map((point) => (
              <p key={point} className="text-sm text-slate-700 leading-relaxed">
                {point}
              </p>
            ))}
          </ProjectSplitSection>

          <ProjectSplitSection
            eyebrow="Project Program"
            title="A mixed-use city-center composition"
            imageSrc="/pictures/projects/midtown-1/3.jpeg"
            imageAlt="Midtown Jerusalem mixed-use rendering"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CONCEPT_POINTS.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-800"
                >
                  {point}
                </div>
              ))}
            </div>
          </ProjectSplitSection>

          <ProjectSplitSection
            eyebrow="Design Team"
            title="Architecture and interiors with a more global urban feel"
            imageSrc="/pictures/projects/midtown-1/5.jpeg"
            imageAlt="Midtown Jerusalem design rendering"
            imageSide="left"
          >
            {DESIGN_POINTS.map((point) => (
              <p key={point} className="text-sm text-slate-700 leading-relaxed">
                {point}
              </p>
            ))}
          </ProjectSplitSection>

          <ProjectSplitSection
            eyebrow="Project Profile"
            title="Built at meaningful scale"
            imageSrc="/pictures/projects/midtown-1/6.jpeg"
            imageAlt="Midtown Jerusalem profile rendering"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROFILE_POINTS.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900"
                >
                  {point}
                </div>
              ))}
            </div>
          </ProjectSplitSection>
        </div>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm mb-12">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-3">
            Contact
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            Interested in Midtown Jerusalem?
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Leave your details and we&apos;ll help you understand the project,
            the positioning, and the fit for your goals in central Jerusalem.
          </p>

          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-950 leading-relaxed">
            Source materials reference project information including location,
            architecture, scale, and contact details. Final terms,
            specifications, and formal project materials remain subject to the
            developer&apos;s official documents and approvals.
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
