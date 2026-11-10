import React, { useState } from 'react';
import { TrendingDown, Activity, Scale, Award, Plus, Calendar } from 'lucide-react';
import { ProgressMetric, UserProfile, Language } from '../../types/wfit';
import { I18N } from '../../data/mockData';

interface ProgressTrackerViewProps {
  history: ProgressMetric[];
  user: UserProfile;
  lang: Language;
  onLogNewWeight: (newWeight: number) => void;
}

export const ProgressTrackerView: React.FC<ProgressTrackerViewProps> = ({
  history,
  user,
  lang,
  onLogNewWeight
}) => {
  const t = I18N[lang];
  const [inputWeight, setInputWeight] = useState<string>('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const currentWeight = user.weightKg;
  const initialWeight = history[0]?.weight || 78.5;
  const totalLost = (initialWeight - currentWeight).toFixed(1);

  // Height in meters for BMI
  const heightM = user.heightCm / 100;
  const bmi = (currentWeight / (heightM * heightM)).toFixed(1);

  const handleSubmitWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(inputWeight);
    if (!isNaN(val) && val > 30 && val < 250) {
      onLogNewWeight(val);
      setInputWeight('');
    }
  };

  // SVG Chart calculation
  const minW = Math.min(...history.map((h) => h.weight)) - 1;
  const maxW = Math.max(...history.map((h) => h.weight)) + 1;
  const chartHeight = 160;
  const chartWidth = 360;
  const paddingX = 30;
  const paddingY = 25;

  const points = history.map((h, i) => {
    const x = paddingX + (i / (history.length - 1)) * (chartWidth - paddingX * 2);
    const y =
      chartHeight -
      paddingY -
      ((h.weight - minW) / (maxW - minW)) * (chartHeight - paddingY * 2);
    return { x, y, ...h };
  });

  const svgPath = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaPath = `${svgPath} L ${points[points.length - 1].x} ${chartHeight - 10} L ${points[0].x} ${chartHeight - 10} Z`;

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          {t.progressHeader}
        </h2>
        <p className="text-xs text-white/60 mt-1">
          Tracking body composition, weight curve, and metabolic adaptation over time.
        </p>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-[#26291F] border border-white/5 space-y-1">
          <span className="text-[11px] text-white/50 block font-medium">
            {t.currentWeight}
          </span>
          <div className="text-2xl font-bold text-white tabular-nums">
            {currentWeight} <span className="text-xs font-normal text-white/50">kg</span>
          </div>
          <span className="text-[11px] font-semibold text-[#B2DF10] flex items-center gap-0.5">
            <TrendingDown size={12} /> -{totalLost} kg total
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#26291F] border border-white/5 space-y-1">
          <span className="text-[11px] text-white/50 block font-medium">
            {t.targetWeight}
          </span>
          <div className="text-2xl font-bold text-[#D1EF51] tabular-nums">
            {user.targetWeightKg} <span className="text-xs font-normal text-white/50">kg</span>
          </div>
          <span className="text-[11px] text-white/50 block">
            {(currentWeight - user.targetWeightKg).toFixed(1)} kg to goal
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#26291F] border border-white/5 space-y-1">
          <span className="text-[11px] text-white/50 block font-medium">
            {t.bmiLabel}
          </span>
          <div className="text-2xl font-bold text-white tabular-nums">
            {bmi}
          </div>
          <span className="text-[11px] font-semibold text-[#B2DF10]">
            Healthy Athletic
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#26291F] border border-white/5 space-y-1">
          <span className="text-[11px] text-white/50 block font-medium">
            {t.muscleMass}
          </span>
          <div className="text-2xl font-bold text-white tabular-nums">
            34.6 <span className="text-xs font-normal text-white/50">kg</span>
          </div>
          <span className="text-[11px] text-[#D1EF51] font-semibold">
            +1.8 kg lean gain
          </span>
        </div>
      </div>

      {/* Interactive Line Chart Card */}
      <div className="p-5 rounded-2xl bg-[#26291F] border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              {t.weightTrend}
            </h3>
            <span className="text-xs text-white/50">6-Week InBody progress</span>
          </div>
          <span className="text-xs font-mono font-semibold text-[#B2DF10] px-2 py-0.5 rounded bg-[#10110D]">
            -4.3 kg Trend
          </span>
        </div>

        {/* SVG Chart */}
        <div className="relative w-full overflow-hidden flex items-center justify-center py-2">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full max-w-lg h-auto overflow-visible select-none"
          >
            <defs>
              <linearGradient id="chartGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#B2DF10" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#B2DF10" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line
              x1={paddingX}
              y1={chartHeight - paddingY}
              x2={chartWidth - paddingX}
              y2={chartHeight - paddingY}
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="3 3"
            />
            <line
              x1={paddingX}
              y1={chartHeight / 2}
              x2={chartWidth - paddingX}
              y2={chartHeight / 2}
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="3 3"
            />

            {/* Area under curve */}
            <path d={areaPath} fill="url(#chartGlow)" />

            {/* Trend Line */}
            <path
              d={svgPath}
              fill="none"
              stroke="#B2DF10"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Points */}
            {points.map((p, i) => (
              <g
                key={i}
                className="cursor-pointer transition-transform"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hoveredIndex === i ? 6 : 4}
                  fill="#10110D"
                  stroke="#D1EF51"
                  strokeWidth="2.5"
                />

                {/* X-axis labels */}
                <text
                  x={p.x}
                  y={chartHeight - 6}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.5)"
                  fontSize="9"
                  fontFamily="Inter"
                >
                  {p.date}
                </text>

                {/* Floating tooltip on hover */}
                {hoveredIndex === i && (
                  <g>
                    <rect
                      x={p.x - 28}
                      y={p.y - 32}
                      width="56"
                      height="20"
                      rx="4"
                      fill="#10110D"
                      stroke="#B2DF10"
                      strokeWidth="1"
                    />
                    <text
                      x={p.x}
                      y={p.y - 18}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="Inter"
                    >
                      {p.weight} kg
                    </text>
                  </g>
                )}
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Log Today's Weight Form */}
      <form
        onSubmit={handleSubmitWeight}
        className="p-4 rounded-2xl bg-[#26291F] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div className="space-y-0.5">
          <label className="text-xs font-semibold text-white block">
            Log Current Weight Today
          </label>
          <span className="text-[11px] text-white/50 block">
            Weigh in barefoot before breakfast at any Madurai club InBody station
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="number"
              step="0.1"
              value={inputWeight}
              onChange={(e) => setInputWeight(e.target.value)}
              placeholder="e.g. 73.8"
              className="w-32 bg-[#10110D] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#B2DF10] font-mono text-center"
            />
            <span className="absolute right-2.5 top-2.5 text-xs text-white/40">kg</span>
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-xl btn-wfit-primary text-xs font-semibold cursor-pointer whitespace-nowrap"
          >
            Update Metric
          </button>
        </div>
      </form>
    </div>
  );
};
