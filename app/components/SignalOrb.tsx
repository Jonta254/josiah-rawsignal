"use client";
import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface OrbMeshProps {
  mouse?: React.MutableRefObject<{ x: number; y: number }>;
  scale?: number;
  glowIntensity?: number;
}

function OrbMesh({ mouse, scale = 1, glowIntensity = 1.5 }: OrbMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);
  const r4 = useRef<THREE.Mesh>(null);
  const r5 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.12;
      outerRef.current.rotation.y += delta * 0.22;
    }
    if (innerRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 1.8) * 0.5 + glowIntensity;
      (innerRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }
    if (groupRef.current && mouse) {
      groupRef.current.rotation.x += (mouse.current.y * 0.25 - groupRef.current.rotation.x) * 0.04;
      groupRef.current.rotation.y += (mouse.current.x * 0.25 - groupRef.current.rotation.y) * 0.04;
    }
    if (r1.current) r1.current.rotation.z += delta * 0.55;
    if (r2.current) r2.current.rotation.x += delta * -0.75;
    if (r3.current) r3.current.rotation.y += delta * 0.95;
    if (r4.current) r4.current.rotation.z += delta * -0.45;
    if (r5.current) r5.current.rotation.x += delta * 0.65;
  });

  const s = scale;

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
        {/* Outer icosahedron wireframe */}
        <mesh ref={outerRef} scale={[s, s, s]}>
          <icosahedronGeometry args={[1.75, 1]} />
          <meshBasicMaterial color="#C87B2F" wireframe transparent opacity={0.32} />
        </mesh>

        {/* Inner glowing core */}
        <mesh ref={innerRef} scale={[s, s, s]}>
          <sphereGeometry args={[0.38, 32, 32]} />
          <meshStandardMaterial
            color="#D4A843"
            emissive="#C87B2F"
            emissiveIntensity={glowIntensity}
            roughness={0}
            metalness={0.9}
          />
        </mesh>

        {/* 5 signal orbital rings */}
        <mesh ref={r1} rotation={[Math.PI / 2, 0, 0]} scale={[s, s, s]}>
          <torusGeometry args={[0.98 * s, 0.007, 8, 100]} />
          <meshBasicMaterial color="#D4A843" transparent opacity={0.75} />
        </mesh>
        <mesh ref={r2} rotation={[Math.PI / 3, Math.PI / 4, 0]} scale={[s, s, s]}>
          <torusGeometry args={[1.13 * s, 0.007, 8, 100]} />
          <meshBasicMaterial color="#00C8FF" transparent opacity={0.65} />
        </mesh>
        <mesh ref={r3} rotation={[Math.PI / 6, 0, Math.PI / 3]} scale={[s, s, s]}>
          <torusGeometry args={[1.28 * s, 0.007, 8, 100]} />
          <meshBasicMaterial color="#A855F7" transparent opacity={0.6} />
        </mesh>
        <mesh ref={r4} rotation={[0, Math.PI / 3, Math.PI / 5]} scale={[s, s, s]}>
          <torusGeometry args={[1.08 * s, 0.007, 8, 100]} />
          <meshBasicMaterial color="#34D399" transparent opacity={0.55} />
        </mesh>
        <mesh ref={r5} rotation={[Math.PI / 4, 0, Math.PI / 6]} scale={[s, s, s]}>
          <torusGeometry args={[1.22 * s, 0.007, 8, 100]} />
          <meshBasicMaterial color="#F5F0E8" transparent opacity={0.38} />
        </mesh>
      </Float>

      <pointLight color="#C87B2F" intensity={2.5} distance={7} />
      <pointLight color="#00C8FF" intensity={0.6} distance={5} position={[2, 1, 0]} />
      <ambientLight intensity={0.06} />
    </group>
  );
}

interface SignalOrbProps {
  mouse?: React.MutableRefObject<{ x: number; y: number }>;
  scale?: number;
  glowIntensity?: number;
  fov?: number;
  distance?: number;
  style?: React.CSSProperties;
}

export default function SignalOrb({
  mouse,
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
      gl={{ alpha: true, antialias: true }}
    >
      <OrbMesh mouse={mouse} scale={scale} glowIntensity={glowIntensity} />
    </Canvas>
  );
}
