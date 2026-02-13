"use client";

import { useState } from "react";
import { trackConvertSuccess } from "@/lib/analytics";

const TOOL_SLUG = "lorem-ipsum-generator";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "perspiciatis", "unde",
  "omnis", "iste", "natus", "error", "voluptatem", "accusantium", "doloremque",
  "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo",
  "inventore", "veritatis", "quasi", "architecto", "beatae", "vitae", "dicta",
  "explicabo", "nemo", "ipsam", "quia", "voluptas", "aspernatur", "aut", "odit",
  "fugit", "consequuntur", "magni", "dolores", "eos", "ratione", "sequi",
  "nesciunt", "neque", "porro", "quisquam", "dolorem", "adipisci", "numquam",
  "eius", "modi", "tempora", "magnam", "quaerat"
];

type OutputType = "paragraphs" | "sentences" | "words";

export function LoremIpsumGenerator() {
  const [outputType, setOutputType] = useState<OutputType>("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const getRandomWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];

  const generateSentence = (wordCount: number = 0): string => {
    const length = wordCount || Math.floor(Math.random() * 10) + 8;
    const words: string[] = [];
    
    for (let i = 0; i < length; i++) {
      words.push(getRandomWord());
    }
    
    // Capitalize first word
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    
    return words.join(" ") + ".";
  };

  const generateParagraph = (): string => {
    const sentenceCount = Math.floor(Math.random() * 4) + 4;
    const sentences: string[] = [];
    
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence());
    }
    
    return sentences.join(" ");
  };

  const generateWords = (wordCount: number): string => {
    const words: string[] = [];
    for (let i = 0; i < wordCount; i++) {
      words.push(getRandomWord());
    }
    return words.join(" ");
  };

  const handleGenerate = () => {
    let result = "";
    
    switch (outputType) {
      case "paragraphs":
        const paragraphs: string[] = [];
        for (let i = 0; i < count; i++) {
          paragraphs.push(generateParagraph());
        }
        result = paragraphs.join("\n\n");
        break;
      case "sentences":
        const sentences: string[] = [];
        for (let i = 0; i < count; i++) {
          sentences.push(generateSentence());
        }
        result = sentences.join(" ");
        break;
      case "words":
        result = generateWords(count);
        break;
    }
    
    setOutput(result);
    setCopied(false);
    trackConvertSuccess(TOOL_SLUG, outputType);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getWordCount = (text: string) => text.split(/\s+/).filter(Boolean).length;
  const getCharCount = (text: string) => text.length;

  return (
    <div className="space-y-6">
      {/* Output Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Generate
        </label>
        <div className="flex gap-2">
          {(["paragraphs", "sentences", "words"] as OutputType[]).map((type) => (
            <button
              key={type}
              onClick={() => {
                setOutputType(type);
                setCount(type === "words" ? 50 : type === "sentences" ? 5 : 3);
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium capitalize transition-colors ${
                outputType === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Number of {outputType}
          </label>
          <span className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {count}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max={outputType === "words" ? 500 : outputType === "sentences" ? 20 : 10}
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Generate Lorem Ipsum
      </button>

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {getWordCount(output)} words • {getCharCount(output)} characters
            </div>
            <button
              onClick={handleCopy}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {copied ? "Copied!" : "Copy to clipboard"}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm resize-none"
          />
        </div>
      )}
    </div>
  );
}
