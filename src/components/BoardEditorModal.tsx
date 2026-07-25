import React, { useState } from 'react';
import { Chess } from 'chess.js';
import { X, Play, RefreshCw, Copy, Check, Upload } from 'lucide-react';

interface BoardEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadFen: (fen: string) => void;
  currentFen: string;
}

export const BoardEditorModal: React.FC<BoardEditorModalProps> = ({
  isOpen,
  onClose,
  onLoadFen,
  currentFen,
}) => {
  const [fenInput, setFenInput] = useState(currentFen);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleValidateAndLoad = () => {
    try {
      const testChess = new Chess(fenInput.trim());
      setErrorMsg('');
      onLoadFen(testChess.fen());
      onClose();
    } catch {
      setErrorMsg('Invalid FEN string format. Please check syntax.');
    }
  };

  const handleResetStandard = () => {
    const std = new Chess().fen();
    setFenInput(std);
    setErrorMsg('');
  };

  const handleCopyFen = () => {
    navigator.clipboard.writeText(fenInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-stone-900 border border-amber-900/50 rounded-2xl shadow-2xl overflow-hidden text-amber-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-900/40 bg-stone-950/80">
          <h2 className="text-base font-bold text-amber-200">Board Position Editor (FEN / PGN)</h2>
          <button onClick={onClose} className="p-1 hover:bg-stone-800 rounded-lg text-amber-400/80 hover:text-amber-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              FEN Position String
            </label>
            <textarea
              rows={3}
              value={fenInput}
              onChange={(e) => setFenInput(e.target.value)}
              className="w-full p-3 bg-stone-950 border border-amber-900/40 rounded-xl font-mono text-xs text-amber-200 focus:outline-none focus:border-amber-500 custom-scrollbar"
            />
            {errorMsg && (
              <p className="text-xs text-red-400 font-semibold">{errorMsg}</p>
            )}
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handleResetStandard}
              className="flex items-center gap-1.5 px-3 py-2 bg-stone-800 hover:bg-stone-700 text-amber-200 rounded-xl text-xs font-semibold border border-amber-900/30 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Standard</span>
            </button>

            <button
              onClick={handleCopyFen}
              className="flex items-center gap-1.5 px-3 py-2 bg-stone-800 hover:bg-stone-700 text-amber-200 rounded-xl text-xs font-semibold border border-amber-900/30 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy FEN'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-4 border-t border-amber-900/40 bg-stone-950/80 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleValidateAndLoad}
            className="flex items-center gap-2 px-5 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>Load Custom Position</span>
          </button>
        </div>
      </div>
    </div>
  );
};
