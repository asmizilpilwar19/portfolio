"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/data/projects";
import { gsap, useGSAP } from "@/lib/gsap";
import { BrowserFrame } from "@/components/ui/frames";
import { Button, StoryBlocks } from "@/components/ui/bits";

/**
 * Project 03: horizontal showcase. On desktop the section pins and the track
 * scrubs sideways with scroll. On touch, small screens and reduced motion it is
 * a plain native scroll-snap row, so nothing is ever trapped.
 */
export function LibraeShowcase({ project, index }: { project: Project; index: string }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current;
        if (!el) return;
        const dist = () => Math.max(0, el.scrollWidth - window.innerWidth);
        gsap.to(el, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <article
      ref={section}
      id={project.slug}
      data-section={`${index} ${project.name}`}
      className="relative bg-lav py-20 lg:flex lg:h-screen lg:items-center lg:py-0"
    >
      <div className="no-scrollbar w-full snap-x snap-mandatory overflow-x-auto lg:snap-none lg:overflow-hidden lg:motion-reduce:overflow-x-auto">
        <div ref={track} className="flex w-max items-center gap-6 px-[var(--gutter)] pr-[12vw] lg:gap-10">
          <div className="w-[min(88vw,44rem)] shrink-0 snap-start lg:w-[40rem]">
            <p className="label mb-4 flex items-center gap-3">
              <span className="text-signal">{index}</span> Library system · {project.year}
            </p>
            <h3 className="display text-[clamp(3.4rem,6vw,6rem)]">{project.name}</h3>
            <p className="display mt-5 max-w-lg text-[clamp(1.4rem,2vw,1.9rem)] leading-[1.1] tracking-[-0.01em]">{project.tagline}</p>
            <StoryBlocks
              className="mt-8 !gap-y-5 [&_p.label]:mb-1.5"
              what={project.what}
              why={project.why}
              used={project.technologies.slice(0, 7)}
              interesting={project.interesting[0]}
            />
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {project.githubUrl && (
                <Button href={project.githubUrl} external>
                  GitHub
                </Button>
              )}
              <Link href={`/work/${project.slug}`} className="label u-link" data-cursor="Open">
                Case study
              </Link>
            </div>
          </div>

          {project.screenshots.map((s, n) => (
            <figure key={s.src} className="w-[min(88vw,52rem)] shrink-0 snap-center lg:w-[min(62vw,58rem)]">
              <BrowserFrame src={s.src} alt={s.alt} url="localhost:4200" ratio="aspect-[1600/698]" sizes="(min-width: 1024px) 60vw, 88vw" />
              <figcaption className="label mt-4 flex items-center justify-between">
                <span>
                  <span className="text-signal">{String(n + 1).padStart(2, "0")}</span> — {s.caption}
                </span>
                <span className="opacity-50">{String(project.screenshots.length).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-[var(--gutter)] bottom-8 hidden h-px bg-ink/20 lg:block" aria-hidden>
        <span ref={progress} className="block h-full origin-left bg-ink" style={{ transform: "scaleX(0)" }} />
      </div>
    </article>
  );
}
