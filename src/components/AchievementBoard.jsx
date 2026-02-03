import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAchievements } from '../context/AchievementContext';
import { CompletionModalContent } from './CompletionModalContent';

const AchievementBoard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [isHidden, setIsHidden] = useState(() => {
    return sessionStorage.getItem('achievementsHidden') === 'true';
  });
  const { achievements, isUnlocked, progress, showNotification } = useAchievements();

  const isComplete = progress.unlocked === progress.total;

  const hideAchievements = () => {
    sessionStorage.setItem('achievementsHidden', 'true');
    setIsHidden(true);
    setIsExpanded(false);
  };

  if (isHidden) return null;

  return (
    <>
      {/* Achievement Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="fixed top-20 right-4 z-[100] bg-dark/95 backdrop-blur-lg border border-primary/30 rounded-lg p-4 w-80 shadow-2xl"
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl">{showNotification.icon}</div>
              <div className="flex-1">
                <div className="text-xs text-primary font-semibold mb-1">ACHIEVEMENT UNLOCKED</div>
                <div className="text-white font-bold">{showNotification.name}</div>
                <div className="text-gray-400 text-sm">{showNotification.description}</div>
                <div className="text-xs text-gray-500 mt-1">{showNotification.game}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed top-4 right-20 z-50 bg-white dark:bg-dark/95 backdrop-blur-lg border border-gray-300 dark:border-primary/30 rounded-lg px-3 py-2 shadow-lg hover:border-primary dark:hover:border-primary/50 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">🏆</span>
          <span className="text-gray-900 dark:text-white font-semibold text-sm">{progress.unlocked}/{progress.total}</span>
        </div>
      </motion.button>

      {/* Achievement Panel */}
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-96 bg-gray-50 dark:bg-dark backdrop-blur-lg border-l border-gray-300 dark:border-primary/20 z-[70] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{progress.unlocked} of {progress.total} unlocked</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={hideAchievements}
                      className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors text-sm"
                      title="Hide achievements for this session"
                    >
                      Hide
                    </button>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* 100% Completion Button */}
                {isComplete && (
                  <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={() => {
                      setShowCompletionModal(true);
                      setIsExpanded(false);
                    }}
                    className="w-full mb-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-xl hover:border-yellow-500 transition-all group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="text-3xl"
                      >
                        🏆
                      </motion.span>
                      <div className="text-left">
                        <div className="text-yellow-600 dark:text-yellow-400 font-bold text-lg">100% COMPLETE!</div>
                        <div className="text-yellow-700 dark:text-yellow-300/70 text-sm">Click to view your reward</div>
                      </div>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-yellow-600 dark:text-yellow-400 text-xl ml-auto"
                      >
                        →
                      </motion.span>
                    </div>
                  </motion.button>
                )}

                <div className="space-y-3">
                  {Object.values(achievements).map((achievement) => {
                    const unlocked = isUnlocked(achievement.id);
                    const isHovered = hoveredId === achievement.id;
                    return (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onMouseEnter={() => setHoveredId(achievement.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className={`p-4 rounded-lg border transition-all ${
                          unlocked
                            ? 'bg-primary/10 border-primary/30'
                            : 'bg-gray-200 dark:bg-gray-900/50 border-gray-400 dark:border-gray-800 cursor-help'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={unlocked ? 'text-3xl' : 'text-3xl grayscale opacity-30'}>
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-gray-900 dark:text-white">{achievement.name}</div>
                            <div className="text-sm text-gray-700 dark:text-gray-400 mt-1">
                              {unlocked ? achievement.description : (isHovered ? achievement.detailedHint : achievement.hint)}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">{achievement.game}</div>
                          </div>
                          {unlocked && (
                            <div className="text-primary">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletionModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCompletionModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
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
                    onClick={() => setShowCompletionModal(false)}
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
    </>
  );
};

export default AchievementBoard;
