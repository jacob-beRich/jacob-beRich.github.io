import React from 'react';
import { Content } from '../types';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PrecisionLink } from './ui/PrecisionLink';

interface HeroProps {
  content: Content;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  const { scrollY } = useScroll();
  const beamHeight = useTransform(scrollY, [0, 300], ["0%", "100%"]);
  const arcOpacity = useTransform(scrollY, [0, 200], [1, 0.5]);

  // Split title logic
  const titleParts = content.hero.h1.split('&');
  const line1 = titleParts[0]?.trim() || "";
  const line2 = titleParts[1]?.trim() || "";

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }
    },
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent perspective-1000">
      
      {/* Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center flex flex-col items-center gap-6 mt-[-5vh] px-4 w-full max-w-7xl"
      >
        
        {/* Main Title Block */}
        <div className="flex flex-col gap-2 md:gap-4 items-center w-full">
          {/* Line 1: Amber Gradient - Commercialization */}
          <motion.h1 
            variants={itemVariants}
            className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-600 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              {line1}
            </span>
          </motion.h1>

          {/* Line 2: Cyan Gradient - Future */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-500 to-cyan-600 drop-shadow-[0_0_25px_rgba(45,212,191,0.3)]">
               {/* Decorative & if needed, or just the text */}
               {line2}
            </span>
          </motion.h1>
        </div>

        {/* Subtitle Block */}
        <motion.div 
          variants={itemVariants}
          className="max-w-2xl mt-8"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-cyan-500/20 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative text-sm md:text-lg font-mono text-slate-300 tracking-widest bg-abyss/40 backdrop-blur-md py-3 px-8 rounded-full border border-white/10 group-hover:border-white/20 transition-colors">
              <PrecisionLink text={content.hero.sub} hoverClass="text-cyan-400" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* The Event Horizon Arc */}
      <div className="absolute bottom-0 left-0 right-0 h-[200px] overflow-hidden flex justify-center items-end pointer-events-none">
        <motion.div 
          style={{ opacity: arcOpacity }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.2 }}
          className="w-[120vw] h-[1000px] rounded-[50%] border-t border-cyan-500/30 shadow-[0_-20px_100px_rgba(45,212,191,0.2)] bg-gradient-to-b from-cyan-500/5 to-transparent translate-y-[800px]"
        />
      </div>
      
      {/* Scroll Trigger Beam */}
      <motion.div 
        style={{ height: beamHeight }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-cyan-500 origin-top shadow-[0_0_15px_#2DD4BF]"
      />
    </section>
  );
};