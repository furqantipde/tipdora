import React, { useState } from 'react';
import { PUZZLES_DATABASE } from '../utils/puzzlesData';
import { PuzzleData } from '../types/chess';
import { Puzzle, CheckCircle2, HelpCircle, ArrowRight, Flame, Trophy } from 'lucide-react';

interface PuzzlesViewProps {
  onSelectPuzzle: (puzzle: PuzzleData) => void;
  puzzleElo: number;
  solvedCount: number;
}

export const PuzzlesView: React.FC<PuzzlesViewProps> = ({
  onSelectPuzzle,
  puzzleElo,
  solvedCount,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Tactical Puzzles' },
    { id: 'fork', label: 'Forks' },
    { id: 'pin', label: 'Pins' },
    { id: 'smothered', label: 'Smothered Mate' },
    { id: 'mate_in_2', label: 'Mate in 2' },
    { id: 'endgame', label: 'Endgames' },
  ];

  const filteredPuzzles = selectedCategory === 'all'
    ? PUZZLES_DATABASE
    : PUZZLES_DATABASE.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 text-amber-100">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-stone-900 border border-amber-900/40 rounded-2xl shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Puzzle className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-extrabold text-amber-200">Tactical Puzzle Academy</h2>
          </div>
          <p className="text-xs text-amber-400/70">
            Over 100,000 curated tactical puzzles to sharpen your Grandmaster vision.
          </p>
        </div>

        {/* Stats Pill Badges */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-stone-950/80 border border-amber-900/40 rounded-xl text-center">
            <span className="text-[10px] uppercase text-amber-400/70 font-bold block">Puzzle ELO</span>
            <span className="text-lg font-extrabold text-amber-300 font-mono">{puzzleElo}</span>
          </div>

          <div className="px-4 py-2 bg-stone-950/80 border border-amber-900/40 rounded-xl text-center">
            <span className="text-[10px] uppercase text-amber-400/70 font-bold block">Puzzles Solved</span>
            <span className="text-lg font-extrabold text-amber-300 font-mono">{solvedCount}</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              selectedCategory === cat.id
                ? 'bg-amber-500/20 text-amber-200 border-amber-500/60 shadow'
                : 'bg-stone-900 text-stone-400 border-amber-900/30 hover:bg-stone-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Puzzle Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPuzzles.map(puzzle => (
          <div
            key={puzzle.id}
            onClick={() => onSelectPuzzle(puzzle)}
            className="group p-5 bg-stone-900/90 border border-amber-900/40 hover:border-amber-500/60 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 font-mono text-xs font-bold rounded-full">
                  Rating {puzzle.rating}
                </span>
                <span className="text-[10px] uppercase font-bold text-amber-400/60 tracking-wider">
                  Category: {puzzle.category.replace('_', ' ')}
                </span>
              </div>

              <h3 className="text-base font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                {puzzle.title}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {puzzle.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-amber-900/20">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <span>Start Challenge</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
