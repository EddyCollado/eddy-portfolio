import { motion } from 'framer-motion';

export const CompletionModalContent = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <p className="text-xl text-gray-300 leading-relaxed">
          Wow! You found all the achievements! 🎮 Let me share the story behind this portfolio...
        </p>
      </motion.div>

      {/* Story Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-primary/5 border border-primary/20 rounded-xl p-6"
      >
        <h3 className="text-2xl font-bold text-white mb-4">🎮 The Gaming Developer</h3>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>
            Gaming has been a huge part of my life since I was a kid. From staying up late playing 
            Chrono Trigger on my SNES to exploring Hallownest in Hollow Knight, video games taught 
            me about storytelling, design, and the importance of user experience.
          </p>
          <p>
            When I became a developer, I realized that building websites is a lot like game design - 
            you're crafting an experience, guiding users through a journey, and rewarding them for 
            exploration. That's why I added these achievements to my portfolio!
          </p>
          <p>
            Each easter egg represents a game that shaped who I am. The Konami Code from Metal Gear Solid, 
            the "Praise the Sun" gesture from Dark Souls, Hornet's battle cry from Hollow Knight - 
            these aren't just references, they're pieces of my story.
          </p>
        </div>
      </motion.div>

      {/* Favorite Games Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-white mb-4">🕹️ Games That Shaped Me</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Chrono Trigger', emoji: '⏰', year: '1995', image: 'chrono-trigger' },
            { name: 'Hollow Knight', emoji: '⚔️', year: '2017', image: 'hollow-knight' },
            { name: 'Dark Souls', emoji: '🔥', year: '2011', image: 'dark-souls' },
            { name: 'Metal Gear Solid', emoji: '📦', year: '1998', image: 'metal-gear-solid' },
            { name: 'Final Fantasy X', emoji: '🌊', year: '2001', image: 'final-fantasy-x' },
            { name: 'Stardew Valley', emoji: '🌾', year: '2016', image: 'stardew-valley' },
            { name: 'The Last of Us', emoji: '🍄', year: '2013', image: 'the-last-of-us' },
            { name: 'Elden Ring', emoji: '🗡️', year: '2022', image: 'elden-ring' },
          ].map((game, index) => {
            const tryImage = (baseName) => {
              const img = new Image();
              img.src = `/images/games/${baseName}.png`;
              img.onerror = () => {
                img.src = `/images/games/${baseName}.jpg`;
              };
              return img.src;
            };
            
            return (
            <motion.div
              key={game.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden hover:border-primary/50 transition-colors group"
            >
              <div className="aspect-[3/4] relative bg-gray-900 flex items-center justify-center">
                <img 
                  src={`/images/games/${game.image}.png`}
                  alt={game.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const jpgSrc = `/images/games/${game.image}.jpg`;
                    if (e.target.src.endsWith('.png')) {
                      e.target.src = jpgSrc;
                    } else {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />
                <div className="absolute inset-0 hidden items-center justify-center text-6xl">
                  {game.emoji}
                </div>
              </div>
              <div className="p-3 text-center">
                <div className="text-sm font-semibold text-white">{game.name}</div>
                <div className="text-xs text-gray-500">{game.year}</div>
              </div>
            </motion.div>
          );
          })}
        </div>
      </motion.div>

      {/* Why This Matters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/30 rounded-xl p-6"
      >
        <h3 className="text-2xl font-bold text-white mb-4">💡 Why This Matters</h3>
        <p className="text-gray-300 leading-relaxed">
          As a developer, I believe in creating experiences that surprise and delight users. 
          These hidden achievements aren't just for fun - they demonstrate attention to detail, 
          creative problem-solving, and a passion for crafting memorable interactions. 
          If you found all of these, you're exactly the kind of person I'd love to work with! 🚀
        </p>
      </motion.div>

      {/* Thank You */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="text-center pt-4"
      >
        <p className="text-2xl font-bold text-gradient mb-2">
          Thanks for exploring! 🎉
        </p>
        <p className="text-gray-400">
          You're a true achievement hunter. Let's build something amazing together.
        </p>
      </motion.div>
    </div>
  );
};
