"use client";

import Script from "next/script";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-WY5NED1SN8"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WY5NED1SN8');
        `}
      </Script>
      {children}
    </>
  );
}
