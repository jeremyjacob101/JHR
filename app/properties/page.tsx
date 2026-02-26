import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PropertyFilters from "@/components/PropertyFilters";

type SPValue = string | string[] | undefined;
type SP = {
  q?: SPValue;
  neighborhood?: SPValue;
  minPrice?: SPValue;
  maxPrice?: SPValue;
  minBeds?: SPValue;
  maxBeds?: SPValue;
  minBaths?: SPValue;
  maxBaths?: SPValue;
  sort?: SPValue;
};

type ManualProperty = {
  id:
    | "nachlaot"
    | "rehavia-12"
    | "rehavia-13"
    | "rehavia-14"
    | "rehavia-2"
    | "romema-1";
  title: string;
  subtitle: string;
  neighborhood: string;
  locationLine: string;
  cardImage: string; // must be 0.jpg
  priceNIS?: number;
  beds?: number;
  baths?: number;
  rooms?: number;
  highlights: { label: string; value: string }[];
};

const sqmToSqft = (sqm: number) => Math.round(sqm * 10.7639);
const pickFirst = (value: SPValue) =>
  Array.isArray(value) ? (value[0] ?? "") : (value ?? "");

const parseNumberParam = (value: SPValue) => {
  const normalized = pickFirst(value)
    .trim()
    .replace(/[^\d.]/g, "");
  if (!normalized) return undefined;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const q = pickFirst(sp.q).trim().toLowerCase();
  const neighborhoodValues = Array.isArray(sp.neighborhood)
    ? sp.neighborhood
    : sp.neighborhood
      ? [sp.neighborhood]
      : [];
  const selectedNeighborhoods = new Set(
    neighborhoodValues.map((value) => value.trim().toLowerCase()).filter(Boolean),
  );
  const minPrice = parseNumberParam(sp.minPrice);
  const maxPrice = parseNumberParam(sp.maxPrice);
  const minBeds = parseNumberParam(sp.minBeds);
  const maxBeds = parseNumberParam(sp.maxBeds);
  const minBaths = parseNumberParam(sp.minBaths);
  const maxBaths = parseNumberParam(sp.maxBaths);

  const sortRaw = pickFirst(sp.sort).trim();
  const sort: "" | "price_asc" | "price_desc" =
    sortRaw === "price_asc" || sortRaw === "price_desc" ? sortRaw : "";

  const properties: ManualProperty[] = [
    {
      id: "nachlaot",
      title: "Artist House",
      subtitle: "Nachlaot",
      neighborhood: "Nachlaot",
      locationLine:
        "Pastoral Nachlaot • Footsteps from the city center • Jerusalem",
      cardImage: "/pictures/nachlaot-1/0.jpg",
      beds: 3,
      baths: 3,
      highlights: [
        { label: "Size", value: `~180 m² (${sqmToSqft(180)} ft²)` },
        { label: "Floors", value: "3-story townhouse" },
        { label: "Layout", value: "3 bedrooms • each with en-suite bath" },
        { label: "Rooftop", value: "Private balcony + rooftop garden" },
      ],
    },
    {
      id: "romema-1",
      title: "Pninat Chemed • Romema",
      subtitle: "Romema",
      neighborhood: "Romema",
      locationLine: "Pninat Chemed • Opposite Rav Shefa Mall • Jerusalem",
      cardImage: "/pictures/romema-1/0.jpg",
      priceNIS: 16000000,
      beds: 5,
      baths: 3.5,
      highlights: [
        { label: "Size", value: `240 m² (${sqmToSqft(240)} ft²)` },
        { label: "Bedrooms", value: "5" },
        { label: "Bathrooms", value: "3.5" },
        { label: "Price", value: "₪16,000,000" },
      ],
    },
    {
      id: "rehavia-12",
      title: "Metudela 14 • Unit 12",
      subtitle: "Rehavia",
      neighborhood: "Rehavia",
      locationLine: "14 Metudela St • Rehavia • Jerusalem",
      cardImage: "/pictures/rehavia-1/0.jpg",
      priceNIS: 7390500,
      rooms: 3.5,
      highlights: [
        { label: "Size", value: "108.2 m² + 11 m² balcony" },
        { label: "Rooms", value: "3.5" },
        { label: "Floor", value: "4" },
        { label: "Price", value: "₪7,390,500" },
      ],
    },
    {
      id: "rehavia-13",
      title: "Metudela 14 • Unit 13",
      subtitle: "Rehavia",
      neighborhood: "Rehavia",
      locationLine: "14 Metudela St • Rehavia • Jerusalem",
      cardImage: "/pictures/rehavia-1/0.jpg",
      priceNIS: 6249750,
      rooms: 4,
      highlights: [
        { label: "Size", value: "92.4 m² + 7.5 m² balcony" },
        { label: "Rooms", value: "4" },
        { label: "Floor", value: "4" },
        { label: "Price", value: "₪6,249,750" },
      ],
    },
    {
      id: "rehavia-14",
      title: "Metudela 14 • Unit 14",
      subtitle: "Rehavia",
      neighborhood: "Rehavia",
      locationLine: "14 Metudela St • Rehavia • Jerusalem",
      cardImage: "/pictures/rehavia-1/0.jpg",
      priceNIS: 4875000,
      rooms: 2,
      highlights: [
        { label: "Size", value: "72.5 m² + 5 m² balcony" },
        { label: "Rooms", value: "2" },
        { label: "Floor", value: "4" },
        { label: "Price", value: "₪4,875,000" },
      ],
    },
    {
      id: "rehavia-2",
      title: "Haari 4 • Rehavia Duplex",
      subtitle: "Rehavia",
      neighborhood: "Rehavia",
      locationLine: "4 Haari St • Rehavia • Jerusalem",
      cardImage: "/pictures/rehavia-2/0.jpg",
      priceNIS: 13000000,
      beds: 4,
      baths: 2.5,
      highlights: [
        { label: "Size", value: `172 m² (${sqmToSqft(172)} ft²)` },
        { label: "Bedrooms", value: "4" },
        { label: "Bathrooms", value: "2.5" },
        { label: "Price", value: "₪13,000,000" },
      ],
    },
  ];

  const filtered = properties.filter((p) => {
    if (q) {
      const haystack =
        `${p.title} ${p.subtitle} ${p.locationLine}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (
      selectedNeighborhoods.size > 0 &&
      !selectedNeighborhoods.has(p.neighborhood.toLowerCase())
    ) {
      return false;
    }

    if (
      minPrice !== undefined &&
      p.priceNIS !== undefined &&
      p.priceNIS < minPrice
    ) {
      return false;
    }
    if (
      maxPrice !== undefined &&
      p.priceNIS !== undefined &&
      p.priceNIS > maxPrice
    ) {
      return false;
    }

    const bedsOrRooms = p.beds ?? p.rooms;
    if (
      minBeds !== undefined &&
      (bedsOrRooms === undefined || bedsOrRooms < minBeds)
    ) {
      return false;
    }
    if (
      maxBeds !== undefined &&
      (bedsOrRooms === undefined || bedsOrRooms > maxBeds)
    ) {
      return false;
    }

    if (
      minBaths !== undefined &&
      (p.baths === undefined || p.baths < minBaths)
    ) {
      return false;
    }
    if (
      maxBaths !== undefined &&
      (p.baths === undefined || p.baths > maxBaths)
    ) {
      return false;
    }

    return true;
  });

  const sorted = [...filtered];
  if (sort) {
    sorted.sort((a, b) => {
      if (a.priceNIS === undefined && b.priceNIS === undefined) return 0;
      if (a.priceNIS === undefined) return 1;
      if (b.priceNIS === undefined) return -1;
      return sort === "price_asc"
        ? a.priceNIS - b.priceNIS
        : b.priceNIS - a.priceNIS;
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main
        id="main-content"
        className="flex-1 min-h-0 max-w-5xl mx-auto px-5 py-16 font-sans w-full"
      >
        <section className="mb-10">
          <h1 className="text-3xl font-semibold mb-3">Listings</h1>
          <p className="text-base text-slate-700 leading-relaxed max-w-3xl">
            Featured properties, curated and presented with full photo galleries
            and key specifications.
          </p>
          <div className="mt-6">
            <PropertyFilters />
          </div>
        </section>

        {sorted.length === 0 ? (
          <p className="text-gray-500">No properties found.</p>
        ) : (
          <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((p) => (
              <Link
                key={p.id}
                href={`/properties/${p.id}`}
                className="no-underline text-inherit"
              >
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden h-full flex flex-col">
                  {/* Card image uses 0.jpg */}
                  <div className="relative w-full h-48">
                    <Image
                      src={p.cardImage}
                      alt={`${p.title} card image`}
                      fill
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-center"
                      priority
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="mb-3">
                      <h2 className="text-lg font-semibold text-slate-900">
                        {p.title}
                      </h2>
                      <p className="text-sm text-slate-600">{p.subtitle}</p>
                      <p className="text-sm text-slate-600 mt-2 leading-snug">
                        {p.locationLine}
                      </p>
                    </div>

                    <div className="mt-auto grid grid-cols-2 gap-3 bg-slate-50 rounded-xl p-3">
                      {p.highlights.map((h) => (
                        <div key={h.label}>
                          <div className="text-[0.6875rem] uppercase tracking-[0.12em] text-gray-500">
                            {h.label}
                          </div>
                          <div className="text-sm font-semibold text-slate-900 leading-snug">
                            {h.value}
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
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
