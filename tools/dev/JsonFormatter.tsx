"use client";

import { useState, useCallback } from "react";

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [indentSize, setIndentSize] = useState(2);

  const formatJson = useCallback(() => {
    setError(null);
    
    if (!input.trim()) {
      setError("Please enter some JSON to format");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
    } catch (e) {
      setError(`Invalid JSON: ${(e as Error).message}`);
      setOutput("");
    }
  }, [input, indentSize]);

  const minifyJson = useCallback(() => {
    setError(null);
    
    if (!input.trim()) {
      setError("Please enter some JSON to minify");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (e) {
      setError(`Invalid JSON: ${(e as Error).message}`);
      setOutput("");
    }
  }, [input]);

  const copyToClipboard = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  }, [output]);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
  }, []);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">Indent:</label>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={1}>1 tab</option>
          </select>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={formatJson}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Format
          </button>
          <button
            onClick={minifyJson}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Minify
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Input/Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input JSON
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "example", "value": 123}'
            className="w-full h-64 p-4 font-mono text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Output
            </label>
            {output && (
              <button
                onClick={copyToClipboard}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Copy to clipboard
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
            className="w-full h-64 p-4 font-mono text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg resize-none"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
