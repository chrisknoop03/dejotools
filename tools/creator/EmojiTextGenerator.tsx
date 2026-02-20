"use client";

import { useState } from "react";
import { trackConvertSuccess } from "@/lib/analytics";

const TOOL_SLUG = "emoji-text-generator";

const EMOJI_CATEGORIES = {
  faces: ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙"],
  hearts: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟"],
  gestures: ["👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "👇", "☝️", "👏", "🙌", "👐", "🤲", "🤝", "🙏"],
  objects: ["⭐", "🌟", "✨", "💫", "🔥", "💥", "💯", "💢", "💤", "💨", "🎉", "🎊", "🎈", "🎁", "🏆", "🥇", "🥈", "🥉", "🏅"],
  nature: ["🌱", "🌿", "🍀", "🌾", "🌷", "🌹", "🌺", "🌸", "🌼", "🌻", "🌞", "🌝", "🌚", "🌛", "🌜", "🌙", "⭐", "🌟", "✨"],
  food: ["🍎", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥬", "🥒"]
};

export function EmojiTextGenerator() {
  const [input, setInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof EMOJI_CATEGORIES>("faces");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"between" | "random" | "start" | "end">("between");
  const [copied, setCopied] = useState(false);

  const generateEmojiText = () => {
    if (!input.trim()) return;

    const words = input.split(/\s+/);
    const emojis = EMOJI_CATEGORIES[selectedCategory];
    let result = "";

    switch (mode) {
      case "between":
        result = words.map((word, i) => {
          const emoji = emojis[Math.floor(Math.random() * emojis.length)];
          return i === words.length - 1 ? word : `${word} ${emoji}`;
        }).join(" ");
        break;
      case "random":
        result = words.map(word => {
          const emoji = emojis[Math.floor(Math.random() * emojis.length)];
          return `${emoji} ${word} ${emoji}`;
        }).join(" ");
        break;
      case "start":
        result = words.map(word => {
          const emoji = emojis[Math.floor(Math.random() * emojis.length)];
          return `${emoji} ${word}`;
        }).join(" ");
        break;
      case "end":
        result = words.map(word => {
          const emoji = emojis[Math.floor(Math.random() * emojis.length)];
          return `${word} ${emoji}`;
        }).join(" ");
        break;
    }

    setOutput(result);
    setCopied(false);
    trackConvertSuccess(TOOL_SLUG, `${mode}-${selectedCategory}`);
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

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your text here..."
          className="w-full h-24 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Emoji Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Emoji Category
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(EMOJI_CATEGORIES).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as keyof typeof EMOJI_CATEGORIES)}
              className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {EMOJI_CATEGORIES[selectedCategory].slice(0, 10).map((emoji, i) => (
            <span key={i} className="text-2xl">{emoji}</span>
          ))}
        </div>
      </div>

      {/* Mode Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Placement Mode
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setMode("between")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === "between"
                ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Between Words
          </button>
          <button
            onClick={() => setMode("random")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === "random"
                ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Around Words
          </button>
          <button
            onClick={() => setMode("start")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === "start"
                ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Start of Words
          </button>
          <button
            onClick={() => setMode("end")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === "end"
                ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            End of Words
          </button>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateEmojiText}
        disabled={!input.trim()}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Generate Emoji Text
      </button>

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Emoji Text
            </label>
            <button
              onClick={handleCopy}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 min-h-[80px]">
            <p className="text-lg break-words">{output}</p>
          </div>
        </div>
      )}

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
