
import React from 'react';
import { Content } from '../types';
import { motion } from 'framer-motion';
import { Box, TrendingUp, Cpu, Download } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';
import { PrecisionLink } from './ui/PrecisionLink';

interface FooterProps {
  content: Content;
}

export const Footer: React.FC<FooterProps> = ({ content }) => {
  return (
    <footer id="footer" className="py-24 bg-abyss border-t border-white/5 relative">
      <div className="container mx-auto px-6 text-center">
        
        {/* Expertise Matrix */}
        <div className="flex justify-center gap-12 mb-20 text-muted/50">
          <motion.div whileHover={{ color: '#F59E0B' }} className="flex flex-col items-center gap-2 cursor-pointer transition-colors group">
            <Box strokeWidth={1} className="w-8 h-8" />
            <span className="text-[10px] font-mono tracking-widest uppercase">
              <PrecisionLink text="Civil Core" hoverClass="text-amber-500" />
            </span>
          </motion.div>
          <motion.div whileHover={{ color: '#2DD4BF' }} className="flex flex-col items-center gap-2 cursor-pointer transition-colors group">
            <TrendingUp strokeWidth={1} className="w-8 h-8" />
            <span className="text-[10px] font-mono tracking-widest uppercase">
              <PrecisionLink text="P&L Logic" hoverClass="text-cyan-400" />
            </span>
          </motion.div>
          <motion.div whileHover={{ color: '#F8FAFC' }} className="flex flex-col items-center gap-2 cursor-pointer transition-colors group">
            <Cpu strokeWidth={1} className="w-8 h-8" />
            <span className="text-[10px] font-mono tracking-widest uppercase">
              <PrecisionLink text="AI Tech" hoverClass="text-white" />
            </span>
          </motion.div>
        </div>

        {/* CTA */}
        <h2 className="text-lg font-mono text-muted tracking-[0.2em] mb-8">
           <PrecisionLink text="DRILL A LITTLE DEEPER" />
        </h2>
        
        <a 
          href="https://drive.google.com/file/d/1Io7XoiBAzsPgtr-0NzRah4XVpCHxz6rr/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <MagneticButton 
            className="inline-flex items-center gap-3 border border-amber-500/30 bg-transparent text-amber-500 px-10 py-4 font-bold tracking-widest uppercase group-hover:text-abyss group-hover:border-transparent transition-colors"
          >
            <Download className="w-4 h-4" />
            {content.contact.btn}
          </MagneticButton>
        </a>
      </div>
    </footer>
  );
};
