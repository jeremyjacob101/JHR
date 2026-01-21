"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FiltersState = {
  q: string;
  minPrice: string;
  maxPrice: string;
  minBeds: string;
  maxBeds: string;
  minBaths: string;
  maxBaths: string;
  sort: string; // "price_asc" | "price_desc" | ""
};

export default function PropertyFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const initial = useMemo<FiltersState>(() => {
    const get = (k: keyof FiltersState) => sp.get(k) ?? "";
    return {
      q: get("q"),
      minPrice: get("minPrice"),
      maxPrice: get("maxPrice"),
      minBeds: get("minBeds"),
      maxBeds: get("maxBeds"),
      minBaths: get("minBaths"),
      maxBaths: get("maxBaths"),
      sort: get("sort"),
    };
  }, [sp]);

  const [state, setState] = useState<FiltersState>(initial);
  const [openMobile, setOpenMobile] = useState(false);

  const set =
    (key: keyof FiltersState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setState((s) => ({ ...s, [key]: e.target.value }));

  const apply = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    const put = (k: keyof FiltersState) => {
      const v = state[k].trim();
      if (v) params.set(k, v);
    };

    put("q");
    put("minPrice");
    put("maxPrice");
    put("minBeds");
    put("maxBeds");
    put("minBaths");
    put("maxBaths");
    put("sort");

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const clear = () => {
    setState({
      q: "",
      minPrice: "",
      maxPrice: "",
      minBeds: "",
      maxBeds: "",
      minBaths: "",
      maxBaths: "",
      sort: "",
    });
    router.push(pathname);
  };

  return (
    <form
      onSubmit={apply}
      className="mb-8 rounded-2xl bg-slate-50 p-4 shadow-sm"
    >
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setOpenMobile((v) => !v)}
        className="w-full md:hidden flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900"
        aria-expanded={openMobile}
        aria-controls="property-filters-panel"
      >
        <span>Filter</span>
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${
            openMobile ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Collapsible contents on mobile, always visible on md+ */}
      <div
        id="property-filters-panel"
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out md:overflow-visible md:transition-none ${
          openMobile ? "max-h-[1400px] opacity-100 mt-4" : "max-h-0 opacity-0"
        } md:max-h-none md:opacity-100 md:mt-0`}
      >
        {/* SAME GRID AS BEFORE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="lg:col-span-2">
            <label className="block text-xs uppercase tracking-[0.12em] text-gray-500 mb-1">
              Search by name
            </label>
            <input
              value={state.q}
              onChange={set("q")}
              placeholder="e.g. King David Penthouse"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.12em] text-gray-500 mb-1">
              Min price (₪)
            </label>
            <input
              value={state.minPrice}
              onChange={set("minPrice")}
              inputMode="numeric"
              placeholder="e.g. 2000000"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.12em] text-gray-500 mb-1">
              Max price (₪)
            </label>
            <input
              value={state.maxPrice}
              onChange={set("maxPrice")}
              inputMode="numeric"
              placeholder="e.g. 8000000"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.12em] text-gray-500 mb-1">
              Min beds
            </label>
            <input
              value={state.minBeds}
              onChange={set("minBeds")}
              inputMode="numeric"
              placeholder="e.g. 2"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.12em] text-gray-500 mb-1">
              Max beds
            </label>
            <input
              value={state.maxBeds}
              onChange={set("maxBeds")}
              inputMode="numeric"
              placeholder="e.g. 5"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.12em] text-gray-500 mb-1">
              Min baths
            </label>
            <input
              value={state.minBaths}
              onChange={set("minBaths")}
              inputMode="numeric"
              placeholder="e.g. 1"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.12em] text-gray-500 mb-1">
              Max baths
            </label>
            <input
              value={state.maxBaths}
              onChange={set("maxBaths")}
              inputMode="numeric"
              placeholder="e.g. 3"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>

        {/* BOTTOM BAR: buttons left, sort bottom-right */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800"
            >
              Apply
            </button>

            <button
              type="button"
              onClick={clear}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Clear
            </button>
          </div>

          <div className="sm:ml-auto w-full sm:w-[240px]">
            <label className="block text-xs uppercase tracking-[0.12em] text-gray-500 mb-1">
              Sort
            </label>
            <select
              value={state.sort}
              onChange={set("sort")}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="">Default</option>
              <option value="price_asc">Price (low)</option>
              <option value="price_desc">Price (high)</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  );
}
