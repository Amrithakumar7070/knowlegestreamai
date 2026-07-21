"use client";

import React from "react";
import { motion } from "framer-motion";
import { Feature3DCanvas, FeatureType } from "../canvas/Feature3DCanvas";
import { ArrowUpRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  type: FeatureType;
  color: string;
  badge: string;
  delay: number;
}

const FEATURES: FeatureCardProps[] = [
  {
    title: "AI Coding Mentor",
    description: "Real-time intelligent code refactoring, pair programming, automated test generation, and multi-language AST syntax analysis.",
    type: "robot",
    color: "#3B82F6",
    badge: "Autonomous Pair Programmer",
    delay: 0.1,
  },
  {
    title: "AI Workforce",
    description: "Deploy swarms of specialized autonomous AI agents for automated hiring, candidate sourcing, evaluation, and team workflow orchestration.",
    type: "office",
    color: "#7C3AED",
    badge: "Enterprise Agents",
    delay: 0.2,
  },
  {
    title: "Learning Platform",
    description: "Adaptive personalized curriculum that analyzes learning speed, pinpoints skill gaps, and generates interactive coding challenges.",
    type: "cap",
    color: "#06B6D4",
    badge: "Adaptive Skill Graph",
    delay: 0.3,
  },
  {
    title: "Smart Analytics",
    description: "Deep holographic telemetry dashboards monitoring code quality, velocity metrics, workforce output, and AI token optimization.",
    type: "chart",
    color: "#10B981",
    badge: "Realtime Telemetry",
    delay: 0.4,
  },
  {
    title: "Project Collaboration",
    description: "Seamless collaborative workspace connecting developers, mentors, and AI agents with live multiplayer synchronization.",
    type: "nodes",
    color: "#EC4899",
    badge: "Multiplayer Mesh",
    delay: 0.5,
  },
  {
    title: "Cloud Workspace",
    description: "Instant ephemeral cloud sandboxes with pre-configured dev environments, zero-setup dependencies, and edge distribution.",
    type: "cloud",
    color: "#F59E0B",
    badge: "Zero Latency Edge",
    delay: 0.6,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-28 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-blue-500/30 text-xs font-semibold text-blue-400 uppercase tracking-widest">
          Comprehensive Capabilities
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineered for the <span className="gradient-text">Future of Intelligence</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          KnowledgeStream AI brings together bleeding-edge 3D interactive tools, autonomous agent workforces, and adaptive learning paths into one fluid platform.
        </p>
      </div>

      {/* Grid of Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURES.map((feature) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: feature.delay }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden shadow-xl"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between z-10">
              <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                {feature.badge}
              </span>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:bg-blue-500/20 transition-all">
                <ArrowUpRight size={16} />
              </div>
            </div>

            {/* 3D Mini-Canvas */}
            <div className="my-4 relative">
              <Feature3DCanvas type={feature.type} color={feature.color} />
            </div>

            {/* Card Content */}
            <div className="space-y-2 z-10">
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Corner Ambient Glow on hover */}
            <div
              className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none"
              style={{ backgroundColor: feature.color }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
