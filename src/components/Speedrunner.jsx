import { useEffect, useRef } from 'react';
import { useAchievements } from '../context/AchievementContext';

const Speedrunner = () => {
  const { unlockAchievement, isUnlocked } = useAchievements();
  const startTimeRef = useRef(Date.now());
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    if (isUnlocked('speedrunner')) return;

    const handleScroll = () => {
      if (hasScrolledRef.current) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        if (elapsed < 10) {
          unlockAchievement('speedrunner');
          hasScrolledRef.current = true;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isUnlocked, unlockAchievement]);

  return null;
};

export default Speedrunner;
