"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

interface OrbMeshProps {
  mouse?: React.MutableRefObject<{ x: number; y: number }>;
  scale?: number;
  glowIntensity?: number;
  scrollY?: React.MutableRefObject<number>;
}

function OrbMesh({ mouse, scale = 1, glowIntensity = 2, scrollY }: OrbMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef  = useRef<THREE.Mesh>(null);
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);
  const r4 = useRef<THREE.Mesh>(null);
  const r5 = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const scroll = scrollY?.current ?? 0;
    const speedMult = 1 + scroll * 0.0018;

    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.10 * speedMult;
      outerRef.current.rotation.y += delta * 0.18 * speedMult;
    }
    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = glowIntensity + Math.sin(t * 2.2) * 0.8;
    }
    if (groupRef.current && mouse) {
      groupRef.current.rotation.x += (mouse.current.y * 0.32 - groupRef.current.rotation.x) * 0.045;
      groupRef.current.rotation.y += (mouse.current.x * 0.32 - groupRef.current.rotation.y) * 0.045;
    }
    if (r1.current) r1.current.rotation.z += delta * 0.60 * speedMult;
    if (r2.current) r2.current.rotation.x -= delta * 0.80 * speedMult;
    if (r3.current) r3.current.rotation.y += delta * 1.00 * speedMult;
    if (r4.current) r4.current.rotation.z -= delta * 0.48 * speedMult;
    if (r5.current) r5.current.rotation.x += delta * 0.70 * speedMult;
  });

  const s = scale;

  return (
    <group ref={groupRef}>
      <Float speed={1.6} rotationIntensity={0.18} floatIntensity={0.65}>

        {/* Outer icosahedron wireframe — copper */}
        <mesh ref={outerRef} scale={[s, s, s]}>
          <icosahedronGeometry args={[1.75, 1]} />
          <meshBasicMaterial color="#FF9040" wireframe transparent opacity={0.32} />
        </mesh>

        {/* Second wireframe — cyan, counter-rotating */}
        <mesh scale={[s * 1.15, s * 1.15, s * 1.15]}>
          <octahedronGeometry args={[1, 2]} />
          <meshBasicMaterial color="#00EEFF" wireframe transparent opacity={0.12} />
        </mesh>

        {/* Breathing distort core — vivid copper/gold */}
        <mesh scale={[s * 0.92, s * 0.92, s * 0.92]}>
          <sphereGeometry args={[0.55, 64, 64]} />
          <MeshDistortMaterial
            color="#0A0300"
            emissive="#FF8020"
            emissiveIntensity={1.1}
            distort={0.52}
            speed={3.2}
            roughness={0.02}
            metalness={0.98}
            transparent opacity={0.92}
          />
        </mesh>

        {/* Hot inner core — electric white-gold */}
        <mesh ref={coreRef} scale={[s * 0.38, s * 0.38, s * 0.38]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#FFFBE8"
            emissive="#FFD060"
            emissiveIntensity={glowIntensity}
            roughness={0}
            metalness={1}
          />
        </mesh>

        {/* 5 orbital rings — vivid signal colors */}
        <mesh ref={r1} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.98 * s, 0.013, 8, 100]} />
          <meshBasicMaterial color="#FFB800" transparent opacity={0.85} />
        </mesh>
        <mesh ref={r2} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[1.14 * s, 0.013, 8, 100]} />
          <meshBasicMaterial color="#00EEFF" transparent opacity={0.75} />
        </mesh>
        <mesh ref={r3} rotation={[Math.PI / 6, 0, Math.PI / 3]}>
          <torusGeometry args={[1.30 * s, 0.013, 8, 100]} />
          <meshBasicMaterial color="#C060FF" transparent opacity={0.70} />
        </mesh>
        <mesh ref={r4} rotation={[0, Math.PI / 3, Math.PI / 5]}>
          <torusGeometry args={[1.09 * s, 0.010, 8, 100]} />
          <meshBasicMaterial color="#00FF80" transparent opacity={0.60} />
        </mesh>
        <mesh ref={r5} rotation={[Math.PI / 4, 0, Math.PI / 6]}>
          <torusGeometry args={[1.23 * s, 0.010, 8, 100]} />
          <meshBasicMaterial color="#FFFBE8" transparent opacity={0.45} />
        </mesh>
      </Float>

      {/* Environment for metallic reflections */}
      <Environment preset="night" />

      {/* Dramatic multi-coloured lighting rig */}
      <pointLight color="#FF8830" intensity={10}  distance={12} />
      <pointLight color="#00EEFF" intensity={4}   distance={7}  position={[2.5, 1.5, 1]} />
      <pointLight color="#C060FF" intensity={3.5} distance={6}  position={[-2.5, -1.5, 1.5]} />
      <pointLight color="#FFD060" intensity={5}   distance={8}  position={[0, 3, 2]} />
      <spotLight
        color="#FFBB40"
        intensity={20}
        position={[4, 5, 4]}
        angle={0.35}
        penumbra={0.7}
        distance={14}
        castShadow={false}
      />
      <spotLight
        color="#40C0FF"
        intensity={8}
        position={[-4, -3, 3]}
        angle={0.5}
        penumbra={0.8}
        distance={10}
        castShadow={false}
      />
      <ambientLight intensity={0.05} />

      <EffectComposer>
        <Bloom intensity={3} luminanceThreshold={0.04} luminanceSmoothing={0.85} mipmapBlur />
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
  mouse, scrollY, scale = 1, glowIntensity = 2,
  fov = 45, distance = 5, style,
}: SignalOrbProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, distance], fov }}
      style={{ background: "transparent", ...style }}
      gl={{
        alpha: true,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.6,
      }}
      dpr={[1, 2]}
    >
      <OrbMesh mouse={mouse} scrollY={scrollY} scale={scale} glowIntensity={glowIntensity} />
    </Canvas>
  );
}
