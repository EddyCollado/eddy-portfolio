import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import GlowCard from './GlowCard';

const SkillBar = ({ name, level, color, delay, icon }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = level;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, level]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <span className="text-xl">{icon}</span>}
          <span className="font-medium text-gray-900 dark:text-gray-200">{name}</span>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.5 }}
          className="text-sm font-bold text-primary"
        >
          {count}%
        </motion.span>
      </div>
      
      <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
        {/* Background glow */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
          className="absolute inset-0 blur-sm"
          style={{ backgroundColor: color, opacity: 0.3 }}
        />
        
        {/* Progress bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
          className="relative h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          }}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const SkillCategory = ({ title, skills, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="space-y-6"
    >
      <h3 className="text-xl font-bold text-gradient mb-6">{title}</h3>
      <div className="space-y-5">
        {skills.map((skill, index) => (
          <SkillBar
            key={skill.name}
            {...skill}
            delay={delay + (index * 0.1)}
          />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const frontendSkills = [
    { name: 'React', level: 95, color: '#61DAFB', icon: '⚛️' },
    { name: 'JavaScript/TypeScript', level: 90, color: '#F7DF1E', icon: '📜' },
    { name: 'HTML5 & CSS3', level: 95, color: '#E34F26', icon: '🎨' },
    { name: 'Tailwind CSS', level: 90, color: '#06B6D4', icon: '💨' },
    { name: 'SASS/SCSS', level: 85, color: '#CC6699', icon: '💅' },
  ];
  
  const animationSkills = [
    { name: 'Framer Motion', level: 85, color: '#FF0055', icon: '🎬' },
    { name: 'GSAP', level: 80, color: '#88CE02', icon: '✨' },
    { name: 'CSS Animations', level: 90, color: '#2C98F0', icon: '🌊' },
  ];
  
  const toolsSkills = [
    { name: 'Figma', level: 90, color: '#F24E1E', icon: '🎯' },
    { name: 'Git & GitHub', level: 85, color: '#F05032', icon: '🔧' },
    { name: 'Adobe Target', level: 75, color: '#FF0000', icon: '🎪' },
    { name: 'Agile/Scrum', level: 85, color: '#2C98F0', icon: '🚀' },
  ];
  
  return (
    <section id="skills" className="min-h-screen py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Gradient mesh backgrounds */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-tl from-primary/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s' }} />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-4">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full mt-6" />
        </motion.div>
        
        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Frontend Development */}
          <div className="space-y-8">
            <SkillCategory
              title="Frontend Development"
              skills={frontendSkills}
              delay={0.2}
            />
          </div>
          
          {/* Animation & Tools */}
          <div className="space-y-12">
            <SkillCategory
              title="Animation & Motion"
              skills={animationSkills}
              delay={0.4}
            />
            
            <SkillCategory
              title="Tools & Workflow"
              skills={toolsSkills}
              delay={0.6}
            />
          </div>
        </div>
        
        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlowCard
              className="h-full rounded-xl overflow-hidden"
              glowColor="44, 152, 240"
              glowSize={250}
              glowOpacity={0.3}
              whileHover={{ y: -5 }}
            >
              <div className="p-6 bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-xl h-full">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="text-lg font-bold mb-2 text-black dark:text-white">Accessibility First</h4>
                <p className="text-black dark:text-gray-400 text-sm">
                  Building inclusive experiences that work for everyone, following WCAG guidelines
                </p>
              </div>
            </GlowCard>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <GlowCard
              className="h-full rounded-xl overflow-hidden"
              glowColor="139, 92, 246"
              glowSize={250}
              glowOpacity={0.3}
              whileHover={{ y: -5 }}
            >
              <div className="p-6 bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-xl h-full">
                <div className="text-3xl mb-3">📱</div>
                <h4 className="text-lg font-bold mb-2 text-black dark:text-white">Responsive Design</h4>
                <p className="text-black dark:text-gray-400 text-sm">
                  Pixel-perfect designs that adapt seamlessly across all devices and screen sizes
                </p>
              </div>
            </GlowCard>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <GlowCard
              className="h-full rounded-xl overflow-hidden"
              glowColor="44, 152, 240"
              glowSize={250}
              glowOpacity={0.3}
              whileHover={{ y: -5 }}
            >
              <div className="p-6 bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-xl h-full">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="text-lg font-bold mb-2 text-black dark:text-white">Performance</h4>
                <p className="text-black dark:text-gray-400 text-sm">
                  Optimized code and assets for lightning-fast load times and smooth interactions
                </p>
              </div>
            </GlowCard>
          </motion.div>
        </div>
        
        {/* Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 p-8 bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/10 rounded-2xl text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            Always <span className="text-gradient">Learning</span>
          </h3>
          <p className="text-black dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Currently exploring Three.js for 3D web experiences and diving deeper into Python 
            for backend development. The tech world never stops evolving, and neither do I.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Three.js', 'Python', 'WebGL', 'Node.js'].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.8 + (index * 0.1) }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="px-4 py-2 bg-dark dark:bg-dark bg-white border border-primary/30 rounded-full text-sm text-gray-900 dark:text-white"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
