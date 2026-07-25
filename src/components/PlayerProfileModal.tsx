import React from 'react';
import { PlayerStats, Achievement } from '../types/chess';
import { X, Trophy, Award, Flame, Zap, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface PlayerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: PlayerStats;
  achievements: Achievement[];
}

export const PlayerProfileModal: React.FC<PlayerProfileModalProps> = ({
  isOpen,
  onClose,
  stats,
  achievements,
}) => {
  if (!isOpen) return null;

  const winRate = stats.gamesPlayed > 0
    ? Math.round((stats.wins / stats.gamesPlayed) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-amber-900/50 rounded-2xl shadow-2xl overflow-hidden text-amber-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-900/40 bg-stone-950/80">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-amber-200">Grandmaster Player Profile & Records</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-stone-800 rounded-lg text-amber-400/80 hover:text-amber-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
          {/* Main Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-stone-950/80 border border-amber-900/30 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-amber-400/70 block">Current ELO</span>
              <span className="text-2xl font-extrabold text-amber-200 font-mono mt-1 block">{stats.currentElo}</span>
            </div>

            <div className="p-4 bg-stone-950/80 border border-amber-900/30 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-amber-400/70 block">Win Rate</span>
              <span className="text-2xl font-extrabold text-amber-200 font-mono mt-1 block">{winRate}%</span>
            </div>

            <div className="p-4 bg-stone-950/80 border border-amber-900/30 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-amber-400/70 block">Games Played</span>
              <span className="text-2xl font-extrabold text-amber-200 font-mono mt-1 block">{stats.gamesPlayed}</span>
            </div>

            <div className="p-4 bg-stone-950/80 border border-amber-900/30 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-amber-400/70 block">Puzzle Rating</span>
              <span className="text-2xl font-extrabold text-amber-200 font-mono mt-1 block">{stats.puzzleElo}</span>
            </div>
          </div>

          {/* Record Breakdown */}
          <div className="p-4 bg-stone-950/80 border border-amber-900/30 rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Match Outcome Record</h4>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-emerald-950/40 border border-emerald-800/40 rounded-lg text-emerald-300">
                <span className="font-bold">{stats.wins}</span> Wins
              </div>
              <div className="p-2 bg-stone-900 border border-stone-800 rounded-lg text-stone-300">
                <span className="font-bold">{stats.draws}</span> Draws
              </div>
              <div className="p-2 bg-rose-950/40 border border-rose-800/40 rounded-lg text-rose-300">
                <span className="font-bold">{stats.losses}</span> Losses
              </div>
            </div>
          </div>

          {/* Achievements Showcase */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Trophies & Milestones</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map(ach => (
                <div
                  key={ach.id}
                  className={`p-3 rounded-xl border flex items-center gap-3 ${
                    ach.unlocked
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-100 shadow'
                      : 'bg-stone-950/40 border-stone-800 text-stone-500 opacity-60'
                  }`}
                >
                  <div className="text-2xl">{ach.icon}</div>
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <span>{ach.title}</span>
                      {ach.unlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <div className="text-[10px] text-amber-400/70 mt-0.5">{ach.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-4 border-t border-amber-900/40 bg-stone-950/80">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
