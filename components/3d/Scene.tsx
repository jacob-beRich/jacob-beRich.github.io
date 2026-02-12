import React from 'react';
import { Canvas } from '@react-three/fiber';
import { JacobParticles } from './JacobParticles';

export const Scene: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* gl={{ alpha: true }} allows background color of body to show through */}
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        {/* @ts-ignore */}
        <fog attach="fog" args={['#020617', 5, 25]} />
        {/* @ts-ignore */}
        <ambientLight intensity={0.5} />
        
        {/* The Digital Life Particle System */}
        <JacobParticles />
      </Canvas>
    </div>
  );
};