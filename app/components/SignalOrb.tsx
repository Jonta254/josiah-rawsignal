"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

interface OrbMeshProps {
  mouse?: React.MutableRefObject<{ x: number; y: number }>;
  scale?: number;
  glowIntensity?: number;
  scrollY?: React.MutableRefObject<number>;
}

function OrbMesh({ mouse, scale = 1, glowIntensity = 1.5, scrollY }: OrbMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const coreRef  = useRef<THREE.Mesh>(null);
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);
  const r4 = useRef<THREE.Mesh>(null);
  const r5 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t   = state.clock.elapsedTime;
    const scroll = scrollY?.current ?? 0;
    const speedMult = 1 + scroll * 0.002; // spin faster as user scrolls down

    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.11 * speedMult;
      outerRef.current.rotation.y += delta * 0.20 * speedMult;
    }
    if (coreRef.current) {
      const pulse = Math.sin(t * 1.8) * 0.5 + glowIntensity;
      (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }
    // Mouse parallax
    if (groupRef.current && mouse) {
      groupRef.current.rotation.x += (mouse.current.y * 0.28 - groupRef.current.rotation.x) * 0.04;
      groupRef.current.rotation.y += (mouse.current.x * 0.28 - groupRef.current.rotation.y) * 0.04;
    }
    if (r1.current) r1.current.rotation.z += delta * 0.55 * speedMult;
    if (r2.current) r2.current.rotation.x -= delta * 0.75 * speedMult;
    if (r3.current) r3.current.rotation.y += delta * 0.95 * speedMult;
    if (r4.current) r4.current.rotation.z -= delta * 0.45 * speedMult;
    if (r5.current) r5.current.rotation.x += delta * 0.65 * speedMult;
  });

  const s = scale;

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.55}>

        {/* Outer icosahedron wireframe */}
        <mesh ref={outerRef} scale={[s, s, s]}>
          <icosahedronGeometry args={[1.75, 1]} />
          <meshBasicMaterial color="#C87B2F" wireframe transparent opacity={0.28} />
        </mesh>

        {/* Breathing distort core — this is the new shader layer */}
        <mesh scale={[s * 0.9, s * 0.9, s * 0.9]}>
          <sphereGeometry args={[0.55, 64, 64]} />
          <MeshDistortMaterial
            color="#1A0E06"
            emissive="#C87B2F"
            emissiveIntensity={0.6}
            distort={0.45}
            speed={2.5}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Inner emissive core — tight bright center */}
        <mesh ref={coreRef} scale={[s * 0.38, s * 0.38, s * 0.38]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#FFD580"
            emissive="#D4A843"
            emissiveIntensity={glowIntensity}
            roughness={0}
            metalness={1}
          />
        </mesh>

        {/* 5 signal orbital rings */}
        <mesh ref={r1} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.98 * s, 0.008, 8, 100]} />
          <meshBasicMaterial color="#D4A843" transparent opacity={0.8} />
        </mesh>
        <mesh ref={r2} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[1.13 * s, 0.008, 8, 100]} />
          <meshBasicMaterial color="#00C8FF" transparent opacity={0.7} />
        </mesh>
        <mesh ref={r3} rotation={[Math.PI / 6, 0, Math.PI / 3]}>
          <torusGeometry args={[1.28 * s, 0.008, 8, 100]} />
          <meshBasicMaterial color="#A855F7" transparent opacity={0.65} />
        </mesh>
        <mesh ref={r4} rotation={[0, Math.PI / 3, Math.PI / 5]}>
          <torusGeometry args={[1.08 * s, 0.008, 8, 100]} />
          <meshBasicMaterial color="#34D399" transparent opacity={0.6} />
        </mesh>
        <mesh ref={r5} rotation={[Math.PI / 4, 0, Math.PI / 6]}>
          <torusGeometry args={[1.22 * s, 0.008, 8, 100]} />
          <meshBasicMaterial color="#F5F0E8" transparent opacity={0.42} />
        </mesh>
      </Float>

      {/* Scene lights */}
      <pointLight color="#C87B2F" intensity={3}   distance={7} />
      <pointLight color="#00C8FF" intensity={0.8} distance={5} position={[2, 1, 0]} />
      <pointLight color="#A855F7" intensity={0.5} distance={4} position={[-2, -1, 1]} />
      <ambientLight intensity={0.05} />

      {/* Bloom post-processing */}
      <EffectComposer>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.8}
          mipmapBlur
        />
      </EffectComposer>
    </group>
  );
}

interface SignalOrbProps {
  mouse?: React.MutableRefObject<{ x: number; y: number }>;
  scrollY?: React.MutableRefObject<number>;
  scale?: number;
  glowIntensity?: number;
  fov?: number;
  distance?: number;
  style?: React.CSSProperties;
}

export default function SignalOrb({
  mouse,
  scrollY,
  scale = 1,
  glowIntensity = 1.5,
  fov = 45,
  distance = 5,
  style,
}: SignalOrbProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, distance], fov }}
      style={{ background: "transparent", ...style }}
      gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <OrbMesh mouse={mouse} scrollY={scrollY} scale={scale} glowIntensity={glowIntensity} />
    </Canvas>
  );
}
