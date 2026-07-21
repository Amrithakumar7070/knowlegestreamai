"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { Terminal, Cpu, Sparkles, Activity, CheckCircle2 } from "lucide-react";

function LaptopModel3D() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Laptop Base Keyboard */}
      <mesh position={[0, -0.1, 0.4]}>
        <boxGeometry args={[3.6, 0.15, 2.4]} />
        <meshStandardMaterial color="#1E1E2E" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Keyboard Trackpad */}
      <mesh position={[0, -0.02, 1.1]}>
        <boxGeometry args={[1.0, 0.02, 0.7]} />
        <meshStandardMaterial color="#2E2E3E" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Laptop Screen Hinge */}
      <mesh position={[0, 0, -0.7]} rotation={[0.2, 0, 0]}>
        {/* Screen Bezel */}
        <mesh position={[0, 1.25, 0]}>
          <boxGeometry args={[3.6, 2.4, 0.08]} />
          <meshStandardMaterial color="#0F0F1A" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Live Interactive Screen Html */}
        <Html
          transform
          wrapperClass="laptop-screen"
          position={[0, 1.25, 0.05]}
          distanceFactor={1.8}
        >
          <div className="w-[740px] h-[480px] bg-[#09090D] border border-blue-500/30 rounded-lg p-4 font-mono text-xs overflow-hidden select-none text-white shadow-2xl flex flex-col justify-between">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-slate-400 text-xs flex items-center gap-1.5 font-sans">
                  <Terminal size={14} className="text-blue-400" />
                  KnowledgeStream OS v3.4 — Active Session
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-sans">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                AI Core Online (0.4ms)
              </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-12 gap-3 my-3 flex-1">
              {/* Left Code Editor Panel */}
              <div className="col-span-7 bg-[#12121A] rounded border border-white/10 p-3 flex flex-col justify-between">
                <div className="space-y-1 text-slate-300">
                  <div className="text-slate-500">// KnowledgeStream Neural Compiler</div>
                  <div>
                    <span className="text-purple-400">import</span> &#123; AI_Core, NeuralMesh &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">&apos;@ks/ai-engine&apos;</span>;
                  </div>
                  <br />
                  <div>
                    <span className="text-blue-400">async function</span> <span className="text-yellow-300 font-bold">optimizeCodebase</span>(project) &#123;
                  </div>
                  <div className="pl-4 text-cyan-300">
                    const agent = await AI_Core.deploy(&#123; speed: &apos;ultra&apos; &#125;);
                  </div>
                  <div className="pl-4 text-slate-300">
                    return agent.synthesize(project.ast);
                  </div>
                  <div>&#125;</div>
                </div>

                <div className="mt-3 bg-blue-500/10 border border-blue-500/30 rounded p-2 text-[11px] text-blue-300 flex items-center justify-between font-sans">
                  <span className="flex items-center gap-1">
                    <Sparkles size={13} className="text-cyan-400" />
                    AI Auto-Refactor completed (124ms)
                  </span>
                  <span className="text-emerald-400 font-bold">+98% Score</span>
                </div>
              </div>

              {/* Right Graph & Analytics Panel */}
              <div className="col-span-5 flex flex-col gap-2">
                <div className="bg-[#12121A] rounded border border-white/10 p-2.5">
                  <div className="text-[10px] text-slate-400 uppercase font-sans mb-1 flex items-center justify-between">
                    <span>Model Throughput</span>
                    <Activity size={12} className="text-purple-400" />
                  </div>
                  <div className="text-lg font-bold text-cyan-400 font-sans">4.8k tokens/s</div>
                  {/* Visual Bar Graph */}
                  <div className="flex items-end gap-1 h-10 mt-2">
                    {[40, 65, 55, 80, 95, 75, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-[#12121A] rounded border border-white/10 p-2.5 flex-1 flex flex-col justify-between">
                  <div className="text-[10px] text-slate-400 font-sans uppercase">Active Workforce</div>
                  <div className="flex items-center gap-2 font-sans my-1">
                    <Cpu size={16} className="text-emerald-400" />
                    <span className="text-sm font-semibold text-white">48 Autonomous Agents</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans">
                    Tasks queued: <span className="text-purple-400 font-semibold">1,240</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status bar */}
            <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[10px] text-slate-400 font-sans">
              <span>Status: Synchronized with Edge Nodes</span>
              <span className="text-blue-400">Latency: 4ms</span>
            </div>
          </div>
        </Html>
      </mesh>
    </group>
  );
}

function FloatingOrbsAndBadges() {
  return (
    <>
      {/* Floating Graph Card */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8} position={[-4, 1.5, 0]}>
        <Html center distanceFactor={10}>
          <div className="glass-panel p-3 rounded-xl border border-cyan-500/40 text-xs w-48 shadow-2xl animate-pulse-slow">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-1">
              <Activity size={14} />
              Realtime Performance
            </div>
            <div className="text-2xl font-bold text-white">99.98%</div>
            <div className="text-[10px] text-emerald-400">↑ +14.2% efficiency boost</div>
          </div>
        </Html>
      </Float>

      {/* Floating AI Chat Bubble */}
      <Float speed={2.5} rotationIntensity={0.15} floatIntensity={0.7} position={[3.8, 1.8, 0.5]}>
        <Html center distanceFactor={10}>
          <div className="glass-panel p-3 rounded-xl border border-purple-500/40 text-xs w-52 shadow-2xl">
            <div className="flex items-center gap-2 text-purple-400 font-semibold mb-1">
              <Sparkles size={14} />
              AI Code Mentor
            </div>
            <p className="text-[11px] text-slate-300">
              &quot;I optimized your database query indexes automatically.&quot;
            </p>
          </div>
        </Html>
      </Float>

      {/* Floating Notification */}
      <Float speed={1.8} rotationIntensity={0.1} floatIntensity={0.6} position={[3.5, -1.2, 1]}>
        <Html center distanceFactor={10}>
          <div className="glass-panel p-2.5 rounded-xl border border-emerald-500/40 text-xs w-48 shadow-2xl flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <div>
              <div className="font-semibold text-white text-[11px]">Deploy Success</div>
              <div className="text-[9px] text-slate-400">Vercel Edge &bull; 0.2s</div>
            </div>
          </div>
        </Html>
      </Float>
    </>
  );
}

export function LaptopCanvas() {
  return (
    <div className="w-full h-[550px] relative">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} color="#3B82F6" />
        <pointLight position={[-8, -5, -5]} intensity={1.5} color="#A855F7" />

        <LaptopModel3D />
        <FloatingOrbsAndBadges />
      </Canvas>
    </div>
  );
}
