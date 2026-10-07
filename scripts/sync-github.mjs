// Fetches PUBLIC repo metadata from the GitHub API and writes it to
// src/data/github.generated.json. Run it whenever you like:
//
//   npm run sync:github
//
// The site never calls GitHub at runtime - projects.ts merges this file in at
// build time, so there are no rate limits or loading spinners for visitors.
// If the request fails (offline, rate-limited) the existing file is kept.
import { mkdir, readFile, writeFile } from "node:fs/promises";

const USER = process.env.GITHUB_USER ?? "asmizilpilwar19";
const OUT = new URL("../src/data/github.generated.json", import.meta.url);

await mkdir(new URL("../src/data/", import.meta.url), { recursive: true });
const headers = { Accept: "application/vnd.github+json", "User-Agent": "portfolio-sync" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

try {
  const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, { headers });
  if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
  const repos = await res.json();

  const data = {
    meta: { user: USER, publicRepos: repos.length, syncedAt: new Date().toISOString().slice(0, 10) },
    repos: Object.fromEntries(
      repos
        .filter((r) => !r.private && !r.fork)
        .map((r) => [
          r.name,
          {
            description: r.description,
            language: r.language,
            topics: r.topics ?? [],
            stars: r.stargazers_count,
            homepage: r.homepage || null,
            createdAt: r.created_at,
            pushedAt: r.pushed_at,
            url: r.html_url,
          },
        ]),
    ),
  };
  await writeFile(OUT, JSON.stringify(data, null, 2) + "\n");
  console.log(`Synced ${Object.keys(data.repos).length} public repos for ${USER}`);
} catch (err) {
  console.warn(`[sync-github] skipped: ${err.message}`);
  try {
    await readFile(OUT);
  } catch {
    await writeFile(OUT, JSON.stringify({ meta: { user: USER, publicRepos: 20, syncedAt: null }, repos: {} }, null, 2) + "\n");
  }
}
