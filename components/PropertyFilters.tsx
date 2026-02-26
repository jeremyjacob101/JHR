"use client";

import { useEffect, useMemo, useState } from "react";
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
  neighborhoods: string[];
};

const NEIGHBORHOOD_OPTIONS = [
  "Rehavia",
  "Talbiya",
  "German Colony",
  "Greek Colony",
  "Ramot",
  "Nachlaot",
  "Romema",
  "Baka",
  "Old Katamon",
  "Arnona",
] as const;

const createEmptyFilters = (): FiltersState => ({
  q: "",
  minPrice: "",
  maxPrice: "",
  minBeds: "",
  maxBeds: "",
  minBaths: "",
  maxBaths: "",
  sort: "",
  neighborhoods: [],
});

const parseFiltersFromParams = (paramsKey: string): FiltersState => {
  const params = new URLSearchParams(paramsKey);
  return {
    q: params.get("q") ?? "",
    minPrice: params.get("minPrice") ?? "",
    maxPrice: params.get("maxPrice") ?? "",
    minBeds: params.get("minBeds") ?? "",
    maxBeds: params.get("maxBeds") ?? "",
    minBaths: params.get("minBaths") ?? "",
    maxBaths: params.get("maxBaths") ?? "",
    sort: params.get("sort") ?? "",
    neighborhoods: params.getAll("neighborhood").filter(Boolean),
  };
};

const buildQueryString = (state: FiltersState) => {
  const params = new URLSearchParams();
  const put = (key: Exclude<keyof FiltersState, "neighborhoods">) => {
    const value = state[key].trim();
    if (value) params.set(key, value);
  };

  put("q");
  put("minPrice");
  put("maxPrice");
  put("minBeds");
  put("maxBeds");
  put("minBaths");
  put("maxBaths");
  put("sort");
  state.neighborhoods.forEach((value) => params.append("neighborhood", value));

  return params.toString();
};

export default function PropertyFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const paramsKey = sp.toString();

  const initial = useMemo(() => parseFiltersFromParams(paramsKey), [paramsKey]);

  const [state, setState] = useState<FiltersState>(() => initial);
  const [openMobile, setOpenMobile] = useState(false);

  useEffect(() => {
    setState(initial);
  }, [initial]);

  useEffect(() => {
    const qs = buildQueryString(state);
    if (qs === paramsKey) return;

    const timer = window.setTimeout(() => {
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    }, 200);

    return () => window.clearTimeout(timer);
  }, [paramsKey, pathname, router, state]);

  const set =
    (key: Exclude<keyof FiltersState, "neighborhoods">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setState((s) => ({ ...s, [key]: e.target.value }));

  const toggleNeighborhood = (name: string) => {
    setState((s) => {
      const exists = s.neighborhoods.includes(name);
      return {
        ...s,
        neighborhoods: exists
          ? s.neighborhoods.filter((n) => n !== name)
          : [...s.neighborhoods, name],
      };
    });
  };

  const clear = () => {
    setState(createEmptyFilters());
    router.replace(pathname);
  };

  const selectedNeighborhoodsLabel =
    state.neighborhoods.length === 0
      ? "Any"
      : state.neighborhoods.length <= 2
        ? state.neighborhoods.join(", ")
        : `${state.neighborhoods.length} selected`;

  return (
    <section className="mb-8 rounded-2xl bg-slate-50 p-4 shadow-sm">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="filter-search"
              className="block text-xs uppercase tracking-[0.12em] text-gray-500 mb-1"
            >
              Search by name
            </label>
            <input
              id="filter-search"
              type="text"
              value={state.q}
              onChange={set("q")}
              placeholder="e.g. King David Penthouse"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="filter-min-beds"
                className="block text-xs uppercase tracking-[0.12em] text-gray-500 mb-1"
              >
                Min beds
              </label>
              <input
                id="filter-min-beds"
                type="text"
                value={state.minBeds}
                onChange={set("minBeds")}
                inputMode="numeric"
                placeholder="e.g. 2"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <div>
              <label
                htmlFor="filter-max-beds"
                className="block text-xs uppercase tracking-[0.12em] text-gray-500 mb-1"
              >
                Max beds
              </label>
              <input
                id="filter-max-beds"
                type="text"
                value={state.maxBeds}
                onChange={set("maxBeds")}
                inputMode="numeric"
                placeholder="e.g. 5"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="filter-min-price"
                className="block text-xs uppercase tracking-[0.12em] text-gray-500 mb-1"
              >
                Min price (₪)
              </label>
              <input
                id="filter-min-price"
                type="text"
                value={state.minPrice}
                onChange={set("minPrice")}
                inputMode="numeric"
                placeholder="e.g. 2000000"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label
                htmlFor="filter-max-price"
                className="block text-xs uppercase tracking-[0.12em] text-gray-500 mb-1"
              >
                Max price (₪)
              </label>
              <input
                id="filter-max-price"
                type="text"
                value={state.maxPrice}
                onChange={set("maxPrice")}
                inputMode="numeric"
                placeholder="e.g. 8000000"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="filter-min-baths"
                className="block text-xs uppercase tracking-[0.12em] text-gray-500 mb-1"
              >
                Min baths
              </label>
              <input
                id="filter-min-baths"
                type="text"
                value={state.minBaths}
                onChange={set("minBaths")}
                inputMode="numeric"
                placeholder="e.g. 1"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <div>
              <label
                htmlFor="filter-max-baths"
                className="block text-xs uppercase tracking-[0.12em] text-gray-500 mb-1"
              >
                Max baths
              </label>
              <input
                id="filter-max-baths"
                type="text"
                value={state.maxBaths}
                onChange={set("maxBaths")}
                inputMode="numeric"
                placeholder="e.g. 3"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end">
          <button
            type="button"
            onClick={clear}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50 w-full sm:w-auto"
          >
            Clear
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:ml-auto lg:w-[560px]">
            <div className="relative">
              <label
                className="block text-xs uppercase tracking-[0.12em] text-gray-500 mb-1"
                htmlFor="filter-neighborhoods-summary"
              >
                Neighborhoods
              </label>
              <details className="group">
                <summary
                  id="filter-neighborhoods-summary"
                  className="list-none cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 flex items-center justify-between"
                >
                  <span>{selectedNeighborhoodsLabel}</span>
                  <svg
                    className="h-4 w-4 transition-transform group-open:rotate-180"
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
                </summary>
                <div className="absolute z-20 mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 max-h-56 overflow-auto shadow-lg">
                  <fieldset className="space-y-2">
                    {NEIGHBORHOOD_OPTIONS.map((name) => (
                      <label
                        key={name}
                        className="flex items-center gap-2 text-sm text-slate-800"
                      >
                        <input
                          type="checkbox"
                          checked={state.neighborhoods.includes(name)}
                          onChange={() => toggleNeighborhood(name)}
                          className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-300"
                        />
                        <span>{name}</span>
                      </label>
                    ))}
                  </fieldset>
                </div>
              </details>
            </div>

            <div>
              <label
                htmlFor="filter-sort"
                className="block text-xs uppercase tracking-[0.12em] text-gray-500 mb-1"
              >
                Sort
              </label>
              <select
                id="filter-sort"
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
      </div>
    </section>
  );
}
