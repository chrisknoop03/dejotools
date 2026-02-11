"use client";

import { useState, useCallback, useEffect } from "react";
import { trackConvertSuccess } from "@/lib/analytics";

const TOOL_SLUG = 'timestamp-converter';

export function TimestampConverter() {
  const [timestamp, setTimestamp] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const [results, setResults] = useState<{
    seconds: number;
    milliseconds: number;
    localDate: string;
    utcDate: string;
    iso: string;
  } | null>(null);
  const [dateResults, setDateResults] = useState<{
    seconds: number;
    milliseconds: number;
  } | null>(null);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const convertTimestamp = useCallback(() => {
    if (!timestamp.trim()) return;
    
    let ts = parseInt(timestamp.trim(), 10);
    if (isNaN(ts)) return;
    
    // Detect if milliseconds (13 digits) or seconds (10 digits)
    const isMilliseconds = timestamp.length >= 13;
    const msTimestamp = isMilliseconds ? ts : ts * 1000;
    
    const date = new Date(msTimestamp);
    
    if (isNaN(date.getTime())) return;
    
    setResults({
      seconds: Math.floor(msTimestamp / 1000),
      milliseconds: msTimestamp,
      localDate: date.toLocaleString(),
      utcDate: date.toUTCString(),
      iso: date.toISOString(),
    });
    
    trackConvertSuccess(TOOL_SLUG, 'timestamp-to-date');
  }, [timestamp]);

  const convertDate = useCallback(() => {
    if (!dateInput) return;
    
    const dateTimeString = timeInput 
      ? `${dateInput}T${timeInput}`
      : `${dateInput}T00:00:00`;
    
    const date = new Date(dateTimeString);
    
    if (isNaN(date.getTime())) return;
    
    setDateResults({
      seconds: Math.floor(date.getTime() / 1000),
      milliseconds: date.getTime(),
    });
    
    trackConvertSuccess(TOOL_SLUG, 'date-to-timestamp');
  }, [dateInput, timeInput]);

  const copyToClipboard = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
  }, []);

  const useCurrentTime = useCallback(() => {
    setTimestamp(currentTime.toString());
  }, [currentTime]);

  const currentDate = new Date(currentTime);

  return (
    <div className="space-y-6">
      {/* Current Time Display */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200 mb-2 font-medium">Current Time</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Unix (seconds): </span>
            <code className="text-blue-700 dark:text-blue-300">{Math.floor(currentTime / 1000)}</code>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Unix (ms): </span>
            <code className="text-blue-700 dark:text-blue-300">{currentTime}</code>
          </div>
          <div className="sm:col-span-2">
            <span className="text-gray-600 dark:text-gray-400">Local: </span>
            <code className="text-blue-700 dark:text-blue-300">{currentDate.toLocaleString()}</code>
          </div>
        </div>
      </div>

      {/* Timestamp to Date */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 dark:text-white mb-3">Timestamp → Date</h3>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="Enter Unix timestamp (e.g., 1699900000)"
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={useCurrentTime}
            className="px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            Now
          </button>
          <button
            onClick={convertTimestamp}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Convert
          </button>
        </div>
        
        {results && (
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Local Time:</span>
              <div className="flex items-center gap-2">
                <code className="text-gray-900 dark:text-white">{results.localDate}</code>
                <button onClick={() => copyToClipboard(results.localDate)} className="text-blue-600 dark:text-blue-400 hover:underline text-xs">Copy</button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">UTC:</span>
              <div className="flex items-center gap-2">
                <code className="text-gray-900 dark:text-white">{results.utcDate}</code>
                <button onClick={() => copyToClipboard(results.utcDate)} className="text-blue-600 dark:text-blue-400 hover:underline text-xs">Copy</button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">ISO 8601:</span>
              <div className="flex items-center gap-2">
                <code className="text-gray-900 dark:text-white">{results.iso}</code>
                <button onClick={() => copyToClipboard(results.iso)} className="text-blue-600 dark:text-blue-400 hover:underline text-xs">Copy</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Date to Timestamp */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 dark:text-white mb-3">Date → Timestamp</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="time"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            step="1"
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={convertDate}
            disabled={!dateInput}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
          >
            Convert
          </button>
        </div>
        
        {dateResults && (
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Seconds:</span>
              <div className="flex items-center gap-2">
                <code className="text-gray-900 dark:text-white">{dateResults.seconds}</code>
                <button onClick={() => copyToClipboard(dateResults.seconds.toString())} className="text-blue-600 dark:text-blue-400 hover:underline text-xs">Copy</button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Milliseconds:</span>
              <div className="flex items-center gap-2">
                <code className="text-gray-900 dark:text-white">{dateResults.milliseconds}</code>
                <button onClick={() => copyToClipboard(dateResults.milliseconds.toString())} className="text-blue-600 dark:text-blue-400 hover:underline text-xs">Copy</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
