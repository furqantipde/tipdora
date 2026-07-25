export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
export type PieceColor = 'w' | 'b';

export interface Piece {
  type: PieceType;
  color: PieceColor;
}

export type Square = string; // e.g., 'e4'

export type GameMode = 
  | 'vs_ai' 
  | 'pass_and_play' 
  | 'online_match' 
  | 'puzzles' 
  | 'historical' 
  | 'analysis' 
  | 'board_editor';

export type BoardMaterial = 'mahogany' | 'slate' | 'leather' | 'obsidian' | 'rosewood';
export type PieceMaterial = 'wood' | 'metal' | 'crystal';
export type AmbientLighting = 'library' | 'rainy' | 'tournament' | 'cafe';

export type AIPersonality = 'balanced' | 'aggressive' | 'defensive' | 'positional';

export interface GameSettings {
  boardMaterial: BoardMaterial;
  pieceMaterial: PieceMaterial;
  ambientLighting: AmbientLighting;
  enableParticles: boolean;
  soundEnabled: boolean;
  soundVolume: number;
  bgmVolume: number;
  showLegalMoves: boolean;
  showEvalBar: boolean;
  showCoordinates: boolean;
  autoFlipBoard: boolean;
  highlightLastMove: boolean;
  aiPersonality: AIPersonality;
  aiElo: number; // 400 - 2800
}

export interface MoveAnalysis {
  san: string;
  from: Square;
  to: Square;
  piece: PieceType;
  color: PieceColor;
  captured?: PieceType;
  promotion?: PieceType;
  fen: string;
  evalScore: number; // Centipawns relative to White
  classification?: 'brilliant' | 'great' | 'best' | 'good' | 'inaccuracy' | 'mistake' | 'blunder';
  commentary?: string;
  timeSpentSec?: number;
}

export interface PlayerInfo {
  name: string;
  elo: number;
  title?: string;
  avatar: string;
  isAI?: boolean;
}

export interface OpeningData {
  eco: string;
  name: string;
  moves: string[]; // SAN array e.g. ["e4", "e5", "Nf3"]
  description: string;
  whiteWinPct: number;
  drawPct: number;
  blackWinPct: number;
  popularMoves: { move: string; name?: string; winPct: number }[];
}

export interface PuzzleData {
  id: string;
  title: string;
  category: 'pin' | 'fork' | 'skewer' | 'mate_in_1' | 'mate_in_2' | 'mate_in_3' | 'endgame' | 'smothered';
  rating: number;
  fen: string;
  solution: string[]; // SAN moves sequence e.g. ["Qxf7+", "Kxf7", "Bc4#"]
  description: string;
  hint: string;
}

export interface HistoricalMatch {
  id: string;
  title: string;
  event: string;
  year: number;
  whitePlayer: string;
  blackPlayer: string;
  result: '1-0' | '0-1' | '1/2-1/2';
  pgn: string;
  summary: string;
  keyMoves: { moveNumber: number; title: string; commentary: string }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface PlayerStats {
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  aiWins: number;
  puzzlesSolved: number;
  puzzleElo: number;
  highestElo: number;
  currentElo: number;
  currentStreak: number;
  bestStreak: number;
}
