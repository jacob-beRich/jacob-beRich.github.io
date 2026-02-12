
import React, { useRef } from 'react';
import { Content } from '../types';
import { motion, useScroll, useSpring } from 'framer-motion';
import { PrecisionLink } from './ui/PrecisionLink';
import { GraduationCap } from 'lucide-react';

interface ResumeProps {
  content: Content;
}

export const Resume: React.FC<ResumeProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="resume" ref={containerRef} className="py-40 relative min-h-screen bg-transparent overflow-hidden">
      {/* The Central Beam Track (Background) */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-white/5" />
      
      {/* The Active Beam (Fills on Scroll) */}
      <motion.div 
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-cyan-500 via-amber-500 to-cyan-500 shadow-[0_0_20px_#2DD4BF]"
      >
        <div className="w-full h-full bg-white/20 blur-[1px]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-56 max-w-6xl mx-auto"> {/* Increased gap for larger text */}
          
          {/* JOBS LOOP */}
          {content.resume.jobs.map((job, idx) => {
            const isFirst = idx === 0;
            const isSecond = idx === 1;
            
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                className="relative flex items-center justify-between group"
              >
                {/* Left: Year */}
                <div className="w-1/2 pr-16 text-right">
                  <div className={`font-black font-mono tracking-tighter ${isFirst ? 'text-4xl md:text-5xl text-amber-500' : 'text-3xl md:text-4xl text-cyan-500/80'}`}>
                    <PrecisionLink text={job.year} hoverClass={isFirst ? "text-white" : "text-amber-500"} />
                  </div>
                </div>

                {/* Center: Node */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                  {isFirst ? (
                    // Amber Pulsing Dot
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-amber-500 shadow-[0_0_25px_#F59E0B] z-10 relative border-4 border-abyss" />
                      <div className="absolute inset-0 w-8 h-8 rounded-full bg-amber-500 animate-ping opacity-50" />
                    </div>
                  ) : isSecond ? (
                    // Cyan Circle
                    <div className="w-6 h-6 rounded-full border-4 border-cyan-500 bg-abyss shadow-[0_0_20px_#2DD4BF] z-10" />
                  ) : (
                    // Simple Node
                    <div className="w-4 h-4 bg-slate-600 rotate-45 z-10 border border-slate-400" />
                  )}
                </div>

                {/* Right: Card */}
                <div className="w-1/2 pl-16">
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="border-l-2 border-white/10 pl-8 py-6 bg-abyss/40 backdrop-blur-sm rounded-r-2xl border-y border-r border-y-transparent border-r-transparent hover:border-white/10 transition-all"
                  >
                    <div className={`text-2xl md:text-3xl font-black tracking-tight uppercase mb-3 leading-tight ${isFirst ? 'text-white' : 'text-slate-200'}`}>
                       <PrecisionLink text={job.company} hoverClass="text-amber-500" />
                    </div>
                    <div className={`text-lg md:text-xl font-mono font-bold mb-4 tracking-wide ${isFirst ? 'text-amber-400' : 'text-cyan-400'}`}>
                      {job.role}
                    </div>
                    <p className="text-lg text-slate-300 font-light leading-relaxed max-w-xl">
                      {job.desc}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}

          {/* EDUCATION SECTION */}
          {content.resume.education.map((edu, idx) => (
             <motion.div 
                key={`edu-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                className="relative flex items-center justify-between group"
              >
                {/* Left: School Name */}
                <div className="w-1/2 pr-16 text-right">
                  <div className="text-2xl md:text-4xl font-black tracking-tight text-white mb-2">
                    <PrecisionLink text={edu.school} hoverClass="text-cyan-400" />
                  </div>
                  <div className="inline-block px-3 py-1 border border-cyan-500/30 rounded-full bg-cyan-950/30 text-cyan-400 text-sm font-mono tracking-wider">
                     ALMA MATER
                  </div>
                </div>

                {/* Center: Node */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                   <div className="relative w-10 h-10 bg-abyss border-2 border-white/20 rounded-lg flex items-center justify-center z-10 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                      <GraduationCap className="w-5 h-5 text-starlight" />
                   </div>
                </div>

                {/* Right: Details */}
                <div className="w-1/2 pl-16">
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="pl-8 py-4"
                  >
                    <div className="text-xl md:text-2xl font-bold text-starlight mb-3">
                      {edu.degree}
                    </div>
                    <div className="space-y-2">
                        <div className="text-lg text-amber-500/90 font-medium">
                          {edu.honors}
                        </div>
                        <div className="text-lg text-slate-400 font-light">
                          {edu.credential}
                        </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
};
