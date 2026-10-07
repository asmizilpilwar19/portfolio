// Re-mounts on every navigation, so each page fades in. Opacity only: a transform
// here would break position: fixed (the pinned horizontal gallery).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
