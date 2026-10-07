# Asmi Zilpilwar: portfolio

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · GSAP (ScrollTrigger + SplitText) · Motion · Three.js / React Three Fiber.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # runs the GitHub sync first, then builds
```

## Pages

| Route | What's there |
| --- | --- |
| `/` | Hero with 3D sculpture, manifesto, featured live site (AURA), first case study, doorways |
| `/work` | Filterable index, then the longer stories (asymmetric, horizontal gallery, editorial, mobile apps) |
| `/work/[slug]` | Full case study for each project |
| `/concepts` | Four imagined briefs, clearly labelled as concepts |
| `/about` | Statements, profile, "what I work with" |
| `/contact` | The finale |

## Editing content

Everything lives in `src/data/`:

- **`site.ts`**: name, links. **Add your `email` and `linkedin` here**; they are hidden until set. Add `location` to show it in the footer.
- **`projects.ts`**: every real project. Add or remove an entry and it appears in the index, the case-study routes and the nav counts. `learned: []` is intentionally empty: add your own lines and a "What I learned" section appears.
- **`concepts.ts`**: the imagined briefs. These are never presented as shipped work.
- **`stack.ts`**: the technologies section. Each item says which project it appears in.

Private projects (`isPrivate: true`, no `githubUrl`) are described but never linked. Study Sphere and Novara are set up that way. When a repo goes public, add its `repo` and `githubUrl`.

## GitHub sync (build time, never runtime)

```bash
npm run sync:github
```

Fetches public repo metadata into `src/data/github.generated.json`. The site never calls GitHub at runtime. If a repo gets a homepage URL it is picked up as the live link. Set `GITHUB_TOKEN` to avoid rate limits.

## Screenshots

`scripts/prepare-images.mjs` crops browser chrome off raw screenshots and writes optimised WebP into `public/work/<slug>/`. Repos without screenshots (ResumeForge, StoryAtlas) use code-built previews in `src/components/previews/`. Study Sphere and Novara use illustrated posters, not screenshots.

## Motion and accessibility

- All scroll animation is driven by `data-*` attributes in `src/components/scroll-effects.tsx`.
- `prefers-reduced-motion` turns off animations, the preloader, the cursor and the 3D motion. All content stays visible.
- The pinned horizontal gallery becomes a native swipe row on touch and small screens.
- The 3D scene loads lazily, pauses off-screen, and drops pixel ratio on phones.
