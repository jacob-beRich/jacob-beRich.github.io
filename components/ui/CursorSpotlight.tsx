import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';

export const CursorSpotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for inertia (mass gives it that "weighty" feel)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 25, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1] mix-blend-screen"
      style={{
        background: useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, rgba(45, 212, 191, 0.10), transparent 70%)`,
      }}
    />
  );
};