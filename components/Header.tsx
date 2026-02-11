"use client";

import { useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/tools-config";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
            DejoTools
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-4">
                Tools
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown */}
              <div className="absolute top-full left-0 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 -mt-1">
                <div className="py-2">
                  <Link 
                    href="/tools" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    All Tools
                  </Link>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  {Object.entries(categories).map(([key, category]) => (
                    <Link
                      key={key}
                      href={`/tools/${key}`}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link 
              href="/privacy" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Privacy
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 dark:text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="space-y-1">
              <Link 
                href="/tools"
                className="block px-2 py-2 text-gray-900 dark:text-white font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Tools
              </Link>
              {Object.entries(categories).map(([key, category]) => (
                <Link
                  key={key}
                  href={`/tools/${key}`}
                  className="flex items-center gap-2 px-2 py-2 text-gray-600 dark:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </Link>
              ))}
              <hr className="my-2 border-gray-200 dark:border-gray-700" />
              <Link 
                href="/privacy"
                className="block px-2 py-2 text-gray-600 dark:text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Privacy
              </Link>
              <Link 
                href="/terms"
                className="block px-2 py-2 text-gray-600 dark:text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Terms
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
