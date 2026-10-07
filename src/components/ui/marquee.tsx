/** Infinite CSS marquee. Items are duplicated once so the loop is seamless. */
export function Marquee({
  items,
  speed = 38,
  className = "",
  separator = "✺",
}: {
  items: string[];
  speed?: number;
  className?: string;
  separator?: string;
}) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <li key={`${t}-${i}`} className="flex items-center whitespace-nowrap">
          <span className="px-[0.4em]">{t}</span>
          <span className="px-[0.4em] text-signal">{separator}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="marquee-track" style={{ ["--speed" as string]: `${speed}s` }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
