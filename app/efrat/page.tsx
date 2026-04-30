import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import EfratLeadForm from "@/components/EfratLeadForm";
import EfratImageGallery from "@/components/EfratImageGallery";
import { getBrokersByIds } from "@/lib/brokers";
import {
  EFRAT_BROKER_IDS,
  EFRAT_GALLERY_IMAGES,
  EFRAT_HERO_IMAGE,
  EFRAT_NUMBERED_IMAGES,
  EFRAT_OFFICE_EMAIL,
  EFRAT_OFFICE_PHONE,
  EFRAT_OFFICE_PHONE_TEL,
} from "@/lib/efrat";

export const metadata = {
  title: "Own in Efrat | Jerusalem Heritage Realty",
  description:
    "Request brochure, pricing, and availability for the Efrat project in the Zayit neighborhood.",
};

const WHY_POINTS = [
  {
    icon: "price",
    title: "Strong Entry Pricing",
    text: "Only 1.8M NIS to start.",
  },
  {
    icon: "sqm",
    title: "From 20,000 NIS per sqm",
    text: "A rare new-home price point in Efrat.",
  },
  {
    icon: "buyers",
    title: "Designed For Real Buyers",
    text: "Families. Second homes. Investors.",
  },
  {
    icon: "location",
    title: "A High Demand Location",
    text: "Zayit is one of Efrat's strongest growth areas.",
  },
] as const;

const SNAPSHOT_BLOCKS = [
  {
    icon: "apartment",
    title: "Apartments",
    text: "90-120 / 130-160 / 170-200+ sqm",
  },
  {
    icon: "included",
    title: "What's Included",
    text: "Parking. Outdoor space. Storage.",
  },
  {
    icon: "fit",
    title: "Who It Fits",
    text: "Homeowners. Second-home buyers. Investors.",
  },
  {
    icon: "next",
    title: "Next Step",
    text: "Brochure. Pricing. Availability.",
  },
] as const;

type EfratIconName =
  | "price"
  | "sqm"
  | "buyers"
  | "location"
  | "apartment"
  | "included"
  | "fit"
  | "next";

function EfratIcon({ name }: { name: EfratIconName }) {
  const common = {
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className="h-12 w-12 text-[#b98a42] sm:h-14 sm:w-14"
    >
      {name === "price" ? (
        <>
          <path {...common} d="M13 38h24" />
          <path {...common} d="M17 38V12h14l4 5v21" />
          <path {...common} d="M22 20h7M22 26h9M22 32h6" />
        </>
      ) : null}
      {name === "sqm" ? (
        <>
          <path {...common} d="M16 14h20v20H16z" />
          <path {...common} d="M21 24h10M26 19v10" />
          <path {...common} d="M11 14v20M8 14h6M8 34h6" />
          <path {...common} d="M16 39h20M16 36v6M36 36v6" />
        </>
      ) : null}
      {name === "buyers" ? (
        <>
          <circle {...common} cx="18" cy="17" r="5" />
          <circle {...common} cx="32" cy="18" r="4" />
          <path {...common} d="M9 37c1.5-7 6-11 9-11s7.5 4 9 11" />
          <path {...common} d="M27 28c4.5.5 8 3.5 10 9" />
        </>
      ) : null}
      {name === "location" ? (
        <>
          <path
            {...common}
            d="M24 42s13-12.5 13-24A13 13 0 0 0 11 18c0 11.5 13 24 13 24Z"
          />
          <circle {...common} cx="24" cy="18" r="4" />
        </>
      ) : null}
      {name === "apartment" ? (
        <>
          <path {...common} d="M12 38V13h15v25M27 22h9v16" />
          <path {...common} d="M17 19h5M17 25h5M17 31h5M31 28h2M31 33h2" />
        </>
      ) : null}
      {name === "included" ? (
        <>
          <path {...common} d="M13 29h22l3 9H10l3-9Z" />
          <path {...common} d="M17 29V17h14v12" />
          <path {...common} d="M20 17a4 4 0 0 1 8 0" />
          <path {...common} d="M19 38v-4M29 38v-4" />
        </>
      ) : null}
      {name === "fit" ? (
        <>
          <path {...common} d="M10 25 24 13l14 12" />
          <path {...common} d="M14 23v15h20V23" />
          <path {...common} d="M20 38V27h8v11" />
          <path {...common} d="M34 31h5" />
        </>
      ) : null}
      {name === "next" ? (
        <>
          <path {...common} d="M11 24h24" />
          <path {...common} d="m27 16 8 8-8 8" />
          <path {...common} d="M11 36h15M11 12h15" />
        </>
      ) : null}
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
    >
      <path
        d="M4 10h11m0 0-4-4m4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function EfratLandingPage() {
  const brokers = getBrokersByIds(EFRAT_BROKER_IDS);

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#071b34]">
      <NavBar />

      <main id="main-content">
        <section className="relative isolate overflow-hidden bg-[#071b34] text-white">
          <div className="absolute inset-y-0 right-0 hidden w-[52%] lg:block">
            <Image
              src={EFRAT_HERO_IMAGE}
              alt="Residential buildings in the Zayit neighborhood of Efrat"
              fill
              priority
              sizes="52vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#071b34] via-[#071b34]/70 to-[#071b34]/10" />
          </div>

          <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-9 sm:py-12 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-center lg:py-16">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-semibold leading-[0.98] tracking-normal text-white sm:text-6xl lg:text-7xl">
                Own in Efrat
              </h1>

              <div className="mt-7 space-y-2 text-2xl font-semibold leading-tight sm:text-3xl">
                <p>
                  Starting at only{" "}
                  <span className="text-[#d8b46d]">1.8M NIS</span>
                </p>
                <p>
                  From <span className="text-[#d8b46d]">20,000 NIS</span> per
                  sqm
                </p>
              </div>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
                A new opportunity to buy in one of Efrat&apos;s most sought after
                neighborhoods.
              </p>

              <div className="mt-8 grid max-w-2xl grid-cols-3 border-y border-white/15 py-5">
                {[
                  ["Sizes", "90-120 sqm, 130-160 sqm, 170-200+ sqm"],
                  ["Garden", "Beautiful open outdoor areas"],
                  ["Penthouse", "Elevated homes with open views"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="border-r border-white/15 px-3 first:pl-0 last:border-r-0"
                  >
                    <p className="text-xs uppercase tracking-[0.16em] text-[#d8b46d]">
                      {label}
                    </p>
                    {value ? (
                      <p className="mt-1 text-lg font-semibold text-white">
                        {value}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:justify-self-end">
              <EfratLeadForm />
            </div>

            <div className="relative min-h-[260px] overflow-hidden rounded-lg border border-white/15 lg:hidden">
              <Image
                src={EFRAT_HERO_IMAGE}
                alt="Residential buildings in the Zayit neighborhood of Efrat"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Why buyers are stopping here
            </h2>

            <div className="mt-10 grid grid-cols-1 border-y border-[#071b34]/20 md:grid-cols-4">
              {WHY_POINTS.map((point) => (
                <article
                  key={point.title}
                  className="relative bg-white px-5 py-8 md:border-r md:border-[#071b34]/20 md:last:border-r-0"
                >
                  <div className="mb-5 flex h-16 items-center">
                    <EfratIcon name={point.icon} />
                  </div>
                  <h3 className="text-2xl font-semibold leading-tight text-[#071b34] sm:text-[1.75rem]">
                    {point.title}
                  </h3>
                  <div className="mt-4 h-px w-12 bg-[#b98a42]/70" />
                  <p className="mt-4 text-xl font-semibold leading-snug text-slate-800">
                    {point.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f8f6f0]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Project Snapshot
            </h2>

            <div className="mt-10 grid grid-cols-1 border-y border-[#d8c39a] md:grid-cols-4">
              {SNAPSHOT_BLOCKS.map((block) => (
                <article
                  key={block.title}
                  className="bg-[#f8f6f0] px-5 py-8 md:border-r md:border-[#d8c39a] md:last:border-r-0"
                >
                  <div className="mb-5 flex h-16 items-center">
                    <EfratIcon name={block.icon} />
                  </div>
                  <h3 className="text-2xl font-semibold leading-tight sm:text-[1.75rem]">
                    {block.title}
                  </h3>
                  <div className="mt-4 h-px w-12 bg-[#b98a42]/70" />
                  <p className="mt-4 text-xl font-semibold leading-snug text-slate-800">
                    {block.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Why this opportunity stands out
            </h2>

            <div className="space-y-5 text-base leading-8 text-slate-700">
              <p>
                This is an opportunity to enter a new residential project in
                the Zayit neighborhood of Efrat at an earlier stage, with
                pricing that is difficult to find in today&apos;s market.
              </p>
              <p>
                For buyers who have been watching Israel real estate closely,
                the question is not only where to buy, but how to enter well.
                This project is built for people who want to buy thoughtfully,
                with strong long term potential in a location with real demand.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#071b34] text-white">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  A look at the project
                </h2>
                <p className="mt-3 text-sm text-white/60">
                  Illustrative renderings for marketing purposes.
                </p>
              </div>
            </div>

            <div className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-3">
              {EFRAT_GALLERY_IMAGES.map((image) => (
                <figure
                  key={image.src}
                  className="overflow-hidden rounded-lg border border-white/15 bg-white/5"
                >
                  <div className="relative aspect-16/10">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover object-center"
                    />
                  </div>
                </figure>
              ))}
            </div>

            <div className="mt-12">
              <EfratImageGallery images={EFRAT_NUMBERED_IMAGES} />
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-14 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Get the full brochure and project details
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
                Submit your details to receive: project brochure, pricing
                overview, apartment categories, and next step options.
              </p>
            </div>

            <Link
              href="#efrat-lead-form"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#b98a42] px-6 text-sm font-semibold text-white transition hover:bg-[#a77936]"
            >
              Get Brochure and Pricing
              <ArrowIcon />
            </Link>
          </div>
        </section>

        <section className="bg-[#f8f6f0]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  Speak with our team
                </h2>
                <p className="mt-5 max-w-md text-base leading-7 text-slate-700">
                  Jerusalem Heritage Realty helps North American buyers
                  navigate Israel real estate with clarity and trust.
                </p>
                <div className="mt-6 space-y-2 text-sm text-slate-700">
                  <p>
                    Office:{" "}
                    <a
                      href={`tel:${EFRAT_OFFICE_PHONE_TEL}`}
                      className="font-semibold text-[#071b34] underline underline-offset-4"
                    >
                      {EFRAT_OFFICE_PHONE}
                    </a>
                  </p>
                  <p>
                    Email:{" "}
                    <a
                      href={`mailto:${EFRAT_OFFICE_EMAIL}`}
                      className="font-semibold text-[#071b34] underline underline-offset-4"
                    >
                      {EFRAT_OFFICE_EMAIL}
                    </a>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {brokers.map((broker) => (
                  <article
                    key={broker.id}
                    className="rounded-lg border border-slate-200 bg-white p-6"
                  >
                    <h3 className="text-xl font-semibold">{broker.name}</h3>
                    <p className="mt-1 text-sm font-medium text-[#b98a42]">
                      {broker.role}
                    </p>

                    <div className="mt-5 space-y-2 text-sm text-slate-700">
                      <p>
                        Mobile:{" "}
                        <a
                          href={`tel:${broker.phone.replace(/[^\d+]/g, "")}`}
                          className="font-semibold text-[#071b34] underline underline-offset-4"
                        >
                          {broker.phone}
                        </a>
                      </p>
                      {broker.phone_us ? (
                        <p>
                          US:{" "}
                          <a
                            href={`tel:${broker.phone_us.replace(/[^\d+]/g, "")}`}
                            className="font-semibold text-[#071b34] underline underline-offset-4"
                          >
                            {broker.phone_us}
                          </a>
                        </p>
                      ) : null}
                      <p>
                        Email:{" "}
                        <a
                          href={`mailto:${broker.email}`}
                          className="font-semibold text-[#071b34] underline underline-offset-4"
                        >
                          {broker.email}
                        </a>
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#071b34] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-9 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/jhr-logos/svg/LOGO_%20JHR%20_%20FINAL-04-5.svg"
              alt="Jerusalem Heritage Realty logo"
              width={80}
              height={80}
              className="h-12 w-auto"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em]">
                Jerusalem Heritage Realty
              </p>
              <p className="mt-1 text-sm text-white/60">
                Helping buyers navigate Israel real estate with clarity.
              </p>
            </div>
          </div>

          <div className="text-sm text-white/70 md:text-right">
            <p>
              <a href={`tel:${EFRAT_OFFICE_PHONE_TEL}`} className="underline">
                {EFRAT_OFFICE_PHONE}
              </a>
            </p>
            <p>
              <a href={`mailto:${EFRAT_OFFICE_EMAIL}`} className="underline">
                {EFRAT_OFFICE_EMAIL}
              </a>
            </p>
            <p className="mt-2 text-xs text-white/50">
              By submitting, you agree we may contact you about this project.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
