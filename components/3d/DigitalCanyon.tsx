import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// --- GLSL Shaders ---

const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uMountainHeight;
  uniform float uCanyonWidth;

  varying vec3 vPos;
  varying float vElevation;

  // Simplex 2D noise function
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec3 newPos = position;

    // 1. FORWARD FLIGHT: Move noise sampling along Z over time
    float noiseZ = position.z + (uTime * uSpeed);

    // 2. TERRAIN NOISE: Generate base uneven terrain
    float terrain = snoise(vec2(position.x * 0.15, noiseZ * 0.1));
    
    // 3. CANYON SHAPING: Power function creates steep walls
    // abs(x) means symmetry. pow(..., 3.0) makes it flat in center, steep at edges.
    float canyon = pow(abs(position.x * uCanyonWidth), 3.0);
    
    // Combine: The walls rise up, the center stays mostly flat (valley)
    float elevation = terrain * 1.5 + canyon * uMountainHeight;
    
    newPos.y += elevation;

    vPos = newPos; // Pass to fragment shader
    vElevation = elevation;

    vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation (points get smaller when further away)
    gl_PointSize = 60.0 / -mvPosition.z;
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform vec3 uHoverColor;
  uniform vec3 uMouse;
  uniform float uHoverRadius;

  varying vec3 vPos;
  varying float vElevation;

  void main() {
    // 1. CIRCULAR PARTICLE SHAPE
    // Discard corners to make points round
    vec2 coord = gl_PointCoord - vec2(0.5);
    if(length(coord) > 0.5) discard;

    // 2. LIDAR SCANNER EFFECT
    // Calculate distance from this point to the mouse (in world space XZ plane)
    float distToMouse = distance(vPos.xz, uMouse.xz);
    
    // Create a glowing hotspot
    float intensity = 1.0 - smoothstep(0.0, uHoverRadius, distToMouse);
    
    // Mix base cyan with bright white based on mouse proximity
    vec3 finalColor = mix(uColor, uHoverColor, intensity * 0.8);

    // 3. HEIGHT GRADIENT
    // Make higher peaks slightly brighter automatically
    finalColor += vElevation * 0.05;

    // 4. DEPTH FADE (FOG)
    // Fade out points that are far away in negative Z
    float depth = smoothstep(-5.0, -40.0, vPos.z);
    
    gl_FragColor = vec4(finalColor, 1.0 - depth); // Alpha fades with depth
  }
`;

export const DigitalCanyon = () => {
  const meshRef = useRef<THREE.Points>(null!);
  const { viewport, mouse } = useThree();

  // Uniforms ref to keep values persistent
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: 5.0 }, // Flight speed
      uColor: { value: new THREE.Color('#2DD4BF') }, // Base Cyan
      uHoverColor: { value: new THREE.Color('#FFFFFF') }, // Highlight White
      uMountainHeight: { value: 2.0 },
      uCanyonWidth: { value: 0.12 }, // Lower = wider valley
      uMouse: { value: new THREE.Vector3(0, 0, 0) },
      uHoverRadius: { value: 4.0 },
    }),
    []
  );

  // Plane Geometry acts as our grid of points
  // 120x120 segments = 14,400 points (Good performance balance)
  const planeArgs: [number, number, number, number] = [60, 60, 120, 120];

  useFrame((state) => {
    if (!meshRef.current) return;

    // Update Time
    (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();

    // Update Mouse Position (Raycasting approximation for performance)
    // We map normalized mouse coordinates (-1 to 1) to world coordinates roughly
    const x = (state.mouse.x * viewport.width) / 2;
    // We assume the mouse is projecting onto the ground plane, so we map Y screen pos to Z world pos roughly
    // This is a "fake" raycast which is much faster than real raycasting for thousands of points
    const z = (state.mouse.y * viewport.height) / 2; 
    
    // Smooth lerp for the mouse light to follow gently
    (meshRef.current.material as THREE.ShaderMaterial).uniforms.uMouse.value.lerp(
        new THREE.Vector3(x, 0, -z - 5), // Offset Z to match camera angle
        0.1
    );
  });

  return (
    // @ts-ignore
    <points ref={meshRef} position={[0, -4, -10]} rotation={[-Math.PI / 2.5, 0, 0]}>
      {/* A flat plane that gets displaced by the shader */}
      {/* @ts-ignore */}
      <planeGeometry args={planeArgs} />
      {/* @ts-ignore */}
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};