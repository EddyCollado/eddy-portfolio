import { useEffect, useState } from 'react';
import { useAchievements } from '../context/AchievementContext';

const KonamiCode = () => {
  const [sequence, setSequence] = useState([]);
  const { unlockAchievement, isUnlocked } = useAchievements();
  
  const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    if (isUnlocked('konami')) return;

    const handleKeyPress = (e) => {
      setSequence(prev => {
        const newSeq = [...prev, e.key].slice(-10);
        if (newSeq.join(',') === KONAMI_CODE.join(',')) {
          unlockAchievement('konami');
        }
        return newSeq;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isUnlocked, unlockAchievement]);

  return null;
};

export default KonamiCode;
