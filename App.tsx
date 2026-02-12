
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeaderInfo } from './components/HeaderInfo';
import { Hero } from './components/Hero';
import { Resume } from './components/Resume';
import { Work } from './components/Work';
import { MiningSystem } from './components/MiningSystem';
import { Footer } from './components/Footer';
import { Scene } from './components/3d/Scene';
import { CursorSpotlight } from './components/ui/CursorSpotlight';
import { content } from './utils/content';
import { LangType } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<LangType>('zh');
  const currentContent = content[lang];

  return (
    <div className="min-h-screen bg-transparent text-starlight selection:bg-cyan-500/30 font-sans relative">
      {/* 1. 3D Background Layer - Fixed Z-0 */}
      <Scene />

      {/* 2. Cursor Spotlight - Fixed Z-1 */}
      <CursorSpotlight />

      {/* 3. UI Layer - Relative Z-10 */}
      <div className="relative z-10">
        <HeaderInfo content={currentContent} />
        <Navbar lang={lang} setLang={setLang} />
        <Hero content={currentContent} />
        <Resume content={currentContent} />
        <Work content={currentContent} />
        <MiningSystem content={currentContent} />
        <Footer content={currentContent} />
      </div>
    </div>
  );
};

export default App;
