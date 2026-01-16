import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const StatCard = ({ number, label, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="text-4xl md:text-5xl font-bold text-gradient mb-2"
      >
        {number}
      </motion.div>
      <div className="text-gray-400 text-sm uppercase tracking-wider">{label}</div>
    </motion.div>
  );
};

const SkillBadge = ({ skill, delay, logo }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.1, rotate: 2 }}
      className="px-4 py-2 bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/30 rounded-full text-sm font-medium hover:border-primary/60 transition-colors flex items-center gap-2"
    >
      {logo && <span className="text-lg">{logo}</span>}
      {skill}
    </motion.div>
  );
};

const About = () => {
  const skills = [
    { name: 'React', logo: '⚛️' },
    { name: 'JavaScript', logo: '📜' },
    { name: 'TypeScript', logo: '💙' },
    { name: 'CSS/SASS', logo: '🎨' },
    { name: 'Tailwind CSS', logo: '💨' },
    { name: 'Framer Motion', logo: '🎬' },
    { name: 'GSAP', logo: '✨' },
    { name: 'HTML5', logo: '🌐' },
    { name: 'Figma', logo: '🎯' },
    { name: 'Adobe Target', logo: '🎪' },
    { name: 'Git', logo: '🔧' },
    { name: 'Agile/Scrum', logo: '🚀' },
    { name: 'A/B Testing', logo: '📊' },
    { name: 'Accessibility', logo: '♿' },
    { name: 'Responsive Design', logo: '📱' },
  ];
  
  return (
    <section id="about" className="min-h-screen py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
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
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
        </motion.div>
        
        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-primary">Who Am I?</h3>
              <p className="text-gray-300 leading-relaxed">
                I'm Eddy Collado, a creative and enthusiastic <span className="text-white font-semibold">Senior UI/UX Front End Web Developer</span> currently 
                at DISH/Echostar in Denver, Colorado, where I bridge design and development to build dynamic, 
                responsive solutions in React, CSS, JavaScript, and Greensock (GSAP).
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-gray-300 leading-relaxed">
                Drawing on my graphic design background, I focus on <span className="text-white font-semibold">accessibility and user engagement</span> across 
                platforms like Boost Mobile, OnTech Smart Services, and Gen Mobile, collaborating with cross-functional 
                teams in Agile Scrum environments to deliver high-impact results.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-gray-300 leading-relaxed">
                I'm always pushing boundaries, whether it's experimenting with new A/B testing strategies, 
                mastering Figma for UI design, or exploring the latest in web animation. Off the clock, you'll 
                find me exploring handheld gaming PCs, tinkering with Linux and Android, or hiking with my dog, 
                Atlas—all while staying plugged into the latest tech and video game news.
              </p>
            </motion.div>
          </div>
          
          {/* Right Column - Image & Stats */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-primary/20 relative group">
                <img 
                  src="/images/me_2023.jpg" 
                  alt="Eddy Collado"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60" />
              </div>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary/30 rounded-2xl -z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-purple-500/30 rounded-2xl -z-10"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-xl border border-primary/10">
              <StatCard number="5+" label="Years Experience" delay={0.2} />
              <StatCard number="50+" label="Projects" delay={0.4} />
              <StatCard number="3" label="Major Brands" delay={0.6} />
            </div>
          </div>
        </div>
        
        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">
            Tech Stack & <span className="text-gradient">Skills</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <SkillBadge key={skill.name} skill={skill.name} logo={skill.logo} delay={index * 0.05} />
            ))}
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/images/EddyCollado_08.22.25_Ref.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(44, 152, 240, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            Download Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
