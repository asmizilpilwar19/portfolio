// One-off helper: crops the browser chrome / Windows taskbar off raw screenshots
// and exports optimised WebP files into public/work/<slug>/.
// Usage: node scripts/prepare-images.mjs <folder containing cloned repos>
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const src = process.argv[2];
if (!src) throw new Error("pass the folder that holds the cloned repos");
const out = path.resolve("public/work");

// Raw 1920x1080 browser screenshots: keep y 182..1020 (page content only).
const crop = { left: 0, top: 182, width: 1920, height: 838 };

const jobs = [
  ...[100, 101, 102, 103, 104, 105, 106, 107, 108, 109].map((n, i) => ({
    from: `smartperfume/photos/Screenshot (${n}).png`,
    to: `aura/shot-${String(i + 1).padStart(2, "0")}.webp`,
    crop,
  })),
  ...[86, 87, 88, 89, 90, 91].map((n, i) => ({
    from: `library/photos/Screenshot (${n}).png`,
    to: `librae/shot-${String(i + 1).padStart(2, "0")}.webp`,
    crop,
  })),
  ...["dashboard", "dashboard-dark", "chat", "chat-dark", "documents", "document", "summaries", "search", "analytics", "history", "settings"].map(
    (n) => ({ from: `aperture-ai-saas/docs/screenshots/${n}.png`, to: `aperture/${n}.webp` }),
  ),
  ...["mobile-dashboard", "mobile-documents", "mobile-nav"].map((n) => ({
    from: `aperture-ai-saas/docs/screenshots/${n}.png`,
    to: `aperture/${n}.webp`,
  })),
];

for (const j of jobs) {
  const dest = path.join(out, j.to);
  await mkdir(path.dirname(dest), { recursive: true });
  let img = sharp(path.join(src, j.from));
  if (j.crop) img = img.extract(j.crop);
  const info = await img.resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
  console.log(j.to, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)}KB`);
}
