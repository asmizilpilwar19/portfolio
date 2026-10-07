import type { Category } from "./projects";

/**
 * Imagined briefs: sites I'd build, NOT shipped or client work.
 * They are always labelled "Concept" in the UI and have no case-study page.
 */
export interface Concept {
  slug: "tidewater" | "fieldnote" | "kiln" | "orbit";
  name: string;
  brief: string;
  category: Category[];
  technologies: string[];
}

export const concepts: Concept[] = [
  {
    slug: "tidewater",
    name: "Tidewater Coffee",
    brief: "A small-batch roaster's storefront where every bag has its own page, tasting notes and a brew guide.",
    category: ["Web"],
    technologies: ["Next.js", "Tailwind", "Stripe Checkout"],
  },
  {
    slug: "fieldnote",
    name: "Fieldnote",
    brief: "A pocket app for birdwatchers and hikers: log a sighting in two taps, even with no signal.",
    category: ["Mobile"],
    technologies: ["React Native", "SQLite", "Offline sync"],
  },
  {
    slug: "kiln",
    name: "Kiln & Co.",
    brief: "A pottery studio site: class calendar, booking and a gallery that shows pieces in their glaze colours.",
    category: ["Web"],
    technologies: ["Next.js", "Calendar API", "Image CDN"],
  },
  {
    slug: "orbit",
    name: "Orbit Docs",
    brief: "Developer documentation with a command palette, live code samples and versioned pages.",
    category: ["Web"],
    technologies: ["MDX", "Next.js", "Search index"],
  },
];
