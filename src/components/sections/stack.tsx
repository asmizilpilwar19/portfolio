"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { stack } from "@/data/stack";

/** "I work with": five groups, one open at a time; hover or tap to reveal what's inside. */
export function Stack({ index }: { index: string }) {
  const [open, setOpen] = useState(0);
  const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <section id="stack" data-section={`${index} Stack`} className="bg-ink py-24 text-paper md:py-40">
      <div className="gutter">
        <p className="label flex gap-3">
          <span className="text-signal">{index}</span> What I work with
        </p>
        <h3 className="display mt-4 max-w-4xl text-[clamp(2.5rem,5vw,5rem)]" data-split>
          Five areas, all <em className="text-pink">in the repos</em>
        </h3>
        <p data-fade className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-paper/70">
          Each tag below appears in a project you can open. The grey line says where.
        </p>

        <ul className="mt-14 border-t border-paper/20 md:mt-20">
          {stack.map((g, i) => {
            const isOpen = open === i;
            return (
              <li key={g.label} className="border-b border-paper/20" onPointerEnter={() => finePointer() && setOpen(i)}>
                <h4>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`stack-${i}`}
                    onClick={() => setOpen(i)}
                    className="group flex w-full items-baseline gap-4 py-5 text-left md:gap-8 md:py-7"
                  >
                    <span className="label w-8 text-signal md:w-14">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`display flex-1 text-[clamp(2.2rem,5vw,5rem)] leading-[0.95] transition-all duration-500 ${isOpen ? "translate-x-2 text-paper" : "text-paper/35 group-hover:text-paper/70"}`}>
                      {g.label}
                    </span>
                    <span className={`label hidden max-w-[16rem] text-paper/60 transition-opacity md:block ${isOpen ? "opacity-100" : "opacity-0"}`}>{g.blurb}</span>
                    <span aria-hidden className={`display text-3xl transition-transform duration-500 ${isOpen ? "rotate-45 text-signal" : ""}`}>
                      +
                    </span>
                  </button>
                </h4>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`stack-${i}`}
                      role="region"
                      aria-label={`${g.label} technologies`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="grid gap-x-10 gap-y-5 pb-9 pl-12 sm:grid-cols-2 md:pl-[5.5rem] lg:grid-cols-3">
                        {g.items.map((t, n) => (
                          <motion.li
                            key={t.name}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 + n * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <p className="display text-[1.7rem] leading-none">{t.name}</p>
                            <p className="label mt-2 text-paper/50 normal-case tracking-normal">{t.seenIn}</p>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
