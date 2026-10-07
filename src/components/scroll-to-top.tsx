"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Every route change starts at the top. `behavior: "instant"` bypasses the
 * site-wide CSS smooth scrolling, which would otherwise animate from the old
 * scroll position and get cut off. Hash links (/#work) are left alone.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  useLayoutEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}
