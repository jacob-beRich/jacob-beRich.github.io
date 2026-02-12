
import React from 'react';
import { Content } from '../types';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import { PrecisionLink } from './ui/PrecisionLink';

interface HeaderInfoProps {
  content: Content;
}

export const HeaderInfo: React.FC<HeaderInfoProps> = ({ content }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="fixed top-6 left-6 z-50 hidden md:block"
    >
      <div className="
        bg-abyss/40 backdrop-blur-md border border-white/5
        px-5 py-3 rounded-lg shadow-xl
        flex flex-col gap-1 group hover:border-cyan-500/30 transition-all duration-300
      ">
        {/* Name */}
        <div className="text-lg font-bold text-starlight tracking-tight mb-1">
           <PrecisionLink text={content.header.name} hoverClass="text-cyan-400" />
        </div>

        {/* Contact Details */}
        <div className="flex flex-col gap-1.5 text-[11px] font-mono text-slate-400">
          <a 
            href={`tel:${content.header.phone.replace(/\s+/g, '')}`} 
            className="flex items-center gap-2 hover:text-amber-500 transition-colors"
          >
            <Phone className="w-3 h-3 text-cyan-500/70" />
            {content.header.phone}
          </a>
          <a 
            href={`mailto:${content.header.email}`} 
            className="flex items-center gap-2 hover:text-amber-500 transition-colors"
          >
            <Mail className="w-3 h-3 text-cyan-500/70" />
            {content.header.email}
          </a>
        </div>
      </div>
    </motion.div>
  );
};
