import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { concepts } from "@/data/concepts";
import { ScrollEffects } from "@/components/scroll-effects";
import { PageHeader } from "@/components/page-header";
import { NextPage } from "@/components/next-page";
import { ProjectResume, ProjectStory, MobileApps } from "@/components/sections/work";
import { LibraeShowcase } from "@/components/sections/librae-showcase";
import { WorkIndex, type IndexRow } from "@/components/sections/work-index";
import { Footer } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Work",
  description: "Seven projects: a live 3D concept site, AI products, full-stack apps and two mobile apps, each with a case study.",
};

const num = (n: number) => String(n).padStart(2, "0");

export default function WorkPage() {
  const find = (slug: string) => {
    const i = projects.findIndex((p) => p.slug === slug);
    return { p: projects[i], n: num(i + 1) };
  };
  const resume = find("resumeforge");
  const librae = find("librae");
  const story = find("storyatlas");
  const mobile = projects.filter((p) => p.category.includes("Mobile"));

  const rows: IndexRow[] = [
    ...projects.map((p): IndexRow => ({
      key: p.slug,
      name: p.name,
      categories: p.category,
      year: p.year,
      kind: p.liveUrl ? "Live" : p.isPrivate ? "Private" : "Repo",
      href: `/work/${p.slug}`,
      image: p.image ?? p.screenshots[0]?.src,
    })),
    ...concepts.map((c): IndexRow => ({ key: c.slug, name: c.name, categories: c.category, year: 2026, kind: "Concept" })),
  ];

  return (
    <>
      <ScrollEffects />
      <PageHeader
        eyebrow="Work"
        title={
          <>
            Selected <em className="text-olive">work</em>
          </>
        }
        blurb="Every project here is something I built. Filter the index, or scroll for the longer stories. Each one opens into a full case study."
      />
      <WorkIndex rows={rows} index="00" />
      <ProjectResume p={resume.p} index={resume.n} />
      <LibraeShowcase project={librae.p} index={librae.n} />
      <ProjectStory p={story.p} index={story.n} />
      <MobileApps items={mobile} index={num(projects.findIndex((p) => p.slug === mobile[0].slug) + 1)} />
      <NextPage href="/concepts" eyebrow="Imagined briefs" title="Concepts" />
      <Footer />
    </>
  );
}
