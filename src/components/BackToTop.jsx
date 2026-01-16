import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 500);
  });
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg"
      whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(44, 152, 240, 0.5)' }}
      whileTap={{ scale: 0.9 }}
      title="Back to top"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </motion.button>
  );
};

export default BackToTop;
