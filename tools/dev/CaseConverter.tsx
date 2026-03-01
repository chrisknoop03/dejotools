"use client";

import { useState } from "react";
import { trackConvertSuccess } from "@/lib/analytics";

const TOOL_SLUG = "case-converter";

type CaseType = "camel" | "pascal" | "snake" | "kebab" | "title";

function toCamel(s: string): string {
  return s
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => (i === 0 ? w.toLowerCase() : w.toUpperCase()))
    .replace(/\s+|[-_]/g, "");
}

function toPascal(s: string): string {
  return s
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (w) => w.toUpperCase())
    .replace(/\s+|[-_]/g, "");
}

function toSnake(s: string): string {
  return s
    .replace(/([A-Z])/g, "_$1")
    .replace(/\s+/g, "_")
    .replace(/-/g, "_")
    .replace(/^_/, "")
    .toLowerCase();
}

function toKebab(s: string): string {
  return s
    .replace(/([A-Z])/g, "-$1")
    .replace(/\s+/g, "-")
    .replace(/_/g, "-")
    .replace(/^-/, "")
    .toLowerCase();
}

function toTitle(s: string): string {
  return s
    .toLowerCase()
    .replace(/(?:^|\s|[-_])(\w)/g, (_, c) => " " + c.toUpperCase())
    .trim();
}

function convert(text: string, to: CaseType): string {
  if (!text.trim()) return "";
  const words = text.split(/\s+|_|-|(?=[A-Z])/).filter(Boolean);
  if (words.length === 0) return text;

  switch (to) {
    case "camel":
      return toCamel(text);
    case "pascal":
      return toPascal(text);
    case "snake":
      return toSnake(text);
    case "kebab":
      return toKebab(text);
    case "title":
      return toTitle(text);
    default:
      return text;
  }
}

const CASE_OPTIONS: { id: CaseType; label: string }[] = [
  { id: "camel", label: "camelCase" },
  { id: "pascal", label: "PascalCase" },
  { id: "snake", label: "snake_case" },
  { id: "kebab", label: "kebab-case" },
  { id: "title", label: "Title Case" },
];

export function CaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [targetCase, setTargetCase] = useState<CaseType>("camel");

  const handleConvert = () => {
    const result = convert(input, targetCase);
    setOutput(result);
    if (input.trim()) trackConvertSuccess(TOOL_SLUG, targetCase);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Text to convert
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. my variable name or Some Title"
          className="w-full h-28 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Convert to</label>
        <div className="flex flex-wrap gap-2">
          {CASE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setTargetCase(opt.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                targetCase === opt.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleConvert}
          disabled={!input.trim()}
          className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Convert
        </button>
        <button
          onClick={handleClear}
          className="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Result</label>
            <button onClick={handleCopy} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Copy
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-24 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none"
          />
        </div>
      )}
    </div>
  );
}
