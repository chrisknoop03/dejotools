"use client";

import { useEffect } from "react";
import { trackToolView } from "@/lib/analytics";

interface ToolViewTrackerProps {
  slug: string;
  category: string;
}

export function ToolViewTracker({ slug, category }: ToolViewTrackerProps) {
  useEffect(() => {
    trackToolView(slug, category);
  }, [slug, category]);

  return null;
}
