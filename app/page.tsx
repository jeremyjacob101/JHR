import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import type { CSSProperties } from "react";
import { montserrat, inter } from "@/app/layout";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import HomeEffects from "@/components/HomeEffects";

type CSSVars = CSSProperties & Record<`--${string}`, string>;

type StoryBlock = {
  title: string;
  body?: string;
  bullets?: string[];
  footer?: string;
  images: { src: string; alt: string }[];
};

const storyBlocks: StoryBlock[] = [
  {
    title: "Your Jerusalem Real Estate Partner",
    body: "Navigating Jerusalem's real estate market from abroad can be challenging. At JHR, we understand your unique needs and offer personalized guidance every step of the way. Let us simplify the process for you.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1574586594690-db2449286e33?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Jerusalem stone architecture placeholder",
      },
      {
        src: "https://plus.unsplash.com/premium_photo-1699531223990-856f23c13e43?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Jerusalem city view placeholder",
      },
      {
        src: "https://plus.unsplash.com/premium_photo-1667427810751-5d38b0921237?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Jerusalem street placeholder",
      },
    ],
  },
  {
    title: "Why Choose JHR",
    body: "You want someone who:",
    bullets: [
      "Understands your mindset and your style",
      "Can explain each step in clear English",
      "Knows the religious and community side as well as the real estate",
      "Is reliable, straightforward, and pleasant to deal with",
    ],
    footer:
      "This is exactly what we built JHR for. You get a team that understands the city, the buildings, the people, and the way deals really work here.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1765274993134-0cd145a53485?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Elegant interior placeholder",
      },
      {
        src: "https://images.unsplash.com/photo-1663785383982-f5484de9fba8?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Luxury apartment placeholder",
      },
      {
        src: "https://plus.unsplash.com/premium_photo-1684175656172-19a7ee56f0c8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Modern living room placeholder",
      },
    ],
  },
  {
    title: "Who We Work Best With",
    bullets: [
      "American families looking for a home or investment in prime Jerusalem areas",
      "Families planning a future move and wanting to buy now while they can",
      "Sellers who want serious marketing, qualified buyers, and firm control of the process",
      "Investors who want quality apartments or new projects with long term value",
    ],
    footer: "If you see yourself in this list, we should talk.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1626303905295-cd61f99cbb04?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Consultation placeholder",
      },
      {
        src: "https://images.unsplash.com/photo-1704655295066-681e61ecca6b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Meeting placeholder",
      },
      {
        src: "https://images.unsplash.com/photo-1574513828701-6b92d7fed61d?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Teamwork placeholder",
      },
    ],
  },
  {
    title: "Locations",
    body: "Explore our exclusive focus areas such as Rechavia, Mamila, Talbiya, and more. Specializing in new construction, Tama 38 urban renewal projects, penthouses, and private houses in prime central Jerusalem locations.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1707337954290-8378da085d99?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGplcnVzYWxlbSUyMHN1YnVyYnxlbnwwfHwwfHx8MA%3D%3D",
        alt: "Neighborhood placeholder",
      },
      {
        src: "https://images.unsplash.com/photo-1645028699892-0f2a7296a4b1?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "City map placeholder",
      },
      {
        src: "https://images.unsplash.com/photo-1632487112403-2d011716780c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "City streets placeholder",
      },
    ],
  },
];

function StorySection({ block, idx }: { block: StoryBlock; idx: number }) {
  const flip = idx % 2 === 1;

  const mediaVars: CSSVars = {
    "--speed": `${18 + idx * 2}s`,
    "--slides": String(block.images.length * 2),
  };

  return (
    <section className={styles.storySection}>
      <div className={styles.storyBg} />
      <div className={styles.storyGrid} />
      <div className={styles.vignette} />

      <div className={styles.storyInner}>
        <div className={`${styles.storyLayout} ${flip ? styles.flip : ""}`}>
          {/* TEXT */}
          <div className={styles.storyText}>
            <div className={styles.kickerRow}>
              <div className={styles.kickerLine} />
              <div className={styles.kickerDot} />
              <div className={styles.kickerLine} />
            </div>

            <h2
              className={`${montserrat.className} jhr-reveal`}
              data-reveal="up"
            >
              {block.title}
            </h2>

            <div className={`${styles.goldRule} jhr-reveal`} data-reveal="up" />

            {block.body ? (
              <p className={`${inter.className} jhr-reveal`} data-reveal="up">
                {block.body}
              </p>
            ) : null}

            {block.bullets?.length ? (
              <ul className={`${inter.className} jhr-reveal`} data-reveal="up">
                {block.bullets.map((b) => (
                  <li key={b}>
                    <span className={styles.bulletDot} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {block.footer ? (
              <p className={`${inter.className} jhr-reveal`} data-reveal="up">
                {block.footer}
              </p>
            ) : null}
          </div>

          {/* SLIDING MEDIA */}
          <div
            className={`${styles.storyMedia} jhr-reveal`}
            data-reveal={flip ? "left" : "right"}
            style={mediaVars}
          >
            <div
              className={styles.mediaFrame}
              aria-label={`${block.title} imagery`}
            >
              <div className={styles.mediaSheen} />

              <div className={styles.mediaTrack}>
                {[...block.images, ...block.images].map((img, i) => (
                  <div key={`${img.src}-${i}`} className={styles.mediaSlide}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      className={styles.mediaImg}
                      loading="eager"
                      priority
                      unoptimized={false}
                    />
                  </div>
                ))}
              </div>

              <div className={styles.mediaFadeLeft} />
              <div className={styles.mediaFadeRight} />
            </div>

            <div className={styles.mediaCaption} aria-hidden="true">
              <div className={styles.captionLine} />
              <div className={styles.captionPip} />
              <div className={styles.captionLine} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type FeaturedProperty = {
  id:
    | "nachlaot"
    | "rehavia-12"
    | "rehavia-13"
    | "rehavia-14"
    | "rehavia-2"
    | "romema-1";
  title: string;
  subtitle: string;
  image: string; // use 0.jpg
  href: string;
  stats: { label: string; value: string }[];
  blurb: string;
};

const sqmToSqft = (sqm: number) => Math.round(sqm * 10.7639);

const featured: FeaturedProperty[] = [
  {
    id: "nachlaot",
    title: "Artist House",
    subtitle: "Nachlaot",
    image: "/pictures/nachlaot-1/0.jpg",
    href: "/properties/nachlaot",
    stats: [
      { label: "Size", value: `~180 m² (${sqmToSqft(180)} ft²)` },
      { label: "Floors", value: "3-story townhouse" },
      { label: "Layout", value: "3 bedrooms • en-suite" },
      { label: "Rooftop", value: "Private balcony + garden" },
    ],
    blurb:
      "Fully updated, design-forward townhouse in quiet Nachlaot — steps from the shuk and city center, with spacious, standout rooftop living for everyone.",
  },
  {
    id: "rehavia-12",
    title: "Metudela 14 • Unit 12",
    subtitle: "Rehavia",
    image: "/pictures/rehavia-1/0.jpg",
    href: "/properties/rehavia-12",
    stats: [
      { label: "Interior", value: `108.2 m² (${sqmToSqft(108.2)} ft²)` },
      { label: "Balcony", value: `11 m² (${sqmToSqft(11)} ft²)` },
      { label: "Rooms", value: "3.5" },
      { label: "Price", value: "₪7,390,500" },
    ],
    blurb:
      "Metudela St 14, Rehavia. Floor 4 apartment with 113.7 m² sale area priced at ₪65,000/m².",
  },
  {
    id: "rehavia-13",
    title: "Metudela 14 • Unit 13",
    subtitle: "Rehavia",
    image: "/pictures/rehavia-1/0.jpg",
    href: "/properties/rehavia-13",
    stats: [
      { label: "Interior", value: `92.4 m² (${sqmToSqft(92.4)} ft²)` },
      { label: "Balcony", value: `7.5 m² (${sqmToSqft(7.5)} ft²)` },
      { label: "Rooms", value: "4" },
      { label: "Price", value: "₪6,249,750" },
    ],
    blurb:
      "Metudela St 14, Rehavia. Floor 4 apartment with 96.15 m² sale area priced at ₪65,000/m².",
  },
  {
    id: "rehavia-14",
    title: "Metudela 14 • Unit 14",
    subtitle: "Rehavia",
    image: "/pictures/rehavia-1/0.jpg",
    href: "/properties/rehavia-14",
    stats: [
      { label: "Interior", value: `72.5 m² (${sqmToSqft(72.5)} ft²)` },
      { label: "Balcony", value: `5 m² (${sqmToSqft(5)} ft²)` },
      { label: "Rooms", value: "2" },
      { label: "Price", value: "₪4,875,000" },
    ],
    blurb:
      "Metudela St 14, Rehavia. Floor 4 apartment with 75 m² sale area priced at ₪65,000/m².",
  },
  {
    id: "rehavia-2",
    title: "Haari 4 • Rehavia Duplex",
    subtitle: "Rehavia",
    image: "/pictures/rehavia-2/0.jpg",
    href: "/properties/rehavia-2",
    stats: [
      { label: "Size", value: `172 m² (${sqmToSqft(172)} ft²)` },
      { label: "Bedrooms", value: "4" },
      { label: "Baths", value: "2.5" },
      { label: "Price", value: "₪13,000,000" },
    ],
    blurb:
      "Prime Haari St duplex in Rehavia with open views, two sukkah balconies, and walking distance to Mamilla, city center, and the Kotel.",
  },
  {
    id: "romema-1",
    title: "Pninat Chemed • Romema",
    subtitle: "Romema",
    image: "/pictures/romema-1/0.jpg",
    href: "/properties/romema-1",
    stats: [
      { label: "Size", value: `240 m² (${sqmToSqft(240)} ft²)` },
      { label: "Bedrooms", value: "5" },
      { label: "Baths", value: "3.5" },
      { label: "Price", value: "₪16,000,000" },
    ],
    blurb:
      "Single-level apartment in Pninat Chemed, Romema, with open views opposite Rav Shefa Mall, plus sukkah porch, parking, and storage.",
  },
];

function FeaturedCard({ p }: { p: FeaturedProperty }) {
  return (
    <Link href={p.href} className="no-underline text-inherit">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden h-full flex flex-col">
        <div className="relative w-full h-48">
          <Image
            src={p.image}
            alt={`${p.title} featured image`}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
            <p className="text-sm text-slate-600">{p.subtitle}</p>
            <p className="text-sm text-slate-600 mt-2 leading-snug">
              {p.blurb}
            </p>
          </div>

          <div className="mt-auto grid grid-cols-2 gap-3 bg-slate-50 rounded-xl p-3">
            {p.stats.map((s) => (
              <div key={s.label}>
                <div className="text-[0.6875rem] uppercase tracking-[0.12em] text-gray-500">
                  {s.label}
                </div>
                <div className="text-sm font-semibold text-slate-900 leading-snug">
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-slate-700 font-medium">
            View details →
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header id="jhr-sticky-nav" className={styles.stickyNav}>
        <NavBar />
      </header>

      <main id="main-content" className="flex-1">
        {/* HERO */}
        <section id="jhr-hero" className={styles.hero}>
          <Image
            src="/pictures/nachlaot-1/0.jpg"
            alt="Baka neighborhood in Jerusalem"
            fill
            sizes="100vw"
            loading="eager"
            priority
            className={styles.heroImg}
          />

          <div className={styles.heroOverlay} />
          <div className={styles.heroGlow} />
          <div className={styles.scan} />

          <div className={styles.heroInner}>
            {/* Top brand mark (logo only, like the reference) */}
            <div className={styles.heroTop}>
              <Image
                src="/jhr-logos/svg/LOGO_%20JHR%20_%20FINAL-04.svg"
                alt="Jerusalem Heritage Realty"
                width={140}
                height={140}
                priority
                className={styles.heroLogo}
              />
            </div>

            {/* Center title */}
            <div className={styles.heroCenter}>
              <p className={styles.heroKicker}>WELCOME TO</p>
              <h1 className={styles.heroHeading}>JERUSALEM HERITAGE REALTY</h1>
              <div className={styles.heroRule} />
            </div>

            {/* Bottom copy + arrow */}
            <div className={styles.heroBottom}>
              <div className={`${styles.heroBottomCopy} ${inter.className}`}>
                <p>Your Home.</p>
                <p>Your Heritage.</p>
                <p>Your Future in Jerusalem.</p>
              </div>

              <a
                href="#jhr-story-start"
                className={styles.scrollCue}
                aria-label="Scroll down"
                data-scroll-cue
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* FULL-HEIGHT STORY SECTIONS */}
        <div id="jhr-story-start" className={styles.storyWrap}>
          {storyBlocks.map((block, idx) => (
            <StorySection key={block.title} block={block} idx={idx} />
          ))}
        </div>

        {/* FEATURED */}
        <section className={styles.featured}>
          <div className={styles.featuredBg} />
          <div className={styles.featuredInner}>
            <h2 className={styles.featuredTitle}>
              Featured Jerusalem Properties
            </h2>

            <div className={styles.featuredDivider}>
              <div className={styles.featuredLine2} />
              <div className={styles.featuredDot} />
              <div className={styles.featuredLine1} />
            </div>

            <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <div key={p.id} className={styles.propertyHover}>
                  <div className={styles.propertyHalo} />
                  <div className="relative rounded-4xl">
                    <FeaturedCard p={p} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Link href="/properties" className={styles.featuredLink}>
                View all Jerusalem properties
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.preFooterImage} style={{ height: "600px" }}>
          <Image
            src="/jhr-logos/svg/LOGO_%20JHR%20_%20FINAL-09.svg"
            alt="Jerusalem Heritage Realty"
            fill
            sizes="100vw"
            className={styles.preFooterImg}
          />
          <div className={styles.preFooterOverlay} />
        </section>
      </main>

      <Footer />
      <HomeEffects />
    </div>
  );
}
