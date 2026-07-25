import React from 'react';
import { AmbientLighting } from '../types/chess';

interface LightingParticleOverlayProps {
  lighting: AmbientLighting;
  enableParticles: boolean;
}

export const LightingParticleOverlay: React.FC<LightingParticleOverlayProps> = ({
  lighting,
  enableParticles,
}) => {
  // Ambient Color Gradients
  const getAmbientStyles = () => {
    switch (lighting) {
      case 'rainy':
        return {
          bgOverlay: 'bg-gradient-to-br from-slate-950/80 via-blue-950/50 to-slate-900/90',
          spotlight: 'bg-radial from-cyan-500/10 via-blue-600/5 to-transparent',
          moteColor: 'bg-cyan-200/40',
        };
      case 'tournament':
        return {
          bgOverlay: 'bg-gradient-to-br from-slate-950/90 via-zinc-900/60 to-black/95',
          spotlight: 'bg-radial from-amber-100/15 via-zinc-400/5 to-transparent',
          moteColor: 'bg-zinc-100/50',
        };
      case 'cafe':
        return {
          bgOverlay: 'bg-gradient-to-br from-stone-950/80 via-amber-950/40 to-stone-900/85',
          spotlight: 'bg-radial from-amber-400/15 via-orange-500/5 to-transparent',
          moteColor: 'bg-amber-200/50',
        };
      case 'library':
      default:
        return {
          bgOverlay: 'bg-gradient-to-br from-stone-950/85 via-amber-950/50 to-amber-900/70',
          spotlight: 'bg-radial from-amber-300/20 via-yellow-600/5 to-transparent',
          moteColor: 'bg-amber-100/60',
        };
    }
  };

  const styles = getAmbientStyles();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {/* Primary Ambient Table Spotlight Overhead */}
      <div className={`absolute -inset-10 ${styles.bgOverlay} transition-colors duration-700`} />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] rounded-full ${styles.spotlight} blur-2xl transition-opacity duration-700`} />

      {/* Floating Dust Motes / Particles in Light Beam */}
      {enableParticles && (
        <div className="absolute inset-0 opacity-70">
          {Array.from({ length: 18 }).map((_, i) => {
            const size = (i % 3) + 2;
            const left = (i * 17) % 100;
            const top = (i * 23) % 100;
            const animDuration = 12 + (i % 8) * 3;
            const delay = (i * 1.5) % 6;

            return (
              <div
                key={i}
                className={`absolute rounded-full ${styles.moteColor} blur-[0.5px] animate-pulse`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDuration: `${animDuration}s`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
