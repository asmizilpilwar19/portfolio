import Image from "next/image";

/** Browser window chrome. Pass children for custom content or `src` for a screenshot. */
export function BrowserFrame({
  url,
  src,
  alt,
  children,
  className = "",
  dark = false,
  priority = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  ratio = "aspect-[16/9]",
  clip = false,
}: {
  url?: string;
  src?: string;
  alt?: string;
  children?: React.ReactNode;
  className?: string;
  dark?: boolean;
  priority?: boolean;
  sizes?: string;
  ratio?: string;
  /** Open the screenshot with a scroll-scrubbed clip-path (see ScrollEffects). */
  clip?: boolean;
}) {
  const img = src ? (
    <Image src={src} alt={alt ?? ""} fill sizes={sizes} priority={priority} className="object-cover object-top" />
  ) : null;
  return (
    <div
      className={`overflow-hidden rounded-[10px] border shadow-[0_30px_80px_-30px_rgba(27,26,23,0.55)] ${
        dark ? "border-white/10 bg-[#171512]" : "border-ink/15 bg-white"
      } ${className}`}
    >
      <div className={`flex items-center gap-3 border-b px-3 py-2 ${dark ? "border-white/10 bg-[#1f1c18]" : "border-ink/10 bg-paper-2"}`}>
        <span className="flex gap-1.5" aria-hidden>
          <i className="block h-2 w-2 rounded-full bg-ink/25" />
          <i className="block h-2 w-2 rounded-full bg-ink/25" />
          <i className="block h-2 w-2 rounded-full bg-ink/25" />
        </span>
        {url && (
          <span className={`label min-w-0 flex-1 truncate rounded-full px-3 py-1 text-[0.62rem] tracking-[0.08em] normal-case ${dark ? "bg-black/30 text-white/50" : "bg-paper text-ink/55"}`}>
            {url}
          </span>
        )}
      </div>
      <div className={`relative ${ratio} w-full`}>
        {src ? (
          clip ? (
            <div data-clip className="absolute inset-0">
              <div className="absolute inset-0">{img}</div>
            </div>
          ) : (
            img
          )
        ) : (
          children
        )}
      </div>
    </div>
  );
}

/** Phone bezel around a portrait screenshot. */
export function PhoneFrame({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 16vw, 40vw",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={`relative aspect-[390/844] rounded-[2.1rem] border-[7px] border-ink bg-ink shadow-[0_40px_80px_-30px_rgba(27,26,23,0.6)] ${className}`}>
      <div className="absolute left-1/2 top-1.5 z-10 h-3 w-14 -translate-x-1/2 rounded-full bg-ink" aria-hidden />
      <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-white">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
      </div>
    </div>
  );
}
