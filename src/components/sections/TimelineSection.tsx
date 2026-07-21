"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Compass, BookOpen, Code, Rocket, Server, Award, ChevronRight } from "lucide-react";

const STAGES = [
  {
    step: "01",
    id: "Discover",
    title: "Discover",
    icon: Compass,
    subtitle: "AI Skill Gap Diagnosis",
    description: "Map your existing knowledge using our holographic neural diagnostic tool. Identify high-value career trajectories instantly.",
    color: "#3B82F6",
  },
  {
    step: "02",
    id: "Learn",
    title: "Learn",
    icon: BookOpen,
    subtitle: "Interactive Adaptive Courses",
    description: "Master modern full-stack engineering, AI/ML models, and system design with AI-guided bite-sized lessons tailored to your pace.",
    color: "#7C3AED",
  },
  {
    step: "03",
    id: "Practice",
    title: "Practice",
    icon: Code,
    subtitle: "Realtime AI Pair Coding",
    description: "Code in live interactive sandboxes with an intelligent AI tutor pointing out edge cases, syntax optimizations, and security bugs.",
    color: "#06B6D4",
  },
  {
    step: "04",
    id: "Build",
    title: "Build",
    icon: Rocket,
    subtitle: "Production Scale Projects",
    description: "Architect full-scale production applications with autonomous AI agents assisting in backend database schemas and UI design.",
    color: "#10B981",
  },
  {
    step: "05",
    id: "Deploy",
    title: "Deploy",
    icon: Server,
    subtitle: "One-Click Edge Cloud",
    description: "Push your code to global edge infrastructure with built-in CI/CD pipelines, automated testing, and zero configuration.",
    color: "#F59E0B",
  },
  {
    step: "06",
    id: "Get Hired",
    title: "Get Hired",
    icon: Award,
    subtitle: "AI Workforce Matching",
    description: "Get matched directly with top tier tech enterprises hiring through KnowledgeStream's AI candidate verification network.",
    color: "#EC4899",
  },
];

export function TimelineSection() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="journey" className="py-28 relative z-10 bg-[#09090B]/80 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30">
            Interactive Learning & Career Journey
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            From Zero to <span className="gradient-text-cyan">Hired Tech Leader</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Track your progression through our six-stage AI powered career lifecycle.
          </p>
        </div>

        {/* Timeline Desktop & Tablet View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Steps Navigation Column */}
          <div className="lg:col-span-5 space-y-3">
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeStage === idx;
              return (
                <motion.div
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  whileHover={{ x: 6 }}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border flex items-center justify-between ${
                    isActive
                      ? "bg-blue-600/15 border-blue-500/60 shadow-lg shadow-blue-500/10"
                      : "glass-panel border-white/10 hover:border-white/20 text-slate-400"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                        isActive
                          ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
                          : "bg-white/5 text-slate-400"
                      }`}
                      style={{ backgroundColor: isActive ? stage.color : undefined }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-slate-500">STAGE {stage.step}</div>
                      <div className={`font-bold text-base ${isActive ? "text-white" : "text-slate-300"}`}>
                        {stage.title}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className={`transition-transform ${isActive ? "text-cyan-400 translate-x-1" : "text-slate-600"}`}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Right Stage Detail Showcase Card */}
          <div className="lg:col-span-7">
            <motion.div
              key={STAGES[activeStage].id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="glass-panel p-8 sm:p-10 rounded-3xl border border-blue-500/40 relative overflow-hidden shadow-2xl min-h-[420px] flex flex-col justify-between"
            >
              {/* Top Accent Pill */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Phase {STAGES[activeStage].step} &bull; {STAGES[activeStage].id}
                </span>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl"
                  style={{ backgroundColor: STAGES[activeStage].color }}
                >
                  {React.createElement(STAGES[activeStage].icon, { size: 24 })}
                </div>
              </div>

              {/* Stage Detail Body */}
              <div className="my-6 space-y-4">
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                  {STAGES[activeStage].subtitle}
                </h3>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  {STAGES[activeStage].description}
                </p>
              </div>

              {/* Interactive Progress Indicator Bar */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <div className="flex justify-between text-xs text-slate-400 font-mono">
                  <span>JOURNEY PROGRESSION</span>
                  <span>{Math.round(((activeStage + 1) / STAGES.length) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${((activeStage + 1) / STAGES.length) * 100}%`,
                      backgroundColor: STAGES[activeStage].color,
                    }}
                  />
                </div>
              </div>

              {/* Background Ambient Glow */}
              <div
                className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-30 pointer-events-none"
                style={{ backgroundColor: STAGES[activeStage].color }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
