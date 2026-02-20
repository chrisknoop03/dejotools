"use client";

import { useState } from "react";
import { trackConvertSuccess } from "@/lib/analytics";

const TOOL_SLUG = "fancy-text-generator";

const TEXT_STYLES = {
  bold: (text: string) => {
    const boldMap: Record<string, string> = {
      a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵",
      i: "𝗶", j: "𝗷", k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽",
      q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁", u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅",
      y: "𝘆", z: "𝘇", A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙",
      G: "𝗚", H: "𝗛", I: "𝗜", J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡",
      O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩",
      W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭"
    };
    return text.split("").map(char => boldMap[char] || char).join("");
  },
  italic: (text: string) => {
    const italicMap: Record<string, string> = {
      a: "𝘢", b: "𝘣", c: "𝘤", d: "𝘥", e: "𝘦", f: "𝘧", g: "𝘨", h: "𝘩",
      i: "𝘪", j: "𝘫", k: "𝘬", l: "𝘭", m: "𝘮", n: "𝘯", o: "𝘰", p: "𝘱",
      q: "𝘲", r: "𝘳", s: "𝘴", t: "𝘵", u: "𝘶", v: "𝘷", w: "𝘸", x: "𝘹",
      y: "𝘺", z: "𝘻", A: "𝘈", B: "𝘉", C: "𝘊", D: "𝘋", E: "𝘌", F: "𝘍",
      G: "𝘎", H: "𝘏", I: "𝘐", J: "𝘑", K: "𝘒", L: "𝘓", M: "𝘔", N: "𝘕",
      O: "𝘖", P: "𝘗", Q: "𝘘", R: "𝘙", S: "𝘚", T: "𝘛", U: "𝘜", V: "𝘝",
      W: "𝘞", X: "𝘟", Y: "𝘠", Z: "𝘡"
    };
    return text.split("").map(char => italicMap[char] || char).join("");
  },
  boldItalic: (text: string) => {
    const boldItalicMap: Record<string, string> = {
      a: "𝙖", b: "𝙗", c: "𝙘", d: "𝙙", e: "𝙚", f: "𝙛", g: "𝙜", h: "𝙝",
      i: "𝙞", j: "𝙟", k: "𝙠", l: "𝙡", m: "𝙢", n: "𝙣", o: "𝙤", p: "𝙥",
      q: "𝙦", r: "𝙧", s: "𝙨", t: "𝙩", u: "𝙪", v: "𝙫", w: "𝙬", x: "𝙭",
      y: "𝙮", z: "𝙯", A: "𝘼", B: "𝘽", C: "𝘾", D: "𝘿", E: "𝙀", F: "𝙁",
      G: "𝙂", H: "𝙃", I: "𝙄", J: "𝙅", K: "𝙆", L: "𝙇", M: "𝙈", N: "𝙉",
      O: "𝙊", P: "𝙋", Q: "𝙌", R: "𝙍", S: "𝙎", T: "𝙏", U: "𝙐", V: "𝙑",
      W: "𝙒", X: "𝙓", Y: "𝙔", Z: "𝙕"
    };
    return text.split("").map(char => boldItalicMap[char] || char).join("");
  },
  strikethrough: (text: string) => {
    return text.split("").map(char => char + "\u0336").join("");
  },
  smallCaps: (text: string) => {
    const smallCapsMap: Record<string, string> = {
      a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ғ", g: "ɢ", h: "ʜ",
      i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ",
      q: "ǫ", r: "ʀ", s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x",
      y: "ʏ", z: "ᴢ"
    };
    return text.toLowerCase().split("").map(char => smallCapsMap[char] || char).join("");
  },
  upsideDown: (text: string) => {
    const upsideDownMap: Record<string, string> = {
      a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ",
      i: "ᴉ", j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d",
      q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x",
      y: "ʎ", z: "z", A: "∀", B: "ᗺ", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "Ⅎ",
      G: "פ", H: "H", I: "I", J: "ſ", K: "ʞ", L: "˥", M: "W", N: "N",
      O: "O", P: "Ԁ", Q: "Q", R: "ᴿ", S: "S", T: "┴", U: "∩", V: "Λ",
      W: "M", X: "X", Y: "⅄", Z: "Z"
    };
    return text.split("").reverse().map(char => upsideDownMap[char] || char).join("");
  },
  bubble: (text: string) => {
    const bubbleMap: Record<string, string> = {
      a: "ⓐ", b: "ⓑ", c: "ⓒ", d: "ⓓ", e: "ⓔ", f: "ⓕ", g: "ⓖ", h: "ⓗ",
      i: "ⓘ", j: "ⓙ", k: "ⓚ", l: "ⓛ", m: "ⓜ", n: "ⓝ", o: "ⓞ", p: "ⓟ",
      q: "ⓠ", r: "ⓡ", s: "ⓢ", t: "ⓣ", u: "ⓤ", v: "ⓥ", w: "ⓦ", x: "ⓧ",
      y: "ⓨ", z: "ⓩ", A: "Ⓐ", B: "Ⓑ", C: "Ⓒ", D: "Ⓓ", E: "Ⓔ", F: "Ⓕ",
      G: "Ⓖ", H: "Ⓗ", I: "Ⓘ", J: "Ⓙ", K: "Ⓚ", L: "Ⓛ", M: "Ⓜ", N: "Ⓝ",
      O: "Ⓞ", P: "Ⓟ", Q: "Ⓠ", R: "Ⓡ", S: "Ⓢ", T: "Ⓣ", U: "Ⓤ", V: "Ⓥ",
      W: "Ⓦ", X: "Ⓧ", Y: "Ⓨ", Z: "Ⓩ"
    };
    return text.split("").map(char => bubbleMap[char] || char).join("");
  }
};

type StyleKey = keyof typeof TEXT_STYLES;

export function FancyTextGenerator() {
  const [input, setInput] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<StyleKey>("bold");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generateFancy = () => {
    if (!input.trim()) return;
    const fancy = TEXT_STYLES[selectedStyle](input);
    setOutput(fancy);
    setCopied(false);
    trackConvertSuccess(TOOL_SLUG, selectedStyle);
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

      {/* Style Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Choose Style
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.keys(TEXT_STYLES).map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style as StyleKey)}
              className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                selectedStyle === style
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {style.replace(/([A-Z])/g, " $1").trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateFancy}
        disabled={!input.trim()}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Generate Fancy Text
      </button>

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Fancy Text
            </label>
            <button
              onClick={handleCopy}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 min-h-[80px]">
            <p className="text-xl break-words">{output}</p>
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
