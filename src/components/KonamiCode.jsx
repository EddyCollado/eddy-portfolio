import { useEffect, useState } from 'react';
import { useAchievements } from '../context/AchievementContext';
import { useSwipeDetection } from '../hooks/useSwipeDetection';

const KonamiCode = () => {
  const [sequence, setSequence] = useState([]);
  const [swipeSequence, setSwipeSequence] = useState([]);
  const [tapCount, setTapCount] = useState(0);
  const { unlockAchievement, isUnlocked } = useAchievements();
  
  const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  const SWIPE_CODE = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right']; // Mobile: swipes + 2 taps

  // Swipe detection for mobile
  useSwipeDetection((direction) => {
    if (isUnlocked('konami')) return;
    
    setSwipeSequence(prev => {
      const newSeq = [...prev, direction].slice(-8);
      
      // Check if swipe sequence matches, then wait for 2 taps
      if (newSeq.join(',') === SWIPE_CODE.join(',')) {
        // Swipe sequence complete, now need 2 taps
        const handleTap = () => {
          setTapCount(prev => {
            const newCount = prev + 1;
            if (newCount === 2) {
              unlockAchievement('konami');
              document.removeEventListener('touchend', handleTap);
            }
            return newCount;
          });
        };
        document.addEventListener('touchend', handleTap);
        setTimeout(() => {
          document.removeEventListener('touchend', handleTap);
          setTapCount(0);
        }, 3000);
      }
      
      return newSeq;
    });
  });

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
