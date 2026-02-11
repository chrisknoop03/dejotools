"use client";

import { useEffect } from "react";
import Script from "next/script";

export function PlausibleProvider({ children }: { children: React.ReactNode }) {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <>
      {domain && (
        <Script
          defer
          data-domain={domain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
      {children}
    </>
  );
}

// Export tracking function for custom events
export function trackPlausibleEvent(eventName: string, props?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined" && "plausible" in window) {
    const plausible = (window as typeof window & { 
      plausible: (event: string, options?: { props: Record<string, string | number | boolean> }) => void 
    }).plausible;
    
    if (props) {
      plausible(eventName, { props });
    } else {
      plausible(eventName);
    }
  }
}
