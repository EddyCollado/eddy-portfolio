import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

/**
 * GlowCard - A card component with cursor-following glow effect
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.glowColor - RGB color for glow (default: "44, 152, 240")
 * @param {number} props.glowSize - Size of glow in pixels (default: 300)
 * @param {number} props.glowOpacity - Opacity of glow (default: 0.4)
 */
const GlowCard = ({ 
  children, 
  className = '', 
  glowColor = '44, 152, 240',
  glowSize = 300,
  glowOpacity = 0.4,
  ...props 
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position relative to card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation
  const mouseXSpring = useSpring(mouseX, { damping: 20, stiffness: 200 });
  const mouseYSpring = useSpring(mouseY, { damping: 20, stiffness: 200 });
  
  // Create the glow gradient
  const background = useTransform(
    [mouseXSpring, mouseYSpring],
    ([x, y]) => 
      `radial-gradient(${glowSize}px circle at ${x}px ${y}px, rgba(${glowColor}, ${glowOpacity}), transparent 80%)`
  );
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${className}`}
      style={{ isolation: 'isolate' }}
      {...props}
    >
      {/* Glow effect - only visible on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-xl"
        style={{
          background,
          opacity: isHovered ? 1 : 0,
          mixBlendMode: 'screen',
        }}
      />
      
      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlowCard;
