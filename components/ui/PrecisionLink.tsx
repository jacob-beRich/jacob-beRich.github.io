import React from 'react';
import { motion } from 'framer-motion';

interface PrecisionLinkProps {
  text: string;
  href?: string;
  className?: string;
  hoverClass?: string;
  onClick?: () => void;
}

export const PrecisionLink: React.FC<PrecisionLinkProps> = ({ text, href, className = "", hoverClass = "text-amber-500", onClick }) => {
  const letters = text.split("");

  const containerVariants = {
    initial: {},
    hover: {
      transition: {
        staggerChildren: 0.025,
      }
    }
  };

  const letterVariants = {
    initial: { y: 0 },
    hover: {
      y: "-100%",
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const InnerContent = () => (
    <motion.div
      className={`relative inline-flex overflow-hidden cursor-pointer ${className}`}
      initial="initial"
      whileHover="hover"
      variants={containerVariants}
      onClick={onClick}
    >
      <div className="relative flex items-center">
         {letters.map((letter, i) => (
            <motion.div key={i} variants={letterVariants} className="relative">
               <span className="block" style={{ opacity: letter === ' ' ? 0 : 1 }}>
                 {letter === ' ' ? '\u00A0' : letter}
               </span>
               <span 
                 className={`absolute top-full left-0 block ${hoverClass}`}
                 style={{ opacity: letter === ' ' ? 0 : 1 }}
               >
                 {letter === ' ' ? '\u00A0' : letter}
               </span>
            </motion.div>
         ))}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block" onClick={onClick}>
        <InnerContent />
      </a>
    );
  }

  return (
    <div className="inline-block">
        <InnerContent />
    </div>
  );
};