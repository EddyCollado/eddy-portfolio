import { useEffect, useState } from 'react';
import { useAchievements } from '../context/AchievementContext';
import { motion, AnimatePresence } from 'framer-motion';

const HollowKnight = () => {
  const [sequence, setSequence] = useState('');
  const [showMobileButton, setShowMobileButton] = useState(false);
  const { unlockAchievement, isUnlocked } = useAchievements();

  // Detect if mobile
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setShowMobileButton(isMobile);
  }, []);

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

  return (
    <>
      {/* Mobile SHAW Button */}
      <AnimatePresence>
        {showMobileButton && !isUnlocked('hollowKnight') && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => unlockAchievement('hollowKnight')}
            className="fixed bottom-72 right-4 z-50 w-12 h-12 bg-gray-800 dark:bg-gray-700 border-2 border-gray-600 rounded-full flex items-center justify-center text-white shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="SHAW!"
          >
            ⚔️
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default HollowKnight;
