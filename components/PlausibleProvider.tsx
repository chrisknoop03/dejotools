"use client";

import Script from "next/script";

export function PlausibleProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Privacy-friendly analytics by Plausible */}
      <Script
        async
        src="https://plausible.io/js/pa-Ay1Ffly1Mi2sI255s_bqE.js"
        strategy="afterInteractive"
      />
      <Script id="plausible-init" strategy="afterInteractive">
        {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init();`}
      </Script>
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
