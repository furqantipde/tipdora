import { HistoricalMatch } from '../types/chess';

export const HISTORICAL_MATCHES: HistoricalMatch[] = [
  {
    id: 'hist-01',
    title: "Kasparov vs. Deep Blue (1997)",
    event: 'IBM Chess Challenge - Game 6',
    year: 1997,
    whitePlayer: 'Deep Blue',
    blackPlayer: 'Garry Kasparov',
    result: '1-0',
    pgn: '1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nd7 5. Ng5 Ngf6 6. Bd3 e6 7. N1f3 h6 8. Nxe6 Qe7 9. O-O fxe6 10. Bg6+ Kd8 11. Bf4 b5 12. a4 Bb7 13. Re1 Nd5 14. Bg3 Kc8 15. axb5 cxb5 16. Qd3 Bc6 17. Bf5 exf5 18. Rxe7 Bxe7 19. c4 1-0',
    summary: "The turning point in computer chess history. Deep Blue uncorked a stunning knight sacrifice on e6 (8. Nxe6!) that shattered Kasparov's defensive pawn structure and led to a swift 19-move miniature victory.",
    keyMoves: [
      { moveNumber: 8, title: '8. Nxe6! Knight Sacrifice', commentary: 'Deep Blue plays a speculative knight sacrifice that human grandmasters rarely consider in the opening, opening lines to Kasparov\'s uncastled king.' },
      { moveNumber: 10, title: '10. Bg6+ King Trap', commentary: 'Forces the Russian World Champion king into a cramped square on d8 without castling rights.' },
      { moveNumber: 17, title: '17. Bf5 Queen Trap', commentary: 'Deep Blue sac-forces Kasparov\'s queen off the defense board, securing a decisive victory.' }
    ]
  },
  {
    id: 'hist-02',
    title: 'Fischer\'s "Game of the Century" (1956)',
    event: 'Rosenwald Memorial Tournament',
    year: 1956,
    whitePlayer: 'Donald Byrne',
    blackPlayer: 'Bobby Fischer (13 years old)',
    result: '0-1',
    pgn: '1. Nf3 Nf6 2. c4 g6 3. Nc3 Bg7 4. d4 O-O 5. Bf4 d5 6. Qb3 dxc4 7. Qxc4 c6 8. e4 Nbd7 9. Rd1 Nb6 10. Qc5 Bg4 11. Bg5 Na4 12. Qa3 Nxc3 13. bxc3 Nxe4 14. Bxe7 Qb6 15. Bc4 Nxc3 16. Bc5 Rfe8+ 17. Kf1 Be6!! 18. Bxb6 Bxc4+ 19. Kg1 Ne2+ 20. Kf1 Nxd4+ 21. Kg1 Ne2+ 22. Kf1 Nc3+ 23. Kg1 axb6 24. Qb4 Ra4 25. Qxb6 Nxd1 26. h3 Rxa2 27. Kh2 Nxf2 28. Re1 Rxe1 29. Qd8+ Bf8 30. Nxe1 Bd5 31. Nf3 Ne4 32. Qb8 b5 33. h4 h5 34. Ne5 Kg7 35. Kg1 Bc5+ 36. Kf1 Ng3+ 37. Ke1 Bb4+ 38. Kd1 Bb3+ 39. Kc1 Ne2+ 40. Kb1 Nc3+ 41. Kc1 Rc2# 0-1',
    summary: "At just 13 years old, Bobby Fischer defeated International Master Donald Byrne in what is widely regarded as the most stunning tactical masterpiece in chess history, featuring a breathtaking queen sacrifice (17... Be6!!).",
    keyMoves: [
      { moveNumber: 17, title: '17... Be6!! The Queen Sacrifice', commentary: 'Instead of saving his queen, 13-year-old Fischer offers it as bait to set up a windmill double-check attack!' },
      { moveNumber: 20, title: '20... Ne2+ The Windmill Attack', commentary: 'A series of unstoppable discovered checks decimates Byrne\'s position piece by piece.' }
    ]
  },
  {
    id: 'hist-03',
    title: "Morphy's Opera Game (1858)",
    event: 'Paris Opera House',
    year: 1858,
    whitePlayer: 'Paul Morphy',
    blackPlayer: 'Duke Karl & Count Isouard',
    result: '1-0',
    pgn: '1. e4 e5 2. Nf3 d6 3. d4 Bg4 4. dxe5 Bxf3 5. Qxf3 dxe5 6. Bc4 Nf6 7. Qb3 Qe7 8. Nc3 c6 9. Bg5 b5 10. Nxb5 cxb5 11. Bxb5+ Nbd7 12. O-O-O Rd8 13. Rxd7 Rxd7 14. Rd1 Qe6 15. Bxd7+ Nxd7 16. Qb8+! Nxb8 17. Rd8# 1-0',
    summary: "Played during a performance of the opera Norma in Paris. Paul Morphy demonstrates the absolute pinnacle of rapid development, piece coordination, and a final queen sacrifice leading to back-rank checkmate.",
    keyMoves: [
      { moveNumber: 10, title: '10. Nxb5! Piece Sacrifice', commentary: 'Morphy sacrifices a piece to open lines against Black\'s uncastled king.' },
      { moveNumber: 16, title: '16. Qb8+!! Queen Sacrifice', commentary: 'A glorious final queen sacrifice forcing Black\'s knight off the back rank to deliver mate with Rd8#.' }
    ]
  }
];
