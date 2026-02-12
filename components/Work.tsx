
import React from 'react';
import { Content } from '../types';
import { TiltCard } from './ui/TiltCard';
import { motion } from 'framer-motion';
import { PrecisionLink } from './ui/PrecisionLink';
import { FileText, Tag, ArrowRight } from 'lucide-react';
import { ProjectGallery } from './ui/ProjectGallery';
import { SpotlightCard } from './ui/SpotlightCard';

interface WorkProps {
  content: Content;
}

// Helper to highlight text wrapped in **
const HighlightedText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <span key={i} className="text-cyan-400 font-semibold drop-shadow-[0_0_8px_rgba(45,212,191,0.3)]">
              {part.slice(2, -2)}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

export const Work: React.FC<WorkProps> = ({ content }) => {
  
  // Helper for image fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1623018035782-b269248df916?q=80&w=2070&auto=format&fit=crop"; 
    e.currentTarget.alt = "Image fallback";
    e.currentTarget.classList.add("opacity-50", "grayscale"); 
  };

  return (
    <section id="work" className="py-32 relative">
       {/* Decorative Lines */}
      <div className="absolute left-12 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
      <div className="absolute right-12 top-0 bottom-0 w-px bg-white/5 hidden md:block" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Module Title */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6 mb-32 justify-center"
        >
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-center">
              <span className="drop-shadow-[0_0_30px_rgba(45,212,191,0.4)]">
                 <PrecisionLink text={content.work.title} className="text-cyan-400" hoverClass="text-white" />
              </span>
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60 shadow-[0_0_10px_#2DD4BF]" />
        </motion.div>
        
        {/* Projects Loop - Vertical Layout with Staggering */}
        <div className="flex flex-col gap-32 mb-40">
          {content.work.projects.map((project, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'} w-full`}
              >
                {/* Project Container - Half Width roughly */}
                <div className="w-full md:w-[48%] flex flex-col gap-6">
                  
                  {/* 1. Main Card */}
                  <TiltCard className="w-full group cursor-pointer border border-white/5 hover:border-cyan-500/30">
                    <div className="flex flex-col h-full justify-between min-h-[240px]">
                      <div>
                        {/* Category Label */}
                        <div className="text-lg md:text-xl font-mono text-cyan-500 mb-4 tracking-widest uppercase opacity-70">
                          0{index + 1} // {project.category}
                        </div>
                        {/* Project Title */}
                        <h3 className="text-5xl md:text-7xl font-light tracking-widest text-starlight uppercase group-hover:text-cyan-400 transition-colors leading-tight">
                          <PrecisionLink text={project.title} hoverClass="text-cyan-400" />
                        </h3>
                      </div>
                      
                      {/* Tags inside card */}
                      {project.tags.length > 0 && (
                         <div className="flex flex-wrap gap-3 mt-10">
                            {project.tags.map((tag, tIdx) => (
                               <span key={tIdx} className="text-sm md:text-base font-mono text-amber-500 border border-amber-500/20 px-4 py-2 rounded bg-amber-900/10 flex items-center gap-2">
                                  <Tag className="w-4 h-4" />
                                  {tag}
                               </span>
                            ))}
                         </div>
                      )}
                    </div>
                  </TiltCard>

                  {/* 2. Content Area */}
                  <div className="space-y-4">
                     {/* Text Description Box */}
                     <div className="p-6 rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-md shadow-2xl group hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all duration-300 relative overflow-hidden">
                        {/* Subtle Glow Gradient */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="flex items-center gap-2 mb-4 text-slate-400 relative z-10">
                           <FileText className="w-4 h-4 text-cyan-500" />
                           <span className="text-xs font-mono uppercase tracking-wider text-cyan-500/80 font-bold">{content.work.placeholders.text}</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed font-light text-sm md:text-base relative z-10">
                           <HighlightedText text={project.description} />
                        </p>
                     </div>

                     {/* Image Gallery */}
                     <ProjectGallery images={project.images} />
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* MORE PROJECTS SECTION */}
        <div className="relative pt-20 border-t border-white/5">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="mb-16"
          >
             <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-2 text-starlight">
               <PrecisionLink text={content.work.moreProjects.title} hoverClass="text-cyan-400" />
             </h3>
             <div className="mx-auto w-24 h-1 bg-gradient-to-r from-amber-500/0 via-amber-500/50 to-amber-500/0" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
             {content.work.moreProjects.items.map((item, idx) => (
               <motion.div
                 key={idx}
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
               >
                 <SpotlightCard className="group h-full flex flex-col bg-slate-900/40 border-white/5 hover:border-amber-500/30 transition-colors">
                    <div className="relative h-48 overflow-hidden rounded-t-xl bg-slate-950">
                       <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                          loading="lazy"
                          onError={handleImageError}
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow relative z-10">
                       <h4 className="text-xl font-bold text-starlight mb-2 group-hover:text-amber-400 transition-colors flex items-center justify-between">
                          {item.title}
                          <ArrowRight className="w-4 h-4 -rotate-45 opacity-0 group-hover:opacity-100 group-hover:rotate-0 transition-all duration-300 text-amber-500" />
                       </h4>
                       <p className="text-slate-400 text-sm font-light leading-relaxed">
                          {item.desc}
                       </p>
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
