"use client";

import { useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/tools-config";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#050816]/80 backdrop-blur-md border-b border-white/5">
      <nav className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-white"
          >
            Dejo<span className="text-[#6366F1]">Tools</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className="flex items-center gap-1 px-4 py-2 rounded-full text-[#9CA3AF] hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
              >
                Tools
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {toolsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setToolsOpen(false)} />
                  <div className="absolute top-full left-0 mt-1 w-56 rounded-2xl bg-[#0B0F1F]/95 border border-white/10 shadow-xl shadow-black/20 py-2 z-50 backdrop-blur-xl">
                    <Link
                      href="/tools"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#9CA3AF] hover:text-white hover:bg-white/5 transition-colors"
                      onClick={() => setToolsOpen(false)}
                    >
                      All Tools
                    </Link>
                    <div className="my-1 border-t border-white/10" />
                    {Object.entries(categories).map(([key, category]) => (
                      <Link
                        key={key}
                        href={`/tools/${key}`}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#9CA3AF] hover:text-white hover:bg-white/5 transition-colors"
                        onClick={() => setToolsOpen(false)}
                      >
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full text-[#9CA3AF] hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
            >
              Blog
            </Link>
            <Link
              href="/privacy"
              className="px-4 py-2 rounded-full text-[#9CA3AF] hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
            >
              Privacy
            </Link>
            <Link
              href="/tools"
              className="ml-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white text-sm font-medium hover:brightness-110 transition-all shadow-lg shadow-[#6366F1]/25"
            >
              Browse Tools
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-white/5"
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
          <div className="md:hidden py-4 border-t border-white/5">
            <div className="space-y-1">
              <Link
                href="/tools"
                className="block px-4 py-3 rounded-xl text-white font-medium bg-white/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Tools
              </Link>
              {Object.entries(categories).map(([key, category]) => (
                <Link
                  key={key}
                  href={`/tools/${key}`}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-[#9CA3AF] hover:bg-white/5 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </Link>
              ))}
              <div className="my-2 border-t border-white/10" />
              <Link
                href="/blog"
                className="block px-4 py-3 rounded-xl text-[#9CA3AF] hover:bg-white/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/privacy"
                className="block px-4 py-3 rounded-xl text-[#9CA3AF] hover:bg-white/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="block px-4 py-3 rounded-xl text-[#9CA3AF] hover:bg-white/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                Terms
              </Link>
              <Link
                href="/tools"
                className="mt-4 flex justify-center mx-4 py-3 rounded-full bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Tools
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
