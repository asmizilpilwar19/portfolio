import { site, primaryContact } from "@/data/site";
import { Magnetic } from "@/components/ui/magnetic";
import { Marquee } from "@/components/ui/marquee";
import { Arrow } from "@/components/ui/bits";

export function Contact({ standalone = false }: { standalone?: boolean }) {
  const links = [
    { label: "GitHub", href: site.github, text: `@${site.githubHandle}` },
    site.linkedin && { label: "LinkedIn", href: site.linkedin, text: "Connect" },
    site.email && { label: "Email", href: `mailto:${site.email}`, text: site.email },
  ].filter(Boolean) as { label: string; href: string; text: string }[];

  return (
    <section id="contact" data-section="Contact" className={`relative overflow-hidden bg-olive text-paper ${standalone ? "pt-16 md:pt-24" : ""}`}>
      <Marquee items={["Open to new projects", "Say hello", "Open to new projects", "Say hello"]} speed={50} className="label border-b border-paper/25 py-3" separator="→" />

      <div className="gutter relative pb-16 pt-24 md:pb-24 md:pt-40">
        <h2 className="display text-[clamp(3.6rem,12.5vw,13.5rem)] leading-[0.82] tracking-[-0.045em]">
          <span className="block" data-split>Let&rsquo;s</span>
          <span className="block pl-[6vw]" data-split data-delay="0.08">build</span>
          <span className="block" data-split data-delay="0.16">
            <em className="text-pink">something.</em>
          </span>
        </h2>

        <div className="mt-16 grid items-end gap-12 md:mt-24 md:grid-cols-12">
          <p data-fade className="max-w-sm text-[1.05rem] leading-relaxed md:col-span-4">
            If you&rsquo;re hiring, or you have a site, app or odd idea that needs building, the quickest way to see how I work is the code. And then say hi.
          </p>

          <ul className="space-y-3 md:col-span-4">
            {links.map((l) => (
              <li key={l.label} data-fade>
                <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-baseline justify-between gap-6 border-b border-paper/30 pb-3">
                  <span className="label">{l.label}</span>
                  <span className="display flex items-center gap-2 text-[1.6rem] leading-none transition-transform duration-300 group-hover:translate-x-1">
                    {l.text}
                    <Arrow className="text-base" />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex md:col-span-4 md:justify-end">
            <Magnetic strength={0.25}>
              <a
                href={primaryContact.href}
                data-cursor="Go"
                className="display flex h-44 w-44 flex-col items-center justify-center gap-3 rounded-full bg-paper text-center text-[1.7rem] leading-none text-ink transition-colors hover:bg-signal hover:text-ink md:h-56 md:w-56 md:text-[2.1rem]"
              >
                {primaryContact.label}
                <Arrow className="text-2xl text-signal" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="gutter flex flex-col gap-4 bg-ink py-6 text-paper md:flex-row md:items-center md:justify-between">
      <p className="label">
        {site.name}
        {site.location && <span className="opacity-60"> · {site.location}</span>}
      </p>
      <ul className="label flex flex-wrap gap-x-6 gap-y-2">
        <li><a className="u-link" href={site.github} target="_blank" rel="noreferrer">GitHub</a></li>
        {site.linkedin && <li><a className="u-link" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>}
        {site.email && <li><a className="u-link" href={`mailto:${site.email}`}>Email</a></li>}
      </ul>
      <p className="label opacity-60">© {site.year}</p>
    </footer>
  );
}
