import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'

// Easter egg hint
console.log('%c🤖 Year 2300 A.D. - The Factory holds secrets...', 'color: #2c98f0; font-size: 14px; font-weight: bold;');
console.log('%cFour keys unlock the path: X marks the spot', 'color: #8b5cf6; font-size: 12px;');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
