import React from 'react';
import { RotateCcw, Lightbulb, FlipHorizontal, Settings, BookOpen, Edit3, BarChart2, Flag } from 'lucide-react';

interface GameControlsProps {
  onUndo: () => void;
  onHint: () => void;
  onFlipBoard: () => void;
  onResign: () => void;
  onOpenSettings: () => void;
  onOpenOpenings: () => void;
  onOpenBoardEditor: () => void;
  onOpenAnalysis: () => void;
  canUndo: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onUndo,
  onHint,
  onFlipBoard,
  onResign,
  onOpenSettings,
  onOpenOpenings,
  onOpenBoardEditor,
  onOpenAnalysis,
  canUndo,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-[#0d0d0d] rounded-2xl border border-white/5 shadow-2xl backdrop-blur-md">
      {/* Undo Button */}
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
          canUndo
            ? 'bg-[#111111] hover:bg-white/10 text-[#d4af37] border-white/10 shadow hover:scale-105'
            : 'bg-[#080808] text-white/20 border-white/5 cursor-not-allowed'
        }`}
        title="Undo last move"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Undo</span>
      </button>

      {/* Engine Hint Button */}
      <button
        onClick={onHint}
        className="flex items-center gap-1.5 px-3 py-2 bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#d4af37] border border-[#d4af37]/40 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 shadow"
        title="Get Stockfish-caliber move hint"
      >
        <Lightbulb className="w-3.5 h-3.5 text-[#d4af37]" />
        <span>Hint</span>
      </button>

      {/* Flip Board */}
      <button
        onClick={onFlipBoard}
        className="flex items-center gap-1.5 px-3 py-2 bg-[#111111] hover:bg-white/10 text-white/80 hover:text-[#d4af37] border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 shadow"
        title="Flip perspective"
      >
        <FlipHorizontal className="w-3.5 h-3.5" />
        <span>Flip</span>
      </button>

      {/* Opening Explorer */}
      <button
        onClick={onOpenOpenings}
        className="flex items-center gap-1.5 px-3 py-2 bg-[#111111] hover:bg-white/10 text-white/80 hover:text-[#d4af37] border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 shadow"
        title="Openings explorer database"
      >
        <BookOpen className="w-3.5 h-3.5" />
        <span>Openings</span>
      </button>

      {/* Post Game Analysis */}
      <button
        onClick={onOpenAnalysis}
        className="flex items-center gap-1.5 px-3 py-2 bg-[#111111] hover:bg-white/10 text-white/80 hover:text-[#d4af37] border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 shadow"
        title="Deep Engine Analysis Review"
      >
        <BarChart2 className="w-3.5 h-3.5" />
        <span>Analysis</span>
      </button>

      {/* Board Editor */}
      <button
        onClick={onOpenBoardEditor}
        className="flex items-center gap-1.5 px-3 py-2 bg-[#111111] hover:bg-white/10 text-white/80 hover:text-[#d4af37] border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 shadow"
        title="Custom Position Editor (FEN / PGN)"
      >
        <Edit3 className="w-3.5 h-3.5" />
        <span>Editor</span>
      </button>

      {/* Settings Modal */}
      <button
        onClick={onOpenSettings}
        className="flex items-center gap-1.5 px-3 py-2 bg-[#111111] hover:bg-white/10 text-white/80 hover:text-[#d4af37] border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 shadow"
        title="Customize Materials & Atmosphere"
      >
        <Settings className="w-3.5 h-3.5" />
        <span>Settings</span>
      </button>

      {/* Resign */}
      <button
        onClick={onResign}
        className="flex items-center gap-1.5 px-3 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 shadow"
        title="Resign match"
      >
        <Flag className="w-3.5 h-3.5" />
        <span>Resign</span>
      </button>
    </div>
  );
};
