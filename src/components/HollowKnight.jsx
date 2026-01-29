import { useEffect, useState } from 'react';
import { useAchievements } from '../context/AchievementContext';

const HollowKnight = () => {
  const [sequence, setSequence] = useState('');
  const { unlockAchievement, isUnlocked } = useAchievements();

  useEffect(() => {
    if (isUnlocked('hollowKnight')) return;

    const handleKeyPress = (e) => {
      setSequence(prev => {
        const newSeq = (prev + e.key.toLowerCase()).slice(-4);
        if (newSeq === 'shaw') {
          unlockAchievement('hollowKnight');
        }
        return newSeq;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isUnlocked, unlockAchievement]);

  return null;
};

export default HollowKnight;
