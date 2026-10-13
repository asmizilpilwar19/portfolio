import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProject, projects, pushedOn, siblings } from "@/data/projects";
import { ScrollEffects } from "@/components/scroll-effects";
import { BrowserFrame, PhoneFrame } from "@/components/ui/frames";
import { Arrow, Button, Tags } from "@/components/ui/bits";
import { ResumeForgePreview } from "@/components/previews/resumeforge";
import { StoryAtlasPreview } from "@/components/previews/storyatlas";
import { MobilePoster, PhaseTimeline } from "@/components/previews/mobile-art";
import { Footer } from "@/components/sections/contact";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProject(slug);
  return p ? { title: `${p.name} — case study`, description: p.tagline } : {};
}

const Row = ({ k, children }: { k: string; children: React.ReactNode }) => (
  <div className="grid gap-4 border-t border-ink/25 py-10 md:grid-cols-12 md:py-14">
    <p className="label md:col-span-3">{k}</p>
    <div className="md:col-span-8">{children}</div>
  </div>
);

export default function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[100svh]" aria-hidden />}>
      <CaseStudy params={props.params} />
    </Suspense>
  );
}

async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const { next, index } = siblings(p.slug);
  const updated = pushedOn(p.repo);
  const wide = p.shotRatio ?? "aspect-[1600/698]";
  const host = p.liveUrl ? new URL(p.liveUrl).host : p.githubUrl ? p.githubUrl.replace("https://", "") : "private project";
  const hasBrowser = !p.art;

  return (
    <>
      <ScrollEffects />
      <article data-section={p.name}>
        <header className="gutter pt-32 md:pt-44">
          <div className="flex items-center justify-between">
            <Link href="/work" className="label u-link inline-flex items-center gap-2">
              <Arrow className="-rotate-[135deg]" /> All work
            </Link>
            <p className="label">
              Case study <span className="text-signal">{String(index).padStart(2, "0")}</span> / {String(projects.length).padStart(2, "0")}
            </p>
          </div>
          <h1 className="display mt-10 text-[clamp(3.4rem,12vw,12rem)] leading-[0.84] tracking-[-0.045em]" data-split>
            {p.name}
          </h1>
          <div className="mt-10 grid gap-8 md:grid-cols-12">
            <p className="display max-w-2xl text-[clamp(1.7rem,3vw,2.8rem)] leading-[1.05] tracking-[-0.01em] md:col-span-7">{p.tagline}</p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 md:col-span-5">
              {[
                ["Year", String(p.year)],
                ["Type", p.category.join(" / ")],
                ["Status", p.status],
                ["Source", p.isPrivate ? "Private" : (p.repo ?? "")],
                ...(updated ? [["Last push", updated]] : []),
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="label opacity-50">{k}</dt>
                  <dd className="mt-1 text-[0.95rem]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          {(p.liveUrl || p.githubUrl) && (
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {p.liveUrl && (
                <Button href={p.liveUrl} tone="signal" external>
                  Visit live site
                </Button>
              )}
              {p.githubUrl && (
                <Button href={p.githubUrl} external>
                  View on GitHub
                </Button>
              )}
            </div>
          )}
        </header>

        {/* hero visual over an accent band */}
        <div className="relative mt-16 md:mt-24">
          <div className="absolute inset-x-0 bottom-0 top-1/3" style={{ background: p.accent }} aria-hidden />
          <div className="gutter relative pb-16 md:pb-24">
            {hasBrowser ? (
              <>
                <BrowserFrame url={host} src={p.image} alt={p.screenshots[0]?.alt} ratio={wide} priority sizes="92vw" clip={!!p.image}>
                  {p.preview === "resumeforge" && <ResumeForgePreview />}
                  {p.preview === "storyatlas" && <StoryAtlasPreview />}
                </BrowserFrame>
                {p.preview && (
                  <p className="label mt-4 text-paper mix-blend-difference">
                    This repo has no screenshots, so this preview is drawn from the app&rsquo;s own palette and feature list.
                  </p>
                )}
              </>
            ) : (
              <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-12">
                <div className="md:col-span-5">
                  <div className="overflow-hidden rounded-[6px] shadow-[0_50px_100px_-40px_rgba(27,26,23,0.7)]">
                    {p.art && <MobilePoster art={p.art} />}
                  </div>
                </div>
                <div className="md:col-span-7">
                  <p className="label mb-4 text-paper mix-blend-difference">Illustration, not a screenshot</p>
                  <p className="display text-[clamp(2rem,4vw,3.6rem)] leading-[1.02] tracking-[-0.01em] text-ink">
                    This project is private, so instead of screenshots there is an illustration and a short description.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="gutter mt-10 md:mt-20">
          <Row k="Overview">
            <p data-fade className="display text-[clamp(1.6rem,2.8vw,2.6rem)] leading-[1.12] tracking-[-0.01em]">{p.what}</p>
            <p data-fade className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-ink-2">{p.why}</p>
          </Row>
          {p.problem && (
            <Row k="The problem">
              <p data-fade className="max-w-2xl text-[1.1rem] leading-relaxed">{p.problem}</p>
            </Row>
          )}
          {p.solution && (
            <Row k="The approach">
              <p data-fade className="max-w-2xl text-[1.1rem] leading-relaxed">{p.solution}</p>
            </Row>
          )}
          {p.features && (
            <Row k="What's inside">
              <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {p.features.map((f, n) => (
                  <li key={f} data-fade className="flex gap-4 border-b border-ink/15 pb-4 text-[1rem] leading-snug">
                    <span className="label pt-0.5 text-signal">{String(n + 1).padStart(2, "0")}</span>
                    {f}
                  </li>
                ))}
              </ul>
            </Row>
          )}
          <Row k="What makes it interesting">
            <ol className="space-y-6">
              {p.interesting.map((t, n) => (
                <li key={t} data-fade className="flex gap-5">
                  <span className="label pt-1.5 text-signal">{String(n + 1).padStart(2, "0")}</span>
                  <span className="display text-[clamp(1.35rem,2vw,1.9rem)] leading-[1.15] tracking-[-0.005em]">{t}</span>
                </li>
              ))}
            </ol>
          </Row>
          {p.phases && (
            <Row k="How it was built">
              <PhaseTimeline phases={p.phases} />
            </Row>
          )}
          {p.technologies.length > 0 && (
            <Row k="What I used">
              <Tags items={p.technologies} className="text-[0.8rem]" />
            </Row>
          )}
          {p.learned.length > 0 && (
            <Row k="What I learned">
              <ul className="space-y-4">
                {p.learned.map((t) => (
                  <li key={t} data-fade className="max-w-2xl text-[1.05rem] leading-relaxed">{t}</li>
                ))}
              </ul>
            </Row>
          )}
        </div>

        {p.screenshots.length > 0 && (
          <section className="gutter mt-10 md:mt-20" aria-label="Screenshots">
            <p className="label mb-8">Screens ({String(p.screenshots.length).padStart(2, "0")})</p>
            <div className="grid gap-x-6 gap-y-14 md:grid-cols-12">
              {p.screenshots.map((s, n) => {
                const span = n % 3 === 0 ? "md:col-span-8" : n % 3 === 1 ? "md:col-span-4 md:mt-24" : "md:col-span-6 md:col-start-4";
                return (
                  <figure key={s.src} className={span}>
                    <BrowserFrame src={s.src} alt={s.alt} ratio={n % 3 === 1 ? "aspect-[4/3]" : wide} sizes="(min-width: 768px) 60vw, 100vw" clip />
                    <figcaption className="label mt-3 flex gap-3">
                      <span className="text-signal">{String(n + 1).padStart(2, "0")}</span> {s.caption}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
            {p.phones && (
              <div className="mt-20 flex flex-wrap items-end justify-center gap-6 md:gap-12">
                {p.phones.map((ph, n) => (
                  <div key={ph.src} data-fade className={`w-[38%] max-w-[15rem] ${n === 1 ? "md:-translate-y-10" : ""}`}>
                    <PhoneFrame src={ph.src} alt={ph.alt} />
                    <p className="label mt-4 text-center">{ph.caption}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        <Link href={`/work/${next.slug}`} data-cursor="Next" className="group gutter mt-28 block border-t border-ink/25 py-14 md:mt-40 md:py-20">
          <p className="label flex items-center justify-between">
            <span>Next case study</span>
            <span className="text-signal">{String((index % projects.length) + 1).padStart(2, "0")}</span>
          </p>
          <p className="display mt-6 flex items-end justify-between gap-6 text-[clamp(3rem,9vw,9rem)] leading-[0.86] tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-3">
            {next.name}
            <Arrow className="mb-[1.2vw] text-[clamp(1.6rem,4vw,4rem)] text-signal" />
          </p>
        </Link>
      </article>
      <Footer />
    </>
  );
}
