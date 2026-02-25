import Link from "next/link";
import { notFound } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { supabaseAdmin } from "@/lib/supabase.server";
import { Broker } from "@/types/broker";
import Image from "next/image";

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
  image: string; // 0.jpg
  href: string;
  stats: { label: string; value: string }[];
};

const sqmToSqft = (sqm: number) => Math.round(sqm * 10.7639);

const featuredProperties: FeaturedProperty[] = [
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
  },
];

function brokerImageUrl(path?: string | null) {
  const safePath = path?.trim() ? path.trim() : "defaultAvatar.jpg";
  return supabaseAdmin.storage.from("brokers").getPublicUrl(safePath).data
    .publicUrl;
}

function FeaturedPropertyCard({ p }: { p: FeaturedProperty }) {
  return (
    <Link href={p.href} className="no-underline text-inherit">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden h-full flex flex-col">
        <div className="relative w-full h-48">
          <Image
            src={p.image}
            alt={`${p.title} card image`}
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

export default async function BrokerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: broker, error: brokerError } = await supabaseAdmin
    .from("brokers")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (brokerError) {
    console.error("Error loading broker", brokerError);
  }

  if (!broker) {
    notFound();
  }

  const typedBroker = broker as Broker;
  const brokerPhoto = brokerImageUrl(typedBroker.photoUrl);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main
        id="main-content"
        className="flex-1 min-h-0 max-w-5xl mx-auto px-5 py-10"
      >
        <Link href="/team" className="text-sm text-gray-600 hover:underline">
          ← Back to team
        </Link>

        <div className="flex flex-col md:flex-row gap-6 mt-6 mb-8 items-center md:items-start">
          <div className="relative w-28 h-28 rounded-full overflow-hidden shrink-0 mx-auto md:mx-0 mb-4 md:mb-0">
            <Image
              src={brokerPhoto}
              alt="Broker photo"
              fill
              sizes="112px"
              className="object-cover object-center"
            />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-3xl font-semibold mb-1">{typedBroker.name}</h1>
            {typedBroker.area ? (
              <p className="text-sm text-gray-500 mb-2">{typedBroker.area}</p>
            ) : null}

            {typedBroker.phone ? (
              <p className="text-sm text-gray-700">
                <strong>IL </strong>
                {typedBroker.phone}
              </p>
            ) : null}

            {typedBroker.phone_us ? (
              <p className="text-sm text-gray-700">
                <strong>US </strong>
                {typedBroker.phone_us}
              </p>
            ) : null}

            {typedBroker.role ? (
              <p className="text-sm text-gray-700 mt-3">{typedBroker.role}</p>
            ) : null}

            {typedBroker.email ? (
              <p className="text-sm text-gray-700">{typedBroker.email}</p>
            ) : null}
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-5">
          Properties by {typedBroker.name}
        </h2>

        {/* Manual: always show the featured property */}
        <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((p) => (
            <FeaturedPropertyCard key={p.id} p={p} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
