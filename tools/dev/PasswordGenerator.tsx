"use client";

import { useState, useCallback } from "react";
import { trackConvertSuccess } from "@/lib/analytics";

const TOOL_SLUG = "password-generator";

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let chars = "";
    if (options.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (options.numbers) chars += "0123456789";
    if (options.symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
      setPassword("");
      return;
    }

    const array = new Uint32Array(options.length);
    crypto.getRandomValues(array);
    
    let result = "";
    for (let i = 0; i < options.length; i++) {
      result += chars[array[i] % chars.length];
    }
    
    setPassword(result);
    setCopied(false);
    trackConvertSuccess(TOOL_SLUG, "password");
  }, [options]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = (): { label: string; color: string; width: string } => {
    let score = 0;
    if (options.length >= 12) score++;
    if (options.length >= 16) score++;
    if (options.length >= 20) score++;
    if (options.uppercase) score++;
    if (options.lowercase) score++;
    if (options.numbers) score++;
    if (options.symbols) score++;

    if (score <= 3) return { label: "Weak", color: "bg-red-500", width: "25%" };
    if (score <= 5) return { label: "Medium", color: "bg-yellow-500", width: "50%" };
    if (score <= 6) return { label: "Strong", color: "bg-blue-500", width: "75%" };
    return { label: "Very Strong", color: "bg-green-500", width: "100%" };
  };

  const strength = getStrength();
  const hasAnyOption = options.uppercase || options.lowercase || options.numbers || options.symbols;

  return (
    <div className="space-y-6">
      {/* Password Display */}
      <div className="relative">
        <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Click generate to create a password"
            className="flex-1 bg-transparent text-lg font-mono text-gray-900 dark:text-white outline-none"
          />
          {password && (
            <button
              onClick={handleCopy}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
        
        {/* Strength Indicator */}
        {password && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Strength</span>
              <span className="font-medium text-gray-900 dark:text-white">{strength.label}</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${strength.color} transition-all duration-300`}
                style={{ width: strength.width }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Length Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Password Length
          </label>
          <span className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {options.length}
          </span>
        </div>
        <input
          type="range"
          min="8"
          max="64"
          value={options.length}
          onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>8</span>
          <span>64</span>
        </div>
      </div>

      {/* Character Options */}
      <div className="grid grid-cols-2 gap-3">
        <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <input
            type="checkbox"
            checked={options.uppercase}
            onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white text-sm">Uppercase</div>
            <div className="text-xs text-gray-500">A-Z</div>
          </div>
        </label>

        <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <input
            type="checkbox"
            checked={options.lowercase}
            onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white text-sm">Lowercase</div>
            <div className="text-xs text-gray-500">a-z</div>
          </div>
        </label>

        <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <input
            type="checkbox"
            checked={options.numbers}
            onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white text-sm">Numbers</div>
            <div className="text-xs text-gray-500">0-9</div>
          </div>
        </label>

        <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <input
            type="checkbox"
            checked={options.symbols}
            onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white text-sm">Symbols</div>
            <div className="text-xs text-gray-500">!@#$%...</div>
          </div>
        </label>
      </div>

      {/* Generate Button */}
      <button
        onClick={generatePassword}
        disabled={!hasAnyOption}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Generate Password
      </button>
    </div>
  );
}
