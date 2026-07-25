import React from 'react';
import { MoveAnalysis } from '../types/chess';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Award, AlertTriangle, HelpCircle } from 'lucide-react';

interface MoveHistoryProps {
  moveHistory: MoveAnalysis[];
  currentMoveIndex: number;
  onSelectMove: (index: number) => void;
  onFirstMove: () => void;
  onPrevMove: () => void;
  onNextMove: () => void;
  onLatestMove: () => void;
}

export const MoveHistory: React.FC<MoveHistoryProps> = ({
  moveHistory,
  currentMoveIndex,
  onSelectMove,
  onFirstMove,
  onPrevMove,
  onNextMove,
  onLatestMove,
}) => {
  // Group moves into pairs (White move, Black move)
  const pairedMoves: { moveNumber: number; white?: MoveAnalysis; black?: MoveAnalysis; whiteIdx: number; blackIdx?: number }[] = [];

  for (let i = 0; i < moveHistory.length; i += 2) {
    pairedMoves.push({
      moveNumber: Math.floor(i / 2) + 1,
      white: moveHistory[i],
      black: moveHistory[i + 1],
      whiteIdx: i,
      blackIdx: i + 1 < moveHistory.length ? i + 1 : undefined,
    });
  }

  // Classification Badge Icon Helper
  const renderClassificationBadge = (cls?: MoveAnalysis['classification']) => {
    switch (cls) {
      case 'brilliant':
        return <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 rounded border border-cyan-400/40 ml-1">‼ Brilliant</span>;
      case 'great':
        return <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-400/40 ml-1">! Great</span>;
      case 'best':
        return <span className="inline-flex items-center px-1 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 rounded ml-1">Best</span>;
      case 'mistake':
        return <span className="inline-flex items-center px-1 py-0.5 text-[10px] font-bold bg-amber-600/30 text-amber-400 rounded ml-1">? Mistake</span>;
      case 'blunder':
        return <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-extrabold bg-red-600/30 text-red-400 rounded border border-red-500/40 ml-1">?? Blunder</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0c0c0c] rounded-2xl border border-white/5 p-4 shadow-2xl backdrop-blur-md">
      {/* Move History Panel Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
        <h3 className="text-xs font-semibold tracking-[0.2em] text-[#d4af37] uppercase flex items-center gap-2">
          <span>Notation</span>
        </h3>
        <span className="text-xs font-mono text-white/40">
          {moveHistory.length} moves
        </span>
      </div>

      {/* Move History Table Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar text-xs font-mono">
        {pairedMoves.length === 0 ? (
          <div className="text-center text-white/30 py-8 italic font-sans text-xs">
            Game started. Make a move on the board!
          </div>
        ) : (
          pairedMoves.map((pair) => (
            <div key={pair.moveNumber} className="grid grid-cols-12 items-center hover:bg-white/5 rounded px-2 py-1 transition-colors border-b border-white/5">
              <span className="col-span-2 text-white/30 font-medium">
                {pair.moveNumber}.
              </span>

              {/* White Move */}
              <div
                onClick={() => onSelectMove(pair.whiteIdx)}
                className={`col-span-5 flex items-center gap-1 cursor-pointer px-2 py-1 rounded transition-colors ${
                  currentMoveIndex === pair.whiteIdx
                    ? 'bg-[#d4af37]/20 text-[#d4af37] font-bold border border-[#d4af37]/40'
                    : 'text-stone-200 hover:bg-white/10'
                }`}
              >
                <span>{pair.white?.san}</span>
                {renderClassificationBadge(pair.white?.classification)}
              </div>

              {/* Black Move */}
              {pair.black && pair.blackIdx !== undefined ? (
                <div
                  onClick={() => onSelectMove(pair.blackIdx)}
                  className={`col-span-5 flex items-center gap-1 cursor-pointer px-2 py-1 rounded transition-colors ${
                    currentMoveIndex === pair.blackIdx
                      ? 'bg-[#d4af37]/20 text-[#d4af37] font-bold border border-[#d4af37]/40'
                      : 'text-stone-300 hover:bg-white/10'
                  }`}
                >
                  <span>{pair.black.san}</span>
                  {renderClassificationBadge(pair.black.classification)}
                </div>
              ) : (
                <div className="col-span-5" />
              )}
            </div>
          ))
        )}
      </div>

      {/* Replay Controls Footer */}
      <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-3">
        <button
          onClick={onFirstMove}
          title="First move"
          className="p-2 bg-[#111111] hover:bg-white/10 text-[#d4af37] rounded-lg transition-colors border border-white/10"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
        <button
          onClick={onPrevMove}
          title="Previous move"
          className="p-2 bg-[#111111] hover:bg-white/10 text-[#d4af37] rounded-lg transition-colors border border-white/10"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={onNextMove}
          title="Next move"
          className="p-2 bg-[#111111] hover:bg-white/10 text-[#d4af37] rounded-lg transition-colors border border-white/10"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={onLatestMove}
          title="Latest move"
          className="p-2 bg-[#111111] hover:bg-white/10 text-[#d4af37] rounded-lg transition-colors border border-white/10"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
