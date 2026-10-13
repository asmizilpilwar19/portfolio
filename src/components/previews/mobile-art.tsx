/**
 * Illustrated posters for the mobile projects. These are NOT screenshots:
 * they're abstract compositions built from each app's own ideas (a focus timer,
 * a garden), so the pages feel full without pretending to show the UI.
 */

const serif = { fontFamily: "var(--font-instrument), serif" } as const;
const mono = { fontFamily: "var(--font-dmmono), monospace" } as const;

export function StudySpherePoster({ className = "" }: { className?: string }) {
  const arc = (r: number, pct: number) => {
    const c = 2 * Math.PI * r;
    return { strokeDasharray: `${c * pct} ${c}`, transform: "rotate(-90 400 430)" };
  };
  return (
    <div className={`relative aspect-[4/5] w-full overflow-hidden bg-[#c3b6dd] text-ink ${className}`} role="img" aria-label="Illustration: a focus-timer ring orbited by small spheres, a streak calendar and three timer modes">
      {/* orbits */}
      <svg viewBox="0 0 800 1000" className="orbit-spin absolute inset-0 h-full w-full" aria-hidden>
        {[330, 262].map((r, i) => (
          <circle key={r} cx="400" cy="430" r={r} fill="none" stroke="#1b1a17" strokeOpacity={0.18} strokeDasharray={i ? "2 10" : "none"} />
        ))}
        <circle cx="730" cy="430" r="16" fill="#ff4a1c" />
        <circle cx="400" cy="100" r="9" fill="#1b1a17" />
        <circle cx="168" cy="662" r="12" fill="#ece5d5" stroke="#1b1a17" />
      </svg>
      <svg viewBox="0 0 800 1000" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle cx="400" cy="430" r="200" fill="#ece5d5" />
        <circle cx="400" cy="430" r="200" fill="none" stroke="#1b1a17" strokeOpacity={0.12} strokeWidth="14" />
        <circle cx="400" cy="430" r="200" fill="none" stroke="#1b1a17" strokeWidth="14" strokeLinecap="round" style={arc(200, 0.68)} />
        <text x="400" y="452" textAnchor="middle" fontSize="116" fill="#1b1a17" style={serif}>
          25:00
        </text>
        <text x="400" y="506" textAnchor="middle" fontSize="20" letterSpacing="4" fill="#1b1a17" fillOpacity={0.6} style={mono}>
          FOCUS · ROUND 2 / 4
        </text>

        {/* streak calendar */}
        <g transform="translate(120 740)">
          <text x="0" y="-20" fontSize="18" letterSpacing="4" fill="#1b1a17" fillOpacity={0.6} style={mono}>
            STREAK
          </text>
          {Array.from({ length: 28 }, (_, n) => {
            const col = n % 14;
            const row = Math.floor(n / 14);
            const on = n % 5 !== 3 && n < 23;
            const today = n === 23;
            return <circle key={n} cx={col * 40 + 12} cy={row * 40 + 12} r="12" fill={today ? "#ff4a1c" : on ? "#1b1a17" : "none"} stroke="#1b1a17" strokeOpacity={on || today ? 1 : 0.3} />;
          })}
        </g>

        {/* mode chips */}
        {["Plan", "Focus", "Notes"].map((t, i) => (
          <g key={t} transform={`translate(${120 + i * 190} 880)`}>
            <rect width="170" height="52" fill={i === 0 ? "#1b1a17" : "none"} stroke="#1b1a17" />
            <text x="85" y="33" textAnchor="middle" fontSize="18" letterSpacing="3" fill={i === 0 ? "#ece5d5" : "#1b1a17"} style={mono}>
              {t.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function NovaraPoster({ className = "" }: { className?: string }) {
  const sprig = (x: number, y: number, rot: number, s = 1, tone = "#2f4a35") => (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0 C 10 -120, -10 -240, 0 -360" fill="none" stroke={tone} strokeWidth="3" />
      {Array.from({ length: 7 }, (_, i) => {
        const y2 = -50 - i * 48;
        const side = i % 2 ? 1 : -1;
        return <ellipse key={i} cx={side * 34} cy={y2} rx="32" ry="13" transform={`rotate(${side * 38} ${side * 34} ${y2})`} fill={tone} fillOpacity={0.9 - i * 0.07} />;
      })}
    </g>
  );
  return (
    <div className={`relative aspect-[4/5] w-full overflow-hidden bg-[#b4c4a0] text-[#233a29] ${className}`} role="img" aria-label="Illustration: a pink bloom inside slowly breathing rings, framed by leafy sprigs">
      <svg viewBox="0 0 800 1000" className="absolute inset-0 h-full w-full" aria-hidden>
        {sprig(120, 1020, -6, 1.5)}
        {sprig(700, 1030, 8, 1.7, "#3d5c43")}
        {sprig(400, 1060, 0, 1.25, "#4c6b4f")}

        <g style={{ transformOrigin: "400px 400px" }} className="breathe">
          {[250, 190, 130].map((r, i) => (
            <circle key={r} cx="400" cy="400" r={r} fill={i === 2 ? "#f3efe0" : "none"} fillOpacity={0.5} stroke="#f3efe0" strokeOpacity={0.7 - i * 0.15} />
          ))}
        </g>

        {/* bloom */}
        <g transform="translate(400 400)">
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse key={i} cx="0" cy="-58" rx="30" ry="62" transform={`rotate(${i * 45})`} fill="#dfb0a8" stroke="#233a29" strokeOpacity={0.35} />
          ))}
          <circle r="24" fill="#f3efe0" stroke="#233a29" strokeOpacity={0.4} />
        </g>

        <text x="400" y="760" textAnchor="middle" fontSize="64" fill="#233a29" style={serif}>
          breathe in
        </text>
        <text x="400" y="806" textAnchor="middle" fontSize="18" letterSpacing="5" fill="#233a29" fillOpacity={0.7} style={mono}>
          4 · 7 · 8
        </text>
      </svg>
    </div>
  );
}

/**
 * Petalia is private, so this is an illustration, not a screenshot: a botanical
 * "specimen plate" in the app's own bloom-purple, plum and cream palette.
 */
export function PetaliaPoster({ className = "" }: { className?: string }) {
  const ring = (n: number, ry: number, fill: string, offset = 0) =>
    Array.from({ length: n }, (_, i) => (
      <ellipse
        key={`${ry}-${i}`}
        cx="0"
        cy={-ry * 0.62}
        rx={ry * 0.3}
        ry={ry * 0.62}
        transform={`rotate(${(360 / n) * i + offset})`}
        fill={fill}
        stroke="#5b3a8c"
        strokeOpacity={0.28}
      />
    ));
  const leaf = (x: number, y: number, rot: number, s = 1) => (
    <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={46 * s} ry={15 * s} transform={`rotate(${rot} ${x} ${y})`} fill="#6e9a78" fillOpacity={0.8} />
  );
  return (
    <div
      className={`relative aspect-[4/5] w-full overflow-hidden bg-[#faf6f1] text-[#3a2a44] ${className}`}
      role="img"
      aria-label="Illustration: a large purple bloom on a cream botanical specimen plate titled Petalia"
    >
      <svg viewBox="0 0 800 1000" className="absolute inset-0 h-full w-full" aria-hidden>
        <rect x="36" y="36" width="728" height="928" fill="none" stroke="#3a2a44" strokeOpacity={0.25} />
        <rect x="52" y="52" width="696" height="896" fill="none" stroke="#3a2a44" strokeOpacity={0.12} />
        <text x="84" y="106" fontSize="17" letterSpacing="5" fill="#7d6c88" style={mono}>
          PLATE 01
        </text>
        <text x="716" y="106" textAnchor="end" fontSize="17" letterSpacing="5" fill="#7d6c88" style={mono}>
          BLOOM PURPLE
        </text>

        {/* stems and leaves */}
        <g>
          <path d="M400 640 C 396 700, 410 750, 404 810" fill="none" stroke="#6e9a78" strokeWidth="5" />
          <path d="M170 830 C 205 770, 260 720, 330 676" fill="none" stroke="#6e9a78" strokeWidth="4" />
          <path d="M630 830 C 595 770, 540 725, 470 686" fill="none" stroke="#6e9a78" strokeWidth="4" />
          {leaf(436, 720, -28, 1.15)}
          {leaf(368, 770, 205, 1.05)}
          {leaf(205, 792, -50, 0.95)}
          {leaf(250, 728, -55, 0.85)}
          {leaf(600, 792, 50, 0.95)}
          {leaf(556, 730, 55, 0.85)}
        </g>

        {/* the bloom */}
        <g transform="translate(400 380)">
          <g className="breathe" style={{ transformOrigin: "0px 0px" }}>
            {ring(10, 250, "#8a5cc2")}
            {ring(10, 190, "#b88df0", 18)}
            {ring(8, 130, "#efe5fa", 0)}
            <circle r="40" fill="#b98a2b" />
            {Array.from({ length: 14 }, (_, i) => (
              <circle key={i} cx={Math.cos((i / 14) * Math.PI * 2) * 62} cy={Math.sin((i / 14) * Math.PI * 2) * 62} r="5" fill="#b98a2b" fillOpacity={0.75} />
            ))}
          </g>
        </g>

        {/* small companion blooms */}
        <g transform="translate(130 250) scale(0.2)">{ring(7, 250, "#fbe8f0")}</g>
        <g transform="translate(676 232) scale(0.18)">{ring(7, 250, "#efe5fa")}</g>

        <text x="400" y="896" textAnchor="middle" fontSize="92" fill="#5b3a8c" style={serif}>
          Petalia
        </text>
        <text x="400" y="940" textAnchor="middle" fontSize="19" letterSpacing="7" fill="#7d6c88" style={mono}>
          DISCOVER FLOWERS
        </text>
      </svg>
    </div>
  );
}

export function MobilePoster({ art, className }: { art: "studysphere" | "novara" | "petalia"; className?: string }) {
  if (art === "studysphere") return <StudySpherePoster className={className} />;
  if (art === "novara") return <NovaraPoster className={className} />;
  return <PetaliaPoster className={className} />;
}

/** Horizontal build timeline: numbered stops on a line, wraps to a list on phones. */
export function PhaseTimeline({ phases, tone = "ink" }: { phases: { title: string; text: string }[]; tone?: "ink" | "paper" }) {
  return (
    <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
      <span className="absolute left-0 right-0 top-[0.55rem] hidden h-px bg-current opacity-25 lg:block" aria-hidden />
      {phases.map((p, i) => (
        <li key={p.title} data-fade className="relative">
          <span className={`relative z-10 mb-4 block h-[1.1rem] w-[1.1rem] rounded-full border border-current ${i === phases.length - 1 ? "bg-signal" : tone === "ink" ? "bg-paper" : "bg-ink"}`} aria-hidden />
          <p className="label opacity-60">Phase {i + 1}</p>
          <p className="display mt-1 text-[1.6rem] leading-none">{p.title}</p>
          <p className="mt-3 text-[0.85rem] leading-relaxed opacity-75">{p.text}</p>
        </li>
      ))}
    </ol>
  );
}
