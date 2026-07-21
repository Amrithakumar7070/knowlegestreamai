"use client";

import React from "react";
import { LaptopCanvas } from "../canvas/LaptopCanvas";
import { Sparkles, Cpu, Code2, Globe } from "lucide-react";

export function DemoSection() {
  return (
    <section id="demo" className="py-28 relative z-10 bg-[#09090B]/90 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30">
            Interactive OS Simulation
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Experience the <span className="gradient-text-hero">KnowledgeStream AI OS</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Interact with our live 3D desktop workspace. Watch real-time AI code refactoring, token throughput telemetry, and edge agent synchronization.
          </p>
        </div>

        {/* Feature Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8 text-center">
          <div className="glass-panel p-3 rounded-xl border border-white/10 flex items-center justify-center gap-2 text-xs font-semibold text-slate-300">
            <Sparkles size={16} className="text-cyan-400" />
            0.4ms Response Latency
          </div>
          <div className="glass-panel p-3 rounded-xl border border-white/10 flex items-center justify-center gap-2 text-xs font-semibold text-slate-300">
            <Cpu size={16} className="text-purple-400" />
            Autonomous AI Swarms
          </div>
          <div className="glass-panel p-3 rounded-xl border border-white/10 flex items-center justify-center gap-2 text-xs font-semibold text-slate-300">
            <Code2 size={16} className="text-blue-400" />
            AST Refactor Engine
          </div>
          <div className="glass-panel p-3 rounded-xl border border-white/10 flex items-center justify-center gap-2 text-xs font-semibold text-slate-300">
            <Globe size={16} className="text-emerald-400" />
            Vercel & AWS Edge Mesh
          </div>
        </div>

        {/* 3D Floating Laptop Showcase Canvas */}
        <div className="w-full flex items-center justify-center relative">
          <LaptopCanvas />
        </div>
      </div>
    </section>
  );
}
