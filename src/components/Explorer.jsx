import { useEffect, useRef } from 'react';
import { useAchievements } from '../context/AchievementContext';

const Explorer = () => {
  const { unlockAchievement, isUnlocked } = useAchievements();
  const visitedSections = useRef(new Set());
  const REQUIRED_SECTIONS = ['home', 'about', 'skills', 'timeline', 'projects', 'contact'];

  useEffect(() => {
    if (isUnlocked('explorer')) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      REQUIRED_SECTIONS.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            visitedSections.current.add(section);
          }
        }
      });

      if (visitedSections.current.size === REQUIRED_SECTIONS.length) {
        unlockAchievement('explorer');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isUnlocked, unlockAchievement]);

  return null;
};

export default Explorer;
