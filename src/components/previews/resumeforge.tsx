/**
 * Code-built preview of ResumeForge. The repo ships no screenshots, so this is
 * drawn from the app's own palette (src/app/globals.css) and the features its
 * README lists. Text is deliberately generic: no invented people or scores.
 * Everything sizes in cqw so it scales with its container.
 */
const C = {
  bg: "#fdf9f3",
  surface: "#ffffff",
  muted: "#f5ede1",
  border: "#e9dcc8",
  fg: "#26190f",
  fg2: "#83705a",
  primary: "#c2410c",
  accent: "#0f766e",
};

const bar = (w: string, h = "0.7cqw", color = C.border) => (
  <i className="block rounded-full" style={{ width: w, height: h, background: color }} />
);

export function ResumePaper({ className = "" }: { className?: string }) {
  return (
    <div
      className={`@container aspect-[1/1.32] w-full bg-white shadow-[0_20px_50px_-20px_rgba(38,25,15,0.4)] ${className}`}
      style={{ containerType: "inline-size", color: C.fg }}
      aria-hidden
    >
      <div style={{ padding: "8cqw" }}>
        <p className="display" style={{ fontSize: "9cqw", lineHeight: 1 }}>
          Your Name
        </p>
        <p className="label" style={{ fontSize: "2.6cqw", color: C.primary, marginTop: "2cqw" }}>
          Job title · City
        </p>
        <div style={{ height: 1, background: C.border, margin: "5cqw 0" }} />
        {[
          ["Summary", ["100%", "92%", "60%"]],
          ["Experience", ["100%", "88%", "96%", "54%"]],
          ["Skills", ["70%", "46%"]],
        ].map(([h, rows]) => (
          <div key={h as string} style={{ marginBottom: "5cqw" }}>
            <p className="label" style={{ fontSize: "2.4cqw", color: C.fg2, marginBottom: "2cqw" }}>
              {h as string}
            </p>
            <div className="flex flex-col" style={{ gap: "1.6cqw" }}>
              {(rows as string[]).map((w, i) => (
                <span key={i}>{bar(w, "1.3cqw", i === 0 && h === "Experience" ? C.fg : C.border)}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ResumeForgePreview() {
  const nav = ["Dashboard", "Resumes", "Cover letters", "Job tailoring", "Portfolio", "Settings"];
  const chips = ["Improve", "Professionalize", "Concise", "Grammar", "ATS"];
  const sections = ["Summary", "Experience", "Education", "Skills", "Projects"];

  return (
    <div className="absolute inset-0 flex overflow-hidden" style={{ containerType: "inline-size", background: C.bg, color: C.fg }} aria-hidden>
      {/* sidebar */}
      <div className="flex w-[17%] flex-col" style={{ background: C.muted, borderRight: `1px solid ${C.border}`, padding: "2cqw 1.4cqw", gap: "0.5cqw" }}>
        <p className="display" style={{ fontSize: "2.4cqw", marginBottom: "1.6cqw" }}>
          Resume<span style={{ color: C.primary }}>Forge</span>
        </p>
        {nav.map((n) => (
          <span
            key={n}
            style={{
              fontSize: "1.3cqw",
              padding: "0.8cqw 1cqw",
              borderRadius: "0.6cqw",
              background: n === "Resumes" ? C.primary : "transparent",
              color: n === "Resumes" ? "#fff7ed" : C.fg2,
            }}
          >
            {n}
          </span>
        ))}
      </div>

      {/* editor */}
      <div className="flex flex-1 flex-col" style={{ padding: "2cqw 2cqw", gap: "1.4cqw" }}>
        <div className="flex items-center justify-between">
          <p className="display" style={{ fontSize: "3cqw" }}>
            Experience
          </p>
          <span style={{ fontSize: "1.1cqw", color: C.fg2 }}>Autosaved</span>
        </div>
        <div className="flex flex-wrap" style={{ gap: "0.7cqw" }}>
          {chips.map((c, i) => (
            <span
              key={c}
              style={{
                fontSize: "1.05cqw",
                padding: "0.5cqw 1cqw",
                borderRadius: "99px",
                border: `1px solid ${i === 0 ? C.primary : C.border}`,
                color: i === 0 ? C.primary : C.fg2,
                background: i === 0 ? "#fff1e6" : C.surface,
              }}
            >
              ✦ {c}
            </span>
          ))}
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "0.8cqw", padding: "1.6cqw" }} className="flex flex-col gap-[1cqw]">
          {bar("55%", "1cqw", C.fg)}
          {bar("100%")}
          {bar("94%")}
          {bar("78%")}
          <div style={{ height: "0.6cqw" }} />
          {bar("100%")}
          {bar("62%")}
        </div>
        <div className="flex flex-col" style={{ gap: "0.6cqw" }}>
          {sections.map((s) => (
            <div key={s} className="flex items-center justify-between" style={{ padding: "0.9cqw 1.2cqw", border: `1px solid ${C.border}`, borderRadius: "0.6cqw", background: C.surface, fontSize: "1.2cqw" }}>
              <span>{s}</span>
              <span style={{ color: C.fg2, letterSpacing: "0.1em" }}>⋮⋮</span>
            </div>
          ))}
        </div>
      </div>

      {/* live preview */}
      <div className="flex w-[36%] flex-col items-center" style={{ background: C.muted, borderLeft: `1px solid ${C.border}`, padding: "2cqw", gap: "1.4cqw" }}>
        <div className="flex items-center" style={{ gap: "0.6cqw" }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              style={{
                width: "2.2cqw",
                height: "2.2cqw",
                borderRadius: "50%",
                fontSize: "1cqw",
                display: "grid",
                placeItems: "center",
                background: n === 2 ? C.accent : C.surface,
                color: n === 2 ? "#fff" : C.fg2,
                border: `1px solid ${n === 2 ? C.accent : C.border}`,
              }}
            >
              {n}
            </span>
          ))}
        </div>
        <ResumePaper className="w-[88%]" />
      </div>
    </div>
  );
}
