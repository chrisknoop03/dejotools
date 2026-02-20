"use client";

import { useState } from "react";
import { trackConvertSuccess } from "@/lib/analytics";

const TOOL_SLUG = "hashtag-generator";

const POPULAR_HASHTAGS = {
  instagram: [
    "#love", "#instagood", "#photooftheday", "#beautiful", "#fashion", "#happy",
    "#cute", "#tbt", "#like4like", "#followme", "#picoftheday", "#follow",
    "#me", "#selfie", "#summer", "#art", "#instadaily", "#friends", "#reels",
    "#nature", "#girl", "#fun", "#style", "#smile", "#food", "#instalike",
    "#beauty", "#life", "#happy", "#photography", "#likeforlike", "#follow4follow"
  ],
  tiktok: [
    "#fyp", "#foryou", "#foryoupage", "#viral", "#trending", "#tiktok",
    "#comedy", "#funny", "#dance", "#music", "#love", "#fashion", "#beauty",
    "#food", "#travel", "#art", "#cute", "#aesthetic", "#pov", "#xyzbca",
    "#duet", "#stitch", "#capcut", "#transition", "#dancechallenge", "#trend"
  ],
  youtube: [
    "#youtube", "#subscribe", "#like", "#comment", "#share", "#viral",
    "#trending", "#newvideo", "#youtuber", "#youtubevideos", "#youtubechannel",
    "#youtubers", "#youtubegaming", "#youtubemusic", "#youtubekids"
  ],
  general: [
    "#motivation", "#inspiration", "#quote", "#success", "#entrepreneur",
    "#business", "#marketing", "#socialmedia", "#digitalmarketing", "#branding",
    "#contentcreator", "#influencer", "#blogger", "#photography", "#design",
    "#art", "#creative", "#lifestyle", "#fitness", "#health", "#wellness"
  ]
};

export function HashtagGenerator() {
  const [input, setInput] = useState("");
  const [platform, setPlatform] = useState<keyof typeof POPULAR_HASHTAGS>("instagram");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateFromText = () => {
    if (!input.trim()) return;
    
    const words = input
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter(Boolean);
    
    const generated = words.map(word => `#${word}`);
    setHashtags(generated);
    setCopied(false);
    trackConvertSuccess(TOOL_SLUG, "text-to-hashtags");
  };

  const usePopular = () => {
    const popular = POPULAR_HASHTAGS[platform];
    setHashtags([...popular]);
    setCopied(false);
    trackConvertSuccess(TOOL_SLUG, `popular-${platform}`);
  };

  const addHashtag = (tag: string) => {
    if (!hashtags.includes(tag)) {
      setHashtags([...hashtags, tag]);
    }
  };

  const removeHashtag = (index: number) => {
    setHashtags(hashtags.filter((_, i) => i !== index));
  };

  const formatOutput = (format: "line" | "space" | "comma") => {
    switch (format) {
      case "line":
        return hashtags.join("\n");
      case "space":
        return hashtags.join(" ");
      case "comma":
        return hashtags.join(", ");
      default:
        return hashtags.join(" ");
    }
  };

  const handleCopy = async (format: "line" | "space" | "comma") => {
    const output = formatOutput(format);
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setHashtags([]);
    setInput("");
  };

  return (
    <div className="space-y-6">
      {/* Platform Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Platform
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(POPULAR_HASHTAGS).map((key) => (
            <button
              key={key}
              onClick={() => setPlatform(key as keyof typeof POPULAR_HASHTAGS)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                platform === key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Text Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Generate Hashtags from Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter keywords or text to convert to hashtags (e.g., 'beautiful sunset beach')"
          className="w-full h-24 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <button
          onClick={generateFromText}
          disabled={!input.trim()}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Hashtags
        </button>
      </div>

      {/* Popular Hashtags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Popular Hashtags for {platform.charAt(0).toUpperCase() + platform.slice(1)}
        </label>
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          {POPULAR_HASHTAGS[platform].slice(0, 20).map((tag) => (
            <button
              key={tag}
              onClick={() => addHashtag(tag)}
              className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-gray-200 dark:border-gray-600"
            >
              {tag} +
            </button>
          ))}
        </div>
        <button
          onClick={usePopular}
          className="mt-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Add All Popular Hashtags
        </button>
      </div>

      {/* Generated Hashtags */}
      {hashtags.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Your Hashtags ({hashtags.length})
            </label>
            <button
              onClick={clearAll}
              className="text-sm text-red-600 dark:text-red-400 hover:underline"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 min-h-[100px]">
            {hashtags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-gray-600"
              >
                {tag}
                <button
                  onClick={() => removeHashtag(index)}
                  className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                  aria-label="Remove"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Format Options */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Copy Format
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => handleCopy("space")}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                {copied ? "Copied!" : "Copy (Spaces)"}
              </button>
              <button
                onClick={() => handleCopy("line")}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Copy (Line Breaks)
              </button>
              <button
                onClick={() => handleCopy("comma")}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Copy (Commas)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
