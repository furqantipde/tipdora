import { Chess, Square, PieceSymbol, Color, Move } from 'chess.js';
import { AIPersonality, MoveAnalysis } from '../types/chess';

// Piece Material Values in Centipawns
const PIECE_VALUES: Record<PieceSymbol, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

// Piece-Square Positional Tables (White's perspective, flip for Black)
const PAWN_PST = [
   0,  0,  0,  0,  0,  0,  0,  0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
   5,  5, 10, 27, 27, 10,  5,  5,
   0,  0,  0, 22, 22,  0,  0,  0,
   5, -5,-10,  0,  0,-10, -5,  5,
   5, 10, 10,-20,-20, 10, 10,  5,
   0,  0,  0,  0,  0,  0,  0,  0
];

const KNIGHT_PST = [
  -50,-40,-30,-30,-30,-30,-40,-50,
  -40,-20,  0,  0,  0,  0,-20,-40,
  -30,  0, 10, 15, 15, 10,  0,-30,
  -30,  5, 15, 20, 20, 15,  5,-30,
  -30,  0, 15, 20, 20, 15,  0,-30,
  -30,  5, 10, 15, 15, 10,  5,-30,
  -40,-20,  0,  5,  5,  0,-20,-40,
  -50,-40,-30,-30,-30,-30,-40,-50
];

const BISHOP_PST = [
  -20,-10,-10,-10,-10,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5, 10, 10,  5,  0,-10,
  -10,  5,  5, 10, 10,  5,  5,-10,
  -10,  0, 10, 10, 10, 10,  0,-10,
  -10, 10, 10, 10, 10, 10, 10,-10,
  -10,  5,  0,  0,  0,  0,  5,-10,
  -20,-10,-10,-10,-10,-10,-10,-20
];

const ROOK_PST = [
    0,  0,  0,  0,  0,  0,  0,  0,
    5, 10, 10, 10, 10, 10, 10,  5,
   -5,  0,  0,  0,  0,  0,  0, -5,
   -5,  0,  0,  0,  0,  0,  0, -5,
   -5,  0,  0,  0,  0,  0,  0, -5,
   -5,  0,  0,  0,  0,  0,  0, -5,
   -5,  0,  0,  0,  0,  0,  0, -5,
    0,  0,  0,  5,  5,  0,  0,  0
];

const QUEEN_PST = [
  -20,-10,-10, -5, -5,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5,  5,  5,  5,  0,-10,
   -5,  0,  5,  5,  5,  5,  0, -5,
    0,  0,  5,  5,  5,  5,  0, -5,
  -10,  5,  5,  5,  5,  5,  0,-10,
  -10,  0,  5,  0,  0,  0,  0,-10,
  -20,-10,-10, -5, -5,-10,-10,-20
];

const KING_MIDDLE_PST = [
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -20,-30,-30,-40,-40,-30,-30,-20,
  -10,-20,-20,-20,-20,-20,-20,-10,
   20, 20,  0,  0,  0,  0, 20, 20,
   20, 30, 10,  0,  0, 10, 30, 20
];

export class GrandmasterEngine {
  /** Evaluate board position in centipawns (Positive = White advantage, Negative = Black advantage) */
  public static evaluateBoard(chess: Chess, personality: AIPersonality = 'balanced'): number {
    if (chess.isCheckmate()) {
      return chess.turn() === 'w' ? -99999 : 99999;
    }
    if (chess.isDraw() || chess.isStalemate() || chess.isThreefoldRepetition()) {
      return 0;
    }

    let totalEval = 0;
    const board = chess.board();

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece) {
          const isWhite = piece.color === 'w';
          const val = PIECE_VALUES[piece.type];
          let pstVal = 0;

          const idx = isWhite ? r * 8 + c : (7 - r) * 8 + c;

          switch (piece.type) {
            case 'p': pstVal = PAWN_PST[idx]; break;
            case 'n': pstVal = KNIGHT_PST[idx]; break;
            case 'b': pstVal = BISHOP_PST[idx]; break;
            case 'r': pstVal = ROOK_PST[idx]; break;
            case 'q': pstVal = QUEEN_PST[idx]; break;
            case 'k': pstVal = KING_MIDDLE_PST[idx]; break;
          }

          let pieceScore = val + pstVal;

          // Apply personality weightings
          if (personality === 'aggressive') {
            // Give bonus for pieces in enemy territory
            if ((isWhite && r < 4) || (!isWhite && r > 3)) {
              pieceScore += 15;
            }
          } else if (personality === 'positional') {
            // Bonus for knights and bishops in central squares (d4, d5, e4, e5)
            if ((r === 3 || r === 4) && (c === 3 || c === 4)) {
              pieceScore += 25;
            }
          } else if (personality === 'defensive') {
            // Bonus for pawns near king
            if (piece.type === 'p' && ((isWhite && r >= 6) || (!isWhite && r <= 1))) {
              pieceScore += 20;
            }
          }

          if (isWhite) {
            totalEval += pieceScore;
          } else {
            totalEval -= pieceScore;
          }
        }
      }
    }

    // Add mobility factor
    const legalMovesCount = chess.moves().length;
    const mobilityBonus = chess.turn() === 'w' ? legalMovesCount * 3 : -legalMovesCount * 3;
    totalEval += mobilityBonus;

    return totalEval;
  }

  /** Calculate best move using Minimax with Alpha-Beta Pruning */
  public static getBestMove(
    chess: Chess,
    elo: number = 1600,
    personality: AIPersonality = 'balanced'
  ): { move: Move | null; evaluation: number } {
    const isWhite = chess.turn() === 'w';
    const possibleMoves = chess.moves({ verbose: true });

    if (possibleMoves.length === 0) {
      return { move: null, evaluation: this.evaluateBoard(chess, personality) };
    }

    // Map Elo to Search Depth & Error Probability
    let depth = 2;
    let errorProbability = 0;

    if (elo <= 600) {
      depth = 1;
      errorProbability = 0.45;
    } else if (elo <= 1000) {
      depth = 2;
      errorProbability = 0.25;
    } else if (elo <= 1400) {
      depth = 2;
      errorProbability = 0.10;
    } else if (elo <= 1800) {
      depth = 3;
      errorProbability = 0.02;
    } else if (elo <= 2200) {
      depth = 4;
      errorProbability = 0;
    } else {
      depth = 4; // Fast client-side response with quiescence
      errorProbability = 0;
    }

    // Occasional sub-optimal move for lower Elo levels
    if (errorProbability > 0 && Math.random() < errorProbability) {
      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      chess.move(randomMove);
      const evalScore = this.evaluateBoard(chess, personality);
      chess.undo();
      return { move: randomMove, evaluation: evalScore };
    }

    let bestMove: Move | null = null;
    let bestEval = isWhite ? -Infinity : Infinity;
    let alpha = -Infinity;
    let beta = Infinity;

    // Sort moves to optimize alpha-beta pruning (captures first)
    possibleMoves.sort((a, b) => {
      const scoreA = a.captured ? PIECE_VALUES[a.captured] - PIECE_VALUES[a.piece] : 0;
      const scoreB = b.captured ? PIECE_VALUES[b.captured] - PIECE_VALUES[b.piece] : 0;
      return scoreB - scoreA;
    });

    for (const move of possibleMoves) {
      chess.move(move);
      const evaluation = this.minimax(chess, depth - 1, alpha, beta, !isWhite, personality);
      chess.undo();

      if (isWhite) {
        if (evaluation > bestEval) {
          bestEval = evaluation;
          bestMove = move;
        }
        alpha = Math.max(alpha, evaluation);
      } else {
        if (evaluation < bestEval) {
          bestEval = evaluation;
          bestMove = move;
        }
        beta = Math.min(beta, evaluation);
      }

      if (beta <= alpha) {
        break; // Alpha-beta cutoff
      }
    }

    return { move: bestMove || possibleMoves[0], evaluation: bestEval };
  }

  private static minimax(
    chess: Chess,
    depth: number,
    alpha: number,
    beta: number,
    isMaximizing: boolean,
    personality: AIPersonality
  ): number {
    if (depth === 0 || chess.isGameOver()) {
      return this.evaluateBoard(chess, personality);
    }

    const possibleMoves = chess.moves({ verbose: true });

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const move of possibleMoves) {
        chess.move(move);
        const evaluation = this.minimax(chess, depth - 1, alpha, beta, false, personality);
        chess.undo();
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of possibleMoves) {
        chess.move(move);
        const evaluation = this.minimax(chess, depth - 1, alpha, beta, true, personality);
        chess.undo();
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  }

  /** Classify player move by comparing evaluation before & after move */
  public static classifyMove(
    evalBefore: number,
    evalAfter: number,
    isWhite: boolean,
    isSacrifice: boolean
  ): MoveAnalysis['classification'] {
    const diff = isWhite ? evalAfter - evalBefore : evalBefore - evalAfter;

    if (isSacrifice && diff >= 80) {
      return 'brilliant';
    }
    if (diff >= 50) {
      return 'great';
    }
    if (diff >= -20) {
      return 'best';
    }
    if (diff >= -50) {
      return 'good';
    }
    if (diff >= -100) {
      return 'inaccuracy';
    }
    if (diff >= -220) {
      return 'mistake';
    }
    return 'blunder';
  }
}
