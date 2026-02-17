import type { Metadata } from "next";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DejoTools - Free Online Converters & Utilities",
    template: "%s | DejoTools"
  },
  description: "Free online tools for image conversion, PDF editing, and developer utilities. Fast, secure, and works entirely in your browser.",
  keywords: ["online tools", "image converter", "pdf tools", "developer tools", "free utilities"],
  authors: [{ name: "DejoTools" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DejoTools",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4446391904396659"
          crossOrigin="anonymous"
        />
        {/* Monetag Multitag */}
        <script
          src="https://quge5.com/88/tag.min.js"
          data-zone="212057"
          async
          data-cfasync="false"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 antialiased">
        <AnalyticsProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
