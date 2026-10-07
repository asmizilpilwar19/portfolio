import generated from "./github.generated.json";

/**
 * PROJECT DATA - the single place to add / remove / reorder projects.
 *
 * Every entry below was written from the public repository's README and file
 * tree. Fields marked "owner" (`learned`) are intentionally left empty: the
 * repos can't tell me what you learned, so the case-study page hides the
 * section until you add your own lines.
 *
 * GitHub metadata (description, language, homepage, pushed date) is merged in
 * from github.generated.json, which `npm run sync:github` refreshes. The site
 * never calls GitHub at runtime.
 */

export type Category = "AI" | "Web" | "Full Stack" | "Mobile";

export interface Shot {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  /** Display name (may differ from the repo name). */
  name: string;
  /** Public repository name on GitHub, used for the sync merge. Omit for private projects. */
  repo?: string;
  tagline: string;
  /** WHAT IT IS */
  what: string;
  /** WHY IT EXISTS (kept to what the repo itself says) */
  why: string;
  /** The problem / idea */
  problem: string;
  /** The approach */
  solution: string;
  /** WHAT MAKES IT INTERESTING */
  interesting: string[];
  /** Owner-written reflections. Empty = section hidden. */
  learned: string[];
  category: Category[];
  /** Private projects are described but never linked. */
  isPrivate?: boolean;
  /** WHAT I USED */
  technologies: string[];
  /** Omit for private projects: no link is shown. */
  githubUrl?: string;
  liveUrl?: string;
  /** Primary image (omit when the project uses a code-built preview). */
  image?: string;
  /** Which code-built preview to render when there is no screenshot. */
  preview?: "resumeforge" | "storyatlas";
  /** Illustrated poster used instead of a screenshot (mobile apps shown without images). */
  art?: "studysphere" | "novara";
  /** "What's inside": short feature list for projects shown without screenshots. */
  features?: string[];
  /** Optional build-phase timeline. */
  phases?: { title: string; text: string }[];
  screenshots: Shot[];
  /** Portrait phone screenshots, shown in device frames. */
  phones?: Shot[];
  featured?: boolean;
  year: number;
  /** Short status line for the case-study header. */
  status: string;
  /** Accent used on the case-study page. */
  accent: string;
}

const A = "/work/aperture";
const L = "/work/librae";
const U = "/work/aura";

const base: Project[] = [
  {
    slug: "aura",
    name: "AURA",
    repo: "smartperfume",
    tagline: "One scent, many moods. A concept perfume brand you can customise in 3D.",
    what: "A concept website for a fictional smart-perfume brand. You choose a mood, an occasion and the notes you like, and a procedural 3D bottle on the page responds as you choose.",
    why: "Built as a design study in how far scroll-driven storytelling and a single persistent WebGL scene can go. Nothing on it is a real product claim, and the README says so too.",
    problem:
      "A fragrance can't show its main trait on a screen. The page has to carry the feeling through atmosphere, type and an object you can turn and customise.",
    solution:
      "One persistent WebGL scene, a bottle built entirely from code, is shared by every section. Scroll position, the customiser and the cart all write to a single Zustand store that the scene reads from, so the bottle and the page never drift apart.",
    interesting: [
      "The bottle is procedural: no imported 3D model, the geometry is built in code.",
      "Pinned scroll-telling with GSAP ScrollTrigger, including an exploded view of the technology.",
      "Quality scales with the device: pixel ratio, particles, shadows and antialiasing drop on low-end and mobile hardware.",
      "Respects prefers-reduced-motion by switching off camera moves, scrubbing and smooth scrolling.",
      "The recommendation engine is deterministic and sits behind an interface, so a real model could be dropped in later.",
    ],
    learned: [],
    category: ["Web"],
    technologies: [
      "React 19",
      "TypeScript",
      "Vite 6",
      "Three.js",
      "React Three Fiber",
      "Drei",
      "GSAP ScrollTrigger",
      "Framer Motion",
      "Lenis",
      "Zustand",
      "Tailwind CSS v4",
    ],
    githubUrl: "https://github.com/asmizilpilwar19/smartperfume",
    liveUrl: "https://smartperfume-chi.vercel.app/",
    image: `${U}/shot-02.webp`,
    screenshots: [
      { src: `${U}/shot-01.webp`, alt: "AURA hero with the 3D perfume bottle and the line 'Your scent. Your moment.'", caption: "Hero" },
      { src: `${U}/shot-02.webp`, alt: "AURA concept section: 'Perfume shouldn't stay the same.'", caption: "The concept" },
      { src: `${U}/shot-03.webp`, alt: "AURA 'Three moves between you and the moment' section", caption: "Choose, personalise, wear" },
      { src: `${U}/shot-04.webp`, alt: "AURA 'Create your Aura' customiser asking what you are feeling", caption: "Customiser: mood" },
      { src: `${U}/shot-05.webp`, alt: "AURA customiser asking which notes you gravitate toward", caption: "Customiser: notes" },
      { src: `${U}/shot-06.webp`, alt: "AURA result card for 'Umber No. 01' with top, heart and base notes", caption: "Recommendation" },
      { src: `${U}/shot-07.webp`, alt: "AURA notes section with glowing note spheres", caption: "Notes" },
      { src: `${U}/shot-08.webp`, alt: "AURA bottle personalisation with glass, cap and label options", caption: "Personalise the object" },
      { src: `${U}/shot-09.webp`, alt: "AURA 'Technology you barely notice' exploded-view section", caption: "Exploded view" },
      { src: `${U}/shot-10.webp`, alt: "AURA 'One bottle, tuned to the shape of your day' mood modes", caption: "Modes of the day" },
    ],
    featured: true,
    year: 2026,
    status: "Live concept site",
    accent: "#C9A36A",
  },
  {
    slug: "aperture",
    name: "Aperture",
    repo: "aperture-ai-saas",
    tagline: "An AI workspace: chat, documents and summaries in one calm interface.",
    what: "A full-stack AI workspace with streaming multi-conversation chat, PDF, DOCX and TXT upload, structured summaries, document Q&A, a ⌘K search across everything, and a usage analytics dashboard.",
    why: "A SaaS-shaped project taken end to end: accounts, per-user data isolation, a real database, charts and settings, rather than a one-page demo.",
    problem:
      "AI demos usually stop at a chat box. A tool you could actually live in also needs accounts, history, files, search, and some way to see how much it is being used.",
    solution:
      "A Next.js app with email and password auth (bcrypt, JWT in HTTP-only cookies) on top of PostgreSQL via Prisma. Uploaded documents are parsed, chunked and stored per user; questions are answered from those chunks with keyword retrieval, and summaries are cached in the database.",
    interesting: [
      "Document Q&A is grounded in the uploaded text through keyword retrieval, with no vector database involved.",
      "Summaries are structured (key points and topics) and cached, so reopening one is instant.",
      "One command palette (⌘K) and a full search page cover conversations, messages and documents.",
      "Responsive down to a phone: collapsible sidebar and a single-pane chat. Light and dark themes.",
      "Ships with architecture, API and deployment docs next to the code.",
    ],
    learned: [],
    category: ["AI", "Full Stack", "Web"],
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "PostgreSQL", "Prisma", "Node.js 20+", "Docker Compose"],
    githubUrl: "https://github.com/asmizilpilwar19/aperture-ai-saas",
    image: `${A}/dashboard.webp`,
    screenshots: [
      { src: `${A}/dashboard.webp`, alt: "Aperture dashboard with stats, a usage chart and recent conversations", caption: "Dashboard" },
      { src: `${A}/chat.webp`, alt: "Aperture AI chat workspace", caption: "AI chat" },
      { src: `${A}/documents.webp`, alt: "Aperture documents library", caption: "Documents" },
      { src: `${A}/document.webp`, alt: "Aperture single document view", caption: "Document Q&A" },
      { src: `${A}/summaries.webp`, alt: "Aperture structured summaries", caption: "Summaries" },
      { src: `${A}/search.webp`, alt: "Aperture global search", caption: "Search" },
      { src: `${A}/analytics.webp`, alt: "Aperture usage analytics", caption: "Analytics" },
      { src: `${A}/history.webp`, alt: "Aperture activity history", caption: "History" },
      { src: `${A}/settings.webp`, alt: "Aperture settings", caption: "Settings" },
    ],
    phones: [
      { src: `${A}/mobile-dashboard.webp`, alt: "Aperture dashboard on a phone", caption: "Dashboard" },
      { src: `${A}/mobile-documents.webp`, alt: "Aperture documents list on a phone", caption: "Documents" },
      { src: `${A}/mobile-nav.webp`, alt: "Aperture navigation drawer on a phone", caption: "Navigation" },
    ],
    featured: true,
    year: 2026,
    status: "Open source, run locally",
    accent: "#5B4EE6",
  },
  {
    slug: "resumeforge",
    name: "ResumeForge",
    repo: "career-builder-ai",
    tagline: "Resume, cover letter and portfolio builder with an AI writing assistant.",
    what: "An AI-assisted career platform. Build a resume section by section, tailor it to a job posting, generate a cover letter, and turn the same data into a public portfolio page.",
    why: "Resume tools tend to stop at the template. This one pushes into the work around the document: tailoring, cover letters and a portfolio generated from the same data.",
    problem:
      "Every application wants a slightly different resume, a cover letter and ideally a portfolio. Keeping those in sync by hand is the boring, error-prone part.",
    solution:
      "A single resume record drives everything. The editor autosaves, five templates re-render it live, AI tools rewrite and tailor the text, and the same data exports to PDF or publishes as a themed portfolio site. The AI layer is provider-agnostic.",
    interesting: [
      "Runs fully offline in a mock AI mode by default; switch to the Anthropic provider by adding a key.",
      "Job tailoring: paste a posting, get matching keywords and a tailored version of the resume.",
      "Writing tools for improve, professionalise, make concise, fix grammar and ATS optimisation.",
      "Five switchable templates with live preview and drag-and-drop section ordering.",
      "Multi-page-safe PDF export for resumes and cover letters.",
    ],
    learned: [],
    category: ["AI", "Full Stack"],
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "PostgreSQL", "Prisma", "@react-pdf/renderer", "JWT + bcrypt auth", "Docker Compose"],
    githubUrl: "https://github.com/asmizilpilwar19/career-builder-ai",
    preview: "resumeforge",
    screenshots: [],
    year: 2026,
    status: "Open source, run locally",
    accent: "#C2410C",
  },
  {
    slug: "librae",
    name: "Librae",
    repo: "library",
    tagline: "A library system where admins, librarians and members each get their own view.",
    what: "A full-stack library management system for books, members, borrowing, returns and day-to-day library operations, with a modern dashboard UI in light and dark mode.",
    why: "A larger, role-based system: a REST API with migrations and tests behind an Angular front end, built to be deployable rather than just runnable.",
    problem:
      "Library work is a chain of small linked steps: find the member, issue the book, track the due date, calculate the fine, take the payment. The software has to keep that chain consistent, and show each person only their own part.",
    solution:
      "A FastAPI and SQLAlchemy backend with JWT auth and role checks, plus an Angular 18 front end. The loan lifecycle (issue, return or renew, overdue fine, payment) is handled end to end, with reservations, study-room booking and announcements alongside it.",
    interesting: [
      "Role-aware by design: members only see their own fines and their own reading journal.",
      "The full loan lifecycle, including overdue fines and payments, is implemented rather than mocked.",
      "Study-room booking checks for conflicts before it confirms.",
      "The README is upfront about what is built and what is an extension point: SMS, payments and 2FA are flagged, not faked.",
      "docker compose brings up Postgres, the FastAPI app and an Nginx container serving the Angular build.",
    ],
    learned: [],
    category: ["Full Stack", "Web"],
    technologies: ["Angular 18", "Angular Material", "Tailwind CSS", "FastAPI", "SQLAlchemy", "Alembic", "JWT auth", "PostgreSQL", "SQLite", "Docker Compose", "Nginx"],
    githubUrl: "https://github.com/asmizilpilwar19/library",
    image: `${L}/shot-03.webp`,
    screenshots: [
      { src: `${L}/shot-01.webp`, alt: "Librae landing page: 'Every book, every member, one calm dashboard.'", caption: "Landing" },
      { src: `${L}/shot-02.webp`, alt: "Librae sign-in screen", caption: "Sign in" },
      { src: `${L}/shot-03.webp`, alt: "Librae dashboard with library stats", caption: "Dashboard" },
      { src: `${L}/shot-04.webp`, alt: "Librae book catalogue", caption: "Catalogue" },
      { src: `${L}/shot-05.webp`, alt: "Librae study-room booking", caption: "Study rooms" },
      { src: `${L}/shot-06.webp`, alt: "Librae events and announcements", caption: "Events" },
    ],
    year: 2026,
    status: "Open source, run locally",
    accent: "#8B73E0",
  },
  {
    slug: "storyatlas",
    name: "StoryAtlas",
    repo: "StoryAtlas",
    tagline: "A writing workspace for novelists: manuscript, characters, worlds and timeline in one place.",
    what: "A Flask-based writing workspace for novelists, poets, scriptwriters and journalists, with a distraction-free editor, character profiles, worldbuilding, a drag-and-drop timeline, notes and writing analytics.",
    why: "Writers juggle a manuscript, a cast and a world across a dozen tabs. This keeps them together, in an interface styled as a vintage library crossed with a leather journal.",
    problem:
      "Long projects lose their shape. Who is this character related to? What happened before chapter nine? Where did I write that note about the magic system?",
    solution:
      "A server-rendered Flask app: Jinja2 templates, vanilla CSS and JavaScript, SQLAlchemy on SQLite. Autosave keeps the editor out of the way while characters, locations, timeline events and notes stay one click from the page you're writing.",
    interesting: [
      "No frontend framework at all: Jinja2 templates with vanilla CSS and JavaScript.",
      "Autosaving editor with live word count, reading time, fullscreen mode and Markdown or plain-text export.",
      "Character profiles with relationship mapping, plus worldbuilding for locations, magic, history and politics.",
      "A GitHub-style heatmap and weekly or monthly charts for writing activity.",
      "The AI assistant panel is a deliberate placeholder for later integration.",
    ],
    learned: [],
    category: ["Full Stack", "Web"],
    technologies: ["Python 3.12", "Flask", "SQLAlchemy", "SQLite", "Flask-Login", "Jinja2", "Vanilla JS", "Vanilla CSS"],
    githubUrl: "https://github.com/asmizilpilwar19/StoryAtlas",
    preview: "storyatlas",
    screenshots: [],
    year: 2026,
    status: "Open source, run locally",
    accent: "#0A3323",
  },
  {
    slug: "studysphere",
    name: "Study Sphere",
    tagline: "A student's whole study life in one app: plan it, focus on it, remember it.",
    what: "A student productivity app for Android and iOS, built with Expo and React Native. A planner, Pomodoro and flow-state focus timers, notes, exams, flashcards and progress tracking live in one place, and it works fully offline.",
    why: "Studying usually means a timer app, a notes app, a calendar and a flashcard app that never talk to each other. Study Sphere keeps them on one set of data, so a single focus session counts toward a goal, a streak and a chapter at the same time.",
    problem:
      "Students lose time to switching tools, and most apps either overwhelm them with stats or nag them with streak pressure. What helps is one calm place that knows what is due, what has been studied and what is coming up.",
    solution:
      "A local-first Expo Router app. Every screen reads from small context stores that persist on the device, and one timer engine drives Pomodoro, flow and custom sessions. Streaks, statistics, goals and the focus score are all derived from that same session history, so nothing is entered twice.",
    interesting: [
      "One timer engine runs three focus modes (Pomodoro, count-up flow and custom) and keeps its place through navigation and backgrounding.",
      "A focus-sounds mixer with 19 sounds, seven presets and saved custom mixes, built on expo-audio.",
      "Revision is scheduled with spaced repetition, counting back from each exam date.",
      "Insights are honest: narrative insights only appear once there is enough data, and the focus score is deliberately never pressuring.",
      "Accounts live on the device (salted, hashed passwords) with per-user data isolation. Cloud sync is documented as a seam, not faked.",
      "The study assistant talks to a proxy you host, so no API key ships in the app. Without one it runs a clearly labelled demo mode.",
    ],
    learned: [],
    category: ["Mobile"],
    isPrivate: true,
    technologies: ["Expo SDK 57", "Expo Router", "React Native", "TypeScript", "Reanimated", "expo-audio", "expo-notifications", "AsyncStorage", "expo-crypto"],
    art: "studysphere",
    features: [
      "Planner with sessions, tasks and a calendar",
      "Pomodoro, flow and custom focus timers",
      "Focus sounds mixer",
      "Subjects with syllabus chapters",
      "Notes with folders, tags and autosave",
      "Goals, streaks and achievements",
      "Exams with countdowns and a revision schedule",
      "Flashcards and quizzes",
      "AI study assistant (demo mode by default)",
      "Search across everything",
      "Study insights and a focus score",
      "Data export, light and dark themes",
    ],
    phases: [
      { title: "Foundations", text: "Design system, responsive shell, dashboard, subjects, light and dark theme." },
      { title: "Planner & focus", text: "Planner, tasks, calendar, the Pomodoro engine and local reminders." },
      { title: "Notes & progress", text: "Notes, syllabus chapters, goals, streaks, statistics and achievements." },
      { title: "Exams & smart study", text: "Exams, spaced revision, flashcards, quizzes, resources and the assistant." },
      { title: "Final polish", text: "Global search, focus score, insights, data export, account tools and focus modes." },
    ],
    screenshots: [],
    year: 2026,
    status: "Private project · runs in Expo Go",
    accent: "#8f7fd1",
  },
  {
    slug: "novara",
    name: "Novara",
    tagline: "A calm wellness companion for Android and iOS: track, reflect, and find support when things feel heavy.",
    what: "A mental-wellness mobile app for Android and iOS. It brings mood and sleep tracking, a private journal, self-care routines, guided breathing and grounding, a personal safety plan and an optional on-device companion together in a soft botanical design.",
    why: "Wellness apps often feel clinical or pushy. Novara is built around calm: nothing starts on its own, nothing is diagnosed, and the hardest moments get simple steps that can all be skipped.",
    problem:
      "Someone who is struggling needs less on the screen, not more. The app has to be gentle in ordinary use, unmistakably simple in a bad moment, and honest that it is not medical care.",
    solution:
      "Everything sits behind provider interfaces (auth, data, wellness, support, insights, AI). The same screens run on an offline SQLite backend by default and can switch to Supabase with row-level security when credentials are set. Design tokens drive light and dark themes, and a botanical layer adds leaves and blooms that scale from none to lush.",
    interesting: [
      "Crisis messages typed to the companion get a local, scripted reply and never reach an AI provider. The app holds no model key at all.",
      "Panic Support is a guided flow (pause, breathe, ground, orient, choose, check in) where every step is skippable and nothing auto-starts.",
      "Emergency numbers are per-region and every call needs a confirming tap. The app never auto-dials.",
      "Two interchangeable backends behind the same interfaces: on-device SQLite and Supabase.",
      "Progress grows as a garden, from seed to bloom, and it never goes backwards.",
      "Covered by 300+ automated tests across 36 suites, with an import guard that protects against a known Expo Go crash.",
    ],
    learned: [],
    category: ["Mobile"],
    isPrivate: true,
    technologies: ["Expo SDK 57", "React Native", "React 19", "TypeScript (strict)", "React Navigation", "Reanimated", "react-native-svg", "expo-sqlite", "Supabase (optional)", "expo-notifications", "Jest"],
    art: "novara",
    features: [
      "Mood wheel with intensity, tags and history",
      "Private journal with prompts and search",
      "Sleep log with insights",
      "Self-care checklists, routines and goals",
      "Reminders, challenges and badges",
      "Panic support, breathing and 5-4-3-2-1 grounding",
      "Personal safety plan",
      "Crisis resources by region",
      "Calm reading: seven original articles",
      "On-device companion",
      "Privacy centre with export and delete",
      "Botanical themes from none to lush",
    ],
    screenshots: [],
    year: 2026,
    status: "Private repo · Android build made locally",
    accent: "#9db08a",
  },
];

type Meta = { description: string | null; language: string | null; homepage: string | null; pushedAt: string };
const repos = generated.repos as Record<string, Meta>;

/** Merge in GitHub sync data: a homepage in the repo fills liveUrl if unset. */
export const projects: Project[] = base.map((p) => {
  const meta = p.repo ? repos[p.repo] : undefined;
  return { ...p, liveUrl: p.liveUrl ?? (meta?.homepage || undefined) };
});

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const pushedOn = (repo?: string) => (repo ? repos[repo]?.pushedAt?.slice(0, 10) : undefined);

export const siblings = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return { prev: projects[(i - 1 + projects.length) % projects.length], next: projects[(i + 1) % projects.length], index: i + 1 };
};
