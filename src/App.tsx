/**
 * @license
 * Grandmaster 2D - Ultra-Realistic 2D Chess Game
 */

import React, { useState, useEffect, useRef } from 'react';
import { Chess, Square } from 'chess.js';
import confetti from 'canvas-confetti';
import {
  GameMode,
  GameSettings,
  PlayerInfo,
  MoveAnalysis,
  PlayerStats,
  Achievement,
  PuzzleData,
  HistoricalMatch,
} from './types/chess';
import {
  getStoredSettings,
  saveSettings,
  getStoredStats,
  saveStats,
  getStoredAchievements,
  unlockAchievement,
} from './utils/storage';
import { GrandmasterEngine } from './utils/chessEngine';
import { findMatchingOpening } from './utils/openingDatabase';
import { soundEngine } from './utils/soundEngine';

import { ChessBoard } from './components/ChessBoard';
import { EvalBar } from './components/EvalBar';
import { MoveHistory } from './components/MoveHistory';
import { GameHeader } from './components/GameHeader';
import { GameControls } from './components/GameControls';
import { LightingParticleOverlay } from './components/LightingParticleOverlay';

import { PostGameAnalysisModal } from './components/PostGameAnalysisModal';
import { OpeningExplorerPanel } from './components/OpeningExplorerPanel';
import { BoardEditorModal } from './components/BoardEditorModal';
import { PuzzlesView } from './components/PuzzlesView';
import { HistoricalMatchesView } from './components/HistoricalMatchesView';
import { SettingsModal } from './components/SettingsModal';
import { PlayerProfileModal } from './components/PlayerProfileModal';
import { GameSelectionModal, AIOpponentProfile, AI_OPPONENTS } from './components/GameSelectionModal';

import {
  Bot,
  Users,
  Globe,
  Puzzle,
  BookOpen,
  User,
  Sliders,
  Volume2,
  Trophy,
  PlayCircle,
} from 'lucide-react';

export default function App() {
  // Game State
  const [chess] = useState<Chess>(() => new Chess());
  const [fen, setFen] = useState<string>(chess.fen());
  const [gameMode, setGameMode] = useState<GameMode>('vs_ai');
  const [humanColor, setHumanColor] = useState<'w' | 'b'>('w');

  // Launch Game Selector Modal State (Open on startup)
  const [isGameSelectionOpen, setIsGameSelectionOpen] = useState<boolean>(true);

  // Settings & Storage State
  const [settings, setSettings] = useState<GameSettings>(getStoredSettings);
  const [stats, setStats] = useState<PlayerStats>(getStoredStats);
  const [achievements, setAchievements] = useState<Achievement[]>(getStoredAchievements);

  // Players Info
  const [whitePlayer, setWhitePlayer] = useState<PlayerInfo>({
    name: 'Player 1',
    elo: 1200,
    avatar: '♟️',
  });
  const [blackPlayer, setBlackPlayer] = useState<PlayerInfo>({
    name: 'Magnus Carlsen',
    elo: 2882,
    title: 'GM',
    avatar: '👑',
    isAI: true,
  });

  // Clocks
  const [whiteTime, setWhiteTime] = useState<number>(600);
  const [blackTime, setBlackTime] = useState<number>(600);

  // Gameplay tracking
  const [moveHistory, setMoveHistory] = useState<MoveAnalysis[]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(-1);
  const [capturedByWhite, setCapturedByWhite] = useState<Array<'p'|'n'|'b'|'r'|'q'>>([]);
  const [capturedByBlack, setCapturedByBlack] = useState<Array<'p'|'n'|'b'|'r'|'q'>>([]);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);

  // Engine evaluation
  const [evaluation, setEvaluation] = useState<number>(0);
  const [openingName, setOpeningName] = useState<string | undefined>();
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Modal visibilities
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [isOpeningsOpen, setIsOpeningsOpen] = useState(false);
  const [isBoardEditorOpen, setIsBoardEditorOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Active puzzle/historical match tracking
  const [activePuzzle, setActivePuzzle] = useState<PuzzleData | null>(null);

  // Audio Ambient Sync
  useEffect(() => {
    soundEngine.setSoundEnabled(settings.soundEnabled);
    soundEngine.setSfxVolume(settings.soundVolume);
    soundEngine.setBgmVolume(settings.bgmVolume);
    soundEngine.startAmbient(settings.ambientLighting);
  }, [settings]);

  // AI Turn Trigger Effect
  useEffect(() => {
    if (gameMode === 'vs_ai' && !chess.isGameOver()) {
      const isAITurn =
        (humanColor === 'w' && chess.turn() === 'b') ||
        (humanColor === 'b' && chess.turn() === 'w');
      if (isAITurn) {
        const timer = setTimeout(() => {
          makeAIMove();
        }, 400);
        return () => clearTimeout(timer);
      }
    }
  }, [fen, gameMode, humanColor]);

  // Start Match Configured via Launch Game Selection Modal
  const handleStartGameConfig = (config: {
    mode: GameMode;
    selectedAI?: AIOpponentProfile;
    playerSide: 'w' | 'b' | 'random';
    timeMinutes: number;
  }) => {
    chess.reset();
    setFen(chess.fen());
    setMoveHistory([]);
    setCurrentMoveIndex(-1);
    setCapturedByWhite([]);
    setCapturedByBlack([]);
    setLastMove(null);
    setEvaluation(0);
    setOpeningName(undefined);

    const timeSec = config.timeMinutes > 0 ? config.timeMinutes * 60 : 999999;
    setWhiteTime(timeSec);
    setBlackTime(timeSec);
    setGameMode(config.mode);

    if (config.mode === 'vs_ai') {
      const selectedBot = config.selectedAI || AI_OPPONENTS[0];
      let chosenSide: 'w' | 'b' = 'w';
      if (config.playerSide === 'random') {
        chosenSide = Math.random() < 0.5 ? 'w' : 'b';
      } else {
        chosenSide = config.playerSide;
      }
      setHumanColor(chosenSide);

      const userPlayer: PlayerInfo = { name: 'Player 1', elo: stats.currentElo || 1200, avatar: '♟️' };
      const aiPlayer: PlayerInfo = {
        name: selectedBot.name,
        elo: selectedBot.elo,
        title: selectedBot.title,
        avatar: selectedBot.avatar,
        isAI: true,
      };

      if (chosenSide === 'w') {
        setWhitePlayer(userPlayer);
        setBlackPlayer(aiPlayer);
        setIsFlipped(false);
      } else {
        setWhitePlayer(aiPlayer);
        setBlackPlayer(userPlayer);
        setIsFlipped(true);
      }

      setSettings((prev) => ({
        ...prev,
        aiElo: selectedBot.elo,
        aiPersonality: selectedBot.personality,
      }));
    } else if (config.mode === 'pass_and_play') {
      setHumanColor('w');
      setIsFlipped(false);
      setWhitePlayer({ name: 'Player 1', elo: 1200, avatar: '♟️' });
      setBlackPlayer({ name: 'Player 2', elo: 1200, avatar: '♟️' });
    }

    soundEngine.playMoveSound(settings.pieceMaterial);
  };

  // Game Clock Timer Effect
  useEffect(() => {
    if (chess.isGameOver()) return;
    const interval = setInterval(() => {
      if (chess.turn() === 'w') {
        setWhiteTime((t) => Math.max(0, t - 1));
      } else {
        setBlackTime((t) => Math.max(0, t - 1));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [fen]);

  // Make Move Handler
  const handleMakeMove = (from: Square, to: Square): boolean => {
    try {
      const evalBefore = GrandmasterEngine.evaluateBoard(chess, settings.aiPersonality);
      const pieceAtTo = chess.get(to);

      // Attempt move
      const move = chess.move({ from, to, promotion: 'q' });
      if (!move) return false;

      // Calculate new FEN & evaluation
      const newFen = chess.fen();
      setFen(newFen);
      setLastMove({ from, to });

      const evalAfter = GrandmasterEngine.evaluateBoard(chess, settings.aiPersonality);
      setEvaluation(evalAfter);

      // Classify move quality
      const isSacrifice = pieceAtTo !== null && move.piece !== 'p';
      const classification = GrandmasterEngine.classifyMove(
        evalBefore,
        evalAfter,
        move.color === 'w',
        isSacrifice
      );

      // Sound FX
      if (chess.isCheckmate()) {
        soundEngine.playVictorySound();
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        // Update Stats
        const newStats = {
          ...stats,
          gamesPlayed: stats.gamesPlayed + 1,
          wins: stats.wins + 1,
          currentStreak: stats.currentStreak + 1,
          bestStreak: Math.max(stats.bestStreak, stats.currentStreak + 1),
        };
        setStats(newStats);
        saveStats(newStats);
        setAchievements(unlockAchievement('first_win'));
      } else if (chess.isCheck()) {
        soundEngine.playCheckSound();
      } else if (move.captured) {
        soundEngine.playCaptureSound(settings.pieceMaterial);
      } else {
        soundEngine.playMoveSound(settings.pieceMaterial);
      }

      // Track captured pieces
      if (move.captured) {
        if (move.color === 'w') {
          setCapturedByWhite((prev) => [...prev, move.captured as any]);
        } else {
          setCapturedByBlack((prev) => [...prev, move.captured as any]);
        }
      }

      // Record move analysis history
      const sanHistory = chess.history();
      const moveAnalysis: MoveAnalysis = {
        san: move.san,
        from,
        to,
        piece: move.piece,
        color: move.color,
        captured: move.captured,
        fen: newFen,
        evalScore: evalAfter,
        classification,
      };

      setMoveHistory((prev) => [...prev, moveAnalysis]);
      setCurrentMoveIndex(sanHistory.length - 1);

      // Opening Explorer Lookup
      const matchedOpening = findMatchingOpening(sanHistory);
      if (matchedOpening) {
        setOpeningName(matchedOpening.name);
      }

      return true;
    } catch {
      soundEngine.playIllegalSound();
      return false;
    }
  };

  // AI Move Engine Trigger
  const makeAIMove = () => {
    if (chess.isGameOver()) return;
    const { move } = GrandmasterEngine.getBestMove(chess, settings.aiElo, settings.aiPersonality);
    if (move) {
      handleMakeMove(move.from as Square, move.to as Square);
    }
  };

  // Game Control Actions
  const handleUndo = () => {
    if (moveHistory.length === 0) return;

    // Undo 2 moves if vs AI, or 1 move if pass & play
    if (gameMode === 'vs_ai' && moveHistory.length >= 2) {
      chess.undo();
      chess.undo();
      setMoveHistory((prev) => prev.slice(0, -2));
    } else {
      chess.undo();
      setMoveHistory((prev) => prev.slice(0, -1));
    }

    setFen(chess.fen());
    setCurrentMoveIndex(moveHistory.length - 1);
    setEvaluation(GrandmasterEngine.evaluateBoard(chess, settings.aiPersonality));
  };

  const handleHint = () => {
    const { move } = GrandmasterEngine.getBestMove(chess, 2800, 'balanced');
    if (move) {
      soundEngine.playCheckSound();
      setLastMove({ from: move.from as Square, to: move.to as Square });
    }
  };

  const handleResetGame = (newMode: GameMode = gameMode) => {
    chess.reset();
    setFen(chess.fen());
    setMoveHistory([]);
    setCurrentMoveIndex(-1);
    setCapturedByWhite([]);
    setCapturedByBlack([]);
    setLastMove(null);
    setEvaluation(0);
    setOpeningName(undefined);
    setWhiteTime(600);
    setBlackTime(600);
    setGameMode(newMode);

    if (newMode === 'vs_ai') {
      setBlackPlayer({
        name: `Stockfish ELO ${settings.aiElo}`,
        elo: settings.aiElo,
        title: 'GM',
        avatar: '🤖',
        isAI: true,
      });
    } else if (newMode === 'pass_and_play') {
      setBlackPlayer({
        name: 'Player 2',
        elo: 1200,
        avatar: '♟️',
      });
    }
  };

  const handleLoadOpeningMoves = (moves: string[]) => {
    handleResetGame('vs_ai');
    moves.forEach((san) => chess.move(san));
    setFen(chess.fen());
    setEvaluation(GrandmasterEngine.evaluateBoard(chess, settings.aiPersonality));
  };

  const handleLoadPuzzle = (puzzle: PuzzleData) => {
    setActivePuzzle(puzzle);
    chess.load(puzzle.fen);
    setFen(chess.fen());
    setGameMode('puzzles');
    setMoveHistory([]);
  };

  const handleLoadHistoricalMatch = (match: HistoricalMatch) => {
    handleResetGame('historical');
    chess.loadPgn(match.pgn);
    setFen(chess.fen());
  };

  return (
    <div className="relative min-h-screen w-full bg-[#080808] text-[#e0e0e0] flex flex-col font-sans overflow-x-hidden selection:bg-[#d4af37] selection:text-black">
      {/* Dynamic Ambient Table Lighting & Particle FX */}
      <LightingParticleOverlay
        lighting={settings.ambientLighting}
        enableParticles={settings.enableParticles}
      />

      {/* Main App Layout */}
      <div className="relative z-20 flex flex-col flex-1 max-w-7xl w-full mx-auto p-3 md:p-6 space-y-4">
        {/* Top Navbar */}
        <header className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#0d0d0d] rounded-2xl border border-white/5 shadow-2xl backdrop-blur-md">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d4af37] via-[#b8962e] to-[#604a11] flex items-center justify-center font-extrabold text-black shadow-lg text-lg">
              ♔
            </div>
            <div>
              <h1 className="text-base md:text-xl font-serif italic font-bold tracking-widest text-[#d4af37]">
                TIPDE CHESS
              </h1>
              <p className="text-[10px] text-white/40 font-medium uppercase tracking-[0.2em]">
                Created by M. Furqan
              </p>
            </div>
          </div>

          {/* Mode Switcher Nav Tabs */}
          <div className="flex items-center gap-1 bg-[#0c0c0c] p-1 rounded-xl border border-white/5 overflow-x-auto max-w-full">
            <button
              onClick={() => handleResetGame('vs_ai')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
                gameMode === 'vs_ai'
                  ? 'bg-[#d4af37] text-black shadow font-semibold'
                  : 'text-white/40 hover:text-[#d4af37] hover:bg-white/5'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>VS AI</span>
            </button>

            <button
              onClick={() => handleResetGame('pass_and_play')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
                gameMode === 'pass_and_play'
                  ? 'bg-[#d4af37] text-black shadow font-semibold'
                  : 'text-white/40 hover:text-[#d4af37] hover:bg-white/5'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Pass & Play</span>
            </button>

            <button
              onClick={() => setGameMode('puzzles')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
                gameMode === 'puzzles'
                  ? 'bg-[#d4af37] text-black shadow font-semibold'
                  : 'text-white/40 hover:text-[#d4af37] hover:bg-white/5'
              }`}
            >
              <Puzzle className="w-3.5 h-3.5" />
              <span>Puzzles</span>
            </button>

            <button
              onClick={() => setGameMode('historical')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
                gameMode === 'historical'
                  ? 'bg-[#d4af37] text-black shadow font-semibold'
                  : 'text-white/40 hover:text-[#d4af37] hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Historical</span>
            </button>
          </div>

          {/* Top Action Profile & Settings Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsGameSelectionOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] hover:brightness-110 text-black font-extrabold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider"
              title="Select AI Bot or Game Mode"
            >
              <PlayCircle className="w-4 h-4 fill-black text-[#d4af37]" />
              <span className="hidden sm:inline">Match Setup</span>
            </button>

            <button
              onClick={() => setIsProfileOpen(true)}
              className="p-2 bg-[#111111] hover:bg-white/10 text-[#d4af37] rounded-xl border border-white/10 transition-colors"
              title="Player Profile & Achievements"
            >
              <User className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 bg-[#111111] hover:bg-white/10 text-[#d4af37] rounded-xl border border-white/10 transition-colors"
              title="Customization Settings"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* View Switcher Container */}
        {gameMode === 'puzzles' ? (
          <PuzzlesView
            onSelectPuzzle={handleLoadPuzzle}
            puzzleElo={stats.puzzleElo}
            solvedCount={stats.puzzlesSolved}
          />
        ) : gameMode === 'historical' ? (
          <HistoricalMatchesView onLoadMatch={handleLoadHistoricalMatch} />
        ) : (
          /* Primary Interactive Chess Arena Grid */
          <main className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 items-start">
            {/* Left / Center Column: Board, Header & Controls */}
            <div className="lg:col-span-8 flex flex-col space-y-4">
              <GameHeader
                gameMode={gameMode}
                whitePlayer={whitePlayer}
                blackPlayer={blackPlayer}
                turn={chess.turn()}
                capturedByWhite={capturedByWhite}
                capturedByBlack={capturedByBlack}
                isCheck={chess.isCheck()}
                isCheckmate={chess.isCheckmate()}
                isDraw={chess.isDraw()}
                openingName={openingName}
                whiteTimeSec={whiteTime}
                blackTimeSec={blackTime}
              />

              {/* Board + Centipawn Eval Bar Container */}
              <div className="flex items-center gap-3">
                {settings.showEvalBar && (
                  <div className="h-[360px] sm:h-[480px]">
                    <EvalBar evaluation={evaluation} isFlipped={isFlipped} />
                  </div>
                )}

                <div className="flex-1">
                  <ChessBoard
                    chess={chess}
                    boardMaterial={settings.boardMaterial}
                    pieceMaterial={settings.pieceMaterial}
                    ambientLighting={settings.ambientLighting}
                    showLegalMoves={settings.showLegalMoves}
                    showCoordinates={settings.showCoordinates}
                    highlightLastMove={settings.highlightLastMove}
                    isFlipped={isFlipped}
                    onMakeMove={handleMakeMove}
                    lastMove={lastMove}
                  />
                </div>
              </div>

              {/* Game Control Toolbar */}
              <GameControls
                onUndo={handleUndo}
                onHint={handleHint}
                onFlipBoard={() => setIsFlipped(!isFlipped)}
                onResign={() => handleResetGame()}
                onOpenSettings={() => setIsSettingsOpen(true)}
                onOpenOpenings={() => setIsOpeningsOpen(true)}
                onOpenBoardEditor={() => setIsBoardEditorOpen(true)}
                onOpenAnalysis={() => setIsAnalysisOpen(true)}
                canUndo={moveHistory.length > 0}
              />
            </div>

            {/* Right Column: Move History & Notation Panel */}
            <div className="lg:col-span-4 h-[450px] lg:h-full min-h-[400px]">
              <MoveHistory
                moveHistory={moveHistory}
                currentMoveIndex={currentMoveIndex}
                onSelectMove={(idx) => setCurrentMoveIndex(idx)}
                onFirstMove={() => setCurrentMoveIndex(0)}
                onPrevMove={() => setCurrentMoveIndex((i) => Math.max(0, i - 1))}
                onNextMove={() => setCurrentMoveIndex((i) => Math.min(moveHistory.length - 1, i + 1))}
                onLatestMove={() => setCurrentMoveIndex(moveHistory.length - 1)}
              />
            </div>
          </main>
        )}
      </div>

      {/* Footer Status Bar */}
      <footer className="h-8 border-t border-white/5 bg-[#0a0a0a] px-4 flex items-center justify-between shrink-0 z-20 text-[9px] uppercase tracking-[0.1em] text-white/30 font-mono">
        <div className="flex items-center gap-6">
          <span className="text-[#d4af37] font-bold">Tipde Chess</span>
          <span className="text-white/40 font-sans">Made by M. Furqan</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
            <span className="text-white/40">Engine Active</span>
          </div>
          <div className="w-px h-3 bg-white/10"></div>
          <span className="text-white/40">v1.0.4 Premium</span>
        </div>
      </footer>

      {/* Dialog Modals */}
      <PostGameAnalysisModal
        isOpen={isAnalysisOpen}
        onClose={() => setIsAnalysisOpen(false)}
        moveHistory={moveHistory}
      />

      <OpeningExplorerPanel
        isOpen={isOpeningsOpen}
        onClose={() => setIsOpeningsOpen(false)}
        onLoadOpeningMoves={handleLoadOpeningMoves}
      />

      <BoardEditorModal
        isOpen={isBoardEditorOpen}
        onClose={() => setIsBoardEditorOpen(false)}
        onLoadFen={(newFen) => {
          chess.load(newFen);
          setFen(chess.fen());
        }}
        currentFen={fen}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(newSet) => {
          setSettings(newSet);
          saveSettings(newSet);
        }}
      />

      <PlayerProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        stats={stats}
        achievements={achievements}
      />

      <GameSelectionModal
        isOpen={isGameSelectionOpen}
        onClose={() => setIsGameSelectionOpen(false)}
        onStartGame={handleStartGameConfig}
      />
    </div>
  );
}
