import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { trackAchievement } from '../utils/analytics';

const AchievementContext = createContext();

export const useAchievements = () => useContext(AchievementContext);

const ACHIEVEMENTS = {
  factoryPuzzle: {
    id: 'factoryPuzzle',
    name: 'Factory Puzzle',
    description: 'Discovered the Kingdom of Zeal',
    hint: '🤖 Four keys unlock the ancient kingdom...',
    detailedHint: 'Desktop: Press X, A, B, Y | Mobile: Swipe Right, Left, Up, Down',
    icon: '⏰',
    game: 'Chrono Trigger'
  },
  praiseSun: {
    id: 'praiseSun',
    name: 'Praise the Sun',
    description: 'Found the bonfire',
    hint: '☀️ Hold your devotion...',
    detailedHint: 'Hold down on the EC logo for 3 seconds',
    icon: '🔥',
    game: 'Dark Souls'
  },
  konami: {
    id: 'konami',
    name: 'Tactical Espionage',
    description: 'Entered the legendary code',
    hint: '❗ ↑↑↓↓←→←→',
    detailedHint: 'Desktop: ↑ ↑ ↓ ↓ ← → ← → B A | Mobile: Swipe pattern + tap twice',
    icon: '📦',
    game: 'Metal Gear Solid'
  },
  harvestMoon: {
    id: 'harvestMoon',
    name: 'Harvest Moon',
    description: 'Visited during the lunch hour',
    hint: '🌙 When the sun is highest...',
    detailedHint: 'Visit the portfolio at noon (12:00 PM)',
    icon: '🌕',
    game: 'Stardew Valley'
  },
  cakeLie: {
    id: 'cakeLie',
    name: 'The Cake is a Lie',
    description: 'Found the hidden truth',
    hint: '🎂 Not everything is as it seems...',
    detailedHint: 'Find and click the hidden element',
    icon: '🍰',
    game: 'Portal'
  },
  speedrunner: {
    id: 'speedrunner',
    name: 'Speedrunner',
    description: 'Reached the bottom in under 10 seconds',
    hint: '⚡ Gotta go fast...',
    detailedHint: 'Scroll to the bottom of the page in under 10 seconds',
    icon: '🏃',
    game: 'General'
  },
  explorer: {
    id: 'explorer',
    name: 'Explorer',
    description: 'Visited all sections',
    hint: '🗺️ See everything this world has to offer...',
    detailedHint: 'Visit all 6 sections: Home, About, Skills, Timeline, Projects, Contact',
    icon: '🧭',
    game: 'General'
  },
  resumeDownload: {
    id: 'resumeDownload',
    name: 'Interested Party',
    description: 'Downloaded the resume',
    hint: '📄 Knowledge is power...',
    detailedHint: 'Click the Resume button',
    icon: '📋',
    game: 'General'
  },
  contactForm: {
    id: 'contactForm',
    name: 'First Contact',
    description: 'Sent a message',
    hint: '📧 Reach out...',
    detailedHint: 'Submit the contact form',
    icon: '✉️',
    game: 'General'
  },
  hollowKnight: {
    id: 'hollowKnight',
    name: 'SHAW!',
    description: 'Summoned Hornet',
    hint: '🦗 A battle cry echoes...',
    detailedHint: 'Desktop: Type "SHAW" | Mobile: Tap the sword button',
    icon: '⚔️',
    game: 'Hollow Knight'
  }
};

export const AchievementProvider = ({ children }) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : [];
  });
  const [showNotification, setShowNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements]);

  const unlockAchievement = (id) => {
    setUnlockedAchievements(prev => {
      if (prev.includes(id)) return prev;
      setShowNotification(ACHIEVEMENTS[id]);
      setTimeout(() => setShowNotification(null), 5000);
      trackAchievement(id, ACHIEVEMENTS[id].name);
      return [...prev, id];
    });
  };

  const isUnlocked = (id) => unlockedAchievements.includes(id);

  const progress = {
    unlocked: unlockedAchievements.length,
    total: Object.keys(ACHIEVEMENTS).length
  };

  return (
    <AchievementContext.Provider value={{ 
      achievements: ACHIEVEMENTS, 
      unlockedAchievements, 
      unlockAchievement, 
      isUnlocked,
      progress,
      showNotification 
    }}>
      {children}
    </AchievementContext.Provider>
  );
};
