import Link from "next/link";

export default function NotFound() {
  return (
    <div className="gutter flex min-h-[100svh] flex-col justify-center">
      <p className="label">404 — page not found</p>
      <h1 className="display mt-4 text-[clamp(3.4rem,11vw,11rem)] leading-[0.84]">
        Lost <em className="text-olive">in the build.</em>
      </h1>
      <Link href="/" className="label u-link mt-10 self-start">
        Back to the portfolio
      </Link>
    </div>
  );
}
