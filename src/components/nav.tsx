"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

const links = [
  { n: "01", label: "Work", href: "/work" },
  { n: "02", label: "Concepts", href: "/concepts" },
  { n: "03", label: "About", href: "/about" },
  { n: "04", label: "Contact", href: "/contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState({ path: "", name: "" });
  const section = current.path === pathname ? current.name : "";
  const bar = useRef<HTMLDivElement>(null);

  // Scroll progress: scaleX written straight to the DOM, no re-renders.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  // Current-section label in the middle of the bar.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent({ path: pathname, name: e.target.getAttribute("data-section") ?? "" });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[80] text-white mix-blend-difference">
        <div ref={bar} className="h-[3px] origin-left bg-white" style={{ transform: "scaleX(0)" }} aria-hidden />
        <nav aria-label="Primary" className="gutter flex items-start justify-between pt-5">
          <Link href="/" className="group flex flex-col leading-none" aria-label={`${site.name}, home`}>
            <span className="display text-[1.7rem]">
              {site.short}
              <em>.</em>
            </span>
            <span className="label mt-1 hidden opacity-70 sm:block">{site.title}</span>
          </Link>

          <p className="label hidden pt-2 opacity-80 md:block" aria-hidden>
            {section ? <>● {section}</> : " "}
          </p>

          <ul className="hidden items-center gap-7 pt-1.5 md:flex lg:gap-9">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={pathname.startsWith(l.href) ? "page" : undefined} className="label u-link flex gap-2 aria-[current=page]:[background-size:100%_1px]">
                  <span className="opacity-60">{l.n}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="label -mr-2 flex items-center gap-3 px-2 py-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
            <span className="relative block h-2 w-5" aria-hidden>
              <span className={`absolute left-0 h-px w-full bg-white transition-all ${open ? "top-1 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-full bg-white transition-all ${open ? "top-1 -rotate-45" : "top-2"}`} />
            </span>
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-[70] flex flex-col justify-end gap-8 bg-ink px-[var(--gutter)] pb-12 pt-28 text-paper md:hidden"
      >
        <ul className="flex flex-col gap-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)} className="display flex items-baseline gap-4 text-[13vw] leading-[1]">
                <span className="label text-signal">{l.n}</span>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <a href={site.github} className="label u-link self-start" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </div>
    </>
  );
}
