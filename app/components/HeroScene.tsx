"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Vector2 } from "three";
import * as THREE from "three";

/* ── Point-cloud nebula ────────────────────────────────────────── */
function NebulaCloud({ color, center, radius, count, size, opacity, speed }: {
  color: string; center: [number,number,number];
  radius: number; count: number; size: number; opacity: number; speed: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 0.5) * radius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i*3]   = center[0] + r * Math.sin(phi) * Math.cos(theta);
      arr[i*3+1] = center[1] + r * Math.sin(phi) * Math.sin(theta);
      arr[i*3+2] = center[2] + r * Math.cos(phi);
    }
    return arr;
  }, [count, radius, center]);

  useFrame((_, dt) => {
    if (ref.current) { ref.current.rotation.y += dt * speed * 0.05; ref.current.rotation.x += dt * speed * 0.02; }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={size} color={color} transparent opacity={opacity} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ── Aurora band ───────────────────────────────────────────────── */
function Aurora({ y, z, color, opacity, speed }: { y:number; z:number; color:string; opacity:number; speed:number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    ref.current.position.y = y + Math.sin(s.clock.elapsedTime * speed) * 1.5;
    mat.opacity = opacity * (0.5 + Math.abs(Math.sin(s.clock.elapsedTime * speed * 1.3)) * 0.5);
  });
  return (
    <mesh ref={ref} position={[0, y, z]} rotation={[-0.1, 0, 0]}>
      <planeGeometry args={[120, 5]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

/* ── Wireframe shard ───────────────────────────────────────────── */
function Shard({ pos, color, size, rx, ry, rz = 0 }: { pos:[number,number,number]; color:string; size:number; rx:number; ry:number; rz?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => { if (ref.current) { ref.current.rotation.x += dt*rx; ref.current.rotation.y += dt*ry; ref.current.rotation.z += dt*rz; } });
  return (
    <Float speed={0.5} floatIntensity={0.9}>
      <mesh ref={ref} position={pos}>
        <octahedronGeometry args={[size, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.65} blending={THREE.AdditiveBlending} depthWrite={false} />
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

function Scene({ scrollY, mouse }: { scrollY: React.MutableRefObject<number>; mouse: React.MutableRefObject<{x:number;y:number}> }) {
  const root = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!root.current) return;
    root.current.rotation.x += (-( mouse.current?.y??0)*0.015 - root.current.rotation.x)*0.04;
    root.current.rotation.y += (  ( mouse.current?.x??0)*0.015 - root.current.rotation.y)*0.04;
    root.current.position.y  = -(scrollY.current??0)*0.0014;
  });

  return (
    <group ref={root}>
      {/* Very large vivid stars */}
      <Stars radius={85} depth={70} count={8000} factor={7} saturation={0.9} fade speed={0.4} />

      {/* Violet nebula — background anchor */}
      <NebulaCloud color="#8030E0" center={[4,6,-42]}   radius={22} count={1200} size={0.38} opacity={0.80} speed={0.12} />
      <NebulaCloud color="#5018C0" center={[-6,-3,-48]} radius={18} count={800}  size={0.32} opacity={0.70} speed={0.08} />

      {/* Copper/amber nebula — mid, left side */}
      <NebulaCloud color="#FF7010" center={[-10,3,-22]} radius={12} count={700}  size={0.34} opacity={0.85} speed={0.28} />
      <NebulaCloud color="#FF9030" center={[-5,-4,-28]} radius={9}  size={0.28}  count={450} opacity={0.75} speed={0.18} />

      {/* Cyan nebula — mid right, where orb lives */}
      <NebulaCloud color="#00C8FF" center={[12,-1,-20]} radius={10} count={550}  size={0.32} opacity={0.80} speed={0.35} />
      <NebulaCloud color="#00FFEE" center={[7, 5,-26]}  radius={8}  count={350}  size={0.28} opacity={0.70} speed={0.22} />

      {/* Gold accent — top */}
      <NebulaCloud color="#FFB800" center={[5,12,-32]}  radius={11} count={500}  size={0.36} opacity={0.78} speed={0.20} />

      {/* Aurora bands */}
      <Aurora y={5}   z={-18} color="#FF8020" opacity={0.12} speed={0.20} />
      <Aurora y={1}   z={-14} color="#00DFFF" opacity={0.10} speed={0.28} />
      <Aurora y={-5}  z={-16} color="#9030E0" opacity={0.09} speed={0.16} />

      {/* Wireframe shards */}
      {SHARDS.map((s,i) => <Shard key={i} {...s} />)}

      {/* Foreground sparkles */}
      <Sparkles count={150} scale={[24,16,10]} size={3.5} speed={0.4} opacity={0.9} color="#FFB800" noise={0.3} />
      <Sparkles count={80}  scale={[20,14,8]}  size={2.5} speed={0.6} opacity={0.7} color="#00EEFF" noise={0.4} />
      <Sparkles count={40}  scale={[16,12,6]}  size={2.0} speed={0.3} opacity={0.6} color="#C060FF" noise={0.5} />

      {/* Cross-coloured scene lights */}
      <pointLight color="#FF8820" intensity={8}   position={[16, 12, 6]}  distance={60} />
      <pointLight color="#00DFFF" intensity={5}   position={[-14,-8, 5]}  distance={50} />
      <pointLight color="#8020D0" intensity={3}   position={[0,  16,-8]}  distance={40} />
      <pointLight color="#FFB800" intensity={4}   position={[6,  18,-4]}  distance={45} />
      <ambientLight intensity={0.02} />

      <EffectComposer>
        <Bloom intensity={4.0} luminanceThreshold={0.01} luminanceSmoothing={0.92} mipmapBlur />
      </EffectComposer>
    </group>
  );
}

export default function HeroScene({ scrollY, mouse }: { scrollY: React.MutableRefObject<number>; mouse: React.MutableRefObject<{x:number;y:number}> }) {
  return (
    <Canvas
      camera={{ position:[0,0,7], fov:65 }}
      style={{ position:"absolute", inset:0 }}
      gl={{ alpha:true, antialias:false, toneMapping:THREE.ACESFilmicToneMapping, toneMappingExposure:1.8, powerPreference:"high-performance" }}
      dpr={[1,1.5]}
    >
      <Scene scrollY={scrollY} mouse={mouse} />
    </Canvas>
  );
}
