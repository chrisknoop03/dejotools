"use client";

import { useState, useCallback } from "react";

function generateUUID(): string {
  // Use crypto.randomUUID if available (modern browsers)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateUuids = useCallback(() => {
    const newUuids = Array.from({ length: count }, () => {
      const uuid = generateUUID();
      return uppercase ? uuid.toUpperCase() : uuid;
    });
    setUuids(newUuids);
    setCopied(false);
  }, [count, uppercase]);

  const copyAll = useCallback(async () => {
    if (uuids.length > 0) {
      await navigator.clipboard.writeText(uuids.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [uuids]);

  const copySingle = useCallback(async (uuid: string) => {
    await navigator.clipboard.writeText(uuid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">Count:</label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
          >
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">Uppercase</span>
        </label>

        <button
          onClick={generateUuids}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          Generate UUID{count > 1 ? 's' : ''}
        </button>
      </div>

      {/* Results */}
      {uuids.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 dark:text-white">
              Generated UUID{uuids.length > 1 ? 's' : ''}
            </h3>
            <button
              onClick={copyAll}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {copied ? 'Copied!' : 'Copy all'}
            </button>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-600">
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 group"
              >
                <code className="font-mono text-sm text-gray-800 dark:text-gray-200">
                  {uuid}
                </code>
                <button
                  onClick={() => copySingle(uuid)}
                  className="opacity-0 group-hover:opacity-100 text-sm text-blue-600 dark:text-blue-400 hover:underline transition-opacity"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p>
          This tool generates UUID v4 (random) identifiers. Each UUID is 128 bits 
          and is virtually guaranteed to be unique.
        </p>
      </div>
    </div>
  );
}
