import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { supabaseAdmin } from "@/lib/supabase.server";
import type { Broker } from "@/types/broker";
import PropertyCarousel from "@/components/PropertyCarousel";

type ManualProperty = {
  id:
    | "katamon-1"
    | "nachlaot"
    | "nachlaot-2"
    | "nachlaot-3"
    | "rehavia-12"
    | "rehavia-13"
    | "rehavia-14"
    | "rehavia-2"
    | "romema-1";
  title: string;
  subtitle: string;
  headerTagline: string;
  backdropImage: string; // must be 1.jpg
  galleryImages: string[]; // 0..N
  mapQuery: string;
  quickFacts: { label: string; value: string }[];
  overview: string[];
  highlights: string[];
  sections?: { title: string; body: string[] }[];
};

const sqmToSqft = (sqm: number) => Math.round(sqm * 10.7639);

type RehaviaUnit = {
  id: "rehavia-12" | "rehavia-13" | "rehavia-14";
  unitNo: string;
  interiorSqm: number;
  balconySqm: number;
  saleSqm: number;
  rooms: string;
  floor: string;
  totalPrice: string;
  pricePerSqm: string;
};

const REHAVIA_ADDRESS = "14 Metudela Street, Rehavia, Jerusalem, Israel";
const REHAVIA_GALLERY_IMAGES = [
  "/pictures/rehavia-1/0.jpg",
  "/pictures/rehavia-1/1.jpg",
  "/pictures/rehavia-1/2.jpg",
  "/pictures/rehavia-1/3.jpg",
];
const REHAVIA_2_GALLERY_IMAGES = [
  "/pictures/rehavia-2/0.jpg",
  "/pictures/rehavia-2/1.jpg",
  "/pictures/rehavia-2/2.jpg",
  "/pictures/rehavia-2/3.jpg",
  "/pictures/rehavia-2/4.jpg",
  "/pictures/rehavia-2/5.jpg",
  "/pictures/rehavia-2/6.jpg",
  "/pictures/rehavia-2/7.jpg",
  "/pictures/rehavia-2/8.jpg",
  "/pictures/rehavia-2/9.jpg",
  "/pictures/rehavia-2/10.jpg",
  "/pictures/rehavia-2/11.jpg",
];
const ROMEMA_GALLERY_IMAGES = [
  "/pictures/romema-1/0.jpg",
  "/pictures/romema-1/1.jpg",
  "/pictures/romema-1/2.jpg",
  "/pictures/romema-1/3.jpg",
  "/pictures/romema-1/4.jpg",
  "/pictures/romema-1/5.jpg",
  "/pictures/romema-1/6.jpg",
];
const KATAMON_GALLERY_IMAGES = [
  "/pictures/katamon-1/0.jpg",
  "/pictures/katamon-1/1.jpg",
  "/pictures/katamon-1/2.jpg",
  "/pictures/katamon-1/3.jpg",
  "/pictures/katamon-1/4.jpg",
  "/pictures/katamon-1/5.jpg",
  "/pictures/katamon-1/6.jpg",
  "/pictures/katamon-1/7.jpg",
];
const NACHLAOT_2_GALLERY_IMAGES = [
  "/pictures/nachlaot-2/0.jpg",
  "/pictures/nachlaot-2/1.jpg",
  "/pictures/nachlaot-2/2.jpg",
  "/pictures/nachlaot-2/3.jpg",
];
const NACHLAOT_3_GALLERY_IMAGES = [
  "/pictures/nachlaot-3/0.jpg",
  "/pictures/nachlaot-3/1.jpg",
  "/pictures/nachlaot-3/2.jpg",
  "/pictures/nachlaot-3/3.jpg",
  "/pictures/nachlaot-3/4.jpg",
  "/pictures/nachlaot-3/5.jpg",
  "/pictures/nachlaot-3/6.jpg",
];

const buildRehaviaProperty = (unit: RehaviaUnit): ManualProperty => ({
  id: unit.id,
  title: `Metudela 14 • Unit ${unit.unitNo}`,
  subtitle: "Rehavia • Jerusalem",
  headerTagline:
    "A Rehavia listing at Metudela 14 with a private balcony and central Jerusalem access.",
  backdropImage: "/pictures/rehavia-1/1.jpg",
  galleryImages: REHAVIA_GALLERY_IMAGES,
  mapQuery: REHAVIA_ADDRESS,
  quickFacts: [
    {
      label: "Interior",
      value: `${unit.interiorSqm} m² (${sqmToSqft(unit.interiorSqm)} ft²)`,
    },
    {
      label: "Balcony",
      value: `${unit.balconySqm} m² (${sqmToSqft(unit.balconySqm)} ft²)`,
    },
    { label: "Rooms", value: unit.rooms },
    { label: "Price", value: unit.totalPrice },
    {
      label: "Sale Area",
      value: `${unit.saleSqm} m² (${sqmToSqft(unit.saleSqm)} ft²)`,
    },
    { label: "Floor", value: unit.floor },
    { label: "Unit", value: unit.unitNo },
    { label: "Price / m²", value: unit.pricePerSqm },
  ],
  overview: [
    `Unit ${unit.unitNo} is located at ${REHAVIA_ADDRESS}.`,
    `The apartment is on floor ${unit.floor} with ${unit.rooms} rooms, ${unit.interiorSqm} m² interior space, and a ${unit.balconySqm} m² balcony.`,
    `Total saleable area is ${unit.saleSqm} m², listed at ${unit.totalPrice}.`,
  ],
  highlights: [
    `List pricing is based on ${unit.pricePerSqm} per sqm.`,
    `Private balcony area: ${unit.balconySqm} m².`,
    "All three Rehavia units are part of the same listing.",
    "Located in central Rehavia near Jerusalem city-center amenities.",
  ],
});

const PROPERTIES: Record<ManualProperty["id"], ManualProperty> = {
  "katamon-1": {
    id: "katamon-1",
    title: "Exclusive for Sale in Katamon!",
    subtitle: "Hizkiyahu HaMelech Street 39 • Jerusalem",
    headerTagline:
      "Exclusive Katamon offering near the Shtibelach, with signed urban renewal upside and rental coverage during construction.",
    backdropImage: "/pictures/katamon-1/1.jpg",
    galleryImages: KATAMON_GALLERY_IMAGES,
    mapQuery: "Hizkiyahu HaMelech Street 39, Jerusalem, Israel",
    quickFacts: [
      { label: "Property Type", value: "Apartment" },
      { label: "Bedrooms", value: "3" },
      { label: "Bathrooms", value: "2" },
      { label: "Floor", value: "2" },
      { label: "Size", value: `100 m² (${sqmToSqft(100)} ft²)` },
      { label: "Price", value: "₪3,450,000" },
      { label: "Balcony (Planned)", value: "12 m²" },
      { label: "Extras (Planned)", value: "Parking + storage unit" },
    ],
    overview: [
      "Exclusive for sale in Katamon at Hizkiyahu HaMelech Street 39, right near the Shtibelach.",
      "Prime opportunity tied to a future urban renewal project with a signed developer contract.",
      "Current state: 2nd floor, 3-room apartment, approximately 71 m².",
      "Post-renewal plan: approximately 100 m² apartment with a 12 m² balcony, parking, and a storage unit.",
      "Estimated completion is approximately 7 years, and the developer is expected to pay rent throughout the construction period.",
    ],
    highlights: [
      "Asking price: ₪3,450,000.",
      "Strong long-term value profile due to signed urban renewal framework.",
      "Location is near key Katamon neighborhood shuls and services.",
      "Improved post-renewal specification includes balcony, parking, and storage.",
    ],
  },
  "nachlaot-2": {
    id: "nachlaot-2",
    title: "Exclusive for Sale in Nachlaot!",
    subtitle: "Khakham Shalom St 15 • Jerusalem",
    headerTagline:
      "Garden apartment investment opportunity in Nachlaot, split into two units and positioned for strong Airbnb potential.",
    backdropImage: "/pictures/nachlaot-2/1.jpg",
    galleryImages: NACHLAOT_2_GALLERY_IMAGES,
    mapQuery: "Khakham Shalom St 15, Jerusalem, Israel",
    quickFacts: [
      { label: "Property Type", value: "Garden apartment" },
      { label: "Bedrooms", value: "2" },
      { label: "Bathrooms", value: "2" },
      { label: "Floor", value: "0" },
      { label: "Interior", value: `42 m² (${sqmToSqft(42)} ft²)` },
      { label: "Garden", value: `70 m² (${sqmToSqft(70)} ft²)` },
      { label: "Current Rent", value: "₪8,000" },
      { label: "Price", value: "₪2,700,000" },
    ],
    overview: [
      "Exclusive for sale in Nachlaot on Khakham Shalom St 15.",
      "The property is a 42 m² apartment with a 70 m² private garden, currently split into two units.",
      "The apartment is currently rented for ₪8,000.",
      "Asking price is ₪2,700,000.",
      "Positioning and layout make it a strong short-term rental / Airbnb opportunity.",
    ],
    highlights: [
      "Garden apartment format in a high-demand Nachlaot location.",
      "Split-into-two-units setup can support flexible usage strategy.",
      "Private 70 m² outdoor space is uncommon for this price bracket in central Jerusalem.",
      "Pricing set at ₪2,700,000.",
    ],
  },
  "nachlaot-3": {
    id: "nachlaot-3",
    title: "Perfect for Airbnb border of Nachlaot and the City Centre!",
    subtitle: "Mesilat Yesharim St 15 • Jerusalem",
    headerTagline:
      "Ground-floor apartment on the Nachlaot / City Centre border with strong short-term rental potential.",
    backdropImage: "/pictures/nachlaot-3/1.jpg",
    galleryImages: NACHLAOT_3_GALLERY_IMAGES,
    mapQuery: "Mesilat Yesharim St 15, Jerusalem, Israel",
    quickFacts: [
      { label: "Property Type", value: "Apartment" },
      { label: "Bedrooms", value: "2" },
      { label: "Bathrooms", value: "1.5" },
      { label: "Floor", value: "0" },
      { label: "Size", value: `87.95 m² (${sqmToSqft(87.95)} ft²)` },
      { label: "Balcony", value: `4.55 m² (${sqmToSqft(4.55)} ft²)` },
      { label: "Storage", value: `10.45 m² (${sqmToSqft(10.45)} ft²)` },
      { label: "Price", value: "₪3,900,000" },
    ],
    overview: [
      "Located on the border of Nachlaot and Jerusalem city centre at Mesilat Yesharim St 15.",
      "Ground-floor apartment offering 87.95 m² of living space.",
      "The home includes 2 bedrooms, 1.5 bathrooms, and high ceilings throughout.",
      "Additional features include a 4.55 m² sukkah balcony, private 10.45 m² storage unit, and private parking.",
    ],
    highlights: [
      "Asking price: ₪3,900,000.",
      "Prime border location between Nachlaot and the city centre.",
      "Private parking plus dedicated storage add strong daily usability.",
      "Configured for excellent Airbnb potential.",
    ],
  },
  nachlaot: {
    id: "nachlaot",
    title: "Artist House",
    subtitle: "Nachlaot • Jerusalem",
    headerTagline:
      "A fully updated, design-forward 3-story townhouse with rooftop living in the heart of the city.",
    backdropImage: "/pictures/nachlaot-1/1.jpg",
    galleryImages: [
      "/pictures/nachlaot-1/0.jpg",
      "/pictures/nachlaot-1/1.jpg",
      "/pictures/nachlaot-1/2.jpg",
      "/pictures/nachlaot-1/3.jpg",
      "/pictures/nachlaot-1/4.jpg",
      "/pictures/nachlaot-1/5.jpg",
      "/pictures/nachlaot-1/6.jpg",
    ],
    mapQuery: "Nachlaot, Jerusalem, Israel",
    quickFacts: [
      { label: "Size", value: `~180 m² (${sqmToSqft(180)} ft²)` },
      { label: "Type", value: "Private Nachlaot townhouse" },
      { label: "Floors", value: "3 stories" },
      { label: "Bedrooms", value: "3 large bedrooms (each en-suite)" },
      { label: "Hosting", value: "Comfortably hosts 7–8 guests" },
      { label: "Dining", value: "Table capacity ~18–20" },
      { label: "Kitchen", value: "Designer kosher kitchen" },
      {
        label: "Rooftop",
        value: "Private balcony + rooftop garden (sukka-friendly)",
      },
    ],
    overview: [
      "Located in quiet and pastoral Nachlaot, just footsteps from Jerusalem’s energy, markets, and city-center life.",
      "This 3-story townhouse is fully updated and equipped to high standards, with design choices that match the creativity and spirit of the neighborhood.",
      "A rooftop balcony and rooftop garden create an exceptional “open sky” experience in the center of the city.",
    ],
    highlights: [
      "5 minutes walk (or less): Shuk Machane Yehuda, Ben Yehuda Promenade, Rechavia.",
      "15 minutes walk (or less): Mamilla / Old City, Gan Sacher, Great Synagogue, major Rechavia shuls, Geula / Mea Shearim, and city-center restaurants and hotels.",
      "Large sit-in living room with books and games.",
      "Guest bathroom on the main floor (in addition to en-suite bathrooms).",
    ],
  },
  "rehavia-12": buildRehaviaProperty({
    id: "rehavia-12",
    unitNo: "12",
    interiorSqm: 108.2,
    balconySqm: 11,
    saleSqm: 113.7,
    rooms: "3.5",
    floor: "4",
    totalPrice: "₪7,390,500",
    pricePerSqm: "₪65,000",
  }),
  "rehavia-13": buildRehaviaProperty({
    id: "rehavia-13",
    unitNo: "13",
    interiorSqm: 92.4,
    balconySqm: 7.5,
    saleSqm: 96.15,
    rooms: "4",
    floor: "4",
    totalPrice: "₪6,249,750",
    pricePerSqm: "₪65,000",
  }),
  "rehavia-14": buildRehaviaProperty({
    id: "rehavia-14",
    unitNo: "14",
    interiorSqm: 72.5,
    balconySqm: 5,
    saleSqm: 75,
    rooms: "2",
    floor: "4",
    totalPrice: "₪4,875,000",
    pricePerSqm: "₪65,000",
  }),
  "rehavia-2": {
    id: "rehavia-2",
    title: "Haari 4 • Rehavia Duplex",
    subtitle: "Rehavia • Jerusalem",
    headerTagline:
      "A large 172 m² duplex in prime Rehavia with exceptional open views.",
    backdropImage: "/pictures/rehavia-2/1.jpg",
    galleryImages: REHAVIA_2_GALLERY_IMAGES,
    mapQuery: "4 Haari St, Rehavia, Jerusalem, Israel",
    quickFacts: [
      { label: "Size", value: `172 m² (${sqmToSqft(172)} ft²)` },
      { label: "Type", value: "Duplex apartment" },
      { label: "Bedrooms", value: "4" },
      { label: "Bathrooms", value: "2.5" },
      { label: "Price", value: "₪13,000,000" },
      { label: "Balconies", value: "2 sukkah balconies" },
      { label: "Parking", value: "Includes parking" },
      { label: "Storage", value: "Includes storage room" },
    ],
    overview: [
      "Beautiful 172 m² duplex apartment in a prime location at 4 Haari Street, Rehavia.",
      "Walking distance to the city center, Mamilla, the Great Synagogue, and the Kotel.",
      "Exceptional open views plus practical family features including parking and storage.",
    ],
    highlights: [
      "Asking price: ₪13,000,000.",
      "4 bedrooms and 2.5 bathrooms across a large duplex layout.",
      "Two sukkah balconies with strong natural light and open outlook.",
      "Prime central Jerusalem position in one of Rehavia’s most desirable areas.",
    ],
  },
  "romema-1": {
    id: "romema-1",
    title: "Pninat Chemed • Romema",
    subtitle: "Romema • Jerusalem",
    headerTagline:
      "A spacious single-level 240 m² apartment with open views in the heart of Romema.",
    backdropImage: "/pictures/romema-1/1.jpg",
    galleryImages: ROMEMA_GALLERY_IMAGES,
    mapQuery: "Pninat Chemed, Romema, Jerusalem, Israel",
    quickFacts: [
      { label: "Size", value: `240 m² (${sqmToSqft(240)} ft²)` },
      { label: "Bedrooms", value: "5" },
      { label: "Bathrooms", value: "3.5" },
      { label: "Price", value: "₪16,000,000" },
      { label: "Level", value: "Single-level apartment" },
      { label: "Balcony", value: "Sukkah porch" },
      { label: "Parking", value: "Includes parking" },
      { label: "Storage", value: "Includes storage room" },
    ],
    overview: [
      "Exceptional 240 m² apartment on one level in Pninat Chemed, located in central Romema.",
      "The home includes 5 bedrooms and 3.5 bathrooms with generous living and hosting space.",
      "Positioned directly opposite Rav Shefa Mall with broad open views and convenient city access.",
    ],
    highlights: [
      "Asking price: ₪16,000,000.",
      "Large single-level footprint ideal for comfortable family living.",
      "Sukkah porch plus dedicated parking and storage room.",
      "Prime Romema location near shopping, transport, and neighborhood services.",
    ],
  },
};

const BROKER_NAME_BY_PROPERTY: Record<ManualProperty["id"], string> = {
  "katamon-1": "Sarah Bencherit",
  "nachlaot-2": "Sarah Bencherit",
  "nachlaot-3": "Sarah Bencherit",
  nachlaot: "Natanel Moshe Junger",
  "rehavia-12": "Yaakov Mechlovitz",
  "rehavia-13": "Yaakov Mechlovitz",
  "rehavia-14": "Yaakov Mechlovitz",
  "rehavia-2": "Yaakov Mechlovitz",
  "romema-1": "Yaakov Mechlovitz",
};

function brokerImageUrl(path?: string | null) {
  const safePath = path?.trim() ? path.trim() : "defaultAvatar.jpg";
  return supabaseAdmin.storage.from("brokers").getPublicUrl(safePath).data
    .publicUrl;
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const key = (id ?? "").toLowerCase() as ManualProperty["id"];
  const property = PROPERTIES[key];

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main
          id="main-content"
          className="flex-1 min-h-0 max-w-5xl mx-auto px-5 py-10"
        >
          <p className="mb-3">Property not found.</p>
          <Link
            href="/properties"
            className="text-sm text-gray-600 hover:underline"
          >
            ← Back to properties
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    property.mapQuery,
  )}&output=embed`;
  const brokerName = BROKER_NAME_BY_PROPERTY[key];

  let associatedBroker: Broker | null = null;

  const { data: brokerData, error: brokerError } = await supabaseAdmin
    .from("brokers")
    .select("*")
    .eq("name", brokerName)
    .maybeSingle();

  if (brokerError) {
    console.error("Error loading associated broker", brokerError);
  }

  if (brokerData) {
    associatedBroker = brokerData as Broker;
  } else {
    const fallbackName = brokerName.split(" ")[0];
    const { data: fallbackBroker } = await supabaseAdmin
      .from("brokers")
      .select("*")
      .ilike("name", `%${fallbackName}%`)
      .limit(1)
      .maybeSingle();
    associatedBroker = (fallbackBroker as Broker | null) ?? null;
  }

  const associatedBrokerPhoto = brokerImageUrl(associatedBroker?.photoUrl);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Backdrop "thingy" at top must be 1.jpg */}
      <section className="relative h-[260px] mb-0 overflow-hidden">
        <Image
          src={property.backdropImage}
          alt={`${property.title} backdrop`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-linear-to-b from-[#0b1f3a]/40 to-[#0b1f3a]/75" />

        <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col justify-end px-5 pb-6 text-white">
          <p className="mb-1">
            <Link
              href="/properties"
              className="text-xs text-gray-200 hover:underline"
            >
              ← Back to properties
            </Link>
          </p>

          <h1 className="text-[1.75rem] md:text-[1.875rem] font-semibold mb-1">
            {property.title}
          </h1>

          <p className="text-sm text-gray-200 mb-2">{property.subtitle}</p>

          <p className="text-sm text-gray-100 max-w-3xl leading-relaxed">
            {property.headerTagline}
          </p>
        </div>
      </section>

      <main
        id="main-content"
        className="flex-1 min-h-0 max-w-5xl mx-auto px-5 pt-5 pb-16 font-sans"
      >
        <section className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-7 mt-2">
          <div>
            {/* Gallery slider */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-[1.25rem] font-semibold">Photo Gallery</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Click arrows or dots — it also auto-advances every 3 seconds.
                </p>
              </div>

              <PropertyCarousel
                key={property.id}
                carouselId={`property-carousel-${property.id}`}
                title={property.title}
                images={property.galleryImages}
              />
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-100 rounded-2xl px-4 py-3 mb-6">
              {property.quickFacts.slice(0, 4).map((f) => (
                <div key={f.label}>
                  <span className="text-[0.6875rem] uppercase tracking-[0.12em] text-gray-500">
                    {f.label}
                  </span>
                  <div className="text-[1rem] font-semibold text-slate-900">
                    {f.value}
                  </div>
                </div>
              ))}
            </div>

            <section className="mb-7">
              <h2 className="text-[1.25rem] font-semibold mb-2">
                Property Overview
              </h2>
              <div className="space-y-3">
                {property.overview.map((p, idx) => (
                  <p
                    key={idx}
                    className="text-sm text-gray-600 leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>

            <section className="mb-7">
              <h2 className="text-[1.25rem] font-semibold mb-2">Highlights</h2>
              <ul className="list-disc pl-5 space-y-2">
                {property.highlights.map((h, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-gray-600 leading-relaxed"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            {property.sections?.map((s) => (
              <section key={s.title} className="mb-7">
                <h2 className="text-[1.25rem] font-semibold mb-2">{s.title}</h2>
                <div className="space-y-3">
                  {s.body.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-sm text-gray-600 leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section>
              <h2 className="text-[1.25rem] font-semibold mb-2">Location</h2>
              <p className="text-sm text-gray-600">{property.mapQuery}</p>
              <div className="mt-3 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  title="Property location"
                  src={mapSrc}
                  className="border-0 w-full h-[260px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </section>
          </div>

          {/* Right rail */}
          <aside className="md:pl-1">
            {associatedBroker ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-5">
                <h3 className="text-xs uppercase tracking-[0.16em] text-gray-500 mb-3">
                  Your Broker
                </h3>

                <Link
                  href={`/team/${associatedBroker.id}`}
                  className="no-underline text-inherit block"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={associatedBrokerPhoto}
                        alt={`${associatedBroker.name} headshot`}
                        fill
                        sizes="56px"
                        className="object-cover object-center"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {associatedBroker.name}
                      </p>
                      {associatedBroker.area ? (
                        <p className="text-xs text-slate-600 truncate">
                          {associatedBroker.area}
                        </p>
                      ) : null}
                      {associatedBroker.role ? (
                        <p className="text-xs text-slate-600 truncate">
                          {associatedBroker.role}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Link>

                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                  {associatedBroker.phone ? (
                    <p className="text-xs text-slate-700">
                      <strong>IL </strong>
                      {associatedBroker.phone}
                    </p>
                  ) : null}

                  {associatedBroker.phone_us ? (
                    <p className="text-xs text-slate-700">
                      <strong>US </strong>
                      {associatedBroker.phone_us}
                    </p>
                  ) : null}

                  {associatedBroker.email ? (
                    <p className="text-xs text-slate-700 break-all">
                      {associatedBroker.email}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="bg-slate-50 rounded-2xl p-5 shadow-md">
              <h3 className="text-sm uppercase tracking-[0.16em] text-gray-500 mb-3">
                Next Steps
              </h3>

              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                Request availability, schedule a viewing, or ask for a full
                brochure pack (plans, specs, and additional photos).
              </p>

              <div className="flex flex-col gap-3">
                <Link
                  href="/contact"
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

              <div className="mt-5 pt-5 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-slate-900 mb-2">
                  Key Specs (Expanded)
                </h4>
                <div className="space-y-2">
                  {property.quickFacts.map((f) => (
                    <div
                      key={f.label}
                      className="flex items-start justify-between gap-3"
                    >
                      <span className="text-xs uppercase tracking-[0.12em] text-gray-500">
                        {f.label}
                      </span>
                      <span className="text-sm text-slate-900 font-medium text-right">
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}
