import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DejoTools - Free Online Converters & Utilities",
    template: "%s | DejoTools"
  },
  description: "Free online tools for image conversion, PDF editing, and developer utilities. Fast, secure, and works entirely in your browser.",
  keywords: ["online tools", "image converter", "pdf tools", "developer tools", "free utilities"],
  authors: [{ name: "DejoTools" }],
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
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 antialiased">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <nav className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
                DejoTools
              </a>
              <div className="flex items-center gap-6">
                <a 
                  href="/tools" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  All Tools
                </a>
                <a 
                  href="/privacy" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Privacy
                </a>
              </div>
            </div>
          </nav>
        </header>
        
        <main className="flex-1">
          {children}
        </main>
        
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">DejoTools</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Free online tools for everyone. Convert images, edit PDFs, and use developer utilities - all in your browser.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Tools</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/tools" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">All Tools</a></li>
                  <li><a href="/tools/jpg-to-png" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">JPG to PNG</a></li>
                  <li><a href="/tools/json-formatter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">JSON Formatter</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a></li>
                  <li><a href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} DejoTools. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
