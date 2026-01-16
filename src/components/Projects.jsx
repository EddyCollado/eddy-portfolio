import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import GlowCard from './GlowCard';

const ProjectCard = ({ title, description, image, link, tags, livePreview }) => {
  const ref = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['17.5deg', '-17.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-17.5deg', '17.5deg']);
  
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovering(false);
  };
  
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  return (
    <motion.div
      className="rounded-xl overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-96 w-full rounded-xl overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
      <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {/* Live Preview or Background Image */}
        {livePreview && showPreview ? (
          <div className="absolute inset-0">
            <iframe
              src={livePreview}
              className="w-full h-full pointer-events-none"
              title={title}
              style={{
                transform: 'scale(0.8) translateZ(20px)',
                transformOrigin: 'top left',
                transformStyle: 'preserve-3d',
              }}
            />
          </div>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${image})`,
              transform: 'translateZ(20px)',
              transformStyle: 'preserve-3d',
            }}
          />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Content */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6"
          style={{
            transform: 'translateZ(50px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
          <p className="text-gray-300 text-sm mb-4">{description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/20 border border-primary/50 rounded-full text-xs text-white"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Preview Toggle Button */}
          {livePreview && (
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                setShowPreview(!showPreview);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-primary/80 hover:bg-primary rounded-lg text-xs font-semibold text-white"
            >
              {showPreview ? '📸 Show Image' : '🌐 Live Preview'}
            </motion.button>
          )}
        </div>
        
        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          style={{
            transform: 'translateZ(75px)',
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5,
          }}
        />
      </a>
    </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: 'GenMobile.com',
      description: 'Low income phone service with international calling and ACP programs. Lead developer rebuilding from ground up.',
      image: '/images/Genmocasestudy.gif',
      link: 'https://www.genmobile.com',
      livePreview: 'https://www.genmobile.com', // Live website preview
      tags: ['React', 'CSS', 'JavaScript', 'Lead Dev'],
    },
    {
      title: 'OnTech Smart Services',
      description: 'Hassle-free installation and product mastery for smart home devices. Lead front-end developer.',
      image: '/images/ontechsmarthomeservices.gif',
      link: 'https://ontechsmartservices.com/',
      livePreview: 'https://ontechsmartservices.com/', // Live website preview
      tags: ['Shopify', 'Shogun', 'GSAP', 'HTML/CSS'],
    },
    {
      title: 'IHS Tech Tablet',
      description: 'Professional tech tablet for in-home smart home consultations and installations.',
      image: '/images/techtablet.gif',
      link: 'https://www.figma.com/proto/seDKDfmy4nnFyN6hyw3hqv/Tech-Tablet-2.0',
      livePreview: null, // No live preview for Figma prototypes
      tags: ['Figma', 'UI/UX', 'Design'],
    },
  ];
  
  return (
    <section id="projects" className="min-h-screen py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Hover over the cards to see them come to life with 3D effects
          </p>
        </motion.div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
        
        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/EddyCollado"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(44, 152, 240, 0.1)' }}
            whileTap={{ scale: 0.95 }}
          >
            View More on GitHub →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
