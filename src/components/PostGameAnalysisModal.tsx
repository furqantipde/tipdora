import React from 'react';
import { MoveAnalysis } from '../types/chess';
import { X, Award, AlertTriangle, TrendingUp, Download, Zap } from 'lucide-react';

interface PostGameAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  moveHistory: MoveAnalysis[];
}

export const PostGameAnalysisModal: React.FC<PostGameAnalysisModalProps> = ({
  isOpen,
  onClose,
  moveHistory,
}) => {
  if (!isOpen) return null;

  // Calculate Accuracy Stats & Move Quality Breakdown
  let whiteGoodCount = 0, whiteMistakeCount = 0, whiteBlunderCount = 0, whiteBrilliantCount = 0;
  let blackGoodCount = 0, blackMistakeCount = 0, blackBlunderCount = 0, blackBrilliantCount = 0;

  moveHistory.forEach((m, idx) => {
    const isWhite = idx % 2 === 0;
    const cls = m.classification;

    if (isWhite) {
      if (cls === 'brilliant' || cls === 'great' || cls === 'best' || cls === 'good') whiteGoodCount++;
      if (cls === 'brilliant') whiteBrilliantCount++;
      if (cls === 'mistake' || cls === 'inaccuracy') whiteMistakeCount++;
      if (cls === 'blunder') whiteBlunderCount++;
    } else {
      if (cls === 'brilliant' || cls === 'great' || cls === 'best' || cls === 'good') blackGoodCount++;
      if (cls === 'brilliant') blackBrilliantCount++;
      if (cls === 'mistake' || cls === 'inaccuracy') blackMistakeCount++;
      if (cls === 'blunder') blackBlunderCount++;
    }
  });

  const totalWhite = Math.max(1, Math.ceil(moveHistory.length / 2));
  const totalBlack = Math.max(1, Math.floor(moveHistory.length / 2));

  const whiteAccuracy = Math.min(100, Math.round((whiteGoodCount / totalWhite) * 100));
  const blackAccuracy = Math.min(100, Math.round((blackGoodCount / totalBlack) * 100));

  // Export PGN string download
  const handleExportPGN = () => {
    let pgnStr = '[Event "Grandmaster 2D Match"]\n[Site "AI Studio"]\n[Result "*"]\n\n';
    moveHistory.forEach((m, idx) => {
      if (idx % 2 === 0) {
        pgnStr += `${Math.floor(idx / 2) + 1}. ${m.san} `;
      } else {
        pgnStr += `${m.san} `;
      }
    });

    const blob = new Blob([pgnStr], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `match_analysis_${Date.now()}.pgn`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-amber-900/50 rounded-2xl shadow-2xl overflow-hidden text-amber-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-900/40 bg-stone-950/80">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-amber-200">Post-Game Deep Engine Review</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-stone-800 rounded-lg text-amber-400/80 hover:text-amber-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Accuracy Score Comparison Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-stone-950/70 border border-amber-900/30 rounded-xl text-center">
              <span className="text-xs uppercase tracking-wider text-amber-400/70 font-semibold">White Accuracy</span>
              <div className="text-3xl font-extrabold text-amber-200 mt-1">{whiteAccuracy}%</div>
              <div className="text-[10px] text-amber-400/60 mt-1">
                {whiteBrilliantCount} Brilliant ‼ • {whiteBlunderCount} Blunders
              </div>
            </div>

            <div className="p-4 bg-stone-950/70 border border-amber-900/30 rounded-xl text-center">
              <span className="text-xs uppercase tracking-wider text-amber-400/70 font-semibold">Black Accuracy</span>
              <div className="text-3xl font-extrabold text-amber-200 mt-1">{blackAccuracy}%</div>
              <div className="text-[10px] text-amber-400/60 mt-1">
                {blackBrilliantCount} Brilliant ‼ • {blackBlunderCount} Blunders
              </div>
            </div>
          </div>

          {/* Centipawn Evaluation Chart */}
          <div className="p-4 bg-stone-950/80 border border-amber-900/30 rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Evaluation Chart over Moves</h4>
            <div className="h-32 w-full flex items-end gap-1 pt-4 pb-2 px-2 bg-stone-900/90 rounded border border-stone-800 overflow-x-auto">
              {moveHistory.length === 0 ? (
                <div className="text-xs text-amber-200/40 m-auto">No moves recorded.</div>
              ) : (
                moveHistory.map((m, i) => {
                  const ev = Math.max(-1000, Math.min(1000, m.evalScore));
                  const heightPct = Math.max(10, Math.min(100, Math.abs(ev) / 10));
                  const isWhiteAdv = ev >= 0;

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center group min-w-[6px]">
                      <div
                        className={`w-full rounded-t transition-all ${
                          isWhiteAdv ? 'bg-amber-400' : 'bg-stone-600'
                        }`}
                        style={{ height: `${heightPct}%` }}
                        title={`Move ${i + 1} (${m.san}): ${ev > 0 ? '+' : ''}${(ev / 100).toFixed(1)}`}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Key Turning Points List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Key Match Turning Points</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {moveHistory.filter(m => m.classification === 'brilliant' || m.classification === 'blunder').length === 0 ? (
                <div className="text-xs italic text-amber-200/50 p-3 bg-stone-950/50 rounded-lg">
                  Clean game! No major blunders or material sacrifices detected.
                </div>
              ) : (
                moveHistory.map((m, idx) => {
                  if (m.classification !== 'brilliant' && m.classification !== 'blunder') return null;

                  return (
                    <div key={idx} className="p-3 bg-stone-950/80 border border-amber-900/20 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {m.classification === 'brilliant' ? (
                          <Zap className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                        )}
                        <div>
                          <div className="text-xs font-bold text-stone-100">
                            Move {Math.floor(idx / 2) + 1}. {m.san} ({m.color === 'w' ? 'White' : 'Black'})
                          </div>
                          <div className="text-[10px] text-amber-400/60">
                            {m.classification === 'brilliant'
                              ? 'Brilliant piece sacrifice changing positional trajectory!'
                              : 'Blunder dropping critical evaluation points!'}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-amber-900/40 bg-stone-950/80">
          <button
            onClick={handleExportPGN}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export PGN File</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl transition-all shadow"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
