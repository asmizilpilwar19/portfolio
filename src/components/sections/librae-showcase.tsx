"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/data/projects";
import { gsap, useGSAP } from "@/lib/gsap";
import { BrowserFrame } from "@/components/ui/frames";
import { Button, StoryBlocks } from "@/components/ui/bits";

/**
 * Art direction for each gallery panel: a colour-graded stage, a zoomed close-up of a
 * real part of that screen (focus = point to zoom on, in % of the screenshot) and chips
 * that only state things the Librae README confirms.
 */
const STAGES = [
  { bg: "linear-gradient(135deg,#7d63e6 0%,#b7a6f2 100%)", tone: "light", focus: [20, 42], zoom: 2.6, detail: "The headline", chips: ["Light + dark mode"] },
  { bg: "linear-gradient(135deg,#352a86 0%,#7b64dc 100%)", tone: "light", focus: [50, 26], zoom: 2.7, detail: "Sign-in", chips: ["Admin", "Librarian", "Member"] },
  { bg: "linear-gradient(135deg,#8fd3bd 0%,#d9f1e8 100%)", tone: "ink", focus: [62, 56], zoom: 2.4, detail: "Library stats", chips: ["Live analytics"] },
  { bg: "linear-gradient(135deg,#f2a999 0%,#fbdcd2 100%)", tone: "ink", focus: [66, 74], zoom: 2.4, detail: "Book catalogue", chips: ["Books", "Authors", "Categories"] },
  { bg: "linear-gradient(135deg,#97a8f2 0%,#dde3ff 100%)", tone: "ink", focus: [62, 58], zoom: 2.5, detail: "Room booking", chips: ["Conflict checks"] },
  { bg: "linear-gradient(135deg,#4a3db0 0%,#9a8aee 100%)", tone: "light", focus: [62, 46], zoom: 2.6, detail: "Announcements", chips: ["Events", "Announcements"] },
] as const;

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

          {project.screenshots.map((s, n) => {
            const st = STAGES[n % STAGES.length];
            const flip = n % 2 === 1;
            const onDark = st.tone === "light";
            return (
              <figure key={s.src} className="group w-[min(88vw,52rem)] shrink-0 snap-center lg:w-[min(62vw,58rem)]">
                <div
                  className="relative aspect-[16/10] overflow-hidden rounded-[16px] shadow-[0_40px_80px_-40px_rgba(27,26,23,0.6)]"
                  style={{ background: st.bg }}
                >
                  {/* texture: a fading dot grid and a soft glow */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1.2px, transparent 1.5px)",
                      backgroundSize: "22px 22px",
                      maskImage: "linear-gradient(135deg, black, transparent 68%)",
                      WebkitMaskImage: "linear-gradient(135deg, black, transparent 68%)",
                    }}
                  />
                  <div aria-hidden className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/30 blur-3xl" />

                  {/* big outlined numeral, partly hidden behind the screenshot for depth */}
                  <span
                    aria-hidden
                    className={`display outline absolute -bottom-[4%] left-[4%] select-none text-[clamp(7rem,17vw,15rem)] leading-none ${onDark ? "text-white/45" : "text-ink/30"}`}
                  >
                    {String(n + 1).padStart(2, "0")}
                  </span>

                  {/* the screenshot, in perspective; it relaxes on hover */}
                  <div
                    className={`absolute left-[5%] top-[9%] w-[80%] transition-transform duration-700 ease-out group-hover:[transform:perspective(1400px)_rotateY(0deg)_rotateX(0deg)_scale(1.012)] ${
                      flip
                        ? "[transform:perspective(1400px)_rotateY(7deg)_rotateX(2deg)_rotate(1.2deg)]"
                        : "[transform:perspective(1400px)_rotateY(-7deg)_rotateX(2deg)_rotate(-1.2deg)]"
                    }`}
                  >
                    <BrowserFrame src={s.src} alt={s.alt} url="localhost:4200" ratio="aspect-[1600/698]" sizes="(min-width: 1024px) 50vw, 80vw" />
                  </div>

                  {/* zoomed close-up of a real part of this screen */}
                  <div className="absolute bottom-[7%] right-[4%] w-[34%] rotate-[3deg] transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:rotate-[5deg]">
                    <div
                      role="img"
                      aria-label={`Close-up of the Librae ${st.detail.toLowerCase()}`}
                      className="aspect-[4/3] w-full overflow-hidden rounded-[12px] border-[3px] border-paper bg-white shadow-[0_24px_50px_-18px_rgba(27,26,23,0.55)]"
                      style={{
                        backgroundImage: `url(${s.src})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: `${st.zoom * 100}% auto`,
                        backgroundPosition: `${st.focus[0]}% ${st.focus[1]}%`,
                      }}
                    />
                    <span className="label absolute -top-3 left-3 bg-ink px-2.5 py-1 text-[0.6rem] text-paper">{st.detail}</span>
                  </div>

                  {/* feature chips (all stated in the README) */}
                  <ul className="absolute right-[4%] top-[4%] flex max-w-[44%] flex-wrap justify-end gap-2">
                    {st.chips.map((c, i) => (
                      <li
                        key={c}
                        className={`label bg-paper px-2.5 py-1.5 text-[0.6rem] text-ink shadow-md ${i % 2 ? "rotate-[2deg]" : "-rotate-[2deg]"}`}
                      >
                        <span className="mr-1.5 text-signal" aria-hidden>
                          ●
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <figcaption className="label mt-4 flex items-center justify-between">
                  <span>
                    <span className="text-signal">{String(n + 1).padStart(2, "0")}</span> — {s.caption}
                  </span>
                  <span className="opacity-50">{String(project.screenshots.length).padStart(2, "0")}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <div className="absolute inset-x-[var(--gutter)] bottom-8 hidden h-px bg-ink/20 lg:block" aria-hidden>
        <span ref={progress} className="block h-full origin-left bg-ink" style={{ transform: "scaleX(0)" }} />
      </div>
    </article>
  );
}
