"use client";

import { useState, useCallback, useRef } from "react";
import { trackFileUpload, trackConvertSuccess, trackConvertError } from "@/lib/analytics";

const TOOL_SLUG = 'srt-fixer';

interface Subtitle {
  index: number;
  startTime: string;
  endTime: string;
  text: string;
}

export function SrtFixer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [fileName, setFileName] = useState("");
  const [stats, setStats] = useState<{ original: number; fixed: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const parseSrt = useCallback((content: string): Subtitle[] => {
    const subtitles: Subtitle[] = [];
    
    // Normalize line endings
    const normalized = content
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .trim();
    
    // Split by double newline (subtitle blocks)
    const blocks = normalized.split(/\n\n+/);
    
    for (const block of blocks) {
      const lines = block.trim().split('\n');
      if (lines.length < 2) continue;
      
      // Try to find timestamp line
      let timestampIndex = -1;
      for (let i = 0; i < Math.min(lines.length, 3); i++) {
        if (lines[i].includes('-->')) {
          timestampIndex = i;
          break;
        }
      }
      
      if (timestampIndex === -1) continue;
      
      const timestampLine = lines[timestampIndex];
      const timestampMatch = timestampLine.match(/(\d{1,2}:\d{2}:\d{2}[,\.]\d{3})\s*-->\s*(\d{1,2}:\d{2}:\d{2}[,\.]\d{3})/);
      
      if (!timestampMatch) continue;
      
      const startTime = timestampMatch[1].replace('.', ',');
      const endTime = timestampMatch[2].replace('.', ',');
      const text = lines.slice(timestampIndex + 1).join('\n').trim();
      
      if (text) {
        subtitles.push({
          index: subtitles.length + 1,
          startTime,
          endTime,
          text
        });
      }
    }
    
    return subtitles;
  }, []);

  const formatSrt = useCallback((subtitles: Subtitle[]): string => {
    return subtitles
      .map((sub, i) => {
        return `${i + 1}\n${sub.startTime} --> ${sub.endTime}\n${sub.text}`;
      })
      .join('\n\n');
  }, []);

  const fixSrt = useCallback(() => {
    if (!input.trim()) return;
    
    try {
      const subtitles = parseSrt(input);
      
      if (subtitles.length === 0) {
        trackConvertError(TOOL_SLUG, 'No valid subtitles found');
        return;
      }
      
      const fixed = formatSrt(subtitles);
      setOutput(fixed);
      setStats({
        original: input.split(/\n\n+/).length,
        fixed: subtitles.length
      });
      trackConvertSuccess(TOOL_SLUG, 'srt');
    } catch (error) {
      console.error('SRT fix error:', error);
      trackConvertError(TOOL_SLUG, String(error));
    }
  }, [input, parseSrt, formatSrt]);

  const handleFileSelect = useCallback((file: File) => {
    trackFileUpload(TOOL_SLUG, 'text/srt', file.size);
    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setInput(content);
    };
    reader.readAsText(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.srt') || file.type === 'application/x-subrip')) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const downloadFixed = useCallback(() => {
    if (!output) return;
    
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName ? fileName.replace('.srt', '_fixed.srt') : 'subtitles_fixed.srt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [output, fileName]);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
    setFileName("");
    setStats(null);
  }, []);

  return (
    <div className="space-y-4">
      {/* File Upload */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".srt"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          className="hidden"
        />
        <svg className="w-10 h-10 mx-auto text-gray-400 dark:text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Drop an SRT file here or click to browse
        </p>
        {fileName && (
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
            Loaded: {fileName}
          </p>
        )}
      </div>

      {/* Or paste manually */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        — or paste SRT content below —
      </div>

      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          SRT Content
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`1\n00:00:01,000 --> 00:00:04,000\nFirst subtitle text\n\n2\n00:00:05,000 --> 00:00:08,000\nSecond subtitle text`}
          className="w-full h-48 p-4 font-mono text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={fixSrt}
          disabled={!input.trim()}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
        >
          Fix SRT
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
              Fixed SRT
            </label>
            <div className="flex items-center gap-4">
              {stats && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {stats.fixed} subtitles recovered
                </span>
              )}
              <button
                onClick={downloadFixed}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Download .srt
              </button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-48 p-4 font-mono text-sm bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg resize-none"
          />
        </div>
      )}
    </div>
  );
}
