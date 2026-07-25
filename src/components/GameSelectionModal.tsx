import React, { useState } from 'react';
import { GameMode } from '../types/chess';
import { Bot, Users, Puzzle, BookOpen, Clock, ShieldAlert, Sparkles, Trophy, Play, CheckCircle2, Shuffle } from 'lucide-react';

export interface AIOpponentProfile {
  id: string;
  name: string;
  elo: number;
  title: string;
  avatar: string;
  description: string;
  personality: 'aggressive' | 'defensive' | 'positional' | 'tactical' | 'balanced';
  colorTag: string;
}

export const AI_OPPONENTS: AIOpponentProfile[] = [
  {
    id: 'magnus',
    name: 'Magnus Carlsen',
    elo: 2882,
    title: 'GM',
    avatar: '👑',
    description: 'World Champion. Endgame wizard & relentless positional squeezing.',
    personality: 'positional',
    colorTag: 'border-[#d4af37] text-[#d4af37]',
  },
  {
    id: 'hikaru',
    name: 'Hikaru Nakamura',
    elo: 2875,
    title: 'GM',
    avatar: '⚡',
    description: 'Blitz & Bullet king. Deadly tactical foresight & rapid attacks.',
    personality: 'tactical',
    colorTag: 'border-amber-400 text-amber-300',
  },
  {
    id: 'fabi',
    name: 'Fabiano Caruana',
    elo: 2835,
    title: 'GM',
    avatar: '🧠',
    description: 'Calculative monster. Deep engine preparation & flawlessness.',
    personality: 'balanced',
    colorTag: 'border-[#d4af37] text-[#d4af37]',
  },
  {
    id: 'stockfish',
    name: 'Stockfish 16 Engine',
    elo: 2800,
    title: 'ENGINE',
    avatar: '🤖',
    description: 'Pure brutal calculation engine with zero human error.',
    personality: 'balanced',
    colorTag: 'border-cyan-500/60 text-cyan-400',
  },
  {
    id: 'gm_bot',
    name: 'Grandmaster Bot',
    elo: 2200,
    title: 'GM',
    avatar: '♟️',
    description: 'Aggressive tactical plays with high accuracy positional defense.',
    personality: 'aggressive',
    colorTag: 'border-amber-600 text-amber-400',
  },
  {
    id: 'club_player',
    name: 'Club Master',
    elo: 1500,
    title: 'CM',
    avatar: '🛡️',
    description: 'Solid fundamentals, rare blunders, good strategic balance.',
    personality: 'defensive',
    colorTag: 'border-emerald-600 text-emerald-400',
  },
  {
    id: 'novice',
    name: 'Novice Apprentice',
    elo: 900,
    title: 'BOT',
    avatar: '🌱',
    description: 'Friendly learning bot, occasional tactical oversights.',
    personality: 'balanced',
    colorTag: 'border-stone-500 text-stone-400',
  },
];

interface GameSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame: (config: {
    mode: GameMode;
    selectedAI?: AIOpponentProfile;
    playerSide: 'w' | 'b' | 'random';
    timeMinutes: number;
  }) => void;
}

export const GameSelectionModal: React.FC<GameSelectionModalProps> = ({
  isOpen,
  onClose,
  onStartGame,
}) => {
  const [selectedMode, setSelectedMode] = useState<GameMode>('vs_ai');
  const [selectedAI, setSelectedAI] = useState<AIOpponentProfile>(AI_OPPONENTS[0]);
  const [playerSide, setPlayerSide] = useState<'w' | 'b' | 'random'>('w');
  const [timeMinutes, setTimeMinutes] = useState<number>(10);

  if (!isOpen) return null;

  const handleStart = () => {
    onStartGame({
      mode: selectedMode,
      selectedAI: selectedMode === 'vs_ai' ? selectedAI : undefined,
      playerSide,
      timeMinutes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-[#e0e0e0] flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-white/5 bg-[#080808] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] via-[#b8962e] to-[#453303] flex items-center justify-center text-black font-black text-xl shadow-lg">
              ♔
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif italic font-bold tracking-wider text-[#d4af37]">
                TIPDE CHESS ARENA
              </h2>
              <p className="text-[11px] text-white/40 font-mono uppercase tracking-[0.2em]">
                Created by M. Furqan • Choose Opponent & Game Mode
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body Scroll Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 custom-scrollbar">
          {/* Step 1: Choose Game Mode */}
          <div className="space-y-3">
            <label className="text-[11px] font-bold text-[#d4af37] uppercase tracking-[0.2em] block">
              1. Choose Game Mode
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedMode('vs_ai')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  selectedMode === 'vs_ai'
                    ? 'bg-[#d4af37]/15 border-[#d4af37] text-[#d4af37] shadow-lg scale-[1.02]'
                    : 'bg-[#111111] border-white/5 text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Bot className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">VS AI</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMode('pass_and_play')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  selectedMode === 'pass_and_play'
                    ? 'bg-[#d4af37]/15 border-[#d4af37] text-[#d4af37] shadow-lg scale-[1.02]'
                    : 'bg-[#111111] border-white/5 text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Pass & Play</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMode('puzzles')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  selectedMode === 'puzzles'
                    ? 'bg-[#d4af37]/15 border-[#d4af37] text-[#d4af37] shadow-lg scale-[1.02]'
                    : 'bg-[#111111] border-white/5 text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Puzzle className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Puzzles</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMode('historical')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  selectedMode === 'historical'
                    ? 'bg-[#d4af37]/15 border-[#d4af37] text-[#d4af37] shadow-lg scale-[1.02]'
                    : 'bg-[#111111] border-white/5 text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Historical</span>
              </button>
            </div>
          </div>

          {/* Step 2: AI Opponent Selector (When VS AI is active) */}
          {selectedMode === 'vs_ai' && (
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-[#d4af37] uppercase tracking-[0.2em] block">
                2. Select AI Grandmaster Opponent
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                {AI_OPPONENTS.map((bot) => {
                  const isSelected = selectedAI.id === bot.id;
                  return (
                    <div
                      key={bot.id}
                      onClick={() => setSelectedAI(bot)}
                      className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                        isSelected
                          ? 'bg-[#18150c] border-[#d4af37] shadow-lg ring-1 ring-[#d4af37]/50'
                          : 'bg-[#111111] border-white/5 hover:bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="text-2xl p-2 bg-[#080808] border border-white/10 rounded-xl shrink-0">
                        {bot.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white truncate">{bot.name}</span>
                          <span className={`px-1.5 py-0.2 text-[9px] font-mono font-extrabold border rounded ${bot.colorTag}`}>
                            {bot.title} {bot.elo}
                          </span>
                        </div>
                        <p className="text-[10px] text-white/50 line-clamp-1 mt-0.5 font-sans">
                          {bot.description}
                        </p>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Choose Playing Side */}
          {selectedMode !== 'puzzles' && selectedMode !== 'historical' && (
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-[#d4af37] uppercase tracking-[0.2em] block">
                3. Choose Side
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPlayerSide('w')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                    playerSide === 'w'
                      ? 'bg-[#d4af37]/20 border-[#d4af37] text-white shadow-lg'
                      : 'bg-[#111111] border-white/5 text-white/40 hover:bg-white/5'
                  }`}
                >
                  <span className="text-lg">♔</span>
                  <span className="text-xs font-bold uppercase tracking-wider">White</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlayerSide('random')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                    playerSide === 'random'
                      ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37] shadow-lg'
                      : 'bg-[#111111] border-white/5 text-white/40 hover:bg-white/5'
                  }`}
                >
                  <Shuffle className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Random</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlayerSide('b')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                    playerSide === 'b'
                      ? 'bg-[#d4af37]/20 border-[#d4af37] text-white shadow-lg'
                      : 'bg-[#111111] border-white/5 text-white/40 hover:bg-white/5'
                  }`}
                >
                  <span className="text-lg">♚</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Black</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Time Control */}
          {selectedMode !== 'puzzles' && selectedMode !== 'historical' && (
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-[#d4af37] uppercase tracking-[0.2em] block">
                4. Clock Time Control
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { label: '3 min', mins: 3 },
                  { label: '5 min', mins: 5 },
                  { label: '10 min', mins: 10 },
                  { label: '15 min', mins: 15 },
                  { label: 'Untimed', mins: 0 },
                ].map((tc) => (
                  <button
                    key={tc.label}
                    type="button"
                    onClick={() => setTimeMinutes(tc.mins)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      timeMinutes === tc.mins
                        ? 'bg-[#d4af37] text-black border-[#d4af37] font-extrabold shadow-md'
                        : 'bg-[#111111] border-white/5 text-white/60 hover:bg-white/5'
                    }`}
                  >
                    <span className="text-xs font-mono uppercase font-bold block">{tc.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="p-5 border-t border-white/5 bg-[#080808] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] hover:brightness-110 text-black font-extrabold text-sm rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>START MATCH NOW</span>
          </button>
        </div>
      </div>
    </div>
  );
};
