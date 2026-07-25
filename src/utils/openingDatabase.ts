import { OpeningData } from '../types/chess';

export const OPENINGS_DATABASE: OpeningData[] = [
  {
    eco: 'C65',
    name: "Ruy Lopez (Spanish Opening)",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5"],
    description: "One of the oldest and most fundamental chess openings. White immediately puts pressure on Black's knight defending e5 while preparing kingside castling.",
    whiteWinPct: 38,
    drawPct: 36,
    blackWinPct: 26,
    popularMoves: [
      { move: "a6", name: "Morphy Defense", winPct: 38 },
      { move: "Nf6", name: "Berlin Defense", winPct: 32 },
      { move: "d6", name: "Steinitz Defense", winPct: 28 },
      { move: "f5", name: "Schliemann Gambit", winPct: 24 }
    ]
  },
  {
    eco: 'B20',
    name: "Sicilian Defense",
    moves: ["e4", "c5"],
    description: "Black's most popular and highest-scoring response to 1.e4. Creates an asymmetrical pawn structure leading to sharp tactical play.",
    whiteWinPct: 37,
    drawPct: 30,
    blackWinPct: 33,
    popularMoves: [
      { move: "Nf3", name: "Open Sicilian", winPct: 38 },
      { move: "c3", name: "Alapin Variation", winPct: 35 },
      { move: "Nc3", name: "Closed Sicilian", winPct: 34 },
      { move: "f4", name: "Grand Prix Attack", winPct: 36 }
    ]
  },
  {
    eco: 'D06',
    name: "Queen's Gambit",
    moves: ["d4", "d5", "c4"],
    description: "White offers a flank pawn (c4) to gain immediate control of the center (d4 and e4) and open lines for piece development.",
    whiteWinPct: 40,
    drawPct: 35,
    blackWinPct: 25,
    popularMoves: [
      { move: "e6", name: "Queen's Gambit Declined", winPct: 38 },
      { move: "dxc4", name: "Queen's Gambit Accepted", winPct: 35 },
      { move: "c6", name: "Slav Defense", winPct: 36 }
    ]
  },
  {
    eco: 'C00',
    name: "French Defense",
    moves: ["e4", "e6"],
    description: "A solid, resilient defense where Black establishes a strong d5 pawn stake, leading to closed pawn chains and counterattacks on White's d4 pawn.",
    whiteWinPct: 39,
    drawPct: 33,
    blackWinPct: 28,
    popularMoves: [
      { move: "d4", name: "Main Line", winPct: 40 },
      { move: "d3", name: "King's Indian Attack", winPct: 37 }
    ]
  },
  {
    eco: 'B10',
    name: "Caro-Kann Defense",
    moves: ["e4", "c6"],
    description: "Extremely solid defense preparing d5 without trapping the light-squared bishop inside the pawn structure.",
    whiteWinPct: 37,
    drawPct: 37,
    blackWinPct: 26,
    popularMoves: [
      { move: "d4", name: "Main Line", winPct: 38 },
      { move: "d3", name: "Two Knights System", winPct: 35 }
    ]
  },
  {
    eco: 'C50',
    name: "Italian Game (Giuoco Piano)",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bc4"],
    description: "Focuses rapid development of the light-squared bishop directly aiming at Black's weak f7 square.",
    whiteWinPct: 38,
    drawPct: 35,
    blackWinPct: 27,
    popularMoves: [
      { move: "Bc5", name: "Giuoco Piano", winPct: 37 },
      { move: "Nf6", name: "Two Knights Defense", winPct: 36 }
    ]
  },
  {
    eco: 'E60',
    name: "King's Indian Defense",
    moves: ["d4", "Nf6", "c4", "g6"],
    description: "A hypermodern defense where Black allows White full central pawn occupation, planning a pawn break (e5 or c5) and kingside pawn storm later.",
    whiteWinPct: 41,
    drawPct: 32,
    blackWinPct: 27,
    popularMoves: [
      { move: "Nc3", name: "Classical Line", winPct: 42 },
      { move: "Nf3", name: "Fianchetto System", winPct: 38 }
    ]
  },
  {
    eco: 'A04',
    name: "Réti Opening",
    moves: ["Nf3"],
    description: "Flexible opening controlling central squares with pieces rather than immediate pawn pushes.",
    whiteWinPct: 36,
    drawPct: 40,
    blackWinPct: 24,
    popularMoves: [
      { move: "d5", name: "Réti Accepted/Declined", winPct: 36 },
      { move: "Nf6", name: "King's Indian Attack Setup", winPct: 35 }
    ]
  },
  {
    eco: 'C42',
    name: "Petrov's Defense (Russian Game)",
    moves: ["e4", "e5", "Nf3", "Nf6"],
    description: "Symmetrical response counterattacking White's e4 pawn directly, favored by Grandmasters seeking solid drawish chances.",
    whiteWinPct: 34,
    drawPct: 45,
    blackWinPct: 21,
    popularMoves: [
      { move: "Nxe5", name: "Classical Attack", winPct: 36 },
      { move: "d4", name: "Steinitz Attack", winPct: 35 }
    ]
  },
  {
    eco: 'E20',
    name: "Nimzo-Indian Defense",
    moves: ["d4", "Nf6", "c4", "e6", "Nc3", "Bb4"],
    description: "Pins White's knight on c3 to prevent e4 and fight for dark-squared control in the center.",
    whiteWinPct: 35,
    drawPct: 42,
    blackWinPct: 23,
    popularMoves: [
      { move: "e3", name: "Rubinstein System", winPct: 36 },
      { move: "Qc2", name: "Classical Variation", winPct: 35 }
    ]
  }
];

export function findMatchingOpening(moveSanHistory: string[]): OpeningData | null {
  if (moveSanHistory.length === 0) return null;

  let bestMatch: OpeningData | null = null;
  let maxMatchLength = 0;

  for (const opening of OPENINGS_DATABASE) {
    const isMatch = opening.moves.every((m, idx) => idx < moveSanHistory.length && moveSanHistory[idx] === m);
    if (isMatch && opening.moves.length > maxMatchLength) {
      maxMatchLength = opening.moves.length;
      bestMatch = opening;
    }
  }

  return bestMatch;
}
