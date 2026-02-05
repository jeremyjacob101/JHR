"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

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
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [fontScale, setFontScale] = useState(DEFAULT_FONT_SCALE);
  const [contrast, setContrast] = useState(DEFAULT_CONTRAST);
  const [motion, setMotion] = useState(DEFAULT_MOTION);

  const panelRef = useRef<HTMLDivElement | null>(null);

  // Create a dedicated mount node in <body> (escapes stacking contexts)
  const el = useMemo(() => {
    if (typeof window === "undefined") return null;
    const node = document.createElement("div");
    node.id = "a11y-floating-root";
    return node;
  }, []);

  useEffect(() => {
    if (!el) return;

    const existing = document.getElementById("a11y-floating-root");
    if (existing) {
      setMounted(true);
      return;
    }

    document.body.appendChild(el);
    setMounted(true);

    return () => {
      el.remove();
    };
  }, [el]);

  useEffect(() => {
    const storedFontScale = window.localStorage.getItem("a11y-font-scale");
    const storedContrast = window.localStorage.getItem("a11y-contrast");
    const storedMotion = window.localStorage.getItem("a11y-motion");

    if (storedFontScale) {
      const parsed = Number(storedFontScale);
      if (!Number.isNaN(parsed)) setFontScale(clampFontScale(parsed));
    }
    if (storedContrast) setContrast(storedContrast);
    if (storedMotion) setMotion(storedMotion);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--a11y-font-scale",
      String(fontScale),
    );
    document.documentElement.dataset.a11yContrast = contrast;
    document.documentElement.dataset.a11yMotion = motion;

    window.localStorage.setItem("a11y-font-scale", String(fontScale));
    window.localStorage.setItem("a11y-contrast", contrast);
    window.localStorage.setItem("a11y-motion", motion);
  }, [fontScale, contrast, motion]);

  // Close on ESC and lock background scroll while open (mobile-friendly)
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    // focus the panel for accessibility (optional but nice)
    panelRef.current?.focus();
  }, [isOpen]);

  const fontScaleLabel = useMemo(
    () => `${Math.round(fontScale * 100)}%`,
    [fontScale],
  );

  if (!mounted) return null;

  const ui = (
    <div
      style={{
        position: "fixed",
        left: 20,
        bottom: 20,
        zIndex: 2147483646, // higher than your other floating CTAs (except WhatsApp which is 2147483647)
        pointerEvents: "auto",
      }}
      className="flex flex-col items-start gap-2"
    >
      <button
        type="button"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-200 shadow-lg shadow-black/20 transition hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
        aria-label="Open accessibility settings"
      >
        <Image src="/icons/wheelchair.svg" alt="" width={22} height={22} priority />
      </button>

      {isOpen ? (
        <>
          {/* Overlay to guarantee taps/clicks go to the a11y UI and to enable outside-click close */}
          <div
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2147483644,
              background: "transparent",
            }}
          />

          <div
            id="accessibility-panel"
            ref={panelRef}
            tabIndex={-1}
            className="w-72 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-900 shadow-xl"
            role="dialog"
            aria-label="Accessibility settings"
            style={{
              position: "relative",
              zIndex: 2147483646,
            }}
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
              </label>
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
        </>
      ) : null}
    </div>
  );

  const mountNode =
    document.getElementById("a11y-floating-root") ?? el ?? document.body;

  return createPortal(ui, mountNode);
}
