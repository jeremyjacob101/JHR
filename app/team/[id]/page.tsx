import Link from "next/link";
import { notFound } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { supabaseAdmin } from "@/lib/supabase.server";
import { Broker } from "@/types/broker";
import Image from "next/image";

type FeaturedProperty = {
  id: "gerassi" | "nachlaot";
  title: string;
  subtitle: string;
  image: string; // 0.jpg
  href: string;
  stats: { label: string; value: string }[];
};

const sqmToSqft = (sqm: number) => Math.round(sqm * 10.7639);

const featuredProperties: FeaturedProperty[] = [
  {
    id: "gerassi",
    title: "Graetz House",
    subtitle: "Talbiyeh × German Colony",
    image: "/pictures/gerassi-1/0.jpg",
    href: "/properties/gerassi",
    stats: [
      { label: "Built", value: `484 m² (${sqmToSqft(484)} ft²)` },
      { label: "Plot", value: `411 m² (${sqmToSqft(411)} ft²)` },
      { label: "Garden", value: `258 m² (${sqmToSqft(258)} ft²)` },
      { label: "Levels", value: "Lower-ground + 3 floors + attic" },
    ],
  },
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
            priority={p.id === "gerassi"}
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

        {/* Manual: always show the same two properties */}
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
