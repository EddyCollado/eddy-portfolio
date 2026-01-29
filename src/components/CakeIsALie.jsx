import { useEffect } from 'react';
import { useAchievements } from '../context/AchievementContext';

const CakeIsALie = () => {
  const { unlockAchievement, isUnlocked } = useAchievements();

  useEffect(() => {
    if (isUnlocked('cakeLie')) return;

    const handleClick = (e) => {
      if (e.target.id === 'hidden-cake') {
        unlockAchievement('cakeLie');
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isUnlocked, unlockAchievement]);

  return null;
};

export default CakeIsALie;
