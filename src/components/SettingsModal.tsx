import React from 'react';
import { GameSettings, BoardMaterial, PieceMaterial, AmbientLighting, AIPersonality } from '../types/chess';
import { X, Volume2, VolumeX, Sparkles, Sliders, Shield, Sun } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onUpdateSettings: (newSettings: GameSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  const boardMaterials: { id: BoardMaterial; name: string; desc: string }[] = [
    { id: 'mahogany', name: 'Polished Mahogany', desc: 'Classic warm wood grain with satin varnish chamfer' },
    { id: 'slate', name: 'Slate Stone & Quartz', desc: 'Textured dark slate with brushed aluminum divider' },
    { id: 'leather', name: 'Cognac Leather & Felt', desc: 'Rich stitched cognac leather with cream felt squares' },
    { id: 'obsidian', name: 'Midnight Obsidian & Gold', desc: 'Polished black marble with etched gold geometric trim' },
    { id: 'rosewood', name: 'Antique Rosewood', desc: 'Deep crimson rosewood with boxwood accents' },
  ];

  const pieceMaterials: { id: PieceMaterial; name: string; desc: string }[] = [
    { id: 'wood', name: 'Royal Staunton Wood', desc: 'Hand-carved wood grain vectors with drop shadows' },
    { id: 'metal', name: 'Brushed Steel & Gold', desc: 'Metallic specular highlights and weighted sheen' },
    { id: 'crystal', name: 'Frosted Quartz & Emerald', desc: 'Translucent depth and soft internal glow' },
  ];

  const lightingThemes: { id: AmbientLighting; name: string; desc: string }[] = [
    { id: 'library', name: 'Warm Library Lamp', desc: 'Soft amber directional glow with floating motes' },
    { id: 'rainy', name: 'Rainy Evening Study', desc: 'Cool blue moody tones with window rain aura' },
    { id: 'tournament', name: 'Grand Tournament Hall', desc: 'Neutral spotlighting with subtle stadium focus' },
    { id: 'cafe', name: 'Cozy Coffee Shop', desc: 'Warm golden café light and ambient warmth' },
  ];

  const personalities: { id: AIPersonality; name: string; desc: string }[] = [
    { id: 'balanced', name: 'Grandmaster Balanced', desc: 'Optimal positional & tactical precision' },
    { id: 'aggressive', name: 'Tactical Attacker', desc: 'Favors piece sacrifices and king attacks' },
    { id: 'defensive', name: 'Solid Fortress', desc: 'Prioritizes pawn structure and king safety' },
    { id: 'positional', name: 'Strategic Pawn Storm', desc: 'Focuses on space control and outpost knights' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-amber-900/50 rounded-2xl shadow-2xl overflow-hidden text-amber-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-900/40 bg-stone-950/80">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-amber-200">Graphics, Audio & AI Engine Preferences</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-stone-800 rounded-lg text-amber-400/80 hover:text-amber-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
          {/* Board Material */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              1. Board Material Surface
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {boardMaterials.map(m => (
                <div
                  key={m.id}
                  onClick={() => onUpdateSettings({ ...settings, boardMaterial: m.id })}
                  className={`p-3 rounded-xl cursor-pointer border transition-all ${
                    settings.boardMaterial === m.id
                      ? 'bg-amber-500/20 border-amber-500/80 text-amber-100 shadow'
                      : 'bg-stone-950/40 border-amber-900/20 hover:bg-stone-800/60 text-stone-300'
                  }`}
                >
                  <div className="text-xs font-bold">{m.name}</div>
                  <div className="text-[10px] text-amber-400/60 mt-0.5">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Piece Material */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              2. Piece Material Shader
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {pieceMaterials.map(p => (
                <div
                  key={p.id}
                  onClick={() => onUpdateSettings({ ...settings, pieceMaterial: p.id })}
                  className={`p-3 rounded-xl cursor-pointer border transition-all ${
                    settings.pieceMaterial === p.id
                      ? 'bg-amber-500/20 border-amber-500/80 text-amber-100 shadow'
                      : 'bg-stone-950/40 border-amber-900/20 hover:bg-stone-800/60 text-stone-300'
                  }`}
                >
                  <div className="text-xs font-bold">{p.name}</div>
                  <div className="text-[10px] text-amber-400/60 mt-0.5">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Ambient Table Lighting */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              3. Ambient Lighting & Table Atmosphere
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {lightingThemes.map(l => (
                <div
                  key={l.id}
                  onClick={() => onUpdateSettings({ ...settings, ambientLighting: l.id })}
                  className={`p-3 rounded-xl cursor-pointer border transition-all ${
                    settings.ambientLighting === l.id
                      ? 'bg-amber-500/20 border-amber-500/80 text-amber-100 shadow'
                      : 'bg-stone-950/40 border-amber-900/20 hover:bg-stone-800/60 text-stone-300'
                  }`}
                >
                  <div className="text-xs font-bold">{l.name}</div>
                  <div className="text-[10px] text-amber-400/60 mt-0.5">{l.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Stockfish AI Engine Config */}
          <div className="p-4 bg-stone-950/80 border border-amber-900/30 rounded-xl space-y-4">
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              4. AI Engine Difficulty & Personality
            </label>

            <div>
              <div className="flex justify-between text-xs font-bold text-amber-200 mb-1">
                <span>AI Target ELO Rating:</span>
                <span className="font-mono text-amber-400">{settings.aiElo} ELO</span>
              </div>
              <input
                type="range"
                min="400"
                max="2800"
                step="100"
                value={settings.aiElo}
                onChange={(e) => onUpdateSettings({ ...settings, aiElo: parseInt(e.target.value) })}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {personalities.map(pers => (
                <div
                  key={pers.id}
                  onClick={() => onUpdateSettings({ ...settings, aiPersonality: pers.id })}
                  className={`p-2.5 rounded-lg cursor-pointer border text-xs ${
                    settings.aiPersonality === pers.id
                      ? 'bg-amber-500/20 border-amber-500/60 text-amber-200'
                      : 'bg-stone-900 border-transparent text-stone-400'
                  }`}
                >
                  <div className="font-bold">{pers.name}</div>
                  <div className="text-[10px] text-amber-400/60">{pers.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Audio Sliders */}
          <div className="p-4 bg-stone-950/80 border border-amber-900/30 rounded-xl space-y-3">
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              5. High-Fidelity Audio Controls
            </label>

            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-200">Master Sound FX (ASMR Piece Landing)</span>
              <button
                onClick={() => onUpdateSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
                className={`p-2 rounded-lg border ${
                  settings.soundEnabled ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'bg-stone-800 border-stone-700 text-stone-500'
                }`}
              >
                {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-4 border-t border-amber-900/40 bg-stone-950/80">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow transition-all"
          >
            Save & Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};
