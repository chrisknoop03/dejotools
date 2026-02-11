"use client";

import { useEffect } from "react";
import Plausible from "@plausible-analytics/tracker";

// Create a singleton instance
let plausible: ReturnType<typeof Plausible> | null = null;

function getPlausible() {
  if (!plausible && typeof window !== "undefined") {
    const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    if (domain) {
      plausible = Plausible({
        domain,
        trackLocalhost: false,
      });
    }
  }
  return plausible;
}

export function PlausibleProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const p = getPlausible();
    if (p) {
      // Enable automatic pageview tracking
      p.enableAutoPageviews();
    }
  }, []);

  return <>{children}</>;
}

// Export tracking functions for use in other components
export function trackPlausibleEvent(eventName: string, props?: Record<string, string | number | boolean>) {
  const p = getPlausible();
  if (p) {
    p.trackEvent(eventName, { props });
  }
}
