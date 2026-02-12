import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', onClick }) => {
  // Use a ref for the card container to measure its dimensions
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smooth animation
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse position to rotation (Increased range for visibility)
  // Note: mouseY controls rotateX, mouseX controls rotateY
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center of card
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    // Reset to center
    x.set(0);
    y.set(0);
  };

  // Glare effect moves opposite to mouse to simulate reflection
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.2) 0%, transparent 60%)`;

  return (
    // Outer container provides perspective
    <div className={className} style={{ perspective: "1000px" }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full transition-all duration-200 ease-out"
      >
        {/* Shadow Layer for depth */}
        <div 
          style={{ transform: "translateZ(-50px)" }}
          className="absolute inset-4 rounded-xl bg-cyan-500/20 blur-xl transition-all opacity-0 group-hover:opacity-100" 
        />

        {/* Backplate / Glass */}
        <div 
          style={{ transform: "translateZ(0px)" }}
          className="absolute inset-0 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/10 shadow-2xl"
        />

        {/* Content Layer (Floating above) */}
        <div 
          style={{ transform: "translateZ(50px)" }}
          className="relative h-full rounded-xl p-8"
        >
          {children}
        </div>

        {/* Glare Layer (Top) */}
        <motion.div
          style={{
            background: glareBackground,
            transform: "translateZ(60px)",
          }}
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none mix-blend-overlay transition-opacity duration-300"
        />
      </motion.div>
    </div>
  );
};