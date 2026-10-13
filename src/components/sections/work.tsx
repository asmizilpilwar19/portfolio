import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { concepts } from "@/data/concepts";
import { numberWord } from "@/lib/words";
import { BrowserFrame, PhoneFrame } from "@/components/ui/frames";
import { Button, StoryBlocks, Tags } from "@/components/ui/bits";
import { Tilt } from "@/components/ui/tilt";
import { ResumeForgePreview, ResumePaper } from "@/components/previews/resumeforge";
import { StoryAtlasPreview, StoryCharacter, StoryEditor, StoryHeatmap, StoryTimeline } from "@/components/previews/storyatlas";
import { MobilePoster, PhaseTimeline } from "@/components/previews/mobile-art";
import { FieldnoteArt, KilnArt, OrbitArt, TidewaterArt } from "@/components/previews/concept-art";

const actions = (p: Project, tone: "ink" | "paper" = "ink") => (
  <div data-fade className="mt-10 flex flex-wrap items-center gap-4">
    {p.githubUrl && (
      <Button href={p.githubUrl} external tone={tone}>
        GitHub
      </Button>
    )}
    {p.liveUrl && (
      <Button href={p.liveUrl} external tone="signal">
        Live site
      </Button>
    )}
    <Link href={`/work/${p.slug}`} className="label u-link" data-cursor="Open">
      Case study
    </Link>
  </div>
);

export function WorkIntro({ count }: { count: number }) {
  return (
    <div id="work" data-section="Work" className="gutter pb-6 pt-28 md:pb-10 md:pt-48">
      <div className="grid items-end gap-8 md:grid-cols-12">
        <h2 className="display text-[clamp(2.8rem,7.4vw,7.4rem)] md:col-span-9" data-split="words">
          Selected <em className="text-olive">work</em>
        </h2>
        <p data-fade className="label md:col-span-3 md:pb-4 md:text-right">
          ({String(count).padStart(2, "0")}) projects
          <br />
          <span className="opacity-60">Real repos, real READMEs</span>
        </p>
      </div>
    </div>
  );
}

/* 01: one huge image, name outside it, phones and a dark shot layered on top */
export function ProjectAperture({ p, index }: { p: Project; index: string }) {
  const phones = p.phones ?? [];
  return (
    <article id={p.slug} data-section={`${index} ${p.name}`} className="gutter py-20 md:py-36">
      <div className="flex items-end justify-between gap-6">
        <p className="label">
          <span className="text-signal">{index}</span> — AI workspace · {p.year}
        </p>
        <Tags items={p.category} className="hidden sm:flex" />
      </div>
      <h3 className="display mt-4 text-[clamp(4rem,14vw,15rem)] leading-[0.82] tracking-[-0.045em]" data-split>
        {p.name}
      </h3>

      <div className="relative mt-8 md:mt-14">
        <BrowserFrame src={p.image} alt={p.screenshots[0].alt} url="aperture.app/dashboard" ratio="aspect-[16/10]" priority sizes="92vw" clip />

        <div className="relative z-10 mt-6 flex justify-center gap-4 md:absolute md:-bottom-28 md:right-[2.5%] md:mt-0 md:w-[31%] md:justify-end">
          {phones.map((ph, n) => (
            <div key={ph.src} data-parallax={n === 1 ? "-8" : "6"} className={`w-[28%] md:w-[32%] ${n === 1 ? "md:-translate-y-8" : ""}`}>
              <PhoneFrame src={ph.src} alt={ph.alt} sizes="(min-width: 768px) 10vw, 28vw" />
            </div>
          ))}
        </div>

        <div className="absolute -bottom-20 left-[-2%] z-10 hidden w-[36%] -rotate-3 md:block" data-parallax="5">
          <Tilt max={5}>
            <BrowserFrame src="/work/aperture/chat-dark.webp" alt="Aperture chat in dark mode" url="aperture.app/chat" dark ratio="aspect-[16/10]" sizes="30vw" />
          </Tilt>
        </div>
      </div>

      <div className="mt-16 md:mt-44">
        <div className="grid gap-10 md:grid-cols-12">
          <p data-fade className="display text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.05] tracking-[-0.01em] md:col-span-5">
            {p.tagline}
          </p>
          <StoryBlocks className="md:col-span-7" what={p.what} why={p.why} used={p.technologies} interesting={p.interesting[0]} />
        </div>
        <div className="md:pl-[41.6%]">{actions(p)}</div>
      </div>
    </article>
  );
}

/* 02: asymmetric. Text column left, composed preview right and dropped lower */
export function ProjectResume({ p, index }: { p: Project; index: string }) {
  return (
    <article id={p.slug} data-section={`${index} ${p.name}`} className="relative overflow-hidden bg-pink py-24 md:py-40">
      <div className="gutter grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:pt-6">
          <p className="display outline select-none text-[clamp(5rem,11vw,10rem)] leading-[0.8]" aria-hidden data-shift="3">
            {index}
          </p>
          <p className="label mt-6 flex gap-3">
            <span className="text-signal">{index}</span> AI career platform · {p.year}
          </p>
          <h3 className="display mt-3 text-[clamp(2.9rem,5vw,5rem)]" data-split>
            {p.name}
          </h3>
          <p data-fade className="display mt-6 max-w-md text-[clamp(1.5rem,2.2vw,2.1rem)] leading-[1.08] tracking-[-0.01em]">
            {p.tagline}
          </p>
          <StoryBlocks className="mt-10" what={p.what} why={p.why} used={p.technologies.slice(0, 8)} interesting={p.interesting[0]} />
          {actions(p)}
        </div>

        <div className="relative lg:col-span-7 lg:mt-40">
          <Tilt max={3}>
            <BrowserFrame url="resumeforge.local/resumes/edit" ratio="aspect-[16/10]" sizes="58vw">
              <ResumeForgePreview />
            </BrowserFrame>
          </Tilt>
          <div className="absolute -bottom-10 right-[-3%] hidden w-[27%] rotate-[4deg] md:block" data-parallax="6">
            <ResumePaper />
          </div>
          <div
            className="absolute -top-8 left-[-4%] hidden w-[34%] rotate-[-3deg] border border-ink/15 bg-paper p-4 shadow-[0_24px_50px_-24px_rgba(27,26,23,0.5)] md:block"
            data-parallax="-5"
            aria-hidden
          >
            <p className="label mb-3 text-signal">Job tailoring</p>
            <div className="flex flex-wrap gap-1.5">
              {["keywords", "from the", "job posting", "matched to", "your resume"].map((k) => (
                <span key={k} className="label rounded-full border border-ink/25 px-2.5 py-1 text-[0.6rem]">
                  {k}
                </span>
              ))}
            </div>
          </div>
          <p className="label mt-6 opacity-60 md:mt-14">Preview drawn from the app&rsquo;s own palette and feature list. The repo has no screenshots.</p>
        </div>
      </div>
    </article>
  );
}

/* 04: editorial typography first, panels arrive on scroll */
export function ProjectStory({ p, index }: { p: Project; index: string }) {
  return (
    <article id={p.slug} data-section={`${index} ${p.name}`} className="relative overflow-hidden bg-olive py-24 text-paper md:py-40">
      <div className="gutter">
        <p className="label flex gap-3">
          <span className="text-pink">{index}</span> Writing workspace · {p.year}
        </p>
        <div className="display mt-8 text-[clamp(3.6rem,13vw,14rem)] leading-[0.84] tracking-[-0.045em]">
          <p data-shift="3">Stories,</p>
          <p data-shift="-3" className="pl-[8vw]">
            <em className="text-pink">mapped.</em>
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-28 lg:grid-cols-12">
          <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <h3 className="display text-[clamp(2.5rem,4vw,4rem)]" data-split>
              {p.name}
            </h3>
            <p data-fade className="display mt-5 max-w-md text-[clamp(1.4rem,2vw,1.9rem)] leading-[1.1]">
              {p.tagline}
            </p>
            <StoryBlocks className="mt-10" what={p.what} why={p.why} used={p.technologies} interesting={p.interesting[0]} />
            {actions(p, "paper")}
          </div>

          <div className="relative lg:col-span-7">
            <div data-fade>
              <Tilt max={3}>
                <BrowserFrame url="127.0.0.1:5000/dashboard" ratio="aspect-[16/10]" sizes="58vw">
                  <StoryAtlasPreview />
                </BrowserFrame>
              </Tilt>
            </div>
            <div className="mt-8 grid grid-cols-12 items-start gap-6">
              <div className="col-span-12 md:col-span-7" data-parallax="4">
                <StoryEditor className="rotate-[-1.5deg] shadow-2xl" />
              </div>
              <div className="col-span-12 flex flex-col gap-6 md:col-span-5 md:mt-16" data-parallax="-4">
                <StoryCharacter className="rotate-[1.5deg] shadow-2xl" />
                <StoryTimeline className="shadow-2xl" />
              </div>
              <div className="col-span-12 md:col-span-8 md:col-start-3" data-fade>
                <StoryHeatmap className="shadow-2xl" />
              </div>
            </div>
            <p className="label mt-8 opacity-60">Panels drawn from the app&rsquo;s own stylesheet and feature list. The repo has no screenshots.</p>
          </div>
        </div>
      </div>
    </article>
  );
}

/* 05: bento of clearly-labelled concepts */
export function Concepts({ index, bare = false }: { index: string; bare?: boolean }) {
  const art = { tidewater: <TidewaterArt />, fieldnote: <FieldnoteArt />, kiln: <KilnArt />, orbit: <OrbitArt /> };
  const spans = {
    tidewater: "md:col-span-7 md:row-span-2 aspect-[4/3] md:aspect-auto md:min-h-[34rem]",
    fieldnote: "md:col-span-5 aspect-[4/4.6] md:aspect-auto md:min-h-[24rem]",
    kiln: "md:col-span-5 aspect-[16/11] md:aspect-auto md:min-h-[22rem]",
    orbit: "md:col-span-12 aspect-[16/9] md:aspect-[16/6]",
  } as const;

  return (
    <section id="concepts" data-section={`${index} Concepts`} className={bare ? "pb-24 md:pb-40" : "bg-paper-2 py-24 md:py-40"}>
      <div className="gutter">
        <div className={bare ? "hidden" : "grid items-end gap-8 md:grid-cols-12"}>
          <div className="md:col-span-8">
            <p className="label flex gap-3">
              <span className="text-signal">{index}</span> Concepts · imagined briefs
            </p>
            <h3 className="display mt-4 text-[clamp(2.8rem,5.4vw,5.4rem)]" data-split>
              Sites I&rsquo;d <em className="text-olive">build</em>
            </h3>
          </div>
          <p data-fade className="max-w-sm text-[0.95rem] leading-relaxed text-ink-2 md:col-span-4">
            These four are <strong className="font-semibold">not client work and not shipped</strong>. They&rsquo;re quick design sketches of the kind of brief I&rsquo;d enjoy: a storefront, a mobile app, a booking site and a docs site.
          </p>
        </div>

        <div className={`grid gap-5 md:auto-rows-auto md:grid-cols-12 ${bare ? "" : "mt-14 md:mt-20"}`}>
          {concepts.map((c, n) => (
            <figure key={c.slug} data-fade className={`group flex flex-col ${spans[c.slug]}`}>
              <div className="relative flex-1 overflow-hidden rounded-[6px] border border-ink/10 shadow-[0_30px_60px_-35px_rgba(27,26,23,0.6)]">
                <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]">{art[c.slug]}</div>
                <span className="label absolute right-3 top-3 z-10 bg-paper px-2.5 py-1 text-[0.62rem] text-ink">Concept {String(n + 1).padStart(2, "0")}</span>
              </div>
              <figcaption className="mt-4 flex items-start justify-between gap-6">
                <div>
                  <p className="display text-[1.9rem] leading-none">{c.name}</p>
                  <p className="mt-2 max-w-md text-[0.9rem] leading-snug text-ink-2">{c.brief}</p>
                </div>
                <Tags items={c.technologies} className="hidden max-w-[14rem] justify-end lg:flex" />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}


/* 06+: mobile apps, shown as illustrated posters with written explanations (no screenshots) */
export function MobileApps({ items, index }: { items: Project[]; index: string }) {
  const phased = items.find((p) => p.phases?.length);
  return (
    <section id="mobile" data-section={`${index} Mobile`} className="bg-ink py-24 text-paper md:py-40">
      <div className="gutter">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="label flex gap-3">
              <span className="text-signal">{index}</span> Mobile apps · private projects
            </p>
            <h3 className="display mt-4 text-[clamp(2.8rem,6.2vw,6.2rem)]" data-split>
              In your <em className="text-pink">pocket</em>
            </h3>
          </div>
          <p data-fade className="max-w-sm text-[0.95rem] leading-relaxed text-paper/70 md:col-span-4">
            These {numberWord(items.length)} aren&rsquo;t public on GitHub, so there are no screenshots. Here is what each one is, with an illustration of its idea.
          </p>
        </div>

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-2 md:gap-14 lg:grid-cols-3 lg:gap-10">
          {items.map((p, n) => (
            <article key={p.slug} id={p.slug} className={["", "md:mt-40 lg:mt-24", "lg:mt-48"][n % 3]}>
              <div data-fade>
                <Tilt max={4}>
                  <div className="relative overflow-hidden rounded-[6px] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)]">
                    {p.art && <MobilePoster art={p.art} />}
                    <span className="label absolute left-3 top-3 bg-ink px-2.5 py-1 text-[0.62rem] text-paper">Illustration · not a screenshot</span>
                  </div>
                </Tilt>
              </div>
              <p className="label mt-8 flex items-center justify-between">
                <span>
                  <span className="text-signal">{String(Number(index) + n).padStart(2, "0")}</span> — {p.status}
                </span>
                <span className="opacity-60">{p.year}</span>
              </p>
              <h4 className="display mt-3 text-[clamp(2.6rem,6vw,4.4rem)] lg:text-[clamp(2.2rem,3.3vw,3.6rem)]" data-split>
                {p.name}
              </h4>
              <p data-fade className="display mt-4 max-w-md text-[clamp(1.4rem,2vw,1.9rem)] leading-[1.1] tracking-[-0.01em]">
                {p.tagline}
              </p>
              <p data-fade className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-paper/75">
                {p.what}
              </p>
              {p.features && (
                <ul data-fade className="mt-8 flex flex-wrap gap-2">
                  {p.features.slice(0, 8).map((f) => (
                    <li key={f} className="label rounded-full border border-paper/25 px-3 py-1.5 text-[0.62rem] normal-case tracking-[0.04em] text-paper/80">
                      {f}
                    </li>
                  ))}
                  {p.features.length > 8 && <li className="label px-1 py-1.5 text-[0.62rem] text-paper/50">+{p.features.length - 8} more</li>}
                </ul>
              )}
              <div data-fade className="mt-8 flex flex-wrap items-center gap-5">
                <Button href={`/work/${p.slug}`} tone="signal">
                  Case study
                </Button>
                {p.technologies.length > 0 && <Tags items={p.technologies.slice(0, 3)} />}
              </div>
            </article>
          ))}
        </div>

        {phased?.phases && (
          <div className="mt-28 border-t border-paper/20 pt-10 md:mt-44">
            <p className="label mb-10 flex items-center justify-between">
              <span>{phased.name}: built in {numberWord(phased.phases.length)} phases</span>
              <span className="opacity-50">Plan → ship</span>
            </p>
            <PhaseTimeline phases={phased.phases} tone="paper" />
          </div>
        )}
      </div>
    </section>
  );
}

/* KINESYS: a loud product-launch layout in the project's own electric-blue, Y2K identity */
export function ProjectKinesys({ p, index }: { p: Project; index: string }) {
  const [hero, detail, exploded] = p.screenshots;
  const phone = p.phones?.[0];
  const LIME = "#c8ff2e";
  return (
    <article
      id={p.slug}
      data-section={`${index} ${p.name}`}
      className="group relative overflow-hidden py-24 text-paper md:py-40"
      style={{ background: "linear-gradient(160deg,#06061c 0%,#14128f 48%,#4a1d9a 100%)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.07) 1px,transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage: "linear-gradient(to bottom,black,transparent 80%)",
          WebkitMaskImage: "linear-gradient(to bottom,black,transparent 80%)",
        }}
      />

      <div className="gutter relative">
        <div className="label flex items-center justify-between gap-6">
          <span>
            <span style={{ color: LIME }}>{index}</span> — Product launch · {p.year}
          </span>
          <Tags items={p.category} className="hidden sm:flex" />
        </div>

        <h3
          className="mt-6 select-none font-normal uppercase leading-[0.82] tracking-tighter"
          style={{
            fontFamily: "var(--font-archivo), sans-serif",
            fontSize: "clamp(3.2rem,14.5vw,15rem)",
            color: "transparent",
            WebkitTextStroke: "2px rgba(255,255,255,0.62)",
          }}
          data-split
        >
          {p.name}
        </h3>

        <div className="mt-12 grid items-center gap-14 lg:mt-16 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-5">
            <p
              data-fade
              className="text-[clamp(1.4rem,2.2vw,2.1rem)] font-normal uppercase leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              {p.tagline}
            </p>
            <StoryBlocks className="mt-10" what={p.what} why={p.why} used={p.technologies} interesting={p.interesting[0]} />
            <div data-fade className="mt-10 flex flex-wrap items-center gap-4">
              {p.liveUrl && (
                <Button href={p.liveUrl} external tone="lime">
                  Live site
                </Button>
              )}
              {p.githubUrl && (
                <Button href={p.githubUrl} external tone="outline">
                  GitHub
                </Button>
              )}
              <Link href={`/work/${p.slug}`} className="label u-link" data-cursor="Open">
                Case study
              </Link>
            </div>
            <p className="label mt-6 max-w-sm normal-case tracking-normal opacity-60">
              KINESYS is a fictional brand. The product renders are generated in code and the specs are illustrative.
            </p>
          </div>

          <div className="relative min-w-0 pb-16 lg:col-span-7 lg:pb-24">
            <div
              data-parallax="3"
              className="origin-center transition-transform duration-700 ease-out [transform:perspective(1200px)_rotateY(-9deg)_rotateX(3deg)] group-hover:[transform:perspective(1200px)_rotateY(-3deg)_rotateX(1deg)_scale(1.015)]"
            >
              <BrowserFrame src={hero.src} alt={hero.alt} url="kinesys-headphones.vercel.app" dark ratio="aspect-[16/10]" sizes="(min-width: 1024px) 56vw, 92vw" />
            </div>

            <div
              data-parallax="-5"
              className="absolute -bottom-2 left-[-2%] hidden w-[38%] -rotate-3 transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:-rotate-[5deg] md:block"
            >
              <BrowserFrame src={detail.src} alt={detail.alt} dark ratio="aspect-[16/10]" sizes="24vw" />
            </div>

            {phone && (
              <div data-parallax="6" className="absolute -bottom-2 right-[2%] w-[16%] min-w-[84px] rotate-[5deg]">
                <PhoneFrame src={phone.src} alt={phone.alt} sizes="(min-width: 1024px) 10vw, 22vw" />
              </div>
            )}

            <span
              className="label absolute right-[3%] top-[-1.4rem] px-3 py-1.5 font-bold text-[#0b0b2a]"
              style={{ background: LIME }}
            >
              KX-1 Signal
            </span>
          </div>
        </div>

        <figure className="mt-10 lg:mt-16" data-fade>
          <div className="relative aspect-[16/6] overflow-hidden rounded-[8px] border border-white/15 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
            <Image src={exploded.src} alt={exploded.alt} fill sizes="92vw" className="object-cover object-center" />
          </div>
          <figcaption className="label mt-3 flex items-center justify-between opacity-70">
            <span>
              <span style={{ color: LIME }}>03</span> — {exploded.caption}
            </span>
            <span>Scroll-driven image sequence</span>
          </figcaption>
        </figure>
      </div>
    </article>
  );
}
