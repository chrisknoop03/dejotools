"use client";

import { useState } from "react";
import { trackConvertSuccess, trackConvertError } from "@/lib/analytics";

const TOOL_SLUG = "csv-to-json";

function parseCsv(csv: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    if (char === '"') {
      if (inQuotes && csv[i + 1] === '"') {
        cell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (inQuotes) {
      cell += char;
    } else if (char === delimiter || char === "\n") {
      row.push(cell.trim());
      cell = "";
      if (char === "\n") {
        if (row.some((c) => c !== "")) rows.push(row);
        row = [];
      }
    } else if (char !== "\r") {
      cell += char;
    }
  }
  row.push(cell.trim());
  if (row.some((c) => c !== "")) rows.push(row);
  return rows;
}

export function CsvToJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [error, setError] = useState("");

  const convert = () => {
    setError("");
    const trimmed = input.trim();
    if (!trimmed) {
      setOutput("");
      return;
    }
    try {
      const rows = parseCsv(trimmed, delimiter);
      if (rows.length === 0) {
        setOutput("[]");
        trackConvertSuccess(TOOL_SLUG, "json");
        return;
      }
      const headers = rows[0];
      const arr = rows.slice(1).map((row) => {
        const obj: Record<string, string> = {};
        headers.forEach((h, i) => {
          obj[h] = row[i] ?? "";
        });
        return obj;
      });
      setOutput(JSON.stringify(arr, null, 2));
      trackConvertSuccess(TOOL_SLUG, "json");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Parse error";
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
          CSV (first row = headers)
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="name,age,city then add rows..."
          className="w-full h-48 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Delimiter</label>
        <div className="flex gap-2">
          {[{ char: ",", label: "Comma" }, { char: ";", label: "Semicolon" }, { char: "\t", label: "Tab" }].map((d) => (
            <button
              key={d.label}
              onClick={() => setDelimiter(d.char)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                delimiter === d.char ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {d.label}
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
          Convert to JSON
        </button>
        <button onClick={handleClear} className="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          Clear
        </button>
      </div>
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">JSON Output</label>
            <button onClick={handleCopy} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Copy</button>
          </div>
          <textarea value={output} readOnly className="w-full h-48 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none" />
        </div>
      )}
    </div>
  );
}
