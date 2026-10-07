"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { markReady } from "@/lib/ready";
import { site } from "@/data/site";

/** Short, once-per-session curtain. Skipped entirely for reduced motion. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const hide = () => {
      el.style.display = "none";
    };

    let seen = false;
    try {
      seen = sessionStorage.getItem("preloaded") === "1";
      sessionStorage.setItem("preloaded", "1");
    } catch {}

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hide();
      markReady();
      return;
    }

    const counter = { v: 0 };
    const tl = gsap.timeline({ onComplete: hide });
    if (!seen) {
      tl.to(counter, {
        v: 100,
        duration: 1.1,
        ease: "power2.inOut",
        onUpdate: () => {
          if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(2, "0");
        },
      });
    }
    tl.to(el, { yPercent: -100, duration: seen ? 0.6 : 0.9, ease: "expo.inOut" }, seen ? 0 : ">+0.1");
    tl.call(markReady, undefined, "<+0.35");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="preloader fixed inset-0 z-[110] flex flex-col justify-between bg-ink px-[var(--gutter)] py-8 text-paper"
    >
      <span className="label">{site.name} — Portfolio {site.year}</span>
      <div className="flex items-end justify-between">
        <span className="display text-[clamp(3.2rem,10vw,8rem)]">
          {site.short}
          <em className="text-signal">.</em>
        </span>
        <span ref={count} className="label text-[clamp(1rem,2vw,1.5rem)] tabular-nums">
          00
        </span>
      </div>
    </div>
  );
}
