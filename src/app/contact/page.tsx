import type { Metadata } from "next";
import { ScrollEffects } from "@/components/scroll-effects";
import { Contact, Footer } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Say hello. GitHub, plus email and LinkedIn when set.",
};

export default function ContactPage() {
  return (
    <>
      <ScrollEffects />
      <Contact standalone />
      <Footer />
    </>
  );
}
