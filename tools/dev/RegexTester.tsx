"use client";

import { useState, useMemo } from "react";
import { trackConvertSuccess } from "@/lib/analytics";

const TOOL_SLUG = "regex-tester";

export function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");
  const result = useMemo(() => {
    if (!pattern.trim()) return { matches: [] as { match: string; index: number }[], replacePreview: null as string | null, error: null as string | null };
    try {
      const re = new RegExp(pattern, flags);
      const matches: { match: string; index: number }[] = [];
      const re2 = new RegExp(pattern, flags);
      let m: RegExpExecArray | null;
      while ((m = re2.exec(text)) !== null) {
        matches.push({ match: m[0], index: m.index });
        if (!flags.includes("g")) break;
      }
      const replacePreview = text.replace(re, "[$&]");
      return { matches, replacePreview, error: null };
    } catch (e) {
      return { matches: [], replacePreview: null, error: e instanceof Error ? e.message : "Invalid regex" };
    }
  }, [pattern, flags, text]);

  const error = result.error;

  const handleTest = () => {
    if (pattern) trackConvertSuccess(TOOL_SLUG, "test");
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Regular expression</label>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="e.g. \d+ or [a-z]+"
            className="flex-1 min-w-[200px] px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Flags:</span>
            {["g", "i", "m"].map((f) => (
              <label key={f} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={flags.includes(f)}
                  onChange={(e) => {
                    if (e.target.checked) setFlags((prev) => prev + f);
                    else setFlags((prev) => prev.replace(f, ""));
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-mono">{f}</span>
              </label>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">g = global, i = ignore case, m = multiline</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Test string</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text to test against..."
          className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}
      <button
        onClick={handleTest}
        disabled={!pattern.trim()}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Test regex
      </button>
      {pattern && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Matches ({result.matches.length})</h3>
            {result.matches.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">No matches found.</p>
            ) : (
              <ul className="space-y-1 text-sm font-mono">
                {result.matches.slice(0, 20).map((m, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">Index {m.index}: &quot;{m.match}&quot;</li>
                ))}
                {result.matches.length > 20 && (
                  <li className="text-gray-500 dark:text-gray-400">... and {result.matches.length - 20} more</li>
                )}
              </ul>
            )}
          </div>
          {result.replacePreview !== null && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Match highlight (wrapped in [ ])</h3>
              <pre className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-all">
                {result.replacePreview}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
