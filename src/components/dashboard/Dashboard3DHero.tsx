"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const HERO_TECH_LOGOS = [
  { name: "React", color: "#06B6D4", icon: "⚛️" },
  { name: "Next.js", color: "#FFFFFF", icon: "▲" },
  { name: "Java", color: "#F97316", icon: "☕" },
  { name: "Python", color: "#38BDF8", icon: "🐍" },
  { name: "Docker", color: "#3B82F6", icon: "🐳" },
  { name: "Git", color: "#EF4444", icon: "🌿" },
  { name: "Linux", color: "#FACC15", icon: "🐧" },
  { name: "AI", color: "#A855F7", icon: "🤖" },
  { name: "Cloud", color: "#60A5FA", icon: "☁️" },
  { name: "Supabase", color: "#10B981", icon: "⚡" },
  { name: "Node", color: "#22C55E", icon: "🟢" },
  { name: "TypeScript", color: "#3178C6", icon: "🔷" },
];

function HolographicCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.2;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.5;
    if (ring2Ref.current) ring2Ref.current.rotation.z -= delta * 0.4;
  });

  return (
    <group scale={1.0}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.3, 2]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#1D4ED8"
          emissiveIntensity={2.2}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.025, 16, 100]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={2.5} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[2.6, 0.025, 16, 100]} />
        <meshStandardMaterial color="#A855F7" emissive="#9333EA" emissiveIntensity={2.5} />
      </mesh>
    </group>
  );
}

function OrbitingTechLogos() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      {HERO_TECH_LOGOS.map((tech, index) => {
        const angle = (index / HERO_TECH_LOGOS.length) * Math.PI * 2;
        const radius = 3.6;
        const height = Math.sin(index * 1.5) * 0.9;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={tech.name} position={[x, height, z]}>
            <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.5}>
              <Html center distanceFactor={11} zIndexRange={[0, 10]}>
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-panel border border-white/20 text-[11px] font-semibold whitespace-nowrap shadow-lg select-none"
                  style={{
                    boxShadow: `0 0 12px ${tech.color}40`,
                    borderColor: `${tech.color}60`,
                  }}
                >
                  <span className="text-xs">{tech.icon}</span>
                  <span style={{ color: tech.color }}>{tech.name}</span>
                </div>
              </Html>
            </Float>
          </group>
        );
      })}
    </group>
  );
}

export function Dashboard3DHero() {
  return (
    <div className="w-full h-72 sm:h-80 glass-panel rounded-3xl border border-white/10 relative overflow-hidden bg-[#0A0A12]/80 flex items-center justify-center shadow-2xl z-0">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner overlay text */}
      <div className="absolute top-4 left-6 z-10">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/20 text-cyan-300 border border-cyan-500/30">
          NEURAL MESH ENGINE ACTIVE
        </span>
      </div>

      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#3B82F6" />
        <pointLight position={[-8, -5, -5]} intensity={1.5} color="#A855F7" />

        <HolographicCore />
        <OrbitingTechLogos />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 2.4}
        />
      </Canvas>
    </div>
  );
}
