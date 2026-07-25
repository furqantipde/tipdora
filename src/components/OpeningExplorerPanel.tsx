import React, { useState } from 'react';
import { OPENINGS_DATABASE } from '../utils/openingDatabase';
import { OpeningData } from '../types/chess';
import { X, Search, BookOpen, Play } from 'lucide-react';

interface OpeningExplorerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadOpeningMoves: (moves: string[]) => void;
}

export const OpeningExplorerPanel: React.FC<OpeningExplorerPanelProps> = ({
  isOpen,
  onClose,
  onLoadOpeningMoves,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOpening, setSelectedOpening] = useState<OpeningData>(OPENINGS_DATABASE[0]);

  if (!isOpen) return null;

  const filteredOpenings = OPENINGS_DATABASE.filter(op =>
    op.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.eco.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-stone-900 border border-amber-900/50 rounded-2xl shadow-2xl overflow-hidden text-amber-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-900/40 bg-stone-950/80">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-amber-200">Opening Explorer & Master Theory</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-stone-800 rounded-lg text-amber-400/80 hover:text-amber-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-stone-950/40 border-b border-amber-900/30">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-amber-400/60" />
            <input
              type="text"
              placeholder="Search by name or ECO code (e.g., Ruy Lopez, Sicilian, C65)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-900 border border-amber-900/40 rounded-xl text-xs text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Content Body: Split view (Opening list left, details right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Opening List Left Column */}
          <div className="md:col-span-5 border-r border-amber-900/30 overflow-y-auto p-2 space-y-1 max-h-[50vh] md:max-h-full">
            {filteredOpenings.map(op => (
              <div
                key={op.eco + op.name}
                onClick={() => setSelectedOpening(op)}
                className={`p-3 rounded-xl cursor-pointer transition-all border ${
                  selectedOpening.name === op.name
                    ? 'bg-amber-500/20 border-amber-500/60 text-amber-100 shadow'
                    : 'bg-stone-950/40 border-transparent hover:bg-stone-800/60 text-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{op.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 bg-amber-950/60 text-amber-400 rounded">
                    {op.eco}
                  </span>
                </div>
                <div className="text-[10px] text-amber-400/60 mt-1 font-mono truncate">
                  1. {op.moves.join(' ')}
                </div>
              </div>
            ))}
          </div>

          {/* Details Right Column */}
          <div className="md:col-span-7 p-6 overflow-y-auto space-y-5 bg-stone-950/60">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 font-mono text-xs font-bold rounded">
                  {selectedOpening.eco}
                </span>
                <h3 className="text-lg font-bold text-amber-200">{selectedOpening.name}</h3>
              </div>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                {selectedOpening.description}
              </p>
            </div>

            {/* Move Sequence */}
            <div className="p-3 bg-stone-900 rounded-xl border border-amber-900/30">
              <span className="text-[10px] uppercase font-bold text-amber-400/70">Move Sequence</span>
              <div className="text-sm font-mono text-amber-200 font-bold mt-1">
                {selectedOpening.moves.map((m, i) => (
                  <span key={i} className="mr-2">
                    {i % 2 === 0 ? `${i / 2 + 1}.` : ''} {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Grandmaster Statistics Bar */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-amber-400/70">Master Win Rates</span>
              <div className="h-6 w-full flex rounded-lg overflow-hidden border border-stone-800 text-[10px] font-bold">
                <div style={{ width: `${selectedOpening.whiteWinPct}%` }} className="bg-amber-100 text-stone-950 flex items-center justify-center">
                  White {selectedOpening.whiteWinPct}%
                </div>
                <div style={{ width: `${selectedOpening.drawPct}%` }} className="bg-stone-600 text-white flex items-center justify-center">
                  Draw {selectedOpening.drawPct}%
                </div>
                <div style={{ width: `${selectedOpening.blackWinPct}%` }} className="bg-stone-900 text-amber-300 flex items-center justify-center border-l border-stone-700">
                  Black {selectedOpening.blackWinPct}%
                </div>
              </div>
            </div>

            {/* Popular Continuations */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-amber-400/70">Main Continuations</span>
              <div className="grid grid-cols-2 gap-2">
                {selectedOpening.popularMoves.map((pm, i) => (
                  <div key={i} className="p-2 bg-stone-900 rounded-lg border border-amber-900/20 text-xs">
                    <div className="font-bold text-amber-200 font-mono">{pm.move}</div>
                    <div className="text-[10px] text-amber-400/60">{pm.name || 'Main Line'} ({pm.winPct}% win)</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Practice Button */}
            <button
              onClick={() => {
                onLoadOpeningMoves(selectedOpening.moves);
                onClose();
              }}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow"
            >
              <Play className="w-4 h-4 fill-stone-950" />
              <span>Practice This Opening on Board</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
