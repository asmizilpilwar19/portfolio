import Link from "next/link";
import { Magnetic } from "./magnetic";

export const Arrow = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden>
    <path d="M4 12 12 4M5.5 4H12v6.5" />
  </svg>
);

export function Tags({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-4 gap-y-1 ${className}`}>
      {items.map((t) => (
        <li key={t} className="label whitespace-nowrap opacity-80 before:mr-2 before:content-['/']">
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Square-cornered, magnetic call to action. `tone` swaps the colours. */
export function Button({
  href,
  children,
  tone = "ink",
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "ink" | "signal" | "paper" | "outline";
  external?: boolean;
  className?: string;
}) {
  const tones = {
    ink: "bg-ink text-paper hover:bg-signal",
    signal: "bg-signal text-ink hover:bg-paper",
    paper: "bg-paper text-ink hover:bg-signal",
    outline: "border border-current hover:bg-ink hover:text-paper",
  } as const;
  const cls = `label group inline-flex items-center gap-3 px-5 py-4 transition-colors duration-300 ${tones[tone]} ${className}`;
  return (
    <Magnetic>
      {external ? (
        <a href={href} target="_blank" rel="noreferrer" className={cls}>
          {children}
          <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ) : (
        <Link href={href} className={cls}>
          {children}
          <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </Magnetic>
  );
}

const Block = ({ k, children }: { k: string; children: React.ReactNode }) => (
  <div data-fade className="border-t border-current/25 pt-4">
    <p className="label mb-3 opacity-60">{k}</p>
    <div className="text-[0.95rem] leading-relaxed">{children}</div>
  </div>
);

/** The four-part copy block each case study uses. */
export function StoryBlocks({
  what,
  why,
  used,
  interesting,
  className = "",
}: {
  what: string;
  why: string;
  used: string[];
  interesting: string;
  className?: string;
}) {
  return (
    <div className={`grid gap-x-8 gap-y-8 sm:grid-cols-2 ${className}`}>
      <Block k="What it is">{what}</Block>
      <Block k="Why it exists">{why}</Block>
      <Block k="What I used">
        <Tags items={used} />
      </Block>
      <Block k="What makes it interesting">{interesting}</Block>
    </div>
  );
}
