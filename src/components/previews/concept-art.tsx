/**
 * Illustrations for the four CONCEPT tiles. All CSS, all invented: they stand
 * in for sites I'd build, not shipped work. Sized with cqw so they scale.
 */
const wrap = (bg: string, color: string): React.CSSProperties => ({ containerType: "inline-size", background: bg, color });

export function TidewaterArt() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={wrap("#0f3b3a", "#ebd9b4")} aria-hidden>
      <div className="absolute left-[6cqw] top-[5cqw] flex w-[88cqw] justify-between label" style={{ fontSize: "1.5cqw" }}>
        <span>Tidewater</span>
        <span className="flex gap-[4cqw]"><span>Coffee</span><span>Brew guides</span><span>Cart (0)</span></span>
      </div>
      <p className="display absolute left-[6cqw] top-[14cqw] leading-[0.82]" style={{ fontSize: "17cqw" }}>
        Slow<br /><em>mornings,</em><br />roasted.
      </p>
      {/* coffee bag */}
      <div className="absolute right-[9cqw] top-[12cqw] h-[44cqw] w-[28cqw] rotate-[5deg] rounded-[1.2cqw]" style={{ background: "#ebd9b4", boxShadow: "0 3cqw 6cqw -2cqw rgba(0,0,0,.5)" }}>
        <div className="absolute inset-x-0 top-0 h-[4cqw] rounded-t-[1.2cqw]" style={{ background: "repeating-linear-gradient(90deg,#d6c39a 0 0.5cqw,#ebd9b4 0.5cqw 1cqw)" }} />
        <div className="absolute inset-x-[3cqw] top-[10cqw] text-center" style={{ color: "#0f3b3a" }}>
          <p className="display" style={{ fontSize: "5cqw", lineHeight: 1 }}>Tidewater</p>
          <p className="label" style={{ fontSize: "1.2cqw", marginTop: "1cqw" }}>Single origin · Washed</p>
        </div>
        <svg className="absolute inset-x-0 bottom-[4cqw]" viewBox="0 0 100 24" fill="none" stroke="#0f3b3a" strokeWidth="1.2" aria-hidden>
          <path d="M0 8c8 0 8 8 16 8s8-8 16-8 8 8 16 8 8-8 16-8 8 8 16 8 8-8 20-8" />
          <path d="M0 16c8 0 8 8 16 8s8-8 16-8 8 8 16 8 8-8 16-8 8 8 16 8 8-8 20-8" />
        </svg>
      </div>
      <div className="absolute bottom-[5cqw] left-[6cqw] flex gap-[2.5cqw]">
        {["Light", "Medium", "Dark"].map((t, i) => (
          <span key={t} className="label" style={{ fontSize: "1.4cqw", padding: "1cqw 2cqw", border: "1px solid #ebd9b4", background: i === 1 ? "#ebd9b4" : "transparent", color: i === 1 ? "#0f3b3a" : "#ebd9b4" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export function FieldnoteArt() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={wrap("#d9e2c3", "#1f2b17")} aria-hidden>
      <div className="absolute left-1/2 top-[8cqw] h-[130cqw] w-[62cqw] -translate-x-1/2 rounded-[7cqw] border-[1.6cqw]" style={{ background: "#fbfaf2", borderColor: "#1f2b17" }}>
        <p className="label" style={{ fontSize: "3cqw", padding: "5cqw 5cqw 0" }}>Today · 3 sightings</p>
        <svg viewBox="0 0 100 50" className="mx-[4cqw] mt-[3cqw] w-[calc(100%-8cqw)]" fill="none" aria-hidden>
          <rect width="100" height="50" rx="3" fill="#c9d6ac" />
          <path d="M0 38C20 28 28 44 48 30S80 18 100 24" stroke="#4a6a2e" strokeWidth="1.2" strokeDasharray="2 2" />
          {[[22, 33], [51, 29], [78, 21]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="2.4" fill="#ff4a1c" />)}
        </svg>
        <div className="flex flex-col" style={{ gap: "3cqw", padding: "5cqw" }}>
          {[["Song thrush", "08:12"], ["Wren", "08:40"], ["Goldcrest", "09:05"]].map(([n, t]) => (
            <div key={n} className="flex items-center justify-between" style={{ borderBottom: "1px solid rgba(31,43,23,.15)", paddingBottom: "2.4cqw", fontSize: "3.4cqw" }}>
              <span className="display" style={{ fontSize: "4.6cqw" }}>{n}</span>
              <span className="label" style={{ fontSize: "2.6cqw", opacity: 0.6 }}>{t}</span>
            </div>
          ))}
        </div>
        <span className="label absolute bottom-[5cqw] left-1/2 -translate-x-1/2 whitespace-nowrap" style={{ fontSize: "2.8cqw", padding: "2.4cqw 5cqw", background: "#1f2b17", color: "#d9e2c3" }}>
          + Log sighting
        </span>
      </div>
    </div>
  );
}

export function KilnArt() {
  const vase = (w: number, h: number, color: string, left: string) => (
    <div className="absolute bottom-[14cqw]" style={{ left }}>
      <div className="mx-auto rounded-t-full" style={{ width: `${w * 0.42}cqw`, height: `${h * 0.28}cqw`, background: color, filter: "brightness(.9)" }} />
      <div className="rounded-[50%/40%]" style={{ width: `${w}cqw`, height: `${h}cqw`, background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,.35), transparent 40%), ${color}` }} />
    </div>
  );
  return (
    <div className="absolute inset-0 overflow-hidden" style={wrap("#c9633b", "#f6e8d6")} aria-hidden>
      <p className="label absolute left-[6cqw] top-[5cqw]" style={{ fontSize: "1.6cqw" }}>Kiln &amp; Co. · Studio</p>
      <p className="display absolute left-[6cqw] top-[11cqw] leading-[0.85]" style={{ fontSize: "9cqw" }}>Made by hand,<br /><em>fired twice.</em></p>
      {vase(16, 22, "#f6e8d6", "46%")}
      {vase(12, 15, "#2b3a55", "66%")}
      {vase(14, 28, "#e0a458", "80%")}
      <div className="absolute inset-x-[6cqw] bottom-[4cqw] flex gap-[1.2cqw]">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} className="label grid flex-1 place-items-center" style={{ fontSize: "1.4cqw", height: "6cqw", border: "1px solid rgba(246,232,214,.5)", background: i === 3 ? "#f6e8d6" : "transparent", color: i === 3 ? "#c9633b" : "#f6e8d6" }}>
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

export function OrbitArt() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={wrap("#0e1116", "#e8ecf2")} aria-hidden>
      <div className="absolute inset-y-0 left-0 w-[20cqw] border-r" style={{ borderColor: "rgba(255,255,255,.08)", padding: "4cqw 2.4cqw" }}>
        <p className="label" style={{ fontSize: "1.3cqw", marginBottom: "2cqw" }}>Orbit docs</p>
        {["Introduction", "Install", "Routing", "Data", "Deploy"].map((t, i) => (
          <p key={t} style={{ fontSize: "1.3cqw", padding: "0.7cqw 0", opacity: i === 2 ? 1 : 0.5, color: i === 2 ? "#ff4a1c" : undefined }}>{t}</p>
        ))}
      </div>
      <div className="absolute left-[24cqw] top-[5cqw] w-[44cqw]">
        <p className="display" style={{ fontSize: "5cqw", lineHeight: 1 }}>Routing</p>
        <div className="flex flex-col" style={{ gap: "1cqw", margin: "2.4cqw 0" }}>
          {["100%", "92%", "70%"].map((w) => <i key={w} className="block rounded-full" style={{ width: w, height: "0.7cqw", background: "rgba(255,255,255,.14)" }} />)}
        </div>
        <pre className="label rounded-[0.6cqw] normal-case tracking-normal" style={{ fontSize: "1.2cqw", background: "#171b23", padding: "1.6cqw", lineHeight: 1.7, color: "#9fb4d6" }}>
{`export default function Page() {
  return <Docs version="2" />
}`}
        </pre>
      </div>
      <div className="absolute right-[5cqw] top-[7cqw] w-[28cqw] rounded-[0.8cqw] border" style={{ background: "#171b23", borderColor: "rgba(255,255,255,.14)", boxShadow: "0 4cqw 8cqw -2cqw rgba(0,0,0,.6)" }}>
        <p className="label" style={{ fontSize: "1.2cqw", padding: "1.4cqw", borderBottom: "1px solid rgba(255,255,255,.1)" }}>⌘K · Search the docs…</p>
        {["Install with npm", "Dynamic routes", "Deploy to the edge"].map((t, i) => (
          <p key={t} style={{ fontSize: "1.2cqw", padding: "1.1cqw 1.4cqw", background: i === 1 ? "#ff4a1c" : "transparent", color: i === 1 ? "#0e1116" : "#e8ecf2" }}>{t}</p>
        ))}
      </div>
    </div>
  );
}
