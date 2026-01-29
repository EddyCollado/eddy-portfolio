import { useEffect } from 'react';
import { useAchievements } from '../context/AchievementContext';

const HarvestMoon = () => {
  const { unlockAchievement, isUnlocked } = useAchievements();

  useEffect(() => {
    if (isUnlocked('harvestMoon')) return;

    const checkTime = () => {
      const hour = new Date().getHours();
      if (hour === 12) {
        unlockAchievement('harvestMoon');
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [isUnlocked, unlockAchievement]);

  return null;
};

export default HarvestMoon;
