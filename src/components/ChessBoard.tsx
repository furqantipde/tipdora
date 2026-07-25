import React, { useState } from 'react';
import { Chess, Square } from 'chess.js';
import { BoardMaterial, PieceMaterial, AmbientLighting } from '../types/chess';
import { PieceRender } from './PieceRender';
import { soundEngine } from '../utils/soundEngine';

interface ChessBoardProps {
  chess: Chess;
  boardMaterial: BoardMaterial;
  pieceMaterial: PieceMaterial;
  ambientLighting: AmbientLighting;
  showLegalMoves: boolean;
  showCoordinates: boolean;
  highlightLastMove: boolean;
  isFlipped: boolean;
  onMakeMove: (from: Square, to: Square) => boolean;
  lastMove?: { from: Square; to: Square } | null;
  interactive?: boolean;
}

export const ChessBoard: React.FC<ChessBoardProps> = ({
  chess,
  boardMaterial,
  pieceMaterial,
  showLegalMoves,
  showCoordinates,
  highlightLastMove,
  isFlipped,
  onMakeMove,
  lastMove,
  interactive = true,
}) => {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalSquares, setLegalSquares] = useState<Square[]>([]);
  const [draggedSquare, setDraggedSquare] = useState<Square | null>(null);
  const [captureParticles, setCaptureParticles] = useState<
    { id: number; x: number; y: number; angle: number; speed: number; color: string }[]
  >([]);
  const [isShaking, setIsShaking] = useState(false);

  // Board square coordinate lists
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const displayFiles = isFlipped ? [...files].reverse() : files;
  const displayRanks = isFlipped ? [...ranks].reverse() : ranks;

  // Trigger Board Micro Shake Physics
  const triggerBoardShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300);
  };

  // Trigger Multi-directional Radiating Particle Explosions
  const triggerCaptureParticleEffect = (sq: Square) => {
    triggerBoardShake();
    const fileIdx = displayFiles.indexOf(sq[0]);
    const rankIdx = displayRanks.indexOf(sq[1]);
    if (fileIdx >= 0 && rankIdx >= 0) {
      const colors = ['#d4af37', '#fde68a', '#fbbf24', '#ffffff', '#e2e8f0', '#f59e0b'];
      const newParticles = Array.from({ length: 8 }).map((_, i) => ({
        id: Date.now() + i,
        x: fileIdx,
        y: rankIdx,
        angle: (i * 45 * Math.PI) / 180,
        speed: 25 + Math.random() * 20,
        color: colors[i % colors.length],
      }));

      setCaptureParticles((prev) => [...prev, ...newParticles]);
      setTimeout(() => {
        setCaptureParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
      }, 500);
    }
  };

  // Board Theme Materials
  const getBoardStyles = () => {
    switch (boardMaterial) {
      case 'slate':
        return {
          frameBg: 'bg-gradient-to-br from-slate-900 via-zinc-900 to-stone-950 border-slate-700/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)]',
          lightSquare: 'bg-stone-300 shadow-inner',
          darkSquare: 'bg-slate-700 shadow-inner',
          textColor: 'text-slate-400',
          accentBorder: 'border-slate-500/30',
        };
      case 'leather':
        return {
          frameBg: 'bg-gradient-to-br from-amber-950 via-yellow-950 to-stone-950 border-amber-900/80 shadow-[0_20px_50px_rgba(0,0,0,0.9)]',
          lightSquare: 'bg-amber-100 shadow-inner',
          darkSquare: 'bg-amber-800 shadow-inner',
          textColor: 'text-amber-300/70',
          accentBorder: 'border-amber-700/40',
        };
      case 'obsidian':
        return {
          frameBg: 'bg-gradient-to-br from-zinc-950 via-black to-stone-950 border-yellow-600/40 shadow-[0_20px_50px_rgba(0,0,0,0.95)]',
          lightSquare: 'bg-zinc-200 shadow-inner',
          darkSquare: 'bg-zinc-900 shadow-inner',
          textColor: 'text-yellow-500/60',
          accentBorder: 'border-yellow-600/30',
        };
      case 'rosewood':
        return {
          frameBg: 'bg-gradient-to-br from-red-950 via-stone-950 to-amber-950 border-red-900/60 shadow-[0_20px_50px_rgba(0,0,0,0.85)]',
          lightSquare: 'bg-orange-100 shadow-inner',
          darkSquare: 'bg-red-900 shadow-inner',
          textColor: 'text-orange-200/70',
          accentBorder: 'border-red-700/40',
        };
      case 'mahogany':
      default:
        return {
          frameBg: 'bg-gradient-to-br from-amber-900 via-stone-900 to-yellow-950 border-amber-800/80 shadow-[0_25px_60px_rgba(0,0,0,0.9)]',
          lightSquare: 'bg-amber-100/95 shadow-inner',
          darkSquare: 'bg-amber-900/90 shadow-inner',
          textColor: 'text-amber-200/70',
          accentBorder: 'border-amber-600/40',
        };
    }
  };

  const boardStyle = getBoardStyles();

  // Handle Square Selection / Move Logic
  const handleSquareClick = (sq: Square) => {
    if (!interactive) return;

    if (selectedSquare) {
      if (selectedSquare === sq) {
        // Deselect
        setSelectedSquare(null);
        setLegalSquares([]);
        return;
      }

      // Check if clicked square is a legal destination
      const isLegal = legalSquares.includes(sq);
      if (isLegal) {
        const pieceAtTo = chess.get(sq);
        const success = onMakeMove(selectedSquare, sq);

        if (success && pieceAtTo) {
          triggerCaptureParticleEffect(sq);
        }

        setSelectedSquare(null);
        setLegalSquares([]);
        return;
      }
    }

    // Select piece if present
    const piece = chess.get(sq);
    if (piece && piece.color === chess.turn()) {
      setSelectedSquare(sq);
      soundEngine.playSlideSound();
      const moves = chess.moves({ square: sq, verbose: true });
      setLegalSquares(moves.map(m => m.to as Square));
    } else {
      setSelectedSquare(null);
      setLegalSquares([]);
    }
  };

  // Drag and Drop Handling
  const handleDragStart = (e: React.DragEvent, sq: Square) => {
    if (!interactive) return;

    const piece = chess.get(sq);
    if (piece && piece.color === chess.turn()) {
      setDraggedSquare(sq);
      setSelectedSquare(sq);
      const moves = chess.moves({ square: sq, verbose: true });
      setLegalSquares(moves.map(m => m.to as Square));
      e.dataTransfer.setData('text/plain', sq);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, toSq: Square) => {
    e.preventDefault();
    if (!interactive) return;

    const fromSq = e.dataTransfer.getData('text/plain') as Square;
    if (fromSq && fromSq !== toSq) {
      const pieceAtTo = chess.get(toSq);
      const success = onMakeMove(fromSq, toSq);

      if (success && pieceAtTo) {
        triggerCaptureParticleEffect(toSq);
      }
    }

    setDraggedSquare(null);
    setSelectedSquare(null);
    setLegalSquares([]);
  };

  return (
    <div
      className={`relative p-4 md:p-6 rounded-2xl border-2 ${
        boardStyle.frameBg
      } transition-all duration-500 select-none shadow-2xl ${
        isShaking ? 'animate-board-shake' : ''
      }`}
    >
      {/* Decorative Beveled Inner Border */}
      <div className={`absolute inset-2 md:inset-3 rounded-xl border ${boardStyle.accentBorder} pointer-events-none`} />

      {/* Main 8x8 Chess Grid Container */}
      <div className="relative grid grid-cols-8 grid-rows-8 w-full aspect-square rounded-lg overflow-hidden border border-black/40 shadow-2xl">
        {displayRanks.map((rank, rIdx) =>
          displayFiles.map((file, fIdx) => {
            const square = `${file}${rank}` as Square;
            const isDark = (fIdx + rIdx) % 2 === 1;
            const piece = chess.get(square);

            const isSelected = selectedSquare === square;
            const isLegalTarget = showLegalMoves && legalSquares.includes(square);
            const isLastMoveSquare =
              highlightLastMove && lastMove && (lastMove.from === square || lastMove.to === square);
            const isDestinationSquare = lastMove && lastMove.to === square;

            return (
              <div
                key={square}
                onClick={() => handleSquareClick(square)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, square)}
                className={`relative w-full h-full flex items-center justify-center cursor-pointer transition-colors duration-150 ${
                  isDark ? boardStyle.darkSquare : boardStyle.lightSquare
                }`}
              >
                {/* Last Move Glow Highlight */}
                {isLastMoveSquare && (
                  <div className="absolute inset-0 bg-amber-400/35 backdrop-blur-[1px] animate-pulse" />
                )}

                {/* Selected Square Highlight */}
                {isSelected && (
                  <div className="absolute inset-0 bg-yellow-300/50 border-2 border-amber-300 shadow-inner" />
                )}

                {/* Legal Move Indicator Dots / Capture Halo */}
                {isLegalTarget && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    {piece ? (
                      <div className="w-full h-full border-4 border-amber-400/90 rounded-full animate-ping opacity-75" />
                    ) : (
                      <div className="w-3.5 h-3.5 md:w-4 md:h-4 bg-amber-400/80 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                    )}
                  </div>
                )}

                {/* Render Chess Piece with Spring Landing Physics */}
                {piece && (
                  <div
                    draggable={interactive && piece.color === chess.turn()}
                    onDragStart={(e) => handleDragStart(e, square)}
                    className={`z-10 transform ${
                      isDestinationSquare ? 'animate-[pieceDropSpring_0.35s_ease-out]' : ''
                    }`}
                  >
                    <PieceRender
                      type={piece.type}
                      color={piece.color}
                      material={pieceMaterial}
                      size={54}
                      isDragging={draggedSquare === square}
                    />
                  </div>
                )}

                {/* Rank & File Coordinates Display */}
                {showCoordinates && (
                  <>
                    {fIdx === 0 && (
                      <span className={`absolute top-0.5 left-1 text-[9px] font-bold ${boardStyle.textColor}`}>
                        {rank}
                      </span>
                    )}
                    {rIdx === 7 && (
                      <span className={`absolute bottom-0.5 right-1 text-[9px] font-bold ${boardStyle.textColor}`}>
                        {file}
                      </span>
                    )}
                  </>
                )}
              </div>
            );
          })
        )}

        {/* Radiating Physics Capture Particles */}
        {captureParticles.map((p) => {
          const dx = Math.cos(p.angle) * p.speed;
          const dy = Math.sin(p.angle) * p.speed;
          return (
            <div
              key={p.id}
              className="absolute z-30 pointer-events-none flex items-center justify-center w-[12.5%] h-[12.5%]"
              style={{
                left: `${p.x * 12.5}%`,
                top: `${p.y * 12.5}%`,
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full shadow-lg transition-transform"
                style={{
                  backgroundColor: p.color,
                  transform: `translate(${dx}px, ${dy}px) scale(0)`,
                  transition: 'all 0.45s cubic-bezier(0.1, 0.8, 0.3, 1)',
                  boxShadow: `0 0 12px ${p.color}`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
