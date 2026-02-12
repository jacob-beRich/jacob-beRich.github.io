
import React from 'react';
import { Content } from '../types';
import { motion } from 'framer-motion';
import { PrecisionLink } from './ui/PrecisionLink';
import { SpotlightCard } from './ui/SpotlightCard';
import { 
  Building2, 
  ShieldAlert, 
  Server, 
  Activity, 
  Map, 
  Users, 
  Truck, 
  Cpu, 
  Eye,
  CheckCircle2
} from 'lucide-react';

interface MiningSystemProps {
  content: Content;
}

const iconMap: Record<string, React.ReactNode> = {
  Activity: <Activity className="w-5 h-5" />,
  Map: <Map className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Eye: <Eye className="w-5 h-5" />,
};

export const MiningSystem: React.FC<MiningSystemProps> = ({ content }) => {
  const { mining } = content;

  return (
    <section className="py-32 relative border-t border-white/5 bg-gradient-to-b from-abyss via-slate-900/20 to-abyss overflow-hidden">
      
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-cyan-500/0 via-cyan-500/20 to-cyan-500/0" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Title */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 mb-24 justify-center text-center"
        >
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              <span className="drop-shadow-[0_0_30px_rgba(45,212,191,0.4)]">
                 <PrecisionLink text={mining.title} className="text-cyan-400" hoverClass="text-white" />
              </span>
            </h2>
            <p className="text-slate-400 font-mono tracking-widest text-sm md:text-base border border-white/10 px-4 py-1 rounded-full bg-abyss/50 backdrop-blur">
              {mining.subtitle}
            </p>
        </motion.div>

        {/* System Architecture Visualization */}
        <div className="relative">
          
          {/* Top Row: Structure Nodes (Left Wing - Core - Right Wing) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 relative">
            
            {/* Connector Lines (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2 z-0" />
            
            {/* 1. Left Wing: Company */}
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative z-10"
            >
              <div className="h-full p-6 rounded-xl border border-white/10 bg-slate-900/80 backdrop-blur-md flex flex-col items-center text-center group hover:border-amber-500/40 transition-colors">
                 <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4 text-amber-500 border border-amber-500/20 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-shadow">
                    <Building2 />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-4">{mining.wings.company.title}</h3>
                 <ul className="space-y-2 w-full">
                    {mining.wings.company.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-400 justify-center">
                         <div className="w-1 h-1 bg-amber-500 rounded-full" />
                         {item}
                      </li>
                    ))}
                 </ul>
              </div>
            </motion.div>

            {/* 2. Core: Smart Hub */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative z-20"
            >
               {/* Pulsating Core Effect */}
              <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full animate-pulse" />
              
              <div className="relative h-full p-8 rounded-xl border border-cyan-500/30 bg-slate-900 shadow-[0_0_50px_rgba(45,212,191,0.1)] flex flex-col items-center text-center">
                 <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center mb-4 text-abyss shadow-lg shadow-cyan-500/40">
                    <Server className="w-8 h-8" />
                 </div>
                 <h3 className="text-2xl font-black text-white tracking-wide mb-1">{mining.hub.title}</h3>
                 <div className="text-cyan-400 text-xs font-mono mb-4">DATA INTEGRATION CORE</div>
                 
                 <div className="w-px h-12 bg-gradient-to-b from-cyan-500 to-transparent mx-auto mt-2" />
              </div>
            </motion.div>

            {/* 3. Right Wing: Risks */}
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative z-10"
            >
              <div className="h-full p-6 rounded-xl border border-white/10 bg-slate-900/80 backdrop-blur-md flex flex-col items-center text-center group hover:border-red-500/40 transition-colors">
                 <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 text-red-500 border border-red-500/20 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-shadow">
                    <ShieldAlert />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-4">{mining.wings.risks.title}</h3>
                 <ul className="space-y-2 w-full">
                    {mining.wings.risks.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-400 justify-center">
                         <div className="w-1 h-1 bg-red-500 rounded-full" />
                         {item}
                      </li>
                    ))}
                 </ul>
              </div>
            </motion.div>

          </div>

          {/* Bottom Grid: Hub Children */}
          {/* Vertical connector from Core */}
          <div className="hidden lg:block absolute top-[280px] left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-cyan-500/0 via-cyan-500 to-cyan-500/50" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
             {mining.hub.children.map((module, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <SpotlightCard className="h-full bg-slate-900/40 hover:bg-slate-800/60 transition-colors p-6 flex flex-col group border border-white/5 hover:border-cyan-500/30">
                     <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
                        <div className="p-3 rounded bg-cyan-950/30 text-cyan-400 group-hover:scale-110 transition-transform duration-300 border border-cyan-500/20">
                           {iconMap[module.icon]}
                        </div>
                        <h4 className="text-lg font-bold text-starlight group-hover:text-cyan-400 transition-colors">{module.title}</h4>
                     </div>
                     
                     <div className="flex-grow space-y-3">
                        {module.features.map((feature, fIdx) => (
                           <div key={fIdx} className="flex items-start gap-3 text-sm text-slate-400">
                              <CheckCircle2 className="w-4 h-4 text-cyan-500/50 mt-0.5 shrink-0" />
                              <span className="leading-relaxed">{feature}</span>
                           </div>
                        ))}
                     </div>
                  </SpotlightCard>
                </motion.div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
};
