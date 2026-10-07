import Link from "next/link";
import { Arrow } from "@/components/ui/bits";

/** Big "continue to" link that closes the inner pages. */
export function NextPage({ href, eyebrow, title }: { href: string; eyebrow: string; title: string }) {
  return (
    <Link href={href} data-cursor="Next" className="group gutter block border-t border-ink/25 py-14 md:py-20">
      <p className="label flex items-center justify-between">
        <span>{eyebrow}</span>
        <span className="text-signal">Next</span>
      </p>
      <p className="display mt-6 flex items-end justify-between gap-6 text-[clamp(3rem,9vw,9rem)] leading-[0.86] tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-3">
        {title}
        <Arrow className="mb-[1.2vw] text-[clamp(1.6rem,4vw,4rem)] text-signal" />
      </p>
    </Link>
  );
}
