"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ready } from "@/lib/ready";
import { useMediaQuery, useReducedMotion } from "@/lib/hooks";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { Magnetic } from "@/components/ui/magnetic";
import { Arrow } from "@/components/ui/bits";

// Three.js only loads on the client, after first paint.
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const small = useMediaQuery("(max-width: 767px)");

  useGSAP(
    () => {
      if (reduce) return;
      const lines = gsap.utils.toArray<HTMLElement>("[data-line]", root.current);
      const fades = gsap.utils.toArray<HTMLElement>("[data-in]", root.current);
      gsap.set(lines, { yPercent: 112 });
      gsap.set(fades, { opacity: 0, y: 18 });
      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .to(lines, { yPercent: 0, duration: 1.3, stagger: 0.12 })
          .to(fades, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, "-=0.8");
      };
      ready.then(play);
      gsap.delayedCall(4, play); // safety net
    },
    { scope: root, dependencies: [reduce] },
  );

  const line = "block overflow-hidden pb-[0.08em] -mb-[0.08em]";

  return (
    <section ref={root} id="top" data-section="Intro" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="gutter relative z-10 flex flex-1 flex-col justify-between pb-8 pt-28 md:pb-10">
        <div data-in className="label flex items-start justify-between gap-6">
          <span>
            {site.name}
            <br />
            <span className="opacity-60">Software &amp; AI, {site.year}</span>
          </span>
          <span className="hidden max-w-[16rem] text-right opacity-60 sm:block">
            Code, interfaces and the occasional experiment
          </span>
        </div>

        <h1 className="display mt-10 text-[clamp(3.2rem,14.5vw,5.5rem)] leading-[0.88] md:text-[clamp(3.1rem,9.6vw,9.6rem)] md:leading-[0.86] tracking-[-0.035em]">
          <span className={line}>
            <span data-line className="block">Building</span>
          </span>
          <span className={line}>
            <span data-line className="block">things that</span>
          </span>
          <span className={line}>
            <span data-line className="block">
              feel <em className="text-olive">alive</em>
              <span className="text-signal">.</span>
            </span>
          </span>
        </h1>

        <div className="mt-12 grid items-end gap-8 md:grid-cols-12">
          <p data-in className="max-w-md text-[1.02rem] leading-relaxed md:col-span-5">
            I make full-stack web apps, AI-assisted tools and the occasional interface experiment. Everything below is something I actually built, and the code is public.
          </p>
          <div data-in className="flex items-center justify-between gap-6 md:col-span-7 md:justify-end md:gap-14">
            <Magnetic>
              <a href="#work" data-cursor="Scroll" className="label group inline-flex items-center gap-4 border border-ink px-5 py-4 transition-colors hover:bg-ink hover:text-paper">
                Selected work ({String(projects.length).padStart(2, "0")})
                <Arrow className="rotate-90 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <span className="label hidden items-center gap-3 opacity-60 sm:flex">
              <span className="relative block h-px w-12 overflow-hidden bg-ink/20" aria-hidden>
                <span className="absolute inset-y-0 left-0 w-1/2 animate-[slide_1.8s_ease-in-out_infinite] bg-ink" />
              </span>
              Scroll
            </span>
          </div>
        </div>
      </div>

      {/* Full-bleed canvas so nothing is ever clipped by a box edge; on phones it sits behind the type. */}
      <div className="pointer-events-none absolute inset-0 z-0 md:z-20" aria-hidden>
        <HeroScene still={reduce} lowPower={small} />
      </div>

      <style>{`@keyframes slide{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}`}</style>
    </section>
  );
}
