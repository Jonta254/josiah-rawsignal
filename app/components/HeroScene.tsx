"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { Vector2 } from "three";
import * as THREE from "three";

/* ──────────────────────────────────────────────────────────────────
   CONCEPT: "Copper Signal in the Void"

   Depth layers:
   z = -50 → -35   Background: ancient violet nebula cloud (point field)
   z = -30 → -20   Mid: copper/amber nebula + cyan pulse cloud
   z = -18 → -8    Near mid: aurora bands + floating rings
   z = -10 → -4    Foreground: wireframe shards + sparkles

   Colour temperature: warm amber from upper-right (star),
   cool cyan from lower-left (pulsar), deep violet behind.
────────────────────────────────────────────────────────────────── */

/* ── Point-cloud nebula ────────────────────────────────────────── */
function NebulaCloud({
  color, center, radius, count, size, opacity, speed,
}: {
  color: string; center: [number,number,number];
  radius: number; count: number; size: number; opacity: number; speed: number;
}) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Bias points toward center for realistic nebula density
      const r = Math.pow(Math.random(), 0.6) * radius;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = center[0] + r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = center[1] + r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = center[2] + r * Math.cos(phi);
    }
    return arr;
  }, [count, radius, center]);

  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * speed * 0.04;
      ref.current.rotation.x += dt * speed * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ── Aurora band ───────────────────────────────────────────────── */
function AuroraBand({
  y, z, width, height, color, opacity, speed, tilt = 0,
}: {
  y: number; z: number; width: number; height: number;
  color: string; opacity: number; speed: number; tilt?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    ref.current.position.y = y + Math.sin(t * speed) * 1.2;
    mat.opacity = opacity * (0.55 + Math.sin(t * speed * 1.7 + 1) * 0.45);
  });
  return (
    <mesh ref={ref} position={[0, y, z]} rotation={[tilt, 0, 0]}>
      <planeGeometry args={[width, height, 1, 1]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ── Wireframe shard ───────────────────────────────────────────── */
function Shard({
  pos, color, size, rx, ry, rz = 0,
}: {
  pos: [number,number,number]; color: string; size: number; rx: number; ry: number; rz?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * rx;
    ref.current.rotation.y += dt * ry;
    ref.current.rotation.z += dt * rz;
  });
  return (
    <Float speed={0.6} floatIntensity={0.8} rotationIntensity={0.1}>
      <mesh ref={ref} position={pos}>
        <octahedronGeometry args={[size, 0]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

/* ── Glowing ring ──────────────────────────────────────────────── */
function GlowRing({
  pos, color, r, tube, rx, ry,
}: {
  pos: [number,number,number]; color: string; r: number; tube: number; rx: number; ry: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x = rx + Math.sin(state.clock.elapsedTime * 0.5) * 0.25;
    ref.current.rotation.y += dt * ry;
  });
  return (
    <mesh ref={ref} position={pos}>
      <torusGeometry args={[r, tube, 6, 90]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ── Constellation grid ────────────────────────────────────────── */
function ConstellationGrid() {
  const { positions, indices } = useMemo(() => {
    const pts: number[] = [];
    const cols = 14, rows = 8;
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        pts.push(
          (c - cols / 2) * 4 + (Math.random() - 0.5) * 1.5,
          (r - rows / 2) * 3.5 + (Math.random() - 0.5) * 1.5,
          -30 + (Math.random() - 0.5) * 4
        );
      }
    }
    const idx: number[] = [];
    const n = pts.length / 3;
    for (let i = 0; i < n; i++) {
      if (Math.random() < 0.35 && i + 1 < n) idx.push(i, i + 1);
      if (Math.random() < 0.2 && i + cols < n) idx.push(i, i + cols);
    }
    return { positions: new Float32Array(pts), indices: new Uint16Array(idx) };
  }, []);

  const ref = useRef<THREE.LineSegments>(null);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.z += dt * 0.006; });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="index" args={[indices, 1]} />
      </bufferGeometry>
      <lineBasicMaterial
        color="#E8832A"
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

/* ── Scene data ────────────────────────────────────────────────── */
const SHARDS: Array<{ pos: [number,number,number]; color: string; size: number; rx: number; ry: number; rz: number }> = [
  { pos: [-7,  2.5, -8],  color: "#FF9040", size: 0.24, rx: 0.28, ry: 0.45, rz: 0.1  },
  { pos: [ 8, -1.5, -11], color: "#00EEFF", size: 0.20, rx: -0.35, ry: 0.22, rz: -0.1 },
  { pos: [-2, -4,   -7],  color: "#B040FF", size: 0.30, rx: 0.18, ry: -0.28, rz: 0.2  },
  { pos: [10,  4,  -14],  color: "#00FF88", size: 0.16, rx: -0.45, ry: 0.38, rz: 0.05 },
  { pos: [-10, 0.5, -17], color: "#FFB800", size: 0.38, rx: 0.25, ry: 0.55, rz: -0.15 },
  { pos: [ 4, -5.5, -9],  color: "#FF9040", size: 0.22, rx: -0.18, ry: -0.38, rz: 0.12 },
  { pos: [-4,  5.5, -13], color: "#00EEFF", size: 0.18, rx: 0.38, ry: 0.25, rz: -0.08 },
  { pos: [ 6,  5,  -10],  color: "#B040FF", size: 0.28, rx: -0.28, ry: -0.48, rz: 0.18 },
  { pos: [ 1, -6.5, -12], color: "#FFB800", size: 0.20, rx: 0.42, ry: 0.32, rz: -0.1  },
  { pos: [-8, -3.5, -9],  color: "#00FF88", size: 0.14, rx: -0.22, ry: 0.42, rz: 0.06  },
];

const RINGS = [
  { pos: [-5.5, 2.8, -10] as [number,number,number],  color: "#FF9040", r: 1.5, tube: 0.016, rx: 0.9,  ry: 0.40 },
  { pos: [ 7.5, -2,  -13] as [number,number,number],  color: "#00EEFF", r: 1.2, tube: 0.014, rx: 0.5,  ry: 0.55 },
  { pos: [-1.5, -4.5, -8] as [number,number,number],  color: "#B040FF", r: 0.9, tube: 0.012, rx: 1.2,  ry: 0.70 },
  { pos: [ 3.5,  5,  -11] as [number,number,number],  color: "#FFB800", r: 1.0, tube: 0.013, rx: 0.3,  ry: 0.35 },
];

/* ── Scene root ────────────────────────────────────────────────── */
function Scene({
  scrollY, mouse,
}: {
  scrollY: React.MutableRefObject<number>;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const root = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!root.current) return;
    const mx = mouse.current?.x ?? 0;
    const my = mouse.current?.y ?? 0;
    root.current.rotation.x += (-my * 0.014 - root.current.rotation.x) * 0.035;
    root.current.rotation.y += ( mx * 0.014 - root.current.rotation.y) * 0.035;
    root.current.position.y  = -(scrollY.current ?? 0) * 0.0015;
  });

  return (
    <group ref={root}>
      <fog attach="fog" args={["#010108", 30, 100]} />

      {/* ── Layer 1: Star field (cool blue-white) ── */}
      <Stars
        radius={90} depth={80} count={6000}
        factor={2.5} saturation={0.18} fade speed={0.3}
      />

      {/* ── Layer 2: Ancient violet nebula (far background) ── */}
      <NebulaCloud color="#7020D0" center={[3, 5, -40]}  radius={20} count={900} size={0.20} opacity={0.55} speed={0.15} />
      <NebulaCloud color="#4010A0" center={[-5, -2, -45]} radius={16} count={600} size={0.18} opacity={0.45} speed={0.10} />

      {/* ── Layer 3: Copper nebula (mid — links to the orb warmth) ── */}
      <NebulaCloud color="#FF7010" center={[-9, 2, -22]}  radius={11} count={550} size={0.16} opacity={0.60} speed={0.30} />
      <NebulaCloud color="#E05000" center={[-4, -3, -26]} radius={8}  count={350} size={0.14} opacity={0.50} speed={0.20} />

      {/* ── Layer 4: Cyan pulse cloud (right — where the orb lives) ── */}
      <NebulaCloud color="#00C8FF" center={[11, -1, -18]}  radius={9}  count={450} size={0.15} opacity={0.55} speed={0.40} />
      <NebulaCloud color="#00FFEE" center={[ 7,  5, -24]}  radius={7}  count={280} size={0.13} opacity={0.45} speed={0.25} />

      {/* ── Layer 5: Gold accent nebula (top — light source hint) ── */}
      <NebulaCloud color="#FFB800" center={[5, 10, -30]}  radius={10} count={400} size={0.18} opacity={0.50} speed={0.22} />

      {/* ── Layer 6: Constellation (structural skeleton) ── */}
      <ConstellationGrid />

      {/* ── Layer 7: Aurora bands ── */}
      <AuroraBand y={5}   z={-20} width={110} height={5}   color="#FF8820" opacity={0.09} speed={0.22} tilt={-0.10} />
      <AuroraBand y={1}   z={-16} width={90}  height={3.5} color="#00DFFF" opacity={0.08} speed={0.30} tilt={0.06}  />
      <AuroraBand y={-5}  z={-18} width={100} height={4}   color="#9030E0" opacity={0.07} speed={0.18} tilt={0.12}  />
      <AuroraBand y={3.5} z={-12} width={70}  height={2.5} color="#FFB800" opacity={0.06} speed={0.40} tilt={-0.08} />

      {/* ── Layer 8: Wireframe shards ── */}
      {SHARDS.map((s, i) => <Shard key={i} {...s} />)}

      {/* ── Layer 9: Glowing rings ── */}
      {RINGS.map((r, i) => <GlowRing key={i} {...r} />)}

      {/* ── Layer 10: Foreground sparkles (ambient signal particles) ── */}
      <Sparkles
        count={120}
        scale={[22, 14, 10]}
        size={2.8}
        speed={0.35}
        opacity={0.8}
        color="#FFB800"
        noise={0.3}
      />
      <Sparkles
        count={60}
        scale={[18, 12, 8]}
        size={1.8}
        speed={0.5}
        opacity={0.6}
        color="#00EEFF"
        noise={0.4}
      />

      {/* ── Scene lights — deliberate cross-illumination ── */}
      {/* Warm copper "star" from upper-right */}
      <pointLight color="#FF8820" intensity={6}    position={[16,  12,  6]}  distance={55} />
      {/* Cold cyan "pulsar" from lower-left */}
      <pointLight color="#00DFFF" intensity={4}    position={[-14, -8,  5]}  distance={45} />
      {/* Violet depth fill */}
      <pointLight color="#8020D0" intensity={2.5}  position={[0,   15, -8]}  distance={35} />
      {/* Gold rim from above */}
      <pointLight color="#FFB800" intensity={3}    position={[6,   18, -4]}  distance={40} />
      {/* Emerald accent */}
      <pointLight color="#00FF88" intensity={1.8}  position={[-8,  -14, 4]}  distance={30} />
      <ambientLight intensity={0.015} />

      {/* ── Post-processing ── */}
      <EffectComposer>
        <Bloom
          intensity={2.8}
          luminanceThreshold={0.04}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          offset={new Vector2(0.0005, 0.0005)}
          radialModulation={false}
          modulationOffset={0.15}
        />
        <Vignette eskil={false} offset={0.35} darkness={0.55} />
      </EffectComposer>
    </group>
  );
}

/* ── Canvas export ─────────────────────────────────────────────── */
export default function HeroScene({
  scrollY, mouse,
}: {
  scrollY: React.MutableRefObject<number>;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 65 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{
        alpha: true,
        antialias: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.6,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.5]}
    >
      <Scene scrollY={scrollY} mouse={mouse} />
    </Canvas>
  );
}
