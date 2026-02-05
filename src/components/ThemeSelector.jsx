import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSelector = () => {
  const context = useTheme();
  
  // Safety check
  if (!context || !context.theme) {
    console.error('ThemeSelector: No theme context available');
    return null;
  }
  
  const { theme, currentTheme, setCurrentTheme, themes } = context;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-4 z-50">
      {/* Theme Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg backdrop-blur-sm border-2 transition-colors"
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.primary,
          color: theme.colors.text,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {theme.icon}
      </motion.button>

      {/* Theme Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-4 p-3 rounded-xl backdrop-blur-lg border-2 space-y-2 z-[60]"
            style={{
              backgroundColor: theme.colors.surface + 'dd',
              borderColor: theme.colors.primary + '40',
            }}
          >
            {Object.values(themes)
              .filter((t) => {
                // Hide retro theme on mobile
                if (t.id === 'retro' && window.innerWidth < 768) {
                  return false;
                }
                return true;
              })
              .map((t) => (
              <motion.button
                key={t.id}
                onClick={() => {
                  setCurrentTheme(t.id);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 rounded-lg flex items-center gap-3 transition-all"
                style={{
                  backgroundColor: currentTheme === t.id ? theme.colors.primary + '20' : 'transparent',
                  borderWidth: currentTheme === t.id ? '2px' : '0px',
                  borderColor: theme.colors.primary,
                  color: theme.colors.text,
                }}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl">{t.icon}</span>
                <span className="text-sm font-medium whitespace-nowrap">{t.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;
