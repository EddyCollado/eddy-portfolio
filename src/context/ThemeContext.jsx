import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const themes = {
  light: {
    id: 'light',
    name: 'Light',
    icon: '☀️',
    colors: {
      primary: '#2c98f0',
      secondary: '#a855f7',
      background: '#ffffff',
      surface: '#f5f5f5',
      text: '#000000',
      textSecondary: '#6b7280',
    },
    font: 'font-sans',
    effects: 'modern',
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    icon: '🌙',
    colors: {
      primary: '#2c98f0',
      secondary: '#a855f7',
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#9ca3af',
    },
    font: 'font-sans',
    effects: 'modern',
  },
  retro: {
    id: 'retro',
    name: 'Retro',
    icon: '🕹️',
    colors: {
      primary: '#00ff00',
      secondary: '#ff00ff',
      background: '#000000',
      surface: '#1a1a1a',
      text: '#00ff00',
      textSecondary: '#00aa00',
    },
    font: 'font-mono',
    effects: 'pixelated',
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    icon: '⚡',
    colors: {
      primary: '#ff00ff',
      secondary: '#00ffff',
      background: '#0a0014',
      surface: '#1a0028',
      text: '#ffffff',
      textSecondary: '#ff00ff',
    },
    font: 'font-sans',
    effects: 'glitch',
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('portfolioTheme');
    return saved || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('portfolioTheme', currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Apply theme colors as CSS variables
    const theme = themes[currentTheme];
    if (theme) {
      const root = document.documentElement;
      root.style.setProperty('--theme-bg', theme.colors.background);
      root.style.setProperty('--theme-surface', theme.colors.surface);
      root.style.setProperty('--theme-text', theme.colors.text);
      root.style.setProperty('--theme-primary', theme.colors.primary);
      root.style.setProperty('--theme-secondary', theme.colors.secondary);
      
      // Apply dark class for dark themes
      if (currentTheme === 'dark' || currentTheme === 'retro' || currentTheme === 'cyberpunk') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [currentTheme]);

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, setCurrentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};
