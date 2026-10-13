import { featuredSlug, projects } from "@/data/projects";
import { ScrollEffects } from "@/components/scroll-effects";
import { Hero } from "@/components/hero/hero";
import { Explore, Manifesto } from "@/components/sections/intro";
import { Featured } from "@/components/sections/featured";
import { ProjectKinesys, WorkIntro } from "@/components/sections/work";
import { Contact, Footer } from "@/components/sections/contact";

const num = (n: number) => String(n).padStart(2, "0");

export default function Home() {
  const find = (slug: string) => {
    const i = projects.findIndex((p) => p.slug === slug);
    return { p: projects[i], n: num(i + 1) };
  };
  const featured = find(featuredSlug);
  const kinesys = find("kinesys");

  return (
    <>
      <ScrollEffects />
      <Hero />
      <Manifesto />
      <Featured project={featured.p} />
      <WorkIntro count={projects.length} />
      <ProjectKinesys p={kinesys.p} index={kinesys.n} />
      <Explore />
      <Contact />
      <Footer />
    </>
  );
}
