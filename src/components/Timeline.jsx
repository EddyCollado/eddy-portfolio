import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import GlowCard from './GlowCard';

const TimelineItem = ({ title, company, period, description, icon, color, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative flex items-center mb-12 md:mb-16"
    >
      {/* Desktop Layout */}
      <div className="hidden md:flex w-full items-center">
        {isEven ? (
          <>
            {/* Content Left */}
            <div className="w-5/12 pr-8">
              <GlowCard
                className="rounded-xl overflow-hidden"
                glowColor="44, 152, 240"
                glowSize={300}
                glowOpacity={0.35}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="text-right"
                >
                  <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-xl p-6 hover:border-primary/40 transition-colors">
                    <h3 className="text-xl font-bold mb-1">{title}</h3>
                    <h4 className="text-primary font-semibold mb-2">{company}</h4>
                    <p className="text-sm text-gray-400 mb-3">{period}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
                  </div>
                </motion.div>
              </GlowCard>
            </div>
            
            {/* Center Icon */}
            <div className="w-2/12 flex justify-center relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                  boxShadow: `0 0 20px ${color}40`
                }}
              >
                {icon}
              </motion.div>
            </div>
            
            {/* Empty Right */}
            <div className="w-5/12" />
          </>
        ) : (
          <>
            {/* Empty Left */}
            <div className="w-5/12" />
            
            {/* Center Icon */}
            <div className="w-2/12 flex justify-center relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                  boxShadow: `0 0 20px ${color}40`
                }}
              >
                {icon}
              </motion.div>
            </div>
            
            {/* Content Right */}
            <div className="w-5/12 pl-8">
              <GlowCard
                className="rounded-xl overflow-hidden"
                glowColor="139, 92, 246"
                glowSize={300}
                glowOpacity={0.35}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-xl p-6 hover:border-primary/40 transition-colors">
                    <h3 className="text-xl font-bold mb-1">{title}</h3>
                    <h4 className="text-primary font-semibold mb-2">{company}</h4>
                    <p className="text-sm text-gray-400 mb-3">{period}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
                  </div>
                </motion.div>
              </GlowCard>
            </div>
          </>
        )}
      </div>
      
      {/* Mobile Layout */}
      <div className="md:hidden flex w-full">
        {/* Icon */}
        <div className="flex flex-col items-center mr-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
            className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg flex-shrink-0"
            style={{ 
              background: `linear-gradient(135deg, ${color}, ${color}dd)`,
              boxShadow: `0 0 20px ${color}40`
            }}
          >
            {icon}
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="flex-1 pb-8">
          <GlowCard
            className="rounded-xl overflow-hidden"
            glowColor="44, 152, 240"
            glowSize={250}
            glowOpacity={0.35}
          >
            <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-xl p-4">
              <h3 className="text-lg font-bold mb-1">{title}</h3>
              <h4 className="text-primary font-semibold mb-2 text-sm">{company}</h4>
              <p className="text-xs text-gray-400 mb-3">{period}</p>
              <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
            </div>
          </GlowCard>
        </div>
      </div>
    </motion.div>
  );
};

const Timeline = () => {
  const experiences = [
    {
      title: 'Software Engineer II',
      company: 'EchoStar',
      period: 'July 2025 - Present',
      description: 'Leading front-end development for BoostMobile.com with focus on performance, accessibility, and A/B testing using Adobe Target. Building scalable component-driven architecture.',
      icon: '🚀',
      color: '#2c98f0',
    },
    {
      title: 'Senior UI/UX Front End Developer',
      company: 'EchoStar',
      period: 'January 2024 - June 2025',
      description: 'Delivered innovative solutions across Boost Mobile, OnTech Smart Services, and Gen Mobile. Pioneered A/B testing strategies and introduced advanced JavaScript animations to proprietary CMS.',
      icon: '💎',
      color: '#8b5cf6',
    },
    {
      title: 'Junior UI/UX Front End Developer',
      company: 'OneTen Creative Agency',
      period: 'April 2021 - December 2023',
      description: 'Led front-end development for OnTechSmartServices.com using Shopify and Shogun. Implemented GSAP animations contributing to first $1M sales week. Built agency website with WordPress.',
      icon: '⚡',
      color: '#f59e0b',
    },
    {
      title: 'Full Stack Web Development Certification',
      company: 'Denver University',
      period: '2020',
      description: 'Intensive bootcamp covering JavaScript, React, Node.js, MongoDB, MySQL, and modern web development practices. Built full-stack applications using MERN stack.',
      icon: '🎓',
      color: '#10b981',
    },
    {
      title: 'Print Producer',
      company: 'Adams McClure',
      period: 'September 2018 - April 2020',
      description: 'Operated Zund Cutter for precision cutting, managed pre-press mounting and shipping operations. Developed attention to detail and production workflow skills.',
      icon: '🖨️',
      color: '#6366f1',
    },
  ];
  
  return (
    <section id="timeline" className="min-h-screen py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-4">
            My <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From graphic design to full-stack development, here's my professional story
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full mt-6" />
        </motion.div>
        
        {/* Timeline Line - Desktop */}
        <div className="hidden md:block absolute left-1/2 top-32 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-transparent transform -translate-x-1/2" />
        
        {/* Timeline Line - Mobile */}
        <div className="md:hidden absolute left-6 top-32 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-transparent" />
        
        {/* Timeline Items */}
        <div className="relative">
          {experiences.map((exp, index) => (
            <TimelineItem key={index} {...exp} index={index} />
          ))}
        </div>
        
        {/* End Marker */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-8"
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-purple-500 shadow-lg" 
               style={{ boxShadow: '0 0 20px rgba(44, 152, 240, 0.5)' }}
          />
        </motion.div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6">
            Want to know more about my experience?
          </p>
          <motion.a
            href="/images/EddyCollado_08.22.25_Ref.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-purple-500 text-white rounded-lg font-semibold"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(44, 152, 240, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
