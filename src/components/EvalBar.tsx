import React from 'react';

interface EvalBarProps {
  evaluation: number; // Centipawns (Positive = White advantage)
  isFlipped?: boolean;
}

export const EvalBar: React.FC<EvalBarProps> = ({ evaluation, isFlipped = false }) => {
  // Convert centipawns to percentage fill (0% = Black win, 100% = White win, 50% = Equal)
  const getWhitePercentage = () => {
    if (evaluation >= 9000) return 100;
    if (evaluation <= -9000) return 0;

    // Logistic sigmoidal transform for smooth feel around zero
    const winProb = 1 / (1 + Math.pow(10, -evaluation / 400));
    return Math.round(winProb * 100);
  };

  const whitePct = getWhitePercentage();
  const blackPct = 100 - whitePct;

  // Format Eval string e.g. "+1.5", "-0.8", "#3"
  const formatEvalText = () => {
    if (Math.abs(evaluation) > 9000) {
      const mateIn = Math.ceil((10000 - Math.abs(evaluation)) / 2);
      return evaluation > 0 ? `M${mateIn}` : `-M${mateIn}`;
    }
    const score = (evaluation / 100).toFixed(1);
    return evaluation > 0 ? `+${score}` : `${score}`;
  };

  const evalText = formatEvalText();

  return (
    <div className="flex flex-col items-center h-full w-7 bg-[#0c0c0c] rounded-lg p-1 border border-white/5 shadow-2xl overflow-hidden select-none">
      {/* Top Label (White or Black depending on flip) */}
      <div className="text-[10px] font-extrabold text-[#d4af37] mb-1 font-mono tracking-tight">
        {evalText}
      </div>

      {/* Vertical Meter Bar */}
      <div className="relative w-full flex-1 rounded bg-[#111111] overflow-hidden flex flex-col justify-between border border-white/5">
        {/* White Bar */}
        <div
          className="w-full bg-gradient-to-b from-[#d4af37] to-[#b8962e] transition-all duration-500 ease-out shadow-inner"
          style={{
            height: isFlipped ? `${blackPct}%` : `${whitePct}%`,
          }}
        />

        {/* Black Bar */}
        <div
          className="w-full bg-[#1a1a1a] transition-all duration-500 ease-out"
          style={{
            height: isFlipped ? `${whitePct}%` : `${blackPct}%`,
          }}
        />
      </div>
    </div>
  );
};
