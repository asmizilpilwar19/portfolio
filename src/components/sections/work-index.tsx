"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import type { Category } from "@/data/projects";
import { Arrow } from "@/components/ui/bits";

export interface IndexRow {
  key: string;
  name: string;
  categories: Category[];
  year: number;
  kind: "Live" | "Repo" | "Private" | "Concept";
  href?: string;
  image?: string;
  alt?: string;
}

const FILTERS = ["All", "AI", "Web", "Full Stack", "Mobile"] as const;

export function WorkIndex({ rows, index }: { rows: IndexRow[]; index: string }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [hover, setHover] = useState<IndexRow | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 26 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 26 });

  const counts = useMemo(
    () => Object.fromEntries(FILTERS.map((f) => [f, f === "All" ? rows.length : rows.filter((r) => r.categories.includes(f as Category)).length])),
    [rows],
  );
  const shown = rows.filter((r) => filter === "All" || r.categories.includes(filter as Category));

  return (
    <section id="index" data-section={`${index} Index`} className="gutter py-24 md:py-40">
      <div className="grid items-end gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="label flex gap-3">
            <span className="text-signal">{index}</span> Everything, in order
          </p>
          <h3 className="display mt-4 text-[clamp(2.8rem,5.4vw,5.4rem)]" data-split>
            The <em className="text-olive">index</em>
          </h3>
        </div>
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-x-6 gap-y-3 md:col-span-7 md:justify-end">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`label relative pb-1.5 transition-opacity ${filter === f ? "opacity-100" : "opacity-45 hover:opacity-100"}`}
            >
              {f} <sup className="text-[0.55rem]">{counts[f]}</sup>
              {filter === f && <motion.span layoutId="filter-underline" className="absolute inset-x-0 bottom-0 h-px bg-ink" />}
            </button>
          ))}
        </div>
      </div>

      <ul
        className="mt-12 border-t border-ink/25"
        onPointerMove={(e) => {
          x.set(e.clientX + 28);
          y.set(e.clientY - 90);
        }}
        onPointerLeave={() => setHover(null)}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((r, i) => {
            const body = (
              <>
                <span className="label w-8 shrink-0 tabular-nums opacity-50 md:w-14">{String(i + 1).padStart(2, "0")}</span>
                <span className="display flex-1 text-[clamp(1.7rem,3.2vw,3rem)] leading-none transition-transform duration-500 group-hover:translate-x-3 group-focus-visible:translate-x-3">
                  {r.name}
                </span>
                <span className="label hidden w-56 opacity-60 md:block">{r.categories.join(" / ")}</span>
                <span className={`label hidden w-24 sm:block ${r.kind === "Concept" ? "text-ink/55" : ""}`}>
                  {r.kind === "Live" ? <span className="text-signal">● Live</span> : r.kind}
                </span>
                <span className="label w-12 text-right opacity-60">{r.year}</span>
                {r.href ? <Arrow className="ml-4 hidden text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:block" /> : <span className="ml-4 hidden w-[1em] sm:block" />}
              </>
            );
            const cls = "group flex items-center gap-3 border-b border-ink/25 py-5 md:gap-4 md:py-6";
            return (
              <motion.li
                key={r.key}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onPointerEnter={() => setHover(r)}
              >
                {r.href ? (
                  <Link href={r.href} className={cls} onFocus={() => setHover(r)} onBlur={() => setHover(null)}>
                    {body}
                  </Link>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      {/* cursor-following thumbnail, fine pointers only */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        animate={{ opacity: hover?.image ? 1 : 0, scale: hover?.image ? 1 : 0.9 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-40 w-64 overflow-hidden rounded-[4px] border border-ink/20 bg-paper shadow-2xl [@media(hover:hover)_and_(pointer:fine)]:block"
      >
        {hover?.image && <Image src={hover.image} alt="" fill sizes="256px" className="object-cover object-top" />}
      </motion.div>
    </section>
  );
}
