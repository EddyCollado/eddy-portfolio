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

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark transition-colors duration-300">
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
    </div>
  );
}

export default App;
