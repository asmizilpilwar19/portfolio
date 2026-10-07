/**
 * Illustrated posters for the two mobile projects. These are NOT screenshots:
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
        {["Pomodoro", "Flow", "Custom"].map((t, i) => (
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

export function MobilePoster({ art, className }: { art: "studysphere" | "novara"; className?: string }) {
  return art === "studysphere" ? <StudySpherePoster className={className} /> : <NovaraPoster className={className} />;
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
