"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";

const BUYER_TYPES = ["Home", "Second Home", "Investment"] as const;

type SubmitState = "idle" | "submitting" | "error";

export default function EfratLeadForm() {
  const router = useRouter();
  const formId = useId();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const buyerType = String(formData.get("buyerType") ?? "").trim();
    const fullName = [firstName, lastName].filter(Boolean).join(" ");

    setSubmitState("submitting");
    setError("");

    try {
      const payload = {
        ...Object.fromEntries(formData.entries()),
        name: fullName,
        interest: "Efrat Project",
        project: "Efrat",
        page: "efrat",
        source: "Efrat booth landing page",
        message: `Efrat project request. Buyer type: ${buyerType || "Not provided"}. Please send brochure, pricing, availability, and next steps.`,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "Something went wrong. Please try again.",
        );
      }

      router.push("/efrat/thank-you");
    } catch (err) {
      setSubmitState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const isSubmitting = submitState === "submitting";
  const errorId = `${formId}-error`;

  return (
    <section
      id="efrat-lead-form"
      aria-labelledby={`${formId}-title`}
      className="scroll-mt-28 rounded-lg border border-[#d8c39a]/50 bg-white text-slate-950 shadow-[0_28px_80px_-42px_rgba(5,19,38,0.8)]"
    >
      <div className="rounded-t-lg bg-[#071b34] px-5 py-4 text-white">
        <h2
          id={`${formId}-title`}
          className="text-xl font-semibold leading-tight sm:text-2xl"
        >
          Get brochure, pricing, and availability
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        aria-describedby={error ? errorId : undefined}
        className="space-y-4 p-5"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label
              htmlFor={`${formId}-first-name`}
              className="mb-1 block text-sm font-medium text-slate-800"
            >
              First Name
            </label>
            <input
              id={`${formId}-first-name`}
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-[#b98a42] focus:ring-2 focus:ring-[#d8c39a]/50"
            />
          </div>

          <div>
            <label
              htmlFor={`${formId}-last-name`}
              className="mb-1 block text-sm font-medium text-slate-800"
            >
              Last Name
            </label>
            <input
              id={`${formId}-last-name`}
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-[#b98a42] focus:ring-2 focus:ring-[#d8c39a]/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label
              htmlFor={`${formId}-email`}
              className="mb-1 block text-sm font-medium text-slate-800"
            >
              Email
            </label>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              required
              autoComplete="email"
              className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-[#b98a42] focus:ring-2 focus:ring-[#d8c39a]/50"
            />
          </div>

          <div>
            <label
              htmlFor={`${formId}-phone`}
              className="mb-1 block text-sm font-medium text-slate-800"
            >
              Phone
            </label>
            <input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-[#b98a42] focus:ring-2 focus:ring-[#d8c39a]/50"
            />
          </div>
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-slate-800">
            Buyer Type
          </legend>

          <div className="grid grid-cols-1 overflow-hidden rounded-md border border-slate-300 sm:grid-cols-3">
            {BUYER_TYPES.map((type) => (
              <label
                key={type}
                className="relative flex cursor-pointer items-center justify-center border-b border-slate-300 text-sm font-medium text-slate-700 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
              >
                <input
                  type="radio"
                  name="buyerType"
                  value={type}
                  required
                  className="peer sr-only"
                />
                <span className="flex w-full items-center justify-center px-3 py-3 transition peer-checked:bg-[#071b34] peer-checked:text-white">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {error ? (
          <p id={errorId} className="text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 w-full items-center justify-center rounded-md bg-[#b98a42] px-5 text-sm font-semibold text-white transition hover:bg-[#a77936] active:bg-[#8e682e] disabled:cursor-not-allowed disabled:opacity-65"
        >
          {isSubmitting ? "Sending..." : "Get Details"}
        </button>

        <p className="text-sm leading-relaxed text-slate-600">
          You&apos;ll receive the brochure, key pricing information, and next steps
          immediately.
        </p>
      </form>
    </section>
  );
}
