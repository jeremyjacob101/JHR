"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type PropertyCarouselProps = {
  carouselId: string;
  title: string;
  images: string[];
  imageSizes?: string;
};

const SWIPE_THRESHOLD_PX = 50;
const AUTOPLAY_MS = 3000;

export default function PropertyCarousel({
  carouselId,
  title,
  images,
  imageSizes = "(min-width: 768px) 66vw, 100vw",
}: PropertyCarouselProps) {
  const slideCount = images.length;
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const startXRef = useRef<number | null>(null);
  const fullscreenStartXRef = useRef<number | null>(null);

  const canSlide = slideCount > 1;
  const counterText = `${index + 1} / ${slideCount}`;
  const autoplayEnabled =
    canSlide && !reduceMotion && !isPaused && !isTabHidden && !isFullscreen;

  const transformStyle = useMemo(
    () => ({ transform: `translateX(-${index * 100}%)`, direction: "ltr" as const }),
    [index],
  );

  const goTo = useCallback(
    (nextIndex: number) => {
      if (!canSlide) return;
      setIndex(((nextIndex % slideCount) + slideCount) % slideCount);
    },
    [canSlide, slideCount],
  );

  useEffect(() => {
    if (!window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onChange = () => setReduceMotion(mql.matches);
    onChange();

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }

    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsTabHidden(document.hidden);
    };

    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
        return;
      }
      if (!canSlide) return;
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [canSlide, goTo, index, isFullscreen]);

  useEffect(() => {
    if (!autoplayEnabled) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slideCount);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [autoplayEnabled, slideCount]);

  if (slideCount === 0) {
    return (
      <div className="rounded-xl bg-slate-100 p-6 text-sm text-slate-600">
        No gallery images available.
      </div>
    );
  }

  const onPointerDown = (clientX: number) => {
    startXRef.current = clientX;
  };

  const onPointerUp = (clientX: number) => {
    if (!canSlide || startXRef.current == null) return;
    const dx = clientX - startXRef.current;
    startXRef.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
    if (dx < 0) goTo(index + 1);
    else goTo(index - 1);
  };

  const onFullscreenPointerDown = (clientX: number) => {
    fullscreenStartXRef.current = clientX;
  };

  const onFullscreenPointerUp = (clientX: number) => {
    if (!canSlide || fullscreenStartXRef.current == null) return;
    const dx = clientX - fullscreenStartXRef.current;
    fullscreenStartXRef.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
    if (dx < 0) goTo(index + 1);
    else goTo(index - 1);
  };

  return (
    <>
      <div
        id={carouselId}
        className="relative w-full select-none"
        style={{ paddingBottom: "56.25%" }}
        data-index={index + 1}
        dir="ltr"
        aria-label={`${title} image carousel`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(e) => {
          const nextTarget = e.relatedTarget as Node | null;
          if (!e.currentTarget.contains(nextTarget)) {
            setIsPaused(false);
          }
        }}
        onPointerDown={(e) => onPointerDown(e.clientX)}
        onPointerUp={(e) => onPointerUp(e.clientX)}
        onPointerCancel={() => {
          startXRef.current = null;
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            data-track
            className="h-full w-full flex flex-row transition-transform duration-500 ease-out"
            style={transformStyle}
          >
            {images.map((src, i) => (
              <div
                key={src}
                data-slide
                className="relative h-full w-full shrink-0"
                aria-hidden={i === index ? "false" : "true"}
              >
                <Image
                  src={src}
                  alt={`${title} photo ${i + 1}`}
                  fill
                  sizes={imageSizes}
                  className="object-cover object-center"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border border-slate-200 shadow px-3 py-2 text-slate-900 hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => goTo(index - 1)}
            disabled={!canSlide}
          >
            ‹
          </button>

          <button
            type="button"
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border border-slate-200 shadow px-3 py-2 text-slate-900 hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => goTo(index + 1)}
            disabled={!canSlide}
          >
            ›
          </button>

          <div
            className="absolute top-3 right-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white"
            aria-live="polite"
          >
            {counterText}
          </div>

          <button
            type="button"
            aria-label="Open fullscreen gallery"
            className="absolute top-3 left-3 rounded-full bg-white/90 border border-slate-200 shadow px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-white transition"
            onClick={() => setIsFullscreen(true)}
          >
            Fullscreen
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                data-active={i === index ? "true" : "false"}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index ? "true" : "false"}
                className="h-2.5 w-2.5 rounded-full border border-slate-200 bg-white/80 hover:bg-white transition data-[active=true]:bg-slate-900 data-[active=true]:border-slate-900 data-[active=true]:scale-110"
                onClick={() => goTo(i)}
                disabled={!canSlide}
              />
            ))}
          </div>
        </div>
      </div>

      {isFullscreen ? (
        <div
          className="fixed inset-0 z-[100] bg-black/75 flex items-center justify-center p-[5vh] sm:p-[5vw]"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} fullscreen gallery`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsFullscreen(false);
            }
          }}
        >
          <div
            className="relative w-[90vw] h-[90vh] bg-black rounded-2xl overflow-hidden select-none"
            onPointerDown={(e) => onFullscreenPointerDown(e.clientX)}
            onPointerUp={(e) => onFullscreenPointerUp(e.clientX)}
            onPointerCancel={() => {
              fullscreenStartXRef.current = null;
            }}
          >
            <Image
              src={images[index]}
              alt={`${title} fullscreen photo ${index + 1}`}
              fill
              sizes="90vw"
              className="object-contain bg-black"
              priority
            />

            <button
              type="button"
              aria-label="Close fullscreen gallery"
              className="absolute top-3 right-3 rounded-full bg-white/90 border border-slate-200 shadow px-3 py-1.5 text-sm font-semibold text-slate-900 hover:bg-white transition"
              onClick={() => setIsFullscreen(false)}
            >
              ×
            </button>

            <button
              type="button"
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border border-slate-200 shadow px-3 py-2 text-slate-900 hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => goTo(index - 1)}
              disabled={!canSlide}
            >
              ‹
            </button>

            <button
              type="button"
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border border-slate-200 shadow px-3 py-2 text-slate-900 hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => goTo(index + 1)}
              disabled={!canSlide}
            >
              ›
            </button>

            <div
              className="absolute top-3 left-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white"
              aria-live="polite"
            >
              {counterText}
            </div>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {images.map((_, i) => (
                <button
                  key={`fullscreen-dot-${i}`}
                  type="button"
                  data-active={i === index ? "true" : "false"}
                  aria-label={`Go to image ${i + 1}`}
                  aria-current={i === index ? "true" : "false"}
                  className="h-2.5 w-2.5 rounded-full border border-slate-200 bg-white/80 hover:bg-white transition data-[active=true]:bg-slate-900 data-[active=true]:border-slate-900 data-[active=true]:scale-110"
                  onClick={() => goTo(i)}
                  disabled={!canSlide}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
