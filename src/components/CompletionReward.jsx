import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAchievements } from '../context/AchievementContext';
import { CompletionModalContent } from './CompletionModalContent';

const CompletionReward = () => {
  const { progress } = useAchievements();
  const [showReward, setShowReward] = useState(false);
  const [hasShown, setHasShown] = useState(() => {
    return localStorage.getItem('completionRewardShown') === 'true';
  });

  useEffect(() => {
    if (progress.unlocked === progress.total && !hasShown) {
      setTimeout(() => setShowReward(true), 1000);
      localStorage.setItem('completionRewardShown', 'true');
      setHasShown(true);
    }
  }, [progress, hasShown]);

  const handleClose = () => {
    setShowReward(false);
  };

  return (
    <AnimatePresence>
      {showReward && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-gray-900 via-dark to-gray-900 border-2 border-primary rounded-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-b from-dark to-transparent p-4 md:p-6 border-b border-primary/20 backdrop-blur-sm z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-5xl"
                  >
                    🏆
                  </motion.div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gradient">100% COMPLETION!</h2>
                    <p className="text-gray-400 text-xs md:text-sm">Achievement Hunter Unlocked</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6">
              <CompletionModalContent />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CompletionReward;
