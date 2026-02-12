import React from 'react';
import { Content } from '../types';
import { SpotlightCard } from './ui/SpotlightCard';
import { Box, TrendingUp, Cpu } from 'lucide-react';

interface ValueProps {
  content: Content;
}

export const Value: React.FC<ValueProps> = ({ content }) => {
  return (
    <section id="expertise" className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-100">{content.value.title}</h2>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Card 1 */}
          <SpotlightCard className="p-8 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6 text-white border border-white/10">
               <Box />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Civil Engineering</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Solid foundation in physical infrastructure. 5 years onsite experience in US & Malaysia.
            </p>
          </SpotlightCard>

          {/* Card 2 */}
          <SpotlightCard className="p-8 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6 text-blue-500 border border-white/10">
               <TrendingUp />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">P&L Management</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Amoeba operating model expertise. Transforming project data into financial insights.
            </p>
          </SpotlightCard>

          {/* Card 3 */}
          <SpotlightCard className="p-8 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6 text-orange-500 border border-white/10">
               <Cpu />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Tech Empowerment</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Leveraging AI & Vibe Coding to build digital twins and automate delivery workflows.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};