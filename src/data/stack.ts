/**
 * The "I work with" section. Each item lists where it appears in the repos so
 * nothing is claimed without evidence. Edit freely.
 */
export interface StackGroup {
  label: string;
  blurb: string;
  items: { name: string; seenIn: string }[];
}

export const stack: StackGroup[] = [
  {
    label: "AI & ML",
    blurb: "Models behind an interface, grounded answers, and classic algorithms.",
    items: [
      { name: "Python", seenIn: "chatbot, neural-network, exam_scheduling" },
      { name: "Streaming chat & summaries", seenIn: "Aperture" },
      { name: "Provider-agnostic AI layer", seenIn: "ResumeForge" },
      { name: "Keyword retrieval Q&A", seenIn: "Aperture" },
      { name: "Constraint satisfaction", seenIn: "exam_scheduling" },
      { name: "Markov-chain text", seenIn: "poetry-generator" },
    ],
  },
  {
    label: "Frontend",
    blurb: "Interfaces that hold up on a phone as well as a big monitor.",
    items: [
      { name: "React 19", seenIn: "AURA, Aperture, ResumeForge" },
      { name: "Next.js 16", seenIn: "Aperture, ResumeForge" },
      { name: "TypeScript", seenIn: "all five case studies except StoryAtlas" },
      { name: "Tailwind CSS v4", seenIn: "AURA, Aperture, ResumeForge" },
      { name: "Angular 18", seenIn: "Librae" },
      { name: "Vite", seenIn: "AURA" },
    ],
  },
  {
    label: "3D & Motion",
    blurb: "Used where it earns its keep.",
    items: [
      { name: "Three.js", seenIn: "AURA" },
      { name: "React Three Fiber + Drei", seenIn: "AURA" },
      { name: "GSAP ScrollTrigger", seenIn: "AURA" },
      { name: "Framer Motion", seenIn: "AURA" },
      { name: "Lenis smooth scroll", seenIn: "AURA" },
      { name: "Zustand", seenIn: "AURA" },
    ],
  },
  {
    label: "Backend",
    blurb: "Auth, APIs and the boring parts that make an app real.",
    items: [
      { name: "FastAPI", seenIn: "Librae" },
      { name: "Flask", seenIn: "StoryAtlas" },
      { name: "Node.js", seenIn: "Aperture, ResumeForge" },
      { name: "JWT + bcrypt auth", seenIn: "Aperture, ResumeForge, Librae" },
      { name: "SQLAlchemy", seenIn: "Librae, StoryAtlas" },
      { name: "PDF generation", seenIn: "ResumeForge" },
    ],
  },
  {
    label: "Data & Infra",
    blurb: "Schemas, migrations and something you can actually deploy.",
    items: [
      { name: "PostgreSQL", seenIn: "Aperture, ResumeForge, Librae" },
      { name: "Prisma", seenIn: "Aperture, ResumeForge" },
      { name: "Alembic migrations", seenIn: "Librae" },
      { name: "SQLite", seenIn: "StoryAtlas, Librae (dev)" },
      { name: "Docker Compose", seenIn: "Aperture, ResumeForge, Librae" },
      { name: "Nginx", seenIn: "Librae" },
    ],
  },
];
