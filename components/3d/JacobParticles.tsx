import React, { useMemo, useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { FontLoader, TextGeometry, MeshSurfaceSampler } from 'three-stdlib';

// Using Helvetiker as a reliable fallback for bold geometric text
const FONT_URL = 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json';
const PARTICLE_COUNT = 2500;
const FONT_SIZE = 3.5; 
const LETTER_SPACING = 0.2; 

export const JacobParticles = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  const [font, setFont] = useState<any>(null);

  // Robustly load font using useEffect to avoid Suspense/useLoader race conditions
  useEffect(() => {
    const loader = new FontLoader();
    loader.load(FONT_URL, (loadedFont) => {
      setFont(loadedFont);
    });
  }, []);

  // Compute start (Chaos) and target (Order) positions
  const { startPos, targetPos } = useMemo(() => {
    if (!font) return { startPos: new Float32Array(0), targetPos: new Float32Array(0) };

    const chars = ['J', 'A', 'C', 'O', 'B'];
    const tempTargetArr: number[] = [];
    let totalWidth = 0;
    const charGeometries: any[] = [];
    const charWidths: number[] = [];

    // 1. Generate Geometries & Measure Total Width
    chars.forEach((char) => {
      const geometry = new TextGeometry(char, {
        font: font,
        size: FONT_SIZE,
        height: 0.1, 
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 3,
      } as any);
      geometry.computeBoundingBox();
      const width = (geometry.boundingBox!.max.x - geometry.boundingBox!.min.x);
      
      charGeometries.push(geometry);
      charWidths.push(width);
      totalWidth += width;
    });

    // Add spacing
    totalWidth += (chars.length - 1) * LETTER_SPACING;

    // 2. Sample Points per Character (Order)
    let currentX = -totalWidth / 2;
    const particlesPerChar = Math.floor(PARTICLE_COUNT / chars.length);
    const tempVec = new THREE.Vector3();

    charGeometries.forEach((geometry, index) => {
      const mesh = new THREE.Mesh(geometry);
      const sampler = new MeshSurfaceSampler(mesh).build();

      for (let i = 0; i < particlesPerChar; i++) {
        sampler.sample(tempVec);
        tempTargetArr.push(tempVec.x + currentX);
        tempTargetArr.push(tempVec.y);
        tempTargetArr.push(tempVec.z);
      }
      geometry.dispose();
      currentX += charWidths[index] + LETTER_SPACING;
    });

    const target = new Float32Array(tempTargetArr);
    const start = new Float32Array(tempTargetArr.length);

    // 3. Generate Start Positions (Chaos / Genesis)
    for (let i = 0; i < tempTargetArr.length / 3; i++) {
      const idx = i * 3;
      const r = 40 + Math.random() * 40; 
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      start[idx] = r * Math.sin(phi) * Math.cos(theta);
      start[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
      start[idx + 2] = r * Math.cos(phi);
    }
    
    return { startPos: start, targetPos: target };
  }, [font]);

  // Ensure instanceColor attribute exists
  useLayoutEffect(() => {
    if (meshRef.current && targetPos.length > 0) {
      const count = targetPos.length / 3;
      // If instanceColor doesn't exist, Create it
      if (!meshRef.current.instanceColor) {
         meshRef.current.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3);
      }
    }
  }, [targetPos]);

  // Reusable objects for frame loop optimization
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorCyan = useMemo(() => new THREE.Color('#2DD4BF'), []);
  const colorDeep = useMemo(() => new THREE.Color('#0EA5E9'), []); // Sky Blue 500 for depth
  const colorAmber = useMemo(() => new THREE.Color('#F59E0B'), []);
  const colorBright = useMemo(() => new THREE.Color('#FFFFFF'), []); 
  const tempColor = useMemo(() => new THREE.Color(), []); 

  useFrame((state) => {
    if (!meshRef.current || startPos.length === 0) return;
    
    // Safety check for instanceColor
    if (!meshRef.current.instanceColor) return;

    const time = state.clock.getElapsedTime();
    
    // --- PHASE 1: GENESIS & ASSEMBLY ---
    const assemblyDuration = 3.0;
    let progress = Math.min(time / assemblyDuration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); 

    // Mouse Logic
    const mouseX = (state.mouse.x * viewport.width) / 2;
    const mouseY = (state.mouse.y * viewport.height) / 2;
    const mouseVec = new THREE.Vector3(mouseX, mouseY, 0);

    const count = startPos.length / 3;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      
      const sx = startPos[idx];
      const sy = startPos[idx+1];
      const sz = startPos[idx+2];
      
      const tx = targetPos[idx];
      const ty = targetPos[idx+1];
      const tz = targetPos[idx+2];

      // Use spatial coordinates for wave phase to create coherent ripples (for Color only now)
      const wavePhase = tx * 0.5 + ty * 0.5;
      
      // Position Interpolation (Fixed target, no breathing wobble)
      let x = THREE.MathUtils.lerp(sx, tx, easeProgress);
      let y = THREE.MathUtils.lerp(sy, ty, easeProgress);
      let z = THREE.MathUtils.lerp(sz, tz, easeProgress);

      dummy.position.set(x, y, z);
      
      // --- COLOR DYNAMICS ---
      
      // 2. Base Idle Color (Cycling)
      // Cycle between Cyan and Deep Blue
      const colorCycle = Math.sin(time * 2.0 + wavePhase) * 0.5 + 0.5; // 0 to 1
      tempColor.copy(colorCyan).lerp(colorDeep, colorCycle * 0.4);

      // 3. Brightness Pulse (Breathing)
      // Make it brighter at the peak of the wave
      const brightness = 0.8 + colorCycle * 0.6; // 0.8 to 1.4
      tempColor.multiplyScalar(brightness);

      let scale = easeProgress;

      // --- INTERACTION ---
      if (easeProgress > 0.8) {
        const dist = mouseVec.distanceTo(dummy.position);
        const threshold = 2.5;

        if (dist < threshold) {
          const strength = (1 - dist / threshold);
          const smoothStrength = strength * strength;

          // Activation: Cyan -> Amber
          tempColor.lerp(colorAmber, smoothStrength); 
          if (strength > 0.7) {
             tempColor.lerp(colorBright, (strength - 0.7) * 2);
          }

          // Magnetic Pull (Interactive movement is allowed, but idle wobble is removed)
          dummy.position.lerp(mouseVec, 0.15 * smoothStrength);

          // Excitement Scale
          scale += smoothStrength * 0.5;
        }
      }

      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, tempColor);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor.needsUpdate = true;
  });

  if (!font) return null;

  return (
    // @ts-ignore
    <instancedMesh ref={meshRef} args={[undefined, undefined, startPos.length / 3]} position={[0, 0, -2]}>
      {/* @ts-ignore */}
      <sphereGeometry args={[0.025, 8, 8]} />
      {/* @ts-ignore */}
      <meshBasicMaterial 
        toneMapped={false} 
        color="#ffffff"
        transparent
        opacity={0.9}
      />
    </instancedMesh>
  );
};