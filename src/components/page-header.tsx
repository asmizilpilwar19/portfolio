/** Shared header for the inner pages: big serif title, mono eyebrow, short blurb. */
export function PageHeader({
  eyebrow,
  title,
  blurb,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  blurb?: string;
  children?: React.ReactNode;
}) {
  return (
    <header data-section={eyebrow} className="gutter pb-12 pt-36 md:pb-20 md:pt-52">
      <p className="label flex items-center gap-3">
        <span className="h-px w-10 bg-ink" aria-hidden /> {eyebrow}
      </p>
      <div className="mt-6 grid items-end gap-8 md:grid-cols-12">
        <h1 className="display text-[clamp(3.2rem,10vw,10rem)] leading-[0.86] tracking-[-0.04em] md:col-span-8" data-split="words">
          {title}
        </h1>
        {blurb && (
          <p data-fade className="max-w-sm text-[0.98rem] leading-relaxed text-ink-2 md:col-span-4 md:pb-4">
            {blurb}
          </p>
        )}
      </div>
      {children}
    </header>
  );
}
