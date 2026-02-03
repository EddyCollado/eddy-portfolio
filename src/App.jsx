import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ThemeToggle from './components/ThemeToggle';
import ScrollProgress from './components/ScrollProgress';
import ChronoTriggerEasterEgg from './components/ChronoTriggerEasterEgg';
import LoadingScreen from './components/LoadingScreen';
import AchievementBoard from './components/AchievementBoard';
import KonamiCode from './components/KonamiCode';
import Speedrunner from './components/Speedrunner';
import Explorer from './components/Explorer';
import HollowKnight from './components/HollowKnight';
import PraiseTheSun from './components/PraiseTheSun';
import HarvestMoon from './components/HarvestMoon';
import CakeIsALie from './components/CakeIsALie';
import ContactFormCheat from './components/ContactFormCheat';
import CompletionReward from './components/CompletionReward';
import { AchievementProvider } from './context/AchievementContext';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { initGA } from './utils/analytics';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsLoading(false);
    }
    initGA();
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisited', 'true');
    setIsLoading(false);
  };

  return (
    <AchievementProvider>
      <AnimatePresence>
        {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>
      
      <ChronoTriggerEasterEgg>
      <div className="min-h-screen bg-white dark:bg-dark transition-colors duration-300">
        <ScrollProgress />
        <Navigation />
        <div className="bg-dark">
          <Hero />
        </div>
        <About />
        <Skills />
        <Timeline />
        <Projects />
        <Contact />
        <div className="bg-gradient-to-b from-dark to-black">
          <Footer />
        </div>
        <BackToTop />
        <ThemeToggle />
        <AchievementBoard />
        <KonamiCode />
        <Speedrunner />
        <Explorer />
        <HollowKnight />
        <PraiseTheSun />
        <HarvestMoon />
        <CakeIsALie />
        <ContactFormCheat />
        <CompletionReward />
      </div>
    </ChronoTriggerEasterEgg>
    </AchievementProvider>
  );
}

export default App;
