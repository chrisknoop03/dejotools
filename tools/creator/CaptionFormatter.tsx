"use client";

import { useState, useCallback } from "react";
import { trackConvertSuccess } from "@/lib/analytics";

const TOOL_SLUG = 'caption-formatter';

export function CaptionFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const formatCaption = useCallback(() => {
    if (!input.trim()) return;
    
    let formatted = input
      // Normalize line endings
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      // Remove multiple consecutive blank lines (keep max 1)
      .replace(/\n{3,}/g, '\n\n')
      // Trim whitespace from each line
      .split('\n')
      .map(line => line.trim())
      .join('\n')
      // Trim start and end
      .trim();
    
    setOutput(formatted);
    trackConvertSuccess(TOOL_SLUG, 'text');
  }, [input]);

  const addLineBreaks = useCallback(() => {
    if (!input.trim()) return;
    
    // Add invisible character for Instagram line breaks
    const formatted = input
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .split('\n')
      .map(line => line.trim())
      .join('\n\u200b'); // Zero-width space after each line
    
    setOutput(formatted);
    trackConvertSuccess(TOOL_SLUG, 'text-linebreaks');
  }, [input]);

  const removeExtraSpaces = useCallback(() => {
    if (!input.trim()) return;
    
    const formatted = input
      // Replace multiple spaces with single space
      .replace(/  +/g, ' ')
      // Normalize line endings
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      // Remove spaces at start/end of lines
      .split('\n')
      .map(line => line.trim())
      .join('\n')
      .trim();
    
    setOutput(formatted);
    trackConvertSuccess(TOOL_SLUG, 'text-cleaned');
  }, [input]);

  const copyToClipboard = useCallback(async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output]);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
  }, []);

  const charCount = output.length;
  const wordCount = output.trim() ? output.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-4">
      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Caption
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your caption here..."
          className="w-full h-40 p-4 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={formatCaption}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Format Caption
        </button>
        <button
          onClick={addLineBreaks}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Fix Line Breaks (Instagram)
        </button>
        <button
          onClick={removeExtraSpaces}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Remove Extra Spaces
        </button>
        <button
          onClick={clearAll}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Formatted Caption
            </label>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {charCount} chars · {wordCount} words
              </span>
              <button
                onClick={copyToClipboard}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-sans">
              {output}
            </pre>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <p className="font-medium mb-2">Tips:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Format Caption:</strong> Cleans up spacing and removes extra blank lines</li>
          <li><strong>Fix Line Breaks:</strong> Adds invisible characters so line breaks work on Instagram</li>
          <li><strong>Remove Extra Spaces:</strong> Converts multiple spaces to single spaces</li>
        </ul>
      </div>
    </div>
  );
}
