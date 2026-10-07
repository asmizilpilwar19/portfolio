"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Desktop-only cursor: a dot plus a lagging ring. The ring grows over links and
 * buttons, and shows a word when the target has data-cursor="View".
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce || !ring.current || !dot.current) return;

    document.documentElement.classList.add("has-cursor");
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "none" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "none" });

    const move = (e: PointerEvent) => {
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("a, button, [data-cursor]");
      const word = t?.dataset.cursor;
      if (text.current) text.current.textContent = word ?? "";
      gsap.to(ring.current, {
        scale: word ? 1 : t ? 0.62 : 0.3,
        backgroundColor: word ? "rgba(255,74,28,1)" : "rgba(255,255,255,0)",
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(text.current, { opacity: word ? 1 : 0, duration: 0.2, overwrite: "auto" });
      gsap.to(dot.current, { scale: t ? 0 : 1, duration: 0.2, overwrite: "auto" });
    };

    gsap.set([ring.current, dot.current], { xPercent: -50, yPercent: -50 });
    gsap.set(ring.current, { scale: 0.3 });
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="cursor-ring grid h-28 w-28 place-items-center rounded-full border border-white mix-blend-difference"
      >
        <span ref={text} className="label text-ink opacity-0 mix-blend-normal" />
      </div>
      <div ref={dot} aria-hidden className="cursor-dot h-2 w-2 rounded-full bg-white mix-blend-difference" />
    </>
  );
}
