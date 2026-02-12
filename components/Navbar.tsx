import React from 'react';
import { LangType } from '../types';
import { motion } from 'framer-motion';

interface NavbarProps {
  lang: LangType;
  setLang: (lang: LangType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  return (
    <nav className="fixed top-6 right-8 z-50">
      <motion.button 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
        className="
          text-xs font-mono font-bold text-starlight 
          hover:text-amber-500 transition-colors tracking-widest
          bg-abyss/50 backdrop-blur-md border border-white/10
          px-4 py-2 rounded-full
          hover:border-amber-500/50
        "
      >
        [{lang.toUpperCase()}]
      </motion.button>
    </nav>
  );
};