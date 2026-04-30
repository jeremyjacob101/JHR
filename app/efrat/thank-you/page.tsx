import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { getBrokersByIds } from "@/lib/brokers";
import {
  EFRAT_BROCHURE_DOWNLOAD_PATH,
  EFRAT_BROKER_IDS,
  EFRAT_CALENDLY_URL,
  EFRAT_OFFICE_EMAIL,
  EFRAT_OFFICE_PHONE,
  EFRAT_OFFICE_PHONE_TEL,
} from "@/lib/efrat";

export const metadata = {
  title: "Efrat Details Ready | Jerusalem Heritage Realty",
};

export default function EfratThankYouPage() {
  const brokers = getBrokersByIds(EFRAT_BROKER_IDS);
  const brochureHref =
    process.env.NEXT_PUBLIC_EFRAT_BROCHURE_URL ||
    EFRAT_BROCHURE_DOWNLOAD_PATH;
  const pricingHref =
    process.env.NEXT_PUBLIC_EFRAT_PRICING_URL || "#pricing-summary";
  const scheduleHref =
    process.env.NEXT_PUBLIC_EFRAT_CALENDLY_URL || EFRAT_CALENDLY_URL;

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#071b34]">
      <NavBar />

      <main id="main-content">
        <section className="bg-[#071b34] text-white">
          <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:py-20">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Thank you. Your Efrat project details are ready.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80">
              You can view the brochure, review the pricing summary, or schedule
              a call with our team.
            </p>

            <div className="mx-auto mt-9 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
              <a
                href={brochureHref}
                download
                className="inline-flex min-h-14 items-center justify-center rounded-md bg-[#d8b46d] px-5 text-sm font-semibold text-[#071b34] transition hover:bg-[#e4c681]"
              >
                Download Brochure
              </a>
              <a
                href={pricingHref}
                className="inline-flex min-h-14 items-center justify-center rounded-md border border-white/25 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Pricing Summary
              </a>
              <a
                href={scheduleHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center rounded-md border border-white/25 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Schedule a Call
              </a>
            </div>

            <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-white/70">
              We&apos;ve also sent the information to your email so you can review
              it later. If you&apos;re at the exhibition today, you&apos;re welcome to
              stop by the booth and speak with us directly.
            </p>
          </div>
        </section>

        <section
          id="pricing-summary"
          className="scroll-mt-28 bg-white"
          aria-labelledby="pricing-summary-title"
        >
          <div className="mx-auto max-w-5xl px-5 py-14 sm:py-16">
            <h2
              id="pricing-summary-title"
              className="text-3xl font-semibold sm:text-4xl"
            >
              Pricing Summary
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                ["Starting price", "1.8M NIS"],
                ["Price point", "From 20,000 NIS per sqm"],
                ["Categories", "90 sqm, 130 sqm, 170 sqm"],
              ].map(([label, value]) => (
                <article
                  key={label}
                  className="rounded-lg border border-slate-200 bg-[#f8f6f0] p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b98a42]">
                    {label}
                  </p>
                  <p className="mt-3 text-xl font-semibold">{value}</p>
                </article>
              ))}
            </div>

            <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-600">
              Final pricing and availability depend on apartment category,
              stage, and current allocation. Our team will share the latest
              available options directly.
            </p>
          </div>
        </section>

        <section className="bg-[#f8f6f0]">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-5 py-14 sm:py-16 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <h2 className="text-3xl font-semibold">Speak with our team</h2>
              <p className="mt-4 text-base leading-7 text-slate-700">
                Looking for a home, second home, or investment in Israel?
                We&apos;d be glad to help you think it through clearly.
              </p>
              <p className="mt-5 text-sm text-slate-700">
                Office:{" "}
                <a
                  href={`tel:${EFRAT_OFFICE_PHONE_TEL}`}
                  className="font-semibold underline underline-offset-4"
                >
                  {EFRAT_OFFICE_PHONE}
                </a>
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Email:{" "}
                <a
                  href={`mailto:${EFRAT_OFFICE_EMAIL}`}
                  className="font-semibold underline underline-offset-4"
                >
                  {EFRAT_OFFICE_EMAIL}
                </a>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {brokers.map((broker) => (
                <article
                  key={broker.id}
                  className="rounded-lg border border-slate-200 bg-white p-5"
                >
                  <h3 className="text-xl font-semibold">{broker.name}</h3>
                  <p className="mt-1 text-sm font-medium text-[#b98a42]">
                    {broker.role}
                  </p>
                  <div className="mt-5 space-y-2 text-sm text-slate-700">
                    <p>Mobile: {broker.phone}</p>
                    {broker.phone_us ? <p>US: {broker.phone_us}</p> : null}
                    <p>Email: {broker.email}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#071b34] text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/jhr-logos/svg/LOGO_%20JHR%20_%20FINAL-04-5.svg"
              alt="Jerusalem Heritage Realty logo"
              width={72}
              height={72}
              className="h-11 w-auto"
            />
            <p className="text-sm font-semibold uppercase tracking-[0.18em]">
              Jerusalem Heritage Realty
            </p>
          </div>

          <Link
            href="/efrat"
            className="text-sm font-semibold text-[#d8b46d] underline underline-offset-4"
          >
            Back to Efrat project
          </Link>
        </div>
      </footer>
    </div>
  );
}
