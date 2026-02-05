"use client";

import { useEffect, useMemo, useState } from "react";

const DEFAULT_FONT_SCALE = 1;
const DEFAULT_CONTRAST = "normal";
const DEFAULT_MOTION = "full";

const FONT_SCALE_MIN = 1;
const FONT_SCALE_MAX = 1.4;
const FONT_SCALE_STEP = 0.05;

function clampFontScale(value: number) {
  return Math.min(FONT_SCALE_MAX, Math.max(FONT_SCALE_MIN, value));
}

export default function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontScale, setFontScale] = useState(DEFAULT_FONT_SCALE);
  const [contrast, setContrast] = useState(DEFAULT_CONTRAST);
  const [motion, setMotion] = useState(DEFAULT_MOTION);

  useEffect(() => {
    const storedFontScale = window.localStorage.getItem("a11y-font-scale");
    const storedContrast = window.localStorage.getItem("a11y-contrast");
    const storedMotion = window.localStorage.getItem("a11y-motion");

    if (storedFontScale) {
      const parsed = Number(storedFontScale);
      if (!Number.isNaN(parsed)) {
        setFontScale(clampFontScale(parsed));
      }
    }

    if (storedContrast) {
      setContrast(storedContrast);
    }

    if (storedMotion) {
      setMotion(storedMotion);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--a11y-font-scale",
      String(fontScale)
    );
    document.documentElement.dataset.a11yContrast = contrast;
    document.documentElement.dataset.a11yMotion = motion;

    window.localStorage.setItem("a11y-font-scale", String(fontScale));
    window.localStorage.setItem("a11y-contrast", contrast);
    window.localStorage.setItem("a11y-motion", motion);
  }, [fontScale, contrast, motion]);

  const fontScaleLabel = useMemo(
    () => `${Math.round(fontScale * 100)}%`,
    [fontScale]
  );

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col items-start gap-2">
      <button
        type="button"
        className="rounded-full bg-slate-900 text-white px-4 py-2 text-sm font-semibold shadow-lg shadow-black/20 transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
      >
        Accessibility
      </button>

      {isOpen ? (
        <div
          id="accessibility-panel"
          className="w-72 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-900 shadow-xl"
          role="dialog"
          aria-label="Accessibility settings"
        >
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold">Accessibility</p>
            <button
              type="button"
              className="text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-800"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>

          <div className="mt-4">
            <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
              Font size
              <span className="text-slate-900">{fontScaleLabel}</span>
              <input
                type="range"
                min={FONT_SCALE_MIN}
                max={FONT_SCALE_MAX}
                step={FONT_SCALE_STEP}
                value={fontScale}
                onChange={(event) =>
                  setFontScale(clampFontScale(Number(event.target.value)))
                }
                className="mt-2 w-full"
                aria-label="Font size"
              />
            </label>
          </div>

          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Contrast
            </p>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                className={`flex-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  contrast === "normal"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
                onClick={() => setContrast("normal")}
              >
                Normal
              </button>
              <button
                type="button"
                className={`flex-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  contrast === "high"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
                onClick={() => setContrast("high")}
              >
                High
              </button>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Motion
            </p>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                className={`flex-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  motion === "full"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
                onClick={() => setMotion("full")}
              >
                Full
              </button>
              <button
                type="button"
                className={`flex-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  motion === "reduce"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
                onClick={() => setMotion("reduce")}
              >
                Reduce
              </button>
            </div>
          </div>

          <button
            type="button"
            className="mt-5 w-full rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            onClick={() => {
              setFontScale(DEFAULT_FONT_SCALE);
              setContrast(DEFAULT_CONTRAST);
              setMotion(DEFAULT_MOTION);
            }}
          >
            Reset settings
          </button>
        </div>
      ) : null}
    </div>
  );
}
