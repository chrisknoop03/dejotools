"use client";

import { useState, useEffect } from "react";
import { trackConvertSuccess } from "@/lib/analytics";

const TOOL_SLUG = "hex-rgb-converter";

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

export function ColorConverter() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState<RGB>({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState<HSL>({ h: 217, s: 91, l: 60 });
  const [copied, setCopied] = useState<string | null>(null);

  // Convert HEX to RGB
  const hexToRgb = (hex: string): RGB | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // Convert RGB to HEX
  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + [r, g, b].map(x => {
      const hex = Math.max(0, Math.min(255, x)).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number): HSL => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // Convert HSL to RGB
  const hslToRgb = (h: number, s: number, l: number): RGB => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  // Handle HEX input change
  const handleHexChange = (value: string) => {
    setHex(value);
    if (/^#?[a-f\d]{6}$/i.test(value)) {
      const newRgb = hexToRgb(value);
      if (newRgb) {
        setRgb(newRgb);
        setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
        trackConvertSuccess(TOOL_SLUG, "hex-to-rgb");
      }
    }
  };

  // Handle RGB input change
  const handleRgbChange = (channel: keyof RGB, value: number) => {
    const newRgb = { ...rgb, [channel]: value };
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
    trackConvertSuccess(TOOL_SLUG, "rgb-to-hex");
  };

  // Handle HSL input change
  const handleHslChange = (channel: keyof HSL, value: number) => {
    const newHsl = { ...hsl, [channel]: value };
    setHsl(newHsl);
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  // Handle color picker change
  const handleColorPicker = (value: string) => {
    handleHexChange(value);
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const hexValue = hex.startsWith("#") ? hex : `#${hex}`;
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return (
    <div className="space-y-6">
      {/* Color Preview */}
      <div className="flex gap-4 items-stretch">
        <div
          className="w-32 h-32 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-inner flex-shrink-0"
          style={{ backgroundColor: hexValue }}
        />
        <div className="flex-1 space-y-2">
          <input
            type="color"
            value={hexValue}
            onChange={(e) => handleColorPicker(e.target.value)}
            className="w-full h-12 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-700"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Click to pick a color
          </p>
        </div>
      </div>

      {/* HEX Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">HEX</label>
          <button
            onClick={() => copyToClipboard(hexValue, "hex")}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            {copied === "hex" ? "Copied!" : "Copy"}
          </button>
        </div>
        <input
          type="text"
          value={hex}
          onChange={(e) => handleHexChange(e.target.value)}
          placeholder="#000000"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* RGB Inputs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">RGB</label>
          <button
            onClick={() => copyToClipboard(rgbString, "rgb")}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            {copied === "rgb" ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {(["r", "g", "b"] as const).map((channel) => (
            <div key={channel}>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase">
                {channel}
              </label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgb[channel]}
                onChange={(e) => handleRgbChange(channel, parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
        <div className="mt-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-center font-mono text-sm text-gray-600 dark:text-gray-400">
          {rgbString}
        </div>
      </div>

      {/* HSL Inputs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">HSL</label>
          <button
            onClick={() => copyToClipboard(hslString, "hsl")}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            {copied === "hsl" ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">H (0-360)</label>
            <input
              type="number"
              min="0"
              max="360"
              value={hsl.h}
              onChange={(e) => handleHslChange("h", parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">S (0-100)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={hsl.s}
              onChange={(e) => handleHslChange("s", parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">L (0-100)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={hsl.l}
              onChange={(e) => handleHslChange("l", parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-center font-mono text-sm text-gray-600 dark:text-gray-400">
          {hslString}
        </div>
      </div>
    </div>
  );
}
