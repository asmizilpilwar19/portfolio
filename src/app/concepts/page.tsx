import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ScrollEffects } from "@/components/scroll-effects";
import { PageHeader } from "@/components/page-header";
import { NextPage } from "@/components/next-page";
import { Concepts } from "@/components/sections/work";
import { Footer } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Concepts",
  description: "Four imagined website and app briefs. Design sketches, not client work.",
};

export default function ConceptsPage() {
  return (
    <>
      <ScrollEffects />
      <PageHeader
        eyebrow="Concepts · imagined briefs"
        title={
          <>
            Sites I&rsquo;d <em className="text-olive">build</em>
          </>
        }
        blurb="These four are not client work and not shipped. They are quick design sketches of the kind of brief I would enjoy: a storefront, a mobile app, a booking site and a docs site."
      />
      <Concepts index={String(projects.length + 1).padStart(2, "0")} bare />
      <NextPage href="/about" eyebrow="Who is behind this" title="About" />
      <Footer />
    </>
  );
}
