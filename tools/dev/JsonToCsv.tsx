"use client";

import { useState } from "react";
import { trackConvertSuccess, trackConvertError } from "@/lib/analytics";

const TOOL_SLUG = "json-to-csv";

function escapeCsvValue(val: unknown): string {
  if (val === null || val === undefined) return "";
  const str = String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

export function JsonToCsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [error, setError] = useState("");

  const convert = () => {
    setError("");
    try {
      const data = JSON.parse(input);
      if (!Array.isArray(data)) {
        setError("JSON root must be an array of objects.");
        return;
      }
      if (data.length === 0) {
        setOutput("");
        trackConvertSuccess(TOOL_SLUG, "csv");
        return;
      }
      const first = data[0];
      if (typeof first !== "object" || first === null || Array.isArray(first)) {
        setError("Each array item must be an object.");
        return;
      }
      const headers = [...new Set(data.flatMap((obj) => Object.keys(obj)))];
      const headerRow = headers.map((h) => escapeCsvValue(h)).join(delimiter);
      const rows = data.map((obj) =>
        headers.map((h) => escapeCsvValue((obj as Record<string, unknown>)[h])).join(delimiter)
      );
      setOutput([headerRow, ...rows].join("\n"));
      trackConvertSuccess(TOOL_SLUG, "csv");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
      trackConvertError(TOOL_SLUG, msg);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          JSON (array of objects)
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={'[{"name":"Alice","age":30},{"name":"Bob","age":25}]'}
          className="w-full h-48 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Delimiter</label>
        <div className="flex gap-2">
          {[",", ";", "\t"].map((d) => (
            <button
              key={d === "\t" ? "tab" : d}
              onClick={() => setDelimiter(d)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                delimiter === d ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {d === "\t" ? "Tab" : d === "," ? "Comma" : "Semicolon"}
            </button>
          ))}
        </div>
      </div>
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}
      <div className="flex gap-3">
        <button
          onClick={convert}
          disabled={!input.trim()}
          className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Convert to CSV
        </button>
        <button onClick={handleClear} className="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          Clear
        </button>
      </div>
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">CSV Output</label>
            <button onClick={handleCopy} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Copy</button>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-48 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none"
          />
        </div>
      )}
    </div>
  );
}
