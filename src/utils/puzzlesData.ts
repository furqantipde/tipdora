import { PuzzleData } from '../types/chess';

export const PUZZLES_DATABASE: PuzzleData[] = [
  {
    id: 'puz-01',
    title: 'Smothered Mate Classic',
    category: 'smothered',
    rating: 1450,
    fen: '6rk/5Npp/8/8/8/8/8/6K1 w - - 0 1',
    solution: ['Nf7#'],
    description: 'White can deliver an immediate knight smothered mate against the trapped black king.',
    hint: 'Look for a knight jump that gives check while the king has zero escape squares.'
  },
  {
    id: 'puz-02',
    title: "Greek Gift Sacrifice",
    category: 'mate_in_3',
    rating: 1620,
    fen: 'r1bq1rk1/ppp2ppp/2n5/3pP3/3P1B2/P1P2N2/2Q2PPP/R3K2R w KQ - 0 12',
    solution: ['Bxh7+', 'Kxh7', 'Ng5+'],
    description: 'Sacrifice the bishop on h7 to rip open the opponent king safety.',
    hint: 'The h7 pawn is weakly defended. Bishop takes with check!'
  },
  {
    id: 'puz-03',
    title: 'Royal Fork Discovery',
    category: 'fork',
    rating: 1280,
    fen: 'r3r1k1/ppp2ppp/2n5/8/3P4/2N1PN2/PP1QK1PP/R6R w - - 0 1',
    solution: ['d5'],
    description: 'Fork two key black pieces simultaneously.',
    hint: 'Push the central pawn forward to attack knight and queen space.'
  },
  {
    id: 'puz-04',
    title: 'Back Rank Deflection',
    category: 'mate_in_2',
    rating: 1510,
    fen: '3r2k1/p4ppp/8/8/8/2Q5/5PPP/6K1 w - - 0 1',
    solution: ['Qc8', 'Rxc8', 'Rxc8#'],
    description: 'White exploits Black back-rank weakness with a queen sacrifice.',
    hint: 'Force the back rook off guard.'
  },
  {
    id: 'puz-05',
    title: 'Absolute Pin Tactical Strike',
    category: 'pin',
    rating: 1350,
    fen: 'r1b1k2r/pppp1ppp/2n2q2/4n3/2B1P3/2P2N2/PPP2PPP/R1BQK2R w KQkq - 0 1',
    solution: ['Nxe5'],
    description: 'Exploit the pinned defender on c6 to win material.',
    hint: 'Black defender cannot safely recapture due to king line.'
  },
  {
    id: 'puz-06',
    title: 'Endgame Pawn Promotion Race',
    category: 'endgame',
    rating: 1700,
    fen: '8/8/8/3k4/8/1p6/1P1K4/8 w - - 0 1',
    solution: ['Kc1', 'Kc4', 'Kb1'],
    description: 'Key king opposition move in a delicate pawn endgame.',
    hint: 'Gain the opposition in front of the candidate pawn.'
  },
  {
    id: 'puz-07',
    title: 'Discovered Check & Queen Capture',
    category: 'skewer',
    rating: 1400,
    fen: 'r1b2rk1/pp1p1ppp/2n1p3/2b5/4q3/2P1N3/PP3PPP/R1BQKBNR w KQ - 0 1',
    solution: ['Bd3'],
    description: 'Attack the black queen while developing a minor piece.',
    hint: 'Move the bishop to d3 to threaten the queen and gain tempo.'
  }
];
