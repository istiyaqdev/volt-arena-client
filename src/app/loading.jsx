"use client";
import { AiFillThunderbolt } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-10 overflow-hidden bg-(--noir)">
      {/* Cyber sports field lines background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
        viewBox="0 0 680 520"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect
          x="40"
          y="40"
          width="600"
          height="440"
          rx="8"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="2.5"
        />
        <line
          x1="340"
          y1="40"
          x2="340"
          y2="480"
          stroke="#8b5cf6"
          strokeWidth="1.5"
        />
        <circle
          cx="340"
          cy="260"
          r="70"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="1.5"
        />
        <circle cx="340" cy="260" r="4" fill="#8b5cf6" />
        <rect
          x="40"
          y="155"
          width="100"
          height="210"
          rx="4"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="1.5"
        />
        <rect
          x="540"
          y="155"
          width="100"
          height="210"
          rx="4"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="1.5"
        />
        <rect
          x="40"
          y="200"
          width="45"
          height="120"
          rx="2"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="1"
        />
        <rect
          x="595"
          y="200"
          width="45"
          height="120"
          rx="2"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="1"
        />
      </svg>

      {/* Glowing neon background dust */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#8b5cf6] opacity-[0.06] blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-[#ccff00] opacity-[0.03] blur-[60px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Spinning premium cyber ring */}
        <div className="relative mb-6 flex h-[76px] w-[76px] items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: "3.5px solid rgba(139, 92, 246, 0.15)",
              animation: "loading-spin 3s linear infinite",
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: "3.5px solid transparent",
              borderTopColor: "#ccff00",
              borderRightColor: "#8b5cf6",
              animation:
                "loading-spin 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
            }}
          />
          {/* Glowing thunderbolt icon */}
          <div className="z-10 flex h-12 w-12 items-center justify-center text-(--noir) rounded-full bg-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.5)]">
            <AiFillThunderbolt className="h-6 w-6 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <p className="mb-1 text-[24px] tracking-[6px] uppercase font-black text-white">
          VOLT<span className="text-[#ccff00]">ARENA</span>
        </p>

        {/* Subtitle */}
        <p className="mb-6 text-[10px] tracking-[3px] uppercase font-bold text-[#8b5cf6]">
          Connecting Arena Hub...
        </p>

        {/* Pulsing neon dots */}
        <div className="mb-6 flex items-center gap-2.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-[#ccff00]"
              style={{
                animation: `dot-pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Neon progress bar */}
        <div className="h-[3px] w-48 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#ccff00]"
            style={{ animation: "progress-sweep 2s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style>{`
                @keyframes loading-spin { to { transform: rotate(360deg); } }
                @keyframes dot-pulse {
                    0%, 80%, 100% { transform: scale(0.8); opacity: 0.4; background: #8b5cf6; }
                    40% { transform: scale(1.3); opacity: 1; background: #ccff00; box-shadow: 0 0 8px #ccff00; }
                }
                @keyframes progress-sweep {
                    0%   { width: 0%;   opacity: 1; transform: translateX(-100%); }
                    70%  { width: 100%; opacity: 1; transform: translateX(0%); }
                    100% { width: 100%; opacity: 0; transform: translateX(100%); }
                }
            `}</style>
    </div>
  );
};

export default Loading;
