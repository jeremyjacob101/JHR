import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

type SP = {
  q?: string;
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
  locationLine: string;
  cardImage: string; // must be 0.jpg
  highlights: { label: string; value: string }[];
};

const sqmToSqft = (sqm: number) => Math.round(sqm * 10.7639);

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim().toLowerCase();

  const properties: ManualProperty[] = [
    {
      id: "nachlaot",
      title: "Artist House",
      subtitle: "Nachlaot",
      locationLine:
        "Pastoral Nachlaot • Footsteps from the city center • Jerusalem",
      cardImage: "/pictures/nachlaot-1/0.jpg",
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
      locationLine: "Pninat Chemed • Opposite Rav Shefa Mall • Jerusalem",
      cardImage: "/pictures/romema-1/0.jpg",
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
      locationLine: "14 Metudela St • Rehavia • Jerusalem",
      cardImage: "/pictures/rehavia-1/0.jpg",
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
      locationLine: "14 Metudela St • Rehavia • Jerusalem",
      cardImage: "/pictures/rehavia-1/0.jpg",
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
      locationLine: "14 Metudela St • Rehavia • Jerusalem",
      cardImage: "/pictures/rehavia-1/0.jpg",
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
      locationLine: "4 Haari St • Rehavia • Jerusalem",
      cardImage: "/pictures/rehavia-2/0.jpg",
      highlights: [
        { label: "Size", value: `172 m² (${sqmToSqft(172)} ft²)` },
        { label: "Bedrooms", value: "4" },
        { label: "Bathrooms", value: "2.5" },
        { label: "Price", value: "₪13,000,000" },
      ],
    },
  ];

  const filtered = !q
    ? properties
    : properties.filter((p) => {
        const haystack =
          `${p.title} ${p.subtitle} ${p.locationLine}`.toLowerCase();
        return haystack.includes(q);
      });

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

          <form
            action="/properties"
            method="get"
            className="mt-6 flex flex-col sm:flex-row gap-3"
          >
            <input
              name="q"
              defaultValue={sp.q ?? ""}
              placeholder="Search (e.g., Nachlaot, rooftop, garden...)"
              className="w-full sm:flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 text-[#FAF9F6] text-sm font-medium px-5 py-3 hover:bg-slate-800 active:bg-slate-950 transition"
            >
              Search
            </button>
            <Link
              href="/properties"
              className="inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium px-5 py-3 hover:bg-slate-50 transition"
            >
              Reset
            </Link>
          </form>
        </section>

        {filtered.length === 0 ? (
          <p className="text-gray-500">No properties found.</p>
        ) : (
          <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
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
