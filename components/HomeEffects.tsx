"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import EmailUsTab from "@/components/EmailUsTab";
import ScheduleCallTab from "@/components/ScheduleCallTab";

export default function HomeEffects() {
  const pathname = usePathname();
  const [showCtas, setShowCtas] = useState(false);

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    setShowCtas(false);

    // ---------- REVEAL ----------
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

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
        { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
      );

      revealEls.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // ---------- STICKY NAV + CTAs ----------
    const nav = document.getElementById("jhr-sticky-nav");
    const trigger = document.getElementById("jhr-story-start");

    if (nav && trigger) {
      const setNavVisible = (v: boolean) =>
        nav.setAttribute("data-visible", v ? "true" : "false");

      const update = () => {
        const reachedStory = trigger.getBoundingClientRect().top <= 1;
        setNavVisible(reachedStory);
        if (reachedStory) setShowCtas(true);
      };

      setNavVisible(false);
      requestAnimationFrame(update);

      const cue = document.querySelector<HTMLElement>("[data-scroll-cue]");
      const onCueClick = () => {
        setShowCtas(true);
        setNavVisible(true);
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

      cleanups.push(() => {
        cue?.removeEventListener("click", onCueClick);
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
        io2?.disconnect();
      });
    }

    return () => {
      for (const fn of cleanups) fn();
    };
  }, [pathname]);

  return showCtas ? (
    <>
      <EmailUsTab />
      <ScheduleCallTab />
    </>
  ) : null;
}
