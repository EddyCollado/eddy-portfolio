import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { useAchievements } from '../context/AchievementContext';

// Create context for easter egg state
export const EasterEggContext = createContext();

export const useEasterEgg = () => useContext(EasterEggContext);

const ChronoTriggerEasterEgg = ({ children }) => {
  const [sequence, setSequence] = useState([]);
  const [unlocked, setUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { unlockAchievement } = useAchievements();

  const SECRET_CODE = ['x', 'a', 'b', 'y'];

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase();
      
      if (['x', 'a', 'b', 'y'].includes(key) && !unlocked) {
        setSequence(prev => {
          const newSeq = [...prev, key].slice(-4);
          
          if (newSeq.join('') === SECRET_CODE.join('')) {
            setUnlocked(true);
            unlockAchievement('factoryPuzzle');
            
            // Play music only once using ref
            if (!audioRef.current) {
              audioRef.current = new Audio('/audio/Chrono_Trigger-Corridors_of_Time.mp3');
              audioRef.current.loop = true;
              audioRef.current.volume = 0.3;
              audioRef.current.play();
              setIsPlaying(true);
            }
          }
          
          return newSeq;
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [unlocked]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <EasterEggContext.Provider value={{ unlocked }}>
      {children}

      {/* Music Control */}
      {unlocked && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={toggleMusic}
          className="fixed bottom-40 right-8 z-50 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </motion.button>
      )}
    </EasterEggContext.Provider>
  );
};

export default ChronoTriggerEasterEgg;
