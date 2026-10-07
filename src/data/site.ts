import generated from "./github.generated.json";

// Edit this file to change the personal details used across the site.
// Anything left as an empty string is simply hidden in the UI.
export const site = {
  name: "Asmi Zilpilwar",
  short: "Asmi",
  title: "Software & AI developer",
  year: 2026,
  github: "https://github.com/asmizilpilwar19",
  githubHandle: "asmizilpilwar19",
  linkedin: "https://www.linkedin.com/in/asmi-zilpilwar-4b0482259",
  email: "zilpilwrasmi@gmail.com",
  location: "", // e.g. "Pune, India" - shown in the footer when set
  description:
    "Portfolio of Asmi Zilpilwar: full-stack web apps, AI-assisted tools and interface experiments, with the code on GitHub.",
  // Pulled from the GitHub sync (npm run sync:github); falls back to 20.
  publicRepos: generated.meta?.publicRepos ?? 20,
};

/** Best primary contact link: email when set, otherwise GitHub. */
export const primaryContact = site.email
  ? { label: "Say hello", href: `mailto:${site.email}` }
  : { label: "Say hello", href: site.github };
