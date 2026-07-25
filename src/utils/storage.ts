import { GameSettings, PlayerStats, Achievement } from '../types/chess';

const SETTINGS_KEY = 'gm2d_settings_v1';
const STATS_KEY = 'gm2d_stats_v1';
const ACHIEVEMENTS_KEY = 'gm2d_achievements_v1';

export const DEFAULT_SETTINGS: GameSettings = {
  boardMaterial: 'mahogany',
  pieceMaterial: 'wood',
  ambientLighting: 'library',
  enableParticles: true,
  soundEnabled: true,
  soundVolume: 0.8,
  bgmVolume: 0.3,
  showLegalMoves: true,
  showEvalBar: true,
  showCoordinates: true,
  autoFlipBoard: false,
  highlightLastMove: true,
  aiPersonality: 'balanced',
  aiElo: 1600,
};

export const DEFAULT_STATS: PlayerStats = {
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  aiWins: 0,
  puzzlesSolved: 0,
  puzzleElo: 1200,
  highestElo: 1200,
  currentElo: 1200,
  currentStreak: 0,
  bestStreak: 0,
};

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_win', title: 'First Blood', description: 'Win your first game against the AI or human.', icon: '🏆', unlocked: false },
  { id: 'grandmaster_beat', title: 'Grandmaster Defeated', description: 'Beat the AI at ELO 2200 or higher.', icon: '👑', unlocked: false },
  { id: 'puzzle_master_10', title: 'Tactical Mind', description: 'Solve 10 tactical chess puzzles.', icon: '🧩', unlocked: false },
  { id: 'streak_3', title: 'On Fire', description: 'Achieve a 3-game win streak.', icon: '🔥', unlocked: false },
  { id: 'historical_explorer', title: 'Chess Historian', description: 'Replay and complete a historical match.', icon: '📜', unlocked: false },
  { id: 'brilliant_move', title: 'Genius Mind', description: 'Execute a move evaluated as Brilliant (‼).', icon: '⚡', unlocked: false },
];

export function getStoredSettings(): GameSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: GameSettings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Ignore write errors
  }
}

export function getStoredStats(): PlayerStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? { ...DEFAULT_STATS, ...JSON.parse(raw) } : DEFAULT_STATS;
  } catch {
    return DEFAULT_STATS;
  }
}

export function saveStats(stats: PlayerStats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    // Ignore write errors
  }
}

export function getStoredAchievements(): Achievement[] {
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (!raw) return INITIAL_ACHIEVEMENTS;
    const parsed: Achievement[] = JSON.parse(raw);
    // Merge with any new initial achievements
    return INITIAL_ACHIEVEMENTS.map(init => {
      const found = parsed.find(p => p.id === init.id);
      return found ? found : init;
    });
  } catch {
    return INITIAL_ACHIEVEMENTS;
  }
}

export function unlockAchievement(achievementId: string): Achievement[] {
  const current = getStoredAchievements();
  const updated = current.map(ach => {
    if (ach.id === achievementId && !ach.unlocked) {
      return { ...ach, unlocked: true, unlockedAt: new Date().toLocaleDateString() };
    }
    return ach;
  });
  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(updated));
  } catch {
    // Ignore
  }
  return updated;
}
