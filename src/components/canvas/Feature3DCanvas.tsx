"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type FeatureType =
  | "robot"
  | "office"
  | "cap"
  | "chart"
  | "nodes"
  | "cloud";

interface Feature3DProps {
  type: FeatureType;
  color?: string;
}

function RobotHeadMesh({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.8;
  });

  return (
    <group ref={groupRef}>
      {/* Head Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.4, 1.4, 1.2]} />
        <meshStandardMaterial color={color} wireframe emissive={color} emissiveIntensity={0.6} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.4, 0.2, 0.65]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.4, 0.2, 0.65]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={2} />
      </mesh>
      {/* Antenna */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function OfficeBuildingMesh({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.5;
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Main Tower */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[1.2, 2.2, 1.2]} />
        <meshStandardMaterial color={color} wireframe emissive={color} emissiveIntensity={0.8} />
      </mesh>
      {/* Side Wing */}
      <mesh position={[0.9, 0.6, 0]}>
        <boxGeometry args={[0.6, 1.4, 0.8]} />
        <meshStandardMaterial color="#06B6D4" wireframe emissive="#06B6D4" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

function GraduationCapMesh({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.7;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.002) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Diamond Top */}
      <mesh position={[0, 0.2, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[2.0, 0.1, 2.0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} wireframe />
      </mesh>
      {/* Skull Cap Base */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.6, 16]} />
        <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.8} wireframe />
      </mesh>
    </group>
  );
}

function HolographicChartMesh({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.6;
  });

  return (
    <group ref={groupRef} position={[-0.6, -0.6, 0]}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.3, 1.0, 0.3]} />
        <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0.5, 0.8, 0]}>
        <boxGeometry args={[0.3, 1.6, 0.3]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8} />
      </mesh>
      <mesh position={[1.0, 1.2, 0]}>
        <boxGeometry args={[0.3, 2.4, 0.3]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={2.0} />
      </mesh>
    </group>
  );
}

function ConnectedNodesMesh({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.7;
      groupRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {[
        [0, 0, 0],
        [1.1, 0.7, 0],
        [-1.1, -0.7, 0],
        [0, 1.1, 0.8],
        [0, -1.1, -0.8],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color={i === 0 ? color : "#06B6D4"}
            emissive={i === 0 ? color : "#06B6D4"}
            emissiveIntensity={2}
          />
        </mesh>
      ))}
      <mesh>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial color="#7C3AED" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function FloatingCloudMesh({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshStandardMaterial color={color} wireframe emissive={color} emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[-0.7, -0.2, 0]}>
        <sphereGeometry args={[0.65, 16, 16]} />
        <meshStandardMaterial color="#3B82F6" wireframe emissive="#3B82F6" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0.7, -0.2, 0]}>
        <sphereGeometry args={[0.65, 16, 16]} />
        <meshStandardMaterial color="#06B6D4" wireframe emissive="#06B6D4" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

export function Feature3DCanvas({
  type,
  color = "#3B82F6",
}: Feature3DProps) {
  return (
    <div className="w-full h-44 relative">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#FFFFFF" />
        <pointLight position={[-5, -5, -5]} intensity={1.5} color={color} />

        {type === "robot" && <RobotHeadMesh color={color} />}
        {type === "office" && <OfficeBuildingMesh color={color} />}
        {type === "cap" && <GraduationCapMesh color={color} />}
        {type === "chart" && <HolographicChartMesh color={color} />}
        {type === "nodes" && <ConnectedNodesMesh color={color} />}
        {type === "cloud" && <FloatingCloudMesh color={color} />}
      </Canvas>
    </div>
  );
}
