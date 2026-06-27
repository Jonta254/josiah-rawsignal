"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ── Nebula cloud ──────────────────────────────────────────────── */
function NebulaSphere({
  color, position, radius, speed, opacity,
}: { color: string; position: [number,number,number]; radius: number; speed: number; opacity: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * speed * 0.08;
    ref.current.rotation.y += dt * speed * 0.14;
  });
  return (
    <Float speed={speed * 0.35} floatIntensity={1.4} rotationIntensity={0.3}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[radius, 2]} />
        <meshStandardMaterial
          color={color} emissive={color} emissiveIntensity={0.4}
          transparent opacity={opacity} roughness={1} metalness={0} depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

/* ── Wireframe shard ───────────────────────────────────────────── */
function Shard({ position, color, size, rx, ry }: {
  position: [number,number,number]; color: string; size: number; rx: number; ry: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * rx;
    ref.current.rotation.y += dt * ry;
  });
  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[size, 0]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
    </mesh>
  );
}

/* ── Floating ring ─────────────────────────────────────────────── */
function Ring({ position, color, radius, speed }: {
  position: [number,number,number]; color: string; radius: number; speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.5;
    ref.current.rotation.y += dt * speed * 0.6;
  });
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[radius, 0.018, 6, 80]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
  );
}

/* ── Aurora band ───────────────────────────────────────────────── */
function Aurora({ y, color, opacity }: { y: number; color: string; opacity: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = y + Math.sin(state.clock.elapsedTime * 0.25) * 0.8;
    ref.current.material.opacity = opacity * (0.7 + Math.sin(state.clock.elapsedTime * 0.4) * 0.3);
  });
  return (
    <mesh ref={ref} position={[0, y, -22]} rotation={[-0.12, 0, 0]}>
      <planeGeometry args={[100, 6, 1, 1]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

/* ── Particle grid ─────────────────────────────────────────────── */
function ParticleGrid() {
  const count = 120;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const col = i % 12, row = Math.floor(i / 12);
    positions[i * 3]     = (col - 5.5) * 3.2;
    positions[i * 3 + 1] = (row - 4.5) * 3.2;
    positions[i * 3 + 2] = -18;
  }
  const ref = useRef<THREE.Points>(null);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.z += dt * 0.008; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#E8832A" transparent opacity={0.18} sizeAttenuation />
    </points>
  );
}

/* ── Main scene ────────────────────────────────────────────────── */
const SHARDS = [
  { position: [-6, 2, -8]  as [number,number,number], color: "#FF9040", size: 0.22, rx: 0.30, ry: 0.50 },
  { position: [7, -1, -10] as [number,number,number], color: "#00EEFF", size: 0.18, rx: -0.40, ry: 0.20 },
  { position: [-3, -3, -6] as [number,number,number], color: "#C060FF", size: 0.28, rx: 0.20, ry: -0.30 },
  { position: [9, 3, -14]  as [number,number,number], color: "#00FF80", size: 0.15, rx: -0.50, ry: 0.40 },
  { position: [-9, 0, -16] as [number,number,number], color: "#FFB800", size: 0.34, rx: 0.30, ry: 0.60 },
  { position: [3, -5, -9]  as [number,number,number], color: "#FF9040", size: 0.20, rx: -0.20, ry: -0.40 },
  { position: [-4, 5, -12] as [number,number,number], color: "#00EEFF", size: 0.17, rx: 0.40, ry: 0.30 },
  { position: [5, 6, -11]  as [number,number,number], color: "#C060FF", size: 0.26, rx: -0.30, ry: -0.50 },
  { position: [0, -6, -13] as [number,number,number], color: "#FFB800", size: 0.19, rx: 0.45, ry: 0.35 },
];

const RINGS = [
  { position: [-5, 3, -10]  as [number,number,number], color: "#FF9040", radius: 1.4, speed: 0.4 },
  { position: [8, -2, -14]  as [number,number,number], color: "#00EEFF", radius: 1.1, speed: 0.6 },
  { position: [-1, -5, -8]  as [number,number,number], color: "#C060FF", radius: 0.8, speed: 0.8 },
];

function SceneContent({
  scrollY, mouse,
}: {
  scrollY: React.MutableRefObject<number>;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const mx = mouse.current?.x ?? 0;
    const my = mouse.current?.y ?? 0;
    const scroll = scrollY.current ?? 0;
    groupRef.current.rotation.x += (-my * 0.018 - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y += (mx  * 0.018 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.position.y  = -scroll * 0.0018;
  });

  return (
    <group ref={groupRef}>
      <fog attach="fog" args={["#010106", 28, 95]} />

      {/* Deep star field */}
      <Stars radius={90} depth={70} count={5000} factor={2.8} saturation={0.15} fade speed={0.35} />

      {/* Particle grid (subtle background structure) */}
      <ParticleGrid />

      {/* Nebula clouds — large, slow, coloured volumes */}
      <NebulaSphere color="#E8832A" position={[-9, 2, -16]}   radius={7.5} speed={0.4} opacity={0.08} />
      <NebulaSphere color="#00DFFF" position={[12, -4, -22]}  radius={10}  speed={0.3} opacity={0.065} />
      <NebulaSphere color="#BF5FFF" position={[1, 7, -30]}    radius={14}  speed={0.2} opacity={0.05} />
      <NebulaSphere color="#00FF80" position={[-14, -6, -19]} radius={7}   speed={0.5} opacity={0.06} />
      <NebulaSphere color="#FFB800" position={[6, 10, -24]}   radius={9}   speed={0.25} opacity={0.045} />

      {/* Aurora horizontal bands */}
      <Aurora y={4}   color="#FF8830" opacity={0.07} />
      <Aurora y={0}   color="#00DFFF" opacity={0.06} />
      <Aurora y={-5}  color="#C060FF" opacity={0.055} />

      {/* Wireframe shards */}
      {SHARDS.map((s, i) => <Shard key={i} {...s} />)}

      {/* Floating rings */}
      {RINGS.map((r, i) => <Ring key={i} {...r} />)}

      {/* Cross-colored scene lights for nebula illumination */}
      <pointLight color="#FF9040" intensity={4}   position={[-14, 8, 5]}  distance={45} />
      <pointLight color="#00EEFF" intensity={3}   position={[14, -5, 5]}  distance={35} />
      <pointLight color="#C060FF" intensity={2.5} position={[0, 12, -6]}  distance={28} />
      <pointLight color="#00FF80" intensity={1.8} position={[-7, -12, 4]} distance={24} />
      <pointLight color="#FFB800" intensity={2}   position={[7, 10, -4]}  distance={30} />
      <ambientLight intensity={0.025} />

      <EffectComposer>
        <Bloom intensity={2.2} luminanceThreshold={0.06} luminanceSmoothing={0.88} mipmapBlur />
      </EffectComposer>
    </group>
  );
}

export default function HeroScene({
  scrollY, mouse,
}: {
  scrollY: React.MutableRefObject<number>;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 68 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{
        alpha: true,
        antialias: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.5,
      }}
      dpr={[1, 1.5]}
    >
      <SceneContent scrollY={scrollY} mouse={mouse} />
    </Canvas>
  );
}
