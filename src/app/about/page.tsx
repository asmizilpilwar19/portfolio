import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ScrollEffects } from "@/components/scroll-effects";
import { PageHeader } from "@/components/page-header";
import { NextPage } from "@/components/next-page";
import { Profile, Statements } from "@/components/sections/intro";
import { Stack } from "@/components/sections/stack";
import { Footer } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "About",
  description: "Who I am, what I build and the technologies behind each project.",
};

export default function AboutPage() {
  return (
    <>
      <ScrollEffects />
      <PageHeader
        eyebrow="About"
        title={
          <>
            Hello, I&rsquo;m <em className="text-olive">Asmi.</em>
          </>
        }
        blurb="A developer who likes the whole path from idea to something you can run: the interface, the data behind it and the README that explains it."
      />
      <Statements />
      <Profile />
      <Stack index={String(projects.length + 2).padStart(2, "0")} />
      <NextPage href="/contact" eyebrow="Got something in mind?" title="Contact" />
      <Footer />
    </>
  );
}
