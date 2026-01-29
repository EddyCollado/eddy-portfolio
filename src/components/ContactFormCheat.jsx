import { useEffect, useState } from 'react';
import { useAchievements } from '../context/AchievementContext';

const ContactFormCheat = () => {
  const { unlockAchievement, isUnlocked } = useAchievements();
  const [cheatSequence, setCheatSequence] = useState([]);
  const CHEAT_CODE = ['c', 'o', 'n', 't', 'a', 'c', 't'];

  useEffect(() => {
    if (isUnlocked('contactForm')) return;

    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase();
      
      setCheatSequence(prev => {
        const newSeq = [...prev, key].slice(-7);
        
        if (newSeq.join('') === CHEAT_CODE.join('')) {
          unlockAchievement('contactForm');
        }
        
        return newSeq;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isUnlocked, unlockAchievement]);

  return null;
};

export default ContactFormCheat;
