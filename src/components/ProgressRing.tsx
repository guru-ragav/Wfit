import React from 'react';

interface ProgressRingProps {
  radius?: number;
  strokeWidth?: number;
  progress: number; // 0 to 100
  label?: string;
  sublabel?: string;
  className?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  radius = 48,
  strokeWidth = 8,
  progress,
  label,
  sublabel,
  className = ''
}) => {
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;
  const gradientId = `ring-grad-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        height={radius * 2}
        width={radius * 2}
        className="rotate-[-90deg] transition-all duration-700 ease-out"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B2DF10" />
            <stop offset="100%" stopColor="#D1EF51" />
          </linearGradient>
        </defs>

        {/* Background track circle */}
        <circle
          stroke="rgba(255, 255, 255, 0.08)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Animated progress circle */}
        <circle
          stroke={`url(#${gradientId})`}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-1">
        {label && (
          <span className="text-sm font-bold text-white tabular-nums tracking-tight">
            {label}
          </span>
        )}
        {sublabel && (
          <span className="text-[10px] text-white/60 font-medium tracking-tight">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};
