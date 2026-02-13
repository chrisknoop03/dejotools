"use client";

import { useState } from "react";
import { trackConvertSuccess } from "@/lib/analytics";

const TOOL_SLUG = "base64-encode-decode";

export function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const handleEncode = () => {
    try {
      setError("");
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      trackConvertSuccess(TOOL_SLUG, "base64-encode");
    } catch {
      setError("Failed to encode. Make sure your input is valid text.");
    }
  };

  const handleDecode = () => {
    try {
      setError("");
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      trackConvertSuccess(TOOL_SLUG, "base64-decode");
    } catch {
      setError("Failed to decode. Make sure your input is valid Base64.");
    }
  };

  const handleConvert = () => {
    if (mode === "encode") {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode("encode")}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            mode === "encode"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            mode === "decode"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          Decode
        </button>
      </div>

      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 string to decode..."}
          className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleConvert}
          disabled={!input.trim()}
          className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
        </button>
        <button
          onClick={handleClear}
          className="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Result
            </label>
            <button
              onClick={handleCopy}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Copy to clipboard
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none"
          />
        </div>
      )}
    </div>
  );
}
