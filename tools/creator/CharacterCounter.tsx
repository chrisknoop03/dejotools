"use client";

import { useState, useMemo } from "react";

const TOOL_SLUG = "character-counter";

interface PlatformLimit {
  name: string;
  limit: number;
  icon: string;
}

const PLATFORM_LIMITS: PlatformLimit[] = [
  { name: "Twitter/X", limit: 280, icon: "𝕏" },
  { name: "Instagram Caption", limit: 2200, icon: "📷" },
  { name: "Instagram Bio", limit: 150, icon: "📷" },
  { name: "TikTok Caption", limit: 2200, icon: "🎵" },
  { name: "TikTok Bio", limit: 80, icon: "🎵" },
  { name: "YouTube Title", limit: 100, icon: "▶️" },
  { name: "YouTube Description", limit: 5000, icon: "▶️" },
  { name: "Facebook Post", limit: 63206, icon: "📘" },
  { name: "LinkedIn Post", limit: 3000, icon: "💼" },
  { name: "Pinterest Pin", limit: 500, icon: "📌" },
];

export function CharacterCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0;
    const lines = text.trim() ? text.split(/\n/).length : 0;

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
    };
  }, [text]);

  const getProgressColor = (current: number, limit: number) => {
    const percentage = (current / limit) * 100;
    if (percentage >= 100) return "bg-red-500";
    if (percentage >= 90) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getTextColor = (current: number, limit: number) => {
    const percentage = (current / limit) * 100;
    if (percentage >= 100) return "text-red-600 dark:text-red-400";
    if (percentage >= 90) return "text-yellow-600 dark:text-yellow-400";
    return "text-green-600 dark:text-green-400";
  };

  return (
    <div className="space-y-6">
      {/* Text Input */}
      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="w-full h-48 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.characters}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Characters</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.charactersNoSpaces}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">No Spaces</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.words}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Words</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.sentences}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Sentences</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.paragraphs}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Paragraphs</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.lines}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Lines</div>
        </div>
      </div>

      {/* Platform Limits */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Platform Limits
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PLATFORM_LIMITS.map((platform) => {
            const percentage = Math.min((stats.characters / platform.limit) * 100, 100);
            const remaining = platform.limit - stats.characters;
            
            return (
              <div
                key={platform.name}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span>{platform.icon}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {platform.name}
                    </span>
                  </div>
                  <span className={`text-sm font-mono ${getTextColor(stats.characters, platform.limit)}`}>
                    {remaining >= 0 ? remaining : `+${Math.abs(remaining)}`}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${getProgressColor(stats.characters, platform.limit)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>{stats.characters} / {platform.limit}</span>
                  <span>{percentage.toFixed(0)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clear Button */}
      {text && (
        <button
          onClick={() => setText("")}
          className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Clear Text
        </button>
      )}
    </div>
  );
}
