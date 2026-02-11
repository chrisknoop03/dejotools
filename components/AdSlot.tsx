"use client";

interface AdSlotProps {
  slot: 'top' | 'mid' | 'bottom';
  className?: string;
}

export function AdSlot({ slot, className = '' }: AdSlotProps) {
  // Placeholder for future ad integration
  // Will be replaced with actual AdSense code when approved
  
  return (
    <div 
      className={`bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm ${className}`}
      data-ad-slot={slot}
      aria-hidden="true"
    >
      {/* Hidden placeholder - remove min-h when ads are active */}
      {/* <span>Ad Space ({slot})</span> */}
    </div>
  );
}
