import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = '' }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const opacity = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleFocus() {
    opacity.set(1);
  }

  function handleBlur() {
    opacity.set(0);
  }

  function handleMouseEnter() {
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
  }

  const backgroundStyle = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.15), transparent 40%)`;
  const borderStyle = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.4), transparent 40%)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-slate-900 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: backgroundStyle,
        }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: borderStyle,
          maskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
          WebkitMaskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};