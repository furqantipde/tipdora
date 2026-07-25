import React from 'react';
import { PieceType, PieceColor, PieceMaterial } from '../types/chess';

interface PieceRenderProps {
  type: PieceType;
  color: PieceColor;
  material?: PieceMaterial;
  size?: number;
  isDragging?: boolean;
}

export const PieceRender: React.FC<PieceRenderProps> = ({
  type,
  color,
  material = 'wood',
  size = 64,
  isDragging = false,
}) => {
  const isWhite = color === 'w';

  // SVG Paths for standard Staunton pieces with high detail
  const renderPieceSVGPath = () => {
    switch (type) {
      case 'p': // Pawn
        return (
          <g>
            <path d="M 22 42 C 22 42 20 28 26 23 C 23 21 23 16 26 14 C 23 13 23 9 26 7 C 29 9 29 13 26 14 C 29 16 29 21 26 23 C 32 28 30 42 30 42 Z" />
            <ellipse cx="26" cy="7" rx="3.5" ry="3.5" />
            <path d="M 17 44 L 35 44 L 37 47 L 15 47 Z" />
          </g>
        );
      case 'n': // Knight
        return (
          <g>
            <path d="M 16 46 L 36 46 L 36 43 C 36 40 33 38 31 36 C 35 34 38 29 36 24 C 35 22 33 21 31 22 C 30 18 27 15 23 12 C 18 10 14 13 13 18 C 12 21 13 24 15 26 C 13 27 12 30 13 33 C 14 36 15 40 16 46 Z" />
            <circle cx="19" cy="18" r="1.5" />
            <path d="M 13 46 L 39 46 L 41 48 L 11 48 Z" />
          </g>
        );
      case 'b': // Bishop
        return (
          <g>
            <path d="M 26 10 C 21 10 18 15 18 22 C 18 28 22 34 22 41 L 30 41 C 30 34 34 28 34 22 C 34 15 31 10 26 10 Z" />
            <circle cx="26" cy="8" r="2.5" />
            <path d="M 21 20 L 31 20" strokeWidth="2" />
            <path d="M 16 43 L 36 43 L 38 46 L 14 46 Z" />
          </g>
        );
      case 'r': // Rook
        return (
          <g>
            <path d="M 17 14 L 17 19 L 20 19 L 20 14 L 23 14 L 23 19 L 29 19 L 29 14 L 32 14 L 32 19 L 35 19 L 35 14 L 38 14 L 38 22 L 35 25 L 35 41 L 17 41 L 17 25 L 14 22 L 14 14 Z" />
            <path d="M 14 43 L 38 43 L 40 46 L 12 46 Z" />
          </g>
        );
      case 'q': // Queen
        return (
          <g>
            <path d="M 12 20 L 16 38 L 36 38 L 40 20 L 33 28 L 26 15 L 19 28 Z" />
            <circle cx="12" cy="18" r="2" />
            <circle cx="19" cy="14" r="2" />
            <circle cx="26" cy="11" r="2.5" />
            <circle cx="33" cy="14" r="2" />
            <circle cx="40" cy="18" r="2" />
            <path d="M 14 41 L 38 41 L 40 45 L 12 45 Z" />
          </g>
        );
      case 'k': // King
        return (
          <g>
            <path d="M 26 6 L 26 12 M 23 9 L 29 9" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 18 17 C 18 13 34 13 34 17 C 34 22 30 26 30 40 L 22 40 C 22 26 18 22 18 17 Z" />
            <path d="M 14 42 L 38 42 L 40 46 L 12 46 Z" />
          </g>
        );
    }
  };

  // Gradient ID setup based on material
  const gradientId = `piece_grad_${color}_${material}_${type}`;
  const filterId = `piece_shadow_${color}`;

  // Color Definitions for Materials
  const getMaterialColors = () => {
    if (material === 'metal') {
      return isWhite
        ? { stop1: '#ffffff', stop2: '#e2e8f0', stop3: '#94a3b8', stroke: '#475569', specular: '#ffffff' }
        : { stop1: '#f59e0b', stop2: '#b45309', stop3: '#451a03', stroke: '#78350f', specular: '#fde68a' };
    } else if (material === 'crystal') {
      return isWhite
        ? { stop1: '#f0f9ff', stop2: '#bae6fd', stop3: '#38bdf8', stroke: '#0284c7', specular: '#ffffff' }
        : { stop1: '#ecfdf5', stop2: '#34d399', stop3: '#047857', stroke: '#064e3b', specular: '#a7f3d0' };
    } else {
      // Classic Wood (Boxwood vs Ebony/Rosewood)
      return isWhite
        ? { stop1: '#fef3c7', stop2: '#fde68a', stop3: '#d97706', stroke: '#78350f', specular: '#fffbeb' }
        : { stop1: '#44403c', stop2: '#292524', stop3: '#0c0a09', stroke: '#000000', specular: '#78716c' };
    }
  };

  const colors = getMaterialColors();

  return (
    <div
      className={`relative inline-flex items-center justify-center transition-all duration-150 select-none ${
        isDragging
          ? 'scale-125 -translate-y-3 rotate-[-3deg] filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] z-50 cursor-grabbing'
          : 'hover:scale-110 hover:-translate-y-1 hover:filter hover:drop-shadow-[0_8px_12px_rgba(0,0,0,0.7)] cursor-grab active:scale-105 active:translate-y-0'
      }`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 52 52"
        width={size}
        height={size}
        className="overflow-visible"
      >
        <defs>
          {/* Radial/Linear Specular Shading Gradient */}
          <linearGradient id={gradientId} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor={colors.stop1} />
            <stop offset="50%" stopColor={colors.stop2} />
            <stop offset="100%" stopColor={colors.stop3} />
          </linearGradient>

          {/* Multi-layered Soft Drop Shadow & Ambient Occlusion Filter */}
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="1.5" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.6" />
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Piece Base Group with Multi-layer Shading */}
        <g
          filter={`url(#${filterId})`}
          fill={`url(#${gradientId})`}
          stroke={colors.stroke}
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {renderPieceSVGPath()}
        </g>

        {/* Specular Highlight Rim Accent */}
        <path
          d="M 22 10 Q 26 6 30 10"
          fill="none"
          stroke={colors.specular}
          strokeWidth="1"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};
