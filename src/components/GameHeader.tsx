import React from 'react';
import { PlayerInfo, GameMode, PieceType, PieceColor } from '../types/chess';
import { PieceRender } from './PieceRender';
import { Shield, Sparkles, Trophy, Clock } from 'lucide-react';

interface GameHeaderProps {
  gameMode: GameMode;
  whitePlayer: PlayerInfo;
  blackPlayer: PlayerInfo;
  turn: PieceColor;
  capturedByWhite: PieceType[];
  capturedByBlack: PieceType[];
  isCheck: boolean;
  isCheckmate: boolean;
  isDraw: boolean;
  openingName?: string;
  whiteTimeSec?: number;
  blackTimeSec?: number;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  gameMode,
  whitePlayer,
  blackPlayer,
  turn,
  capturedByWhite,
  capturedByBlack,
  isCheck,
  isCheckmate,
  isDraw,
  openingName,
  whiteTimeSec = 600,
  blackTimeSec = 600,
}) => {
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getModeTitle = () => {
    switch (gameMode) {
      case 'vs_ai': return 'Single Player vs Grandmaster AI';
      case 'pass_and_play': return 'Local Pass & Play';
      case 'online_match': return 'Online Ranked Match';
      case 'puzzles': return 'Tactical Puzzle Challenge';
      case 'historical': return 'Historical Match Spectator';
      case 'board_editor': return 'Board Editor & Position Sandbox';
      case 'analysis': return 'Post-Game Deep Analysis';
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Top Banner: Mode & Opening Explorer Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-[#0d0d0d] rounded-xl border border-white/5 shadow-lg">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#d4af37]" />
          <span className="text-xs font-bold text-[#d4af37] tracking-wider uppercase font-sans">
            {getModeTitle()}
          </span>
        </div>

        {openingName && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full text-xs text-[#d4af37] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Opening: {openingName}</span>
          </div>
        )}
      </div>

      {/* Game Status Alert Banner */}
      {isCheckmate && (
        <div className="w-full py-2 px-4 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-black font-extrabold text-sm text-center rounded-xl shadow-xl animate-bounce tracking-wide">
          🏆 CHECKMATE! {turn === 'w' ? blackPlayer.name : whitePlayer.name} WINS!
        </div>
      )}
      {isCheck && !isCheckmate && (
        <div className="w-full py-1.5 px-4 bg-gradient-to-r from-red-950 via-rose-900 to-red-950 text-rose-200 font-bold text-xs text-center rounded-xl shadow-lg border border-rose-500/40 animate-pulse tracking-wide">
          ⚠️ CHECK! {turn === 'w' ? 'White' : 'Black'} King is under attack!
        </div>
      )}
      {isDraw && (
        <div className="w-full py-2 px-4 bg-[#111111] text-[#d4af37] font-bold text-xs text-center rounded-xl border border-white/10">
          🤝 STALEMATE / DRAW
        </div>
      )}

      {/* Player Info Cards & Captured Pieces Tray */}
      <div className="grid grid-cols-2 gap-3">
        {/* Black Player Card */}
        <div className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
          turn === 'b' ? 'bg-[#d4af37]/10 border-[#d4af37]/60 shadow-lg shadow-[#d4af37]/5' : 'bg-[#0c0c0c] border-white/5'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="text-xl">{blackPlayer.avatar}</div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-stone-100">{blackPlayer.name}</span>
                {blackPlayer.title && (
                  <span className="px-1 py-0.2 bg-[#d4af37]/20 text-[#d4af37] text-[9px] font-extrabold rounded">
                    {blackPlayer.title}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-[#d4af37] font-mono">ELO {blackPlayer.elo}</span>
            </div>
          </div>

          {/* Captured Pieces by Black */}
          <div className="hidden sm:flex items-center gap-0.5 max-w-[100px] overflow-x-auto">
            {capturedByBlack.map((pt, i) => (
              <PieceRender key={i} type={pt} color="w" material="wood" size={20} />
            ))}
          </div>

          {/* Clock */}
          <div className={`flex items-center gap-1 font-mono text-xs font-bold px-2 py-1 rounded border ${
            turn === 'b' ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'bg-[#111111] text-[#d4af37] border-white/10'
          }`}>
            <Clock className="w-3 h-3" />
            {formatTime(blackTimeSec)}
          </div>
        </div>

        {/* White Player Card */}
        <div className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
          turn === 'w' ? 'bg-[#d4af37]/10 border-[#d4af37]/60 shadow-lg shadow-[#d4af37]/5' : 'bg-[#0c0c0c] border-white/5'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="text-xl">{whitePlayer.avatar}</div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-stone-100">{whitePlayer.name}</span>
                {whitePlayer.title && (
                  <span className="px-1 py-0.2 bg-[#d4af37]/20 text-[#d4af37] text-[9px] font-extrabold rounded">
                    {whitePlayer.title}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-[#d4af37] font-mono">ELO {whitePlayer.elo}</span>
            </div>
          </div>

          {/* Captured Pieces by White */}
          <div className="hidden sm:flex items-center gap-0.5 max-w-[100px] overflow-x-auto">
            {capturedByWhite.map((pt, i) => (
              <PieceRender key={i} type={pt} color="b" material="wood" size={20} />
            ))}
          </div>

          {/* Clock */}
          <div className={`flex items-center gap-1 font-mono text-xs font-bold px-2 py-1 rounded border ${
            turn === 'w' ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'bg-[#111111] text-[#d4af37] border-white/10'
          }`}>
            <Clock className="w-3 h-3" />
            {formatTime(whiteTimeSec)}
          </div>
        </div>
      </div>
    </div>
  );
};
