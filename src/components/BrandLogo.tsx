import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = ''
}) => {
  const getDims = () => {
    switch (size) {
      case 'sm':
        return {
          titleClass: 'text-lg tracking-tight font-extrabold',
          heartSize: 14,
          subClass: 'text-[9px] tracking-[0.25em] font-semibold text-white/90',
          gap: 'gap-1'
        };
      case 'lg':
        return {
          titleClass: 'text-3xl tracking-tight font-extrabold',
          heartSize: 24,
          subClass: 'text-xs tracking-[0.3em] font-bold text-white',
          gap: 'gap-1.5'
        };
      case 'md':
      default:
        return {
          titleClass: 'text-xl tracking-tight font-extrabold',
          heartSize: 18,
          subClass: 'text-[10px] tracking-[0.28em] font-semibold text-white/95',
          gap: 'gap-1'
        };
    }
  };

  const config = getDims();

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Top row: WFIT text with heart */}
      <div className={`flex items-center ${config.gap} leading-none`}>
        <span className={`text-white ${config.titleClass} font-['Inter']`}>
          W
        </span>
        {/* Animated glowing Neon Lime Green Heart */}
        <span className="inline-flex items-center justify-center animate-wfit-heart text-[#B2DF10] transition-transform">
          <svg
            width={config.heartSize}
            height={config.heartSize}
            viewBox="0 0 24 24"
            fill="#B2DF10"
            stroke="#B2DF10"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="filter drop-shadow-[0_0_8px_rgba(178,223,16,0.6)]"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </span>
        <span className={`text-white ${config.titleClass} font-['Inter']`}>
          FIT
        </span>
      </div>

      {/* Subtitle: MADURAI beneath */}
      {showSubtitle && (
        <span
          className={`uppercase mt-0.5 font-['Inter'] ${config.subClass}`}
        >
          MADURAI
        </span>
      )}
    </div>
  );
};
