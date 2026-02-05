import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { supabaseAdmin } from "@/lib/supabase.server";
import { Broker } from "@/types/broker";

export const metadata = {
  title: "About | Jerusalem Heritage Realty",
};

const OFFICE_EMAIL = "office@jhrisrael.com";

function digitsOnly(s?: string | null) {
  return (s ?? "").replace(/\D/g, "");
}

function toWhatsAppNumber(raw?: string | null) {
  const d = digitsOnly(raw);
  if (!d) return "";
  if (d.startsWith("972")) return d;
  if (d.startsWith("0")) return `972${d.slice(1)}`;
  return d;
}

function brokerImageUrl(path?: string | null) {
  const safePath = path?.trim() ? path.trim() : "defaultAvatar.jpg";
  return supabaseAdmin.storage.from("brokers").getPublicUrl(safePath).data
    .publicUrl;
}

function firstName(full?: string | null) {
  const s = (full ?? "").trim();
  if (!s) return "Broker";
  return s.split(/\s+/)[0] ?? "Broker";
}

export default async function AboutPage() {
  const teamWideImg = supabaseAdmin.storage
    .from("brokers")
    .getPublicUrl("bigpic.jpg").data.publicUrl;

  const { data: brokers } = await supabaseAdmin
    .from("brokers")
    .select("*")
    .order("id")
    .overrideTypes<Broker[], { merge: false }>();

  const officeMailTo = `mailto:${OFFICE_EMAIL}?subject=${encodeURIComponent(
    "Jerusalem Heritage Realty Enquiry",
  )}`;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[460px] sm:h-[560px] md:h-[640px]">
          <Image
            src={teamWideImg}
            alt="Jerusalem Heritage Realty team"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/60" />
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="w-full">
            <div className="max-w-5xl mx-auto px-5 pb-10">
              <h1 className="text-[34px] sm:text-[44px] font-semibold text-[#FAF9F6] leading-tight">
                Meet the Team
              </h1>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 min-h-0 max-w-5xl mx-auto px-5 py-12 font-sans w-full">
        {/* About copy */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">
            Jerusalem Heritage Realty is built for people coming from abroad
          </h2>
          <p className="text-base text-slate-700 leading-relaxed mb-4">
            Most of our clients are like you. American, French, English or from
            other communities abroad.
          </p>
          <p className="text-base text-slate-700 leading-relaxed">
            You want someone in Jerusalem who gets your life, your standards,
            and your concerns, and who can also speak the language of local
            owners, lawyers, and brokers. That is what we do.
          </p>
        </section>

        {/* Team grid */}
        <section className="mb-8">
          <div
            className="
              grid gap-7
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]
            "
          >
            {(brokers ?? []).map((b) => {
              const nameLower = (b.name ?? "").toLowerCase();

              // Per your rules:
              // - Sarah: no phone
              // - Elisheva Stern: no phone
              const suppressPhones =
                nameLower.includes("sarah") ||
                nameLower.includes("elisheva stern");

              const tel = !suppressPhones && b.phone ? `tel:${b.phone}` : null;
              const mail = b.email ? `mailto:${b.email}` : null;

              // Yaakov: WhatsApp button (keep behavior you had)
              const wa =
                !suppressPhones && b.phone && nameLower.includes("yaakov")
                  ? `https://wa.me/${toWhatsAppNumber(b.phone)}`
                  : null;

              const profileHref = `/team/${b.id}`;
              const displayFirst = firstName(b.name);

              return (
                <div
                  key={String(b.id)}
                  className="bg-slate-50 px-5 py-6 rounded-2xl shadow-md text-center hover:shadow-lg transition h-full"
                >
                  {/* Clickable profile area (no nested anchors inside) */}
                  <Link
                    href={profileHref}
                    className="no-underline text-inherit block"
                  >
                    <div className="relative w-28 h-28 rounded-full mx-auto mb-4 overflow-hidden">
                      <Image
                        src={brokerImageUrl(b.photoUrl)}
                        alt={`${b.name ?? "Broker"} headshot`}
                        fill
                        sizes="112px"
                        className="object-cover object-center"
                      />
                    </div>

                    <h3 className="text-xl font-semibold mb-1">
                      {b.name ?? "Broker"}
                    </h3>

                    {b.area ? (
                      <p className="text-sm text-gray-500 mb-3">{b.area}</p>
                    ) : (
                      <div className="mb-3" />
                    )}

                    {!suppressPhones && b.phone ? (
                      <p className="text-sm text-gray-700">
                        <strong>IL</strong> {b.phone}
                      </p>
                    ) : null}

                    {!suppressPhones && b.phone_us ? (
                      <p className="text-sm text-gray-700">
                        <strong>US</strong> {b.phone_us}
                      </p>
                    ) : null}

                    {b.email ? (
                      <p className="text-sm text-gray-700">
                        <strong>Email</strong> {b.email}
                      </p>
                    ) : null}

                    {b.role ? (
                      <p className="text-sm text-gray-700 mt-3">{b.role}</p>
                    ) : null}

                    <div className="mt-3 text-sm font-medium text-slate-700 underline underline-offset-4">
                      View profile
                    </div>
                  </Link>

                  {/* Action buttons (anchors live OUTSIDE the Link) */}
                  <div className="mt-5 flex gap-3 justify-center flex-wrap">
                    {wa ? (
                      <a
                        href={wa}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl bg-slate-900 text-[#FAF9F6] text-sm font-medium px-4 py-2 hover:bg-slate-800 active:bg-slate-950 transition"
                      >
                        WhatsApp {displayFirst}
                      </a>
                    ) : tel ? (
                      <a
                        href={tel}
                        className="rounded-xl bg-slate-900 text-[#FAF9F6] text-sm font-medium px-4 py-2 hover:bg-slate-800 active:bg-slate-950 transition"
                      >
                        Call {displayFirst}
                      </a>
                    ) : (
                      <span className="rounded-xl bg-slate-300 text-slate-600 text-sm font-medium px-4 py-2 cursor-not-allowed">
                        Call {displayFirst}
                      </span>
                    )}

                    {mail ? (
                      <a
                        href={mail}
                        className="rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium px-4 py-2 hover:bg-slate-50 transition"
                      >
                        Email {displayFirst}
                      </a>
                    ) : (
                      <span className="rounded-xl bg-slate-300 text-slate-600 text-sm font-medium px-4 py-2 cursor-not-allowed">
                        Email {displayFirst}
                      </span>
                    )}

                    <a
                      href={officeMailTo}
                      className="rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium px-4 py-2 hover:bg-slate-50 transition"
                    >
                      Email office inbox
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
