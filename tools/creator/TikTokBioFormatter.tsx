"use client";

import { useState } from "react";
import { trackConvertSuccess } from "@/lib/analytics";

const TOOL_SLUG = "tiktok-bio-formatter";

export function TikTokBioFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const formatBio = () => {
    if (!input.trim()) return;

    // Clean up extra spaces and format line breaks
    let formatted = input
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .trim();

    // Add line breaks after periods, exclamation marks, or question marks (if followed by space)
    formatted = formatted.replace(/([.!?])\s+/g, "$1\n");

    // Ensure proper spacing around emojis
    formatted = formatted.replace(/\s*([\u{1F300}-\u{1F9FF}])/gu, " $1");
    formatted = formatted.replace(/([\u{1F300}-\u{1F9FF}])\s*/gu, "$1 ");

    // Clean up multiple line breaks
    formatted = formatted.replace(/\n{3,}/g, "\n\n");

    setOutput(formatted.trim());
    setCopied(false);
    trackConvertSuccess(TOOL_SLUG, "bio-formatted");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const characterCount = output.length;
  const maxLength = 80; // TikTok bio limit

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Bio Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your TikTok bio text here..."
          className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <button
          onClick={formatBio}
          disabled={!input.trim()}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Format Bio
        </button>
      </div>

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Formatted Bio
            </label>
            <div className="flex items-center gap-3">
              <span className={`text-sm ${characterCount > maxLength ? "text-red-600 dark:text-red-400" : "text-gray-600 dark:text-gray-400"}`}>
                {characterCount} / {maxLength} characters
              </span>
              <button
                onClick={handleCopy}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
          />
          {characterCount > maxLength && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              ⚠️ TikTok bio limit is {maxLength} characters. Consider shortening your bio.
            </p>
          )}
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
          TikTok Bio Tips:
        </h3>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
          <li>Keep it under {maxLength} characters</li>
          <li>Use line breaks to separate key points</li>
          <li>Add emojis to make it more engaging</li>
          <li>Include a call-to-action or link</li>
        </ul>
      </div>

      {/* Clear Button */}
      {output && (
        <button
          onClick={clearAll}
          className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Clear All
        </button>
      )}
    </div>
  );
}
