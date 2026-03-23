import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Projects | Jerusalem Heritage Realty",
};

type ActiveProjectTile = {
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

type ComingSoonTile = {
  title: string;
  eyebrow: string;
  description: string;
};

function ActiveTile({
  title,
  eyebrow,
  description,
  href,
  imageSrc,
  imageAlt,
}: ActiveProjectTile) {
  return (
    <Link href={href} className="no-underline text-inherit">
      <article className="group relative overflow-hidden rounded-3xl shadow-lg border border-slate-100 bg-slate-50 h-[520px] sm:h-[620px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/25 to-black/75" />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 text-white">
          <p className="text-xs uppercase tracking-[0.18em] text-white/75 mb-2">
            {eyebrow}
          </p>

          <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
            {title}
          </h2>

          <p className="mt-3 text-sm sm:text-[0.9375rem] text-white/85 leading-relaxed max-w-md">
            {description}
          </p>

          <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/95">
            <span className="underline underline-offset-4 group-hover:no-underline">
              View project
            </span>
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function ComingSoonTile({ title, eyebrow, description }: ComingSoonTile) {
  return (
    <div
      aria-disabled="true"
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 h-[520px] sm:h-[620px] cursor-not-allowed"
    >
      <div className="absolute inset-0 bg-linear-to-b from-slate-200/25 via-slate-200/10 to-slate-300/45" />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 20%, rgba(15,23,42,0.08), transparent 42%), radial-gradient(circle at 80% 28%, rgba(15,23,42,0.07), transparent 46%), linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.14) 35%, transparent 70%)",
        }}
      />

      <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-end">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-600 mb-2">
          {eyebrow}
        </p>

        <h2 className="text-3xl sm:text-4xl font-semibold leading-tight text-slate-900">
          {title}
        </h2>

        <p className="mt-3 text-sm sm:text-[0.9375rem] text-slate-700 leading-relaxed max-w-md">
          {description}
        </p>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600">
          <span className="underline underline-offset-4 decoration-slate-400">
            Not available yet
          </span>
        </div>
      </div>
    </div>
  );
}

export default async function ProjectsPage() {
  const SCHEDULE_CALL_HREF = "/contact";
  const EFRAT_IMAGE_SRC = "/efrat.jpg";
  const GARDA_IMAGE_SRC = "/pictures/garda-1/0.jpg";

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main
        id="main-content"
        className="flex-1 min-h-0 max-w-6xl mx-auto px-5 py-16 font-sans w-full"
      >
        <section className="mb-10">
          <h1 className="text-3xl font-semibold mb-3">Projects</h1>

          <p className="text-base text-slate-700 leading-relaxed max-w-3xl">
            Browse current developments and curated project opportunities across
            Jerusalem and beyond.
            <br />
            If you want early access, pricing guidance, or a specific unit type,
            send your brief and we will guide you to the right options.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href={SCHEDULE_CALL_HREF}
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
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ActiveTile
            title="EFRAT PROJECT"
            eyebrow="Featured project"
            description="New development with guided access to units and clear next steps. Tap to view details."
            href="/projects/efrat"
            imageSrc={EFRAT_IMAGE_SRC}
            imageAlt="Efrat Project"
          />

          <ActiveTile
            title="GARDA PROJECT"
            eyebrow="Jerusalem development"
            description="Luxury tower living in renewed Ir Ganim with a park, lake, boulevard, and broad unit mix. Tap to view details."
            href="/projects/garda"
            imageSrc={GARDA_IMAGE_SRC}
            imageAlt="Garda Project"
          />

          <ComingSoonTile
            title="MIDTOWN PROJECT"
            eyebrow="Coming soon"
            description="This project pane is live on the overview page now, but the detail page is not available yet."
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
