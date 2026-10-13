import type { Metadata, Viewport } from "next";
import { Archivo_Black, DM_Mono, Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { Nav } from "@/components/nav";
import { Cursor } from "@/components/cursor";
import { Preloader } from "@/components/preloader";
import { ScrollToTop } from "@/components/scroll-to-top";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"] });
// KINESYS's own display face. It is a static (non-variable) font on purpose: outlined
// text on variable fonts shows overlapping contours as stray lines inside the letters.
const archivo = Archivo_Black({ variable: "--font-archivo", subsets: ["latin"], weight: "400" });
const dmmono = DM_Mono({ variable: "--font-dmmono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: { default: `${site.name} — Software & AI developer`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: {
    title: `${site.name} — Software & AI developer`,
    description: site.description,
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#ece5d5" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${instrument.variable} ${hanken.variable} ${dmmono.variable} ${archivo.variable}`}>
      <body>
        <noscript>
          <style>{`.preloader{display:none!important}`}</style>
        </noscript>
        <Preloader />
        <a
          href="#main"
          className="label fixed left-4 top-4 z-[130] -translate-y-24 bg-ink px-4 py-3 text-paper focus:translate-y-0"
        >
          Skip to content
        </a>
        <ScrollToTop />
        <Nav />
        <main id="main">{children}</main>
        <div className="grain" aria-hidden />
        <Cursor />
      </body>
    </html>
  );
}
