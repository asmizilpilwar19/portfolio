"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { useReducedMotion } from "@/lib/hooks";
import { Button, Tags } from "@/components/ui/bits";
import { Tilt } from "@/components/ui/tilt";

/** Renders the live site at desktop width and scales it to fit the frame. */
function LivePreview({ url, title }: { url: string; title: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / 1440));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={box} className="absolute inset-0 overflow-hidden bg-black" onPointerLeave={() => setArmed(false)}>
      <iframe
        src={url}
        title={title}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        className="absolute left-0 top-0 origin-top-left border-0"
        style={{
          width: 1440,
          height: `${100 / scale}%`,
          transform: `scale(${scale})`,
          pointerEvents: armed ? "auto" : "none",
        }}
      />
      {!armed && (
        <button
          type="button"
          onClick={() => setArmed(true)}
          className="label absolute inset-0 grid place-items-center bg-black/0 text-white opacity-0 transition hover:bg-black/40 hover:opacity-100 focus-visible:opacity-100"
        >
          <span className="bg-signal px-4 py-3 text-ink">Click to interact</span>
        </button>
      )}
    </div>
  );
}

/**
 * Dark showcase panel for a live site. Everything project-specific (accent colour,
 * panel background, screenshot ratio, live-preview toggle) comes from the data.
 * `featured` switches the label between "Featured project" and a plain "Live now".
 */
export function Featured({ project, featured = true }: { project: Project; featured?: boolean }) {
  const [i, setI] = useState(0);
  const [live, setLive] = useState(false);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const shots = project.screenshots;

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Gentle auto-advance; stops on hover, off-screen, live mode or reduced motion.
  useEffect(() => {
    if (reduce || hover || live || !inView) return;
    const t = setInterval(() => setI((n) => (n + 1) % shots.length), 3800);
    return () => clearInterval(t);
  }, [reduce, hover, live, inView, shots.length]);

  const shot = shots[i];
  const accent = project.accent;
  const host = project.liveUrl ? new URL(project.liveUrl).host : project.name;
  // Long names (ELSEWHERE) shrink so the giant title always fits the page width.
  const titleVw = Math.min(18, 74 / (project.name.length * 0.66));

  return (
    <section
      ref={section}
      id={featured ? "featured" : project.slug}
      data-section={featured ? "Featured" : project.name}
      className="relative overflow-hidden text-[#efe6d6]"
      style={{ background: project.panel ?? "#13110f" }}
    >
      <div className="gutter pb-28 pt-24 md:pb-44 md:pt-36">
        <div className="label flex items-center justify-between gap-6">
          <span className="flex items-center gap-3">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inset-0 animate-ping rounded-full bg-signal opacity-70" />
              <span className="relative h-2 w-2 rounded-full bg-signal" />
            </span>
            {featured ? "Featured project, live now" : "Live now"}
          </span>
          <span className="opacity-50">
            {project.kind ?? "Project"} · {project.year}
          </span>
        </div>

        <h2
          className="display relative z-10 mt-6 select-none leading-[0.8] tracking-[-0.04em]"
          style={{ color: accent, fontSize: `clamp(3.2rem, ${titleVw.toFixed(2)}vw, 19rem)` }}
          data-split
        >
          {project.name}
        </h2>

        <div className="relative z-0 -mt-[2vw] grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* browser composition */}
          <div className="min-w-0 lg:col-span-8 lg:col-start-5 lg:row-start-1" data-fade>
            <Tilt max={4}>
              <div
                className="overflow-hidden rounded-[10px] border border-white/10 bg-[#171512] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(201,163,106,0.08)]"
                onPointerEnter={() => setHover(true)}
                onPointerLeave={() => setHover(false)}
              >
                <div className="flex items-center gap-3 border-b border-white/10 bg-[#1f1c18] px-3 py-2">
                  <span className="flex gap-1.5" aria-hidden>
                    <i className="block h-2 w-2 rounded-full bg-white/20" />
                    <i className="block h-2 w-2 rounded-full bg-white/20" />
                    <i className="block h-2 w-2 rounded-full bg-white/20" />
                  </span>
                  <span className="label min-w-0 flex-1 truncate rounded-full bg-black/30 px-3 py-1 text-[0.62rem] normal-case tracking-[0.08em] text-white/50">
                    {host}
                  </span>
                  {project.embeddable && project.liveUrl && (
                    <button
                      type="button"
                      onClick={() => setLive((v) => !v)}
                      aria-pressed={live}
                      className="label shrink-0 border border-white/25 px-3 py-1 text-[0.62rem] transition hover:bg-white hover:text-ink"
                    >
                      {live ? "Back to screenshots" : "Load live preview"}
                    </button>
                  )}
                </div>
                <div className={`relative ${project.shotRatio ?? "aspect-[16/7.3]"} w-full bg-black`}>
                  {live && project.liveUrl ? (
                    <LivePreview url={project.liveUrl} title={`${project.name} live site preview`} />
                  ) : (
                    <Image
                      key={shot.src}
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(min-width: 1024px) 62vw, 100vw"
                      priority={i === 0}
                      className="animate-[fadein_0.7s_ease] object-cover object-top"
                    />
                  )}
                </div>
              </div>
            </Tilt>

            {/* thumbnail strip */}
            {!live && (
              <div className="mt-5 flex items-center gap-4">
                <p className="label w-28 shrink-0 tabular-nums opacity-70" aria-live="polite">
                  {String(i + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
                  <span className="mt-1 block truncate opacity-60 normal-case tracking-normal">{shot.caption}</span>
                </p>
                <ul className="no-scrollbar flex flex-1 gap-2 overflow-x-auto py-1">
                  {shots.map((s, n) => (
                    <li key={s.src} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => setI(n)}
                        aria-label={`Show screenshot ${n + 1}: ${s.caption}`}
                        aria-current={n === i}
                        style={n === i ? { borderColor: accent } : undefined}
                        className={`relative block h-12 w-24 overflow-hidden border transition ${n === i ? "" : "border-white/10 opacity-50 hover:opacity-100"}`}
                      >
                        <Image src={s.src} alt="" fill sizes="96px" className="object-cover object-top" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* copy */}
          <div className="flex flex-col gap-10 lg:col-span-4 lg:row-start-1 lg:pt-[8vw]">
            <p data-fade className="display text-[clamp(1.9rem,2.8vw,2.7rem)] leading-[1.05] tracking-[-0.01em]">
              {project.tagline}
            </p>
            <div data-fade className="space-y-6 text-[0.95rem] leading-relaxed text-[#efe6d6]/80">
              <p>{project.what}</p>
              <p>{project.why}</p>
            </div>
            <div data-fade>
              <p className="label mb-3 opacity-50">What I used</p>
              <Tags items={project.technologies} />
            </div>
            <div data-fade className="flex flex-wrap items-center gap-4">
              {project.liveUrl && (
                <Button href={project.liveUrl} tone="signal" external>
                  Visit live site
                </Button>
              )}
              {project.githubUrl && (
                <Button href={project.githubUrl} tone="outline" external>
                  GitHub
                </Button>
              )}
              <Link href={`/work/${project.slug}`} className="label u-link" data-cursor="Open">
                Case study
              </Link>
            </div>
          </div>
        </div>

        <ul className="mt-16 grid gap-x-10 gap-y-6 border-t border-white/15 pt-6 md:grid-cols-3">
          {project.interesting.slice(0, 3).map((t, n) => (
            <li key={t} data-fade className="flex gap-4 text-[0.9rem] leading-relaxed text-[#efe6d6]/75">
              <span className="label text-signal">0{n + 1}</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
      <style>{`@keyframes fadein{from{opacity:0;transform:scale(1.02)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
