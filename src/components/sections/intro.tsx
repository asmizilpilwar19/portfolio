import Link from "next/link";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { capitalWord, numberWord } from "@/lib/words";
import { Marquee } from "@/components/ui/marquee";
import { Arrow } from "@/components/ui/bits";

const statements = [
  {
    n: "01",
    head: ["I build", "web experiences."],
    note: "React and Next.js on the front, Python, Node or FastAPI behind it, and the 3D and motion layer when a page deserves it. AURA and ELSEWHERE are where all of that goes up a notch.",
    align: "left",
  },
  {
    n: "02",
    head: ["I create", "AI products."],
    note: "Aperture streams chat, reads your documents and summarises them. ResumeForge rewrites bullet points and tailors a resume to a job posting, and runs in a mock mode so you can try it without an API key.",
    align: "right",
  },
  {
    n: "03",
    head: ["I like turning", "ideas into", "something real."],
    note: "Most of my projects began as a small idea, like a perfume that changes with your mood or a writing desk for novelists, and ended with auth, a database and a README that explains how to run it.",
    align: "left",
  },
] as const;

/** Home: one compact, typographic statement with a marquee above it. */
export function Manifesto() {
  return (
    <section data-section="Intro" className="relative pb-24 pt-10 md:pb-40">
      <Marquee
        items={["Web", "AI", "Full-stack", "Mobile", "3D", "Interfaces"]}
        className="display border-y border-ink/20 py-4 text-[clamp(2rem,5vw,4.5rem)] leading-none"
        speed={44}
      />
      <div className="gutter mt-20 grid items-end gap-10 md:mt-32 md:grid-cols-12">
        <h2 data-shift="2" className="display text-[clamp(2.4rem,6vw,6.4rem)] leading-[0.92] md:col-span-9">
          {["I build web experiences,", "create AI products,", "and ship ideas as apps."].map((l, i) => (
            <span key={l} className="block" data-split data-delay={i * 0.05}>
              {i === 2 ? <em className="text-olive">{l}</em> : l}
            </span>
          ))}
        </h2>
        <div data-fade className="md:col-span-3">
          <p className="text-[0.95rem] leading-relaxed text-ink-2">
            {capitalWord(projects.length)} projects, from live 3D concept sites to {numberWord(projects.filter((p) => p.category.includes("Mobile")).length)} mobile apps. Each has its own page with the full story.
          </p>
          <Link href="/about" className="label u-link mt-5 inline-flex items-center gap-2" data-cursor="Open">
            More about me <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** About page: the three big statements with scroll-driven drift. */
export function Statements() {
  return (
    <section data-section="Statements" className="gutter space-y-24 pb-16 pt-6 md:space-y-44 md:pb-24">
      {statements.map((s) => (
        <div key={s.n} className="relative grid items-end gap-8 md:grid-cols-12">
          <h2
            data-shift={s.align === "left" ? "2.5" : "-2.5"}
            className={`display text-[clamp(2.4rem,6.4vw,6.8rem)] leading-[0.92] md:col-span-9 ${s.align === "right" ? "md:col-start-4 md:text-right" : ""}`}
          >
            {s.head.map((l, i) => (
              <span key={l} className="block" data-split data-delay={i * 0.05}>
                {i === s.head.length - 1 ? <em className="text-olive">{l}</em> : l}
              </span>
            ))}
          </h2>
          <div className={`md:col-span-3 ${s.align === "right" ? "md:col-start-1 md:row-start-1" : "md:col-start-10"}`} data-fade>
            <p className="label mb-3 text-signal">{s.n}</p>
            <p className="text-[0.95rem] leading-relaxed text-ink-2">{s.note}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export function Profile() {
  const live = projects.filter((p) => p.liveUrl).length;
  const mobile = projects.filter((p) => p.category.includes("Mobile")).length;
  return (
    <section data-section="Profile" className="gutter grid gap-10 border-t border-ink/20 pb-24 pt-8 md:grid-cols-12 md:pb-40">
      <p className="label md:col-span-3">(Profile)</p>
      <div className="md:col-span-5">
        <p data-fade className="display text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.08] tracking-[-0.01em]">
          I&rsquo;m Asmi. I write software, mostly TypeScript and Python, and I care about the gap between &ldquo;it works&rdquo; and &ldquo;it feels right&rdquo;.
        </p>
        <p data-fade className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-ink-2">
          My public repositories range from a chess engine with a GUI to a full-stack AI workspace, and I also build mobile apps with Expo. This site shows the projects I&rsquo;d most like you to open. The rest are a click away on GitHub.
        </p>
      </div>
      <dl className="grid grid-cols-3 gap-6 md:col-span-4 md:col-start-9 md:self-end">
        {[
          [String(projects.length).padStart(2, "0"), "Case studies"],
          [String(mobile).padStart(2, "0"), "Mobile apps"],
          [String(live).padStart(2, "0") + " / " + site.publicRepos, "Live / public repos"],
        ].map(([v, k]) => (
          <div key={k} data-fade>
            <dt className="label opacity-60">{k}</dt>
            <dd className="display mt-1 text-[clamp(2rem,3.4vw,3.2rem)]">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Home: big doorways to the other pages. */
export function Explore() {
  const items = [
    { n: "01", href: "/work", title: "All work", blurb: `${capitalWord(projects.length)} case studies, filterable, each with its own layout.` },
    { n: "02", href: "/concepts", title: "Concepts", blurb: "Four imagined sites, clearly labelled as sketches." },
    { n: "03", href: "/about", title: "About & stack", blurb: "Who I am and what I work with, with receipts." },
  ];
  return (
    <section data-section="Explore" className="gutter py-24 md:py-40">
      <p className="label mb-8">(Keep exploring)</p>
      <ul className="border-t border-ink/25">
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} data-cursor="Go" className="group grid items-baseline gap-4 border-b border-ink/25 py-8 md:grid-cols-12 md:py-12">
              <span className="label text-signal md:col-span-1">{it.n}</span>
              <span className="display text-[clamp(2.5rem,6vw,6rem)] leading-[0.92] transition-transform duration-500 group-hover:translate-x-4 md:col-span-7">
                {it.title}
              </span>
              <span className="text-[0.95rem] leading-relaxed text-ink-2 md:col-span-3">{it.blurb}</span>
              <Arrow className="hidden justify-self-end text-3xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:col-span-1 md:block" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
