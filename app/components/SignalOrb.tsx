"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ──────────────────────────────────────────────────────────────────
   SIGNAL ORB — "Star trapped in a cage of signal rings"

   Structure (inside out):
   1. Brilliant white-gold star core — pure emissive point
   2. Copper plasma shell — MeshDistortMaterial breathing
   3. Outer copper icosahedron wireframe — rotating
   4. Inner cyan octahedron wireframe — counter-rotating
   5. 5 orbital rings — each at a different plane, different color
   6. Corona aura — large semi-transparent sphere
   7. Sparkles — 40 close particles orbiting
────────────────────────────────────────────────────────────────── */

function OrbMesh({
  mouse, scale = 1, glowIntensity = 2.2, scrollY,
}: {
  mouse?: React.MutableRefObject<{ x: number; y: number }>;
  scale?: number;
  glowIntensity?: number;
  scrollY?: React.MutableRefObject<number>;
}) {
  const groupRef  = useRef<THREE.Group>(null);
  const coreRef   = useRef<THREE.Mesh>(null);
  const plasmaRef = useRef<THREE.Mesh>(null);
  const icoRef    = useRef<THREE.Mesh>(null);
  const octRef    = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);
  const r4 = useRef<THREE.Mesh>(null);
  const r5 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const scroll = scrollY?.current ?? 0;
    const spd = 1 + scroll * 0.0016;

    /* ── Wireframes ── */
    if (icoRef.current) {
      icoRef.current.rotation.x += delta * 0.09 * spd;
      icoRef.current.rotation.y += delta * 0.16 * spd;
    }
    if (octRef.current) {
      octRef.current.rotation.x -= delta * 0.12 * spd;
      octRef.current.rotation.z += delta * 0.10 * spd;
    }

    /* ── Core pulse ── */
    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = glowIntensity + Math.sin(t * 2.4) * 1.0;
    }

    /* ── Corona breathe ── */
    if (coronaRef.current) {
      const mat = coronaRef.current.material as THREE.MeshBasicMaterial;
      const s = 1 + Math.sin(t * 1.2) * 0.06;
      coronaRef.current.scale.setScalar(s);
      mat.opacity = 0.035 + Math.sin(t * 0.9) * 0.018;
    }

    /* ── Mouse parallax ── */
    if (groupRef.current && mouse) {
      groupRef.current.rotation.x += (mouse.current.y * 0.35 - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (mouse.current.x * 0.35 - groupRef.current.rotation.y) * 0.05;
    }

    /* ── Rings ── */
    if (r1.current) r1.current.rotation.z += delta * 0.65 * spd;
    if (r2.current) r2.current.rotation.x -= delta * 0.85 * spd;
    if (r3.current) r3.current.rotation.y += delta * 1.05 * spd;
    if (r4.current) r4.current.rotation.z -= delta * 0.50 * spd;
    if (r5.current) r5.current.rotation.x += delta * 0.75 * spd;
  });

  const s = scale;

  return (
    <group ref={groupRef}>
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.7}>

        {/* ── Corona aura — large soft outer glow ── */}
        <mesh ref={coronaRef} scale={[s * 2.4, s * 2.4, s * 2.4]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color="#FF8820"
            transparent
            opacity={0.04}
            side={THREE.BackSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* ── Outer icosahedron wireframe — copper ── */}
        <mesh ref={icoRef} scale={[s, s, s]}>
          <icosahedronGeometry args={[1.78, 1]} />
          <meshBasicMaterial
            color="#FF9040"
            wireframe
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* ── Inner octahedron wireframe — cyan, counter-spin ── */}
        <mesh ref={octRef} scale={[s * 1.18, s * 1.18, s * 1.18]}>
          <octahedronGeometry args={[1, 2]} />
          <meshBasicMaterial
            color="#00EEFF"
            wireframe
            transparent
            opacity={0.16}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* ── Plasma shell — copper fire breathing ── */}
        <mesh ref={plasmaRef} scale={[s * 0.94, s * 0.94, s * 0.94]}>
          <sphereGeometry args={[0.56, 96, 96]} />
          <MeshDistortMaterial
            color="#060100"
            emissive="#FF7010"
            emissiveIntensity={1.4}
            distort={0.55}
            speed={3.5}
            roughness={0.0}
            metalness={1.0}
            transparent
            opacity={0.95}
          />
        </mesh>

        {/* ── Star core — brilliant white-gold ── */}
        <mesh ref={coreRef} scale={[s * 0.36, s * 0.36, s * 0.36]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FFE080"
            emissiveIntensity={glowIntensity}
            roughness={0}
            metalness={1}
          />
        </mesh>

        {/* ── Orbital rings — 5 planes, 5 colors ── */}
        <mesh ref={r1} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.00 * s, 0.014, 8, 120]} />
          <meshBasicMaterial color="#FFB800" transparent opacity={0.90} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh ref={r2} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[1.16 * s, 0.012, 8, 120]} />
          <meshBasicMaterial color="#00EEFF" transparent opacity={0.80} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh ref={r3} rotation={[Math.PI / 6, 0, Math.PI / 3]}>
          <torusGeometry args={[1.32 * s, 0.012, 8, 120]} />
          <meshBasicMaterial color="#C040FF" transparent opacity={0.72} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh ref={r4} rotation={[0, Math.PI / 3, Math.PI / 5]}>
          <torusGeometry args={[1.11 * s, 0.010, 8, 120]} />
          <meshBasicMaterial color="#00FF88" transparent opacity={0.65} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh ref={r5} rotation={[Math.PI / 4, 0, Math.PI / 6]}>
          <torusGeometry args={[1.25 * s, 0.010, 8, 120]} />
          <meshBasicMaterial color="#FFF0C0" transparent opacity={0.48} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>

        {/* ── Close orbit sparkles ── */}
        <Sparkles
          count={40}
          scale={[s * 3.2, s * 3.2, s * 3.2]}
          size={1.5}
          speed={0.6}
          opacity={0.9}
          color="#FFB800"
          noise={0.6}
        />
        <Sparkles
          count={20}
          scale={[s * 4, s * 4, s * 4]}
          size={1.0}
          speed={0.4}
          opacity={0.6}
          color="#00EEFF"
          noise={0.5}
        />
      </Float>

      {/* ── Lighting rig — 3 key + 2 fill + 1 backlight ── */}
      {/* Key: warm amber from upper-right — the "star" */}
      <pointLight color="#FF8820" intensity={14}  position={[4,  5,  3]} distance={14} />
      {/* Key: cool cyan from lower-left — the "pulsar" */}
      <pointLight color="#00DFFF" intensity={6}   position={[-3, -3, 2]} distance={9}  />
      {/* Key: gold from top */}
      <pointLight color="#FFD060" intensity={8}   position={[0,  5,  2]} distance={10} />
      {/* Fill: violet from behind */}
      <pointLight color="#9030D0" intensity={3}   position={[-4,  2, -3]} distance={8} />
      {/* Fill: emerald from below */}
      <pointLight color="#00FF88" intensity={2.5} position={[2, -5,  1]} distance={7}  />
      {/* Backlight rim */}
      <pointLight color="#FF6000" intensity={4}   position={[-2,  0, -4]} distance={8} />
      <ambientLight intensity={0.04} />

      {/* ── Bloom — very strong on the orb ── */}
      <EffectComposer>
        <Bloom
          intensity={3.5}
          luminanceThreshold={0.02}
          luminanceSmoothing={0.88}
          mipmapBlur
        />
      </EffectComposer>
    </group>
  );
}

export default function SignalOrb({
  mouse, scrollY, scale = 1, glowIntensity = 2.2,
  fov = 45, distance = 5, style,
}: {
  mouse?: React.MutableRefObject<{ x: number; y: number }>;
  scrollY?: React.MutableRefObject<number>;
  scale?: number;
  glowIntensity?: number;
  fov?: number;
  distance?: number;
  style?: React.CSSProperties;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, distance], fov }}
      style={{ background: "transparent", ...style }}
      gl={{
        alpha: true,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.8,
        powerPreference: "high-performance",
      }}
      dpr={[1, 2]}
    >
      <OrbMesh mouse={mouse} scrollY={scrollY} scale={scale} glowIntensity={glowIntensity} />
    </Canvas>
  );
}
