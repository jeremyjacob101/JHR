"use client";

import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import EmailUsTab from "@/components/EmailUsTab";
import ScheduleCallTab from "@/components/ScheduleCallTab";

export default function ContactPage() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      form.reset();
      alert("Thanks! We received your message and a broker will reach out.");
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data?.error ? `Error: ${data.error}` : "Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main
        id="main-content"
        className="flex-1 min-h-0 max-w-5xl mx-auto px-5 pt-10 pb-16 font-sans"
      >
        <h1 className="text-[1.875rem] font-semibold mb-2">Contact Us</h1>

        <p className="text-[0.9375rem] text-gray-600 mb-7">
          Interested in one of our Jerusalem properties or looking for something
          specific? Leave your details and a broker will reach out.
        </p>

        <section className="flex justify-center">
          <div className="bg-slate-50 rounded-2xl p-5 shadow-md w-[110%] max-w-3xl">
            <h2 className="text-[1.1875rem] font-semibold mb-4">
              Send An Inquiry
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  autoComplete="name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+1-234-567-8910..."
                    autoComplete="tel"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="interest"
                  className="block text-sm font-medium mb-1"
                >
                  What are you looking for?
                </label>
                <select
                  id="interest"
                  name="interest"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                  defaultValue="buy"
                >
                  <option value="buy">Buying</option>
                  <option value="rent">Renting</option>
                  <option value="sell">Selling</option>
                  <option value="invest">Investment</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us what you need (neighborhood, size, budget, timeframe, etc.)"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 text-[#FAF9F6] text-sm font-medium py-2.5 hover:bg-slate-800 active:bg-slate-950 transition"
              >
                Send message
              </button>

              <p className="text-[0.75rem] text-gray-500">
                By submitting, you agree we may contact you about your enquiry.
              </p>
            </form>
          </div>
        </section>

        {/* Email CTA */}
        <section className="mt-10 flex justify-center">
          <a
            href="mailto:office@jhrisrael.com?subject=Inquiry%20from%20JHR%20website"
            className="w-full max-w-3xl bg-slate-50 rounded-2xl shadow-md border border-slate-100 p-5 grid grid-cols-[1fr_70px] items-center gap-4 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/icons/email-symbol-logo.svg"
                alt="Email"
                width={34}
                height={34}
                className="shrink-0"
              />
              <div>
                <h3 className="text-[1.0625rem] font-semibold leading-tight">
                  Email Us Directly
                </h3>
                <p className="text-[0.8125rem] text-gray-600">
                  Tap to directly email us at office@jhrisrael.com
                </p>
              </div>
            </div>

            <span className="text-sm font-medium text-slate-900 underline underline-offset-4 hover:no-underline text-right">
              Open Email
            </span>
          </a>
        </section>

        {/* Calendly CTA */}
        <section className="mt-10 flex justify-center">
          <a
            href="https://calendly.com/nm-jhrisrael/25min"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-3xl bg-slate-50 rounded-2xl shadow-md border border-slate-100 p-5 grid grid-cols-[1fr_70px] items-center gap-4 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/icons/calendly-logo.svg"
                alt="Calendly"
                width={34}
                height={34}
                className="shrink-0"
              />
              <div>
                <h3 className="text-[1.0625rem] font-semibold leading-tight">
                  Schedule a Call
                </h3>
                <p className="text-[0.8125rem] text-gray-600">
                  Tap to book a 15-minute call with a broker
                </p>
              </div>
            </div>

            <span className="text-sm font-medium text-slate-900 underline underline-offset-4 hover:no-underline text-right">
              Open Calendly
            </span>
          </a>
        </section>

        {/* WhatsApp CTA */}
        <section className="mt-10 flex justify-center">
          <a
            href="https://wa.me/972526166178"
            target="_blank"
            rel="noreferrer"
            className="w-full max-w-3xl bg-slate-50 rounded-2xl shadow-md border border-slate-100 p-5 grid grid-cols-[1fr_70px] items-center gap-4 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/icons/whatsapp-symbol-logo-svgrepo-com.svg"
                alt="WhatsApp"
                width={34}
                height={34}
                className="shrink-0"
              />
              <div>
                <h3 className="text-[1.0625rem] font-semibold leading-tight">
                  WhatsApp Us
                </h3>
                <p className="text-[0.8125rem] text-gray-600">
                  Tap to instantly chat with a broker on WhatsApp
                </p>
              </div>
            </div>

            <span className="text-sm font-medium text-slate-900 underline underline-offset-4 hover:no-underline text-right">
              Open WhatsApp
            </span>
          </a>
        </section>
      </main>
      <EmailUsTab />
      <ScheduleCallTab />
      <Footer />
    </div>
  );
}
