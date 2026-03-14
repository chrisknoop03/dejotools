\"use client\";

import { useState } from "react";
import { trackConvertSuccess } from "@/lib/analytics";

const TOOL_SLUG = "text-similarity-checker";

type SimilarityResult = {
  similarityPercent: number;
  commonWordCount: number;
  totalWordsA: number;
  totalWordsB: number;
};

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getWords(text: string): string[] {
  const normalized = normalizeText(text);
  if (!normalized) return [];
  return normalized.split(" ");
}

function computeSimilarity(a: string, b: string): SimilarityResult {
  const wordsA = getWords(a);
  const wordsB = getWords(b);

  if (wordsA.length === 0 || wordsB.length === 0) {
    return {
      similarityPercent: 0,
      commonWordCount: 0,
      totalWordsA: wordsA.length,
      totalWordsB: wordsB.length,
    };
  }

  const setA = new Set(wordsA);
  const setB = new Set(wordsB);

  let common = 0;
  setA.forEach((word) => {
    if (setB.has(word)) common += 1;
  });

  const unionSize = new Set([...setA, ...setB]).size || 1;
  const similarityPercent = (common / unionSize) * 100;

  return {
    similarityPercent,
    commonWordCount: common,
    totalWordsA: wordsA.length,
    totalWordsB: wordsB.length,
  };
}

function highlightCommonWords(text: string, otherText: string): JSX.Element {
  const words = text.split(/(\s+)/);
  const otherWordsSet = new Set(getWords(otherText));

  return (
    <span>
      {words.map((chunk, index) => {
        if (/^\\s+$/.test(chunk)) {
          return <span key={index}>{chunk}</span>;
        }
        const normalized = normalizeText(chunk);
        const isCommon = normalized && otherWordsSet.has(normalized);
        return (
          <span
            key={index}
            className={isCommon ? "bg-yellow-200/70 dark:bg-yellow-500/30" : undefined}
          >
            {chunk}
          </span>
        );
      })}
    </span>
  );
}

export function TextSimilarityChecker() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [result, setResult] = useState<SimilarityResult | null>(null);
  const [showHighlights, setShowHighlights] = useState(false);

  const handleCompare = () => {
    const res = computeSimilarity(textA, textB);
    setResult(res);
    setShowHighlights(true);
    trackConvertSuccess(TOOL_SLUG, "compare");
  };

  const handleReset = () => {
    setTextA("");
    setTextB("");
    setResult(null);
    setShowHighlights(false);
  };

  const disabled = !textA.trim() || !textB.trim();

  const similarityLabel =
    result && result.similarityPercent >= 70
      ? "High similarity"
      : result && result.similarityPercent >= 40
      ? "Medium similarity"
      : "Low similarity";

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Text A (your content)
          </label>
          <textarea
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            placeholder="Paste or type your text here..."
            className="w-full h-48 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Text B (source or reference)
          </label>
          <textarea
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            placeholder="Paste the text you want to compare against..."
            className="w-full h-48 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleCompare}
          disabled={disabled}
          className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check similarity
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#0B0F1F]/60 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Estimated similarity</p>
              <p className="text-3xl font-semibold text-white mt-1">
                {result.similarityPercent.toFixed(1)}%
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Based on overlapping unique words (Jaccard similarity).
              </p>
            </div>
            <div className="space-y-1 text-sm text-gray-300">
              <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-[#E5E7EB]">
                {similarityLabel}
              </span>
              <p>
                Common words: <span className="font-semibold">{result.commonWordCount}</span>
              </p>
              <p className="text-xs text-gray-400">
                Text A words: {result.totalWordsA} • Text B words: {result.totalWordsB}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-300">Highlighted view</p>
            <label className="flex items-center gap-2 text-xs text-gray-400">
              <input
                type="checkbox"
                checked={showHighlights}
                onChange={(e) => setShowHighlights(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Highlight common words
            </label>
          </div>

          {showHighlights && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#020617] p-3 text-sm text-gray-200 whitespace-pre-wrap break-words">
                <p className="text-xs font-medium text-gray-400 mb-2">Text A with highlights</p>
                {highlightCommonWords(textA, textB)}
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#020617] p-3 text-sm text-gray-200 whitespace-pre-wrap break-words">
                <p className="text-xs font-medium text-gray-400 mb-2">Text B with highlights</p>
                {highlightCommonWords(textB, textA)}
              </div>
            </div>
          )}

          <p className="text-xs text-gray-500">
            This tool compares text locally in your browser and does not search the wider web or any
            external databases. It is designed as a quick similarity checker, not a full plagiarism
            detection service.
          </p>
        </div>
      )}
    </div>
  );
}

