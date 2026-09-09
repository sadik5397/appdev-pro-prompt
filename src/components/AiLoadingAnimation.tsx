import React from 'react';

export const AiLoadingAnimation: React.FC = () => {
  return (
    <div className="relative w-44 h-44 flex items-center justify-center">
      {/* Ambient Pulsing Glow Background */}
      <div className="absolute inset-0 rounded-full bg-[#0866FF]/20 blur-xl animate-pulse" />

      {/* SVG Multi-Ring Animated Tech Radar */}
      <svg className="w-full h-full relative z-10" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0866FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Outer Orbiting Ring 1 (Clockwise) */}
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="url(#blueGradient)"
          strokeWidth="2.5"
          strokeDasharray="50 160"
          strokeLinecap="round"
          className="animate-[spin_4s_linear_infinite] origin-center"
        />

        {/* Counter Orbiting Ring 2 (Counter-Clockwise) */}
        <circle
          cx="100"
          cy="100"
          r="68"
          fill="none"
          stroke="#1E2638"
          strokeWidth="2"
        />
        <circle
          cx="100"
          cy="100"
          r="68"
          fill="none"
          stroke="#0866FF"
          strokeWidth="3"
          strokeDasharray="30 110"
          strokeLinecap="round"
          className="animate-[spin_3s_linear_infinite_reverse] origin-center opacity-85"
        />

        {/* Inner Pulsing Radar Ring 3 */}
        <circle
          cx="100"
          cy="100"
          r="48"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeDasharray="15 45"
          className="animate-[spin_2s_linear_infinite] origin-center opacity-90"
        />

        {/* Orbiting Satellite Dots */}
        <g className="animate-[spin_5s_linear_infinite] origin-center">
          <circle cx="100" cy="15" r="4.5" fill="#38bdf8" />
          <circle cx="100" cy="185" r="3.5" fill="#0866FF" />
          <circle cx="15" cy="100" r="3.5" fill="#0866FF" />
        </g>

        {/* Center Glowing Core */}
        <circle
          cx="100"
          cy="100"
          r="26"
          fill="#0B0F17"
          stroke="#0866FF"
          strokeWidth="2"
        />
        <circle
          cx="100"
          cy="100"
          r="15"
          fill="url(#blueGradient)"
          className="animate-pulse"
        />
        {/* Core Diamond Symbol */}
        <path
          d="M100 89 L109 100 L100 111 L91 100 Z"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
};
