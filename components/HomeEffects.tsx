"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HomeEffects() {
  const pathname = usePathname();

  useEffect(() => {
    // ---------- REVEAL ----------
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    // If we came back from another page, ensure they're not stuck hidden
    revealEls.forEach((el) => el.classList.remove("jhr-visible"));

    if (!("IntersectionObserver" in window) || revealEls.length === 0) {
      revealEls.forEach((el) => el.classList.add("jhr-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              (e.target as HTMLElement).classList.add("jhr-visible");
              io.unobserve(e.target);
            }
          }
        },
        { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
      );

      revealEls.forEach((el) => io.observe(el));

      // cleanup
      return () => io.disconnect();
    }

    // ---------- STICKY NAV ----------
    const nav = document.getElementById("jhr-sticky-nav");
    const trigger = document.getElementById("jhr-story-start");
    if (!nav || !trigger) return;

    const set = (v: boolean) =>
      nav.setAttribute("data-visible", v ? "true" : "false");

    const update = () => {
      set(trigger.getBoundingClientRect().top <= 1);
    };

    // sync initial state on mount
    set(false);
    update();

    // show immediately when clicking the cue (smooth scroll)
    const cue = document.querySelector<HTMLElement>("[data-scroll-cue]");
    const onCueClick = () => {
      set(true);
      requestAnimationFrame(() => requestAnimationFrame(update));
    };
    cue?.addEventListener("click", onCueClick);

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    let io2: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io2 = new IntersectionObserver(update, { threshold: 0 });
      io2.observe(trigger);
    }

    return () => {
      cue?.removeEventListener("click", onCueClick);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      io2?.disconnect();
    };
  }, [pathname]);

  return null;
}