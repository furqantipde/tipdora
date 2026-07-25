import React, { useState } from 'react';
import { HISTORICAL_MATCHES } from '../utils/historicalMatches';
import { HistoricalMatch } from '../types/chess';
import { BookOpen, Calendar, Trophy, Play, ArrowRight, User } from 'lucide-react';

interface HistoricalMatchesViewProps {
  onLoadMatch: (match: HistoricalMatch) => void;
}

export const HistoricalMatchesView: React.FC<HistoricalMatchesViewProps> = ({
  onLoadMatch,
}) => {
  const [selectedMatch, setSelectedMatch] = useState<HistoricalMatch>(HISTORICAL_MATCHES[0]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 text-amber-100">
      {/* Header Banner */}
      <div className="p-6 bg-stone-900 border border-amber-900/40 rounded-2xl shadow-2xl space-y-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl font-extrabold text-amber-200">Historical Masterpiece Vault</h2>
        </div>
        <p className="text-xs text-amber-400/70 leading-relaxed">
          Replay famous immortal games from World Champions with move-by-move grandmaster narration.
        </p>
      </div>

      {/* Match Cards Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {HISTORICAL_MATCHES.map(m => (
          <div
            key={m.id}
            onClick={() => setSelectedMatch(m)}
            className={`p-5 rounded-2xl cursor-pointer border transition-all ${
              selectedMatch.id === m.id
                ? 'bg-amber-500/20 border-amber-500/80 shadow-2xl scale-[1.02]'
                : 'bg-stone-900/90 border-amber-900/40 hover:border-amber-500/40'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] text-amber-400/80 mb-2 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {m.year}
              </span>
              <span className="px-2 py-0.5 bg-stone-950 rounded font-bold">
                {m.result}
              </span>
            </div>

            <h3 className="text-sm font-bold text-amber-100">{m.title}</h3>
            <p className="text-[11px] text-stone-300 mt-2 line-clamp-3 leading-relaxed">
              {m.summary}
            </p>
          </div>
        ))}
      </div>

      {/* Selected Match Details & Launch */}
      <div className="p-6 bg-stone-900 border border-amber-900/40 rounded-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-900/30 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-amber-200">{selectedMatch.title}</h3>
            </div>
            <p className="text-xs text-amber-400/70 mt-1">{selectedMatch.event}</p>
          </div>

          <button
            onClick={() => onLoadMatch(selectedMatch)}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow transition-all"
          >
            <Play className="w-4 h-4 fill-stone-950" />
            <span>Interactive Match Spectator Mode</span>
          </button>
        </div>

        {/* Players */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-stone-950/70 border border-amber-900/30 rounded-xl">
            <span className="text-[10px] font-bold text-amber-400/60 uppercase">White</span>
            <div className="text-sm font-bold text-stone-100 mt-1">{selectedMatch.whitePlayer}</div>
          </div>
          <div className="p-3 bg-stone-950/70 border border-amber-900/30 rounded-xl">
            <span className="text-[10px] font-bold text-amber-400/60 uppercase">Black</span>
            <div className="text-sm font-bold text-stone-100 mt-1">{selectedMatch.blackPlayer}</div>
          </div>
        </div>

        {/* Key Turning Points */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Key Match Moments</h4>
          <div className="space-y-2">
            {selectedMatch.keyMoves.map((km, i) => (
              <div key={i} className="p-3 bg-stone-950/80 border border-amber-900/20 rounded-xl text-xs space-y-1">
                <span className="font-bold text-amber-300">{km.title}</span>
                <p className="text-stone-300 text-[11px] leading-relaxed">{km.commentary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
