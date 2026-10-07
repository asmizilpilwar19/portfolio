/**
 * Code-built StoryAtlas panels. The repo has no screenshots, so these are drawn
 * from its own stylesheet (static/css/main.css): forest sidebar, ivory pages,
 * rose and moss accents, serif headings. Content mirrors the README's feature
 * list: dashboard heatmap, editor, characters, timeline.
 */
const S = {
  forest: "#0a3323",
  teal: "#105666",
  moss: "#839958",
  deep: "#5f7344",
  rose: "#d3968c",
  beige: "#f7f4d5",
  ivory: "#fdfbf1",
  sage: "#b8c59a",
  char: "#24322c",
  line: "rgba(36,50,44,0.12)",
};

/** Outer element is the size container; padding lives on an inner element so cqw resolves against the panel. */
function Panel({ className = "", bg = "#fff", pad, children }: { className?: string; bg?: string; pad: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-xl ${className}`} style={{ containerType: "inline-size", background: bg, border: `1px solid ${S.line}`, color: S.char }} aria-hidden>
      <div style={{ padding: pad }}>{children}</div>
    </div>
  );
}
const bar = (w: string, color = S.line, h = "0.9cqw") => <i className="block rounded-full" style={{ width: w, height: h, background: color }} />;

export function StoryHeatmap({ className = "" }: { className?: string }) {
  const level = (c: number, r: number) => (c * 7 + r * 3 + ((c * r) % 5)) % 6;
  const shade = ["#eef0e0", "#dfe6c6", S.sage, "#9fb078", S.moss, S.deep];
  return (
    <Panel className={className} pad="5cqw">
      <p className="display" style={{ fontSize: "7cqw" }}>Writing activity</p>
      <div className="grid" style={{ gridTemplateColumns: "repeat(24, 1fr)", gap: "0.8cqw", marginTop: "4cqw" }}>
        {Array.from({ length: 24 * 7 }, (_, n) => {
          const c = Math.floor(n / 7);
          const r = n % 7;
          return <i key={n} className="block aspect-square rounded-[2px]" style={{ background: shade[level(c, r)] }} />;
        })}
      </div>
    </Panel>
  );
}

export function StoryEditor({ className = "" }: { className?: string }) {
  return (
    <Panel className={className} pad="6cqw" bg={S.ivory}>
      <div className="flex items-center justify-between" style={{ marginBottom: "5cqw" }}>
        <p className="label" style={{ fontSize: "2.6cqw", color: S.deep }}>Chapter 09 · Draft</p>
        <p className="label" style={{ fontSize: "2.6cqw", color: S.moss }}>Autosaved</p>
      </div>
      <p className="display" style={{ fontSize: "9cqw", lineHeight: 1.05 }}>The lighthouse keeper</p>
      <div className="flex flex-col" style={{ gap: "2.2cqw", marginTop: "5cqw" }}>
        {["100%", "96%", "99%", "72%", "0", "100%", "93%", "58%"].map((w, i) =>
          w === "0" ? <span key={i} style={{ height: "2cqw" }} /> : <span key={i}>{bar(w, S.line, "1.5cqw")}</span>,
        )}
      </div>
      <div className="flex" style={{ gap: "4cqw", marginTop: "6cqw", borderTop: `1px solid ${S.line}`, paddingTop: "3cqw" }}>
        {["Words", "Reading time", "Export"].map((k) => (
          <span key={k} className="label" style={{ fontSize: "2.4cqw", color: S.deep }}>{k}</span>
        ))}
      </div>
    </Panel>
  );
}

export function StoryCharacter({ className = "" }: { className?: string }) {
  return (
    <Panel className={className} pad="6cqw">
      <div className="flex items-center" style={{ gap: "4cqw" }}>
        <span className="grid place-items-center rounded-full display" style={{ width: "16cqw", height: "16cqw", background: S.rose, fontSize: "8cqw", color: S.forest }}>
          A
        </span>
        <div>
          <p className="display" style={{ fontSize: "8cqw", lineHeight: 1 }}>Character profile</p>
          <p className="label" style={{ fontSize: "2.4cqw", color: S.deep, marginTop: "1.5cqw" }}>Personality · Backstory · Appearance</p>
        </div>
      </div>
      <div className="flex flex-col" style={{ gap: "2cqw", margin: "5cqw 0" }}>
        {bar("100%")}
        {bar("86%")}
        {bar("64%")}
      </div>
      <p className="label" style={{ fontSize: "2.4cqw", color: S.deep, marginBottom: "2.5cqw" }}>Relationships</p>
      <div className="flex" style={{ gap: "2cqw" }}>
        {[S.moss, S.rose, S.teal, S.sage].map((c, i) => (
          <span key={i} className="rounded-full" style={{ width: "9cqw", height: "9cqw", background: c, marginLeft: i ? "-3cqw" : 0, border: "2px solid #fff" }} />
        ))}
      </div>
    </Panel>
  );
}

export function StoryTimeline({ className = "" }: { className?: string }) {
  const events = [
    { x: "6%", c: S.moss, w: "26%" },
    { x: "30%", c: S.rose, w: "22%" },
    { x: "58%", c: S.teal, w: "30%" },
  ];
  return (
    <Panel className={className} pad="5cqw" bg={S.beige}>
      <p className="display" style={{ fontSize: "7cqw" }}>Timeline</p>
      <div className="relative" style={{ height: "18cqw", marginTop: "4cqw" }}>
        <span className="absolute inset-x-0 top-1/2 block h-px" style={{ background: S.deep, opacity: 0.4 }} />
        {events.map((e, i) => (
          <span
            key={i}
            className="absolute flex items-center rounded-full"
            style={{
              left: e.x,
              width: e.w,
              top: i % 2 ? "58%" : "6%",
              height: "7cqw",
              background: e.c,
              color: "#fff",
              fontSize: "2.4cqw",
              padding: "0 2.5cqw",
              gap: "1.6cqw",
            }}
          >
            <span style={{ opacity: 0.7 }}>⋮⋮</span>
            Plot event
          </span>
        ))}
      </div>
    </Panel>
  );
}

const nav = ["Dashboard", "Projects", "Editor", "Characters", "World", "Timeline", "Notes", "Analytics"];

export function StoryAtlasPreview() {
  return (
    <div className="absolute inset-0 flex overflow-hidden" style={{ containerType: "inline-size", background: S.ivory, color: S.char }} aria-hidden>
      <div className="flex w-[17%] flex-col" style={{ background: S.forest, padding: "2cqw 1.5cqw", gap: "0.5cqw", color: S.ivory }}>
        <p className="display" style={{ fontSize: "2.6cqw", marginBottom: "1.6cqw" }}>
          Story<em style={{ color: S.rose }}>Atlas</em>
        </p>
        {nav.map((n) => (
          <span key={n} style={{ fontSize: "1.25cqw", padding: "0.8cqw 1cqw", borderRadius: "0.6cqw", background: n === "Dashboard" ? "rgba(247,244,213,0.14)" : "transparent", opacity: n === "Dashboard" ? 1 : 0.65 }}>
            {n}
          </span>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-5 grid-rows-[auto_1fr] content-start" style={{ padding: "2cqw", gap: "1.4cqw" }}>
        <div className="col-span-5">
          <p className="display" style={{ fontSize: "3.2cqw" }}>Good evening, writer</p>
          <p style={{ fontSize: "1.2cqw", color: "#6b7a6f", marginTop: "0.3cqw" }}>Your streak, your words, your week.</p>
        </div>
        <StoryHeatmap className="col-span-3" />
        <StoryCharacter className="col-span-2" />
        <StoryEditor className="col-span-3" />
        <StoryTimeline className="col-span-2" />
      </div>
    </div>
  );
}
