"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

/**
 * One place that wires scroll animation to plain data attributes, so server
 * components stay server components:
 *
 *   data-split              lines of text slide up out of a mask
 *   data-split="words"      same, per word (for big headlines)
 *   data-fade               fade + rise
 *   data-clip               image wrapper opens up from an inset clip-path
 *   data-parallax="-12"     moves yPercent as you scroll past
 *   data-shift="8"          drifts horizontally (xPercent from -n to +n)
 *
 * Nothing is hidden by CSS, so with reduced motion (or no JS) all content is
 * simply visible.
 */
export function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: gsap.Context | undefined;
    let cancelled = false;

    // SplitText rewrites text nodes, so wait until React has hydrated the whole page
    // (load event + fonts + a couple of frames) or it would cause hydration mismatches.
    const settled = async () => {
      if (document.readyState !== "complete") await new Promise<void>((r) => window.addEventListener("load", () => r(), { once: true }));
      await document.fonts.ready;
      await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
      await new Promise<void>((r) => setTimeout(r, 120));
    };

    settled().then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
          const mode = el.dataset.split === "words" ? "words" : "lines";
          SplitText.create(el, {
            type: mode === "words" ? "words,lines" : "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(mode === "words" ? self.words : self.lines, {
                yPercent: 115,
                duration: 1.05,
                ease: "power4.out",
                stagger: mode === "words" ? 0.07 : 0.1,
                delay: Number(el.dataset.delay ?? 0),
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
          const inner = el.firstElementChild as HTMLElement | null;
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top 92%", end: "top 40%", scrub: 0.6 },
          });
          tl.fromTo(el, { clipPath: "inset(14% 10% 14% 10% round 6px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" }, 0);
          if (inner) tl.fromTo(inner, { scale: 1.18 }, { scale: 1, ease: "none" }, 0);
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -Number(el.dataset.parallax) },
            {
              yPercent: Number(el.dataset.parallax),
              ease: "none",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-shift]").forEach((el) => {
          const v = Number(el.dataset.shift);
          gsap.fromTo(
            el,
            { xPercent: -v },
            {
              xPercent: v,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
      ScrollTrigger.refresh();
    });

    // Late-loading images change layout; re-measure once everything is in.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
      ctx?.revert();
    };
  }, []);

  return null;
}
