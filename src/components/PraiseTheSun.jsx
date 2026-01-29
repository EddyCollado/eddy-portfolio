import { useEffect } from 'react';
import { useAchievements } from '../context/AchievementContext';

const PraiseTheSun = () => {
  const { unlockAchievement, isUnlocked } = useAchievements();

  useEffect(() => {
    if (isUnlocked('praiseSun')) return;

    let holdTimer = null;

    const handleMouseDown = (e) => {
      const logo = e.target.closest('a[href="#home"]');
      if (logo) {
        holdTimer = setTimeout(() => {
          unlockAchievement('praiseSun');
        }, 3000);
      }
    };

    const handleMouseUp = () => {
      if (holdTimer) {
        clearTimeout(holdTimer);
        holdTimer = null;
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
      if (holdTimer) clearTimeout(holdTimer);
    };
  }, [isUnlocked, unlockAchievement]);

  return null;
};

export default PraiseTheSun;
