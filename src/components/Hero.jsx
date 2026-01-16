import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Hi! I'm Eddy";
  
  // Mouse position tracking
  // useMotionValue creates a reactive value that updates without re-rendering
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // useSpring adds smooth physics-based animation to the values
  // This makes the cursor follow feel natural, not instant
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);
  
  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Get mouse position relative to viewport
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  // Create animated background style
  const background = useTransform(
    [mouseXSpring, mouseYSpring],
    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(44, 152, 240, 0.3), transparent 80%)`
  );
  
  // Typing effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background with mouse interaction */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-dark via-gray-900 to-primary/20"
        style={{
          backgroundSize: '400% 400%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      
      {/* Interactive cursor glow - follows mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background,
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          className="text-6xl md:text-8xl font-display font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gradient">{text}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            |
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Senior UI/UX Front End Developer crafting beautiful, accessible web experiences
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.a
            href="#projects"
            className="px-8 py-3 bg-primary text-white rounded-lg font-semibold"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(44, 152, 240, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
          
          <motion.a
            href="#contact"
            className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(44, 152, 240, 0.1)' }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-primary rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
