"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, LayoutGrid, Users, Cpu, BarChart3, CheckCircle, ArrowRight } from "lucide-react";

const PRODUCTS = [
  {
    id: "learn",
    title: "KnowledgeStream Learn",
    tagline: "Adaptive AI Learning Operating System",
    icon: GraduationCap,
    color: "#3B82F6",
    gradient: "from-blue-600 to-cyan-500",
    features: [
      "AI personalized learning paths",
      "Interactive code challenge generator",
      "Realtime skill matrix tracking",
      "Peer-to-peer AI study rooms",
    ],
  },
  {
    id: "workspace",
    title: "KnowledgeStream Workspace",
    tagline: "Intelligent Cloud Engineering Platform",
    icon: LayoutGrid,
    color: "#7C3AED",
    gradient: "from-purple-600 to-indigo-500",
    features: [
      "Instant multi-container dev sandboxes",
      "AI multiplayer pair programming",
      "Automated unit & integration test runner",
      "One-click serverless deployment",
    ],
  },
  {
    id: "recruit",
    title: "KnowledgeStream Recruit",
    tagline: "Autonomous AI Workforce & Sourcing",
    icon: Users,
    color: "#EC4899",
    gradient: "from-pink-600 to-rose-500",
    features: [
      "AI verified technical skill badges",
      "Automated coding interview simulations",
      "Direct candidate match telemetry",
      "Enterprise workforce planning",
    ],
  },
  {
    id: "mentor",
    title: "KnowledgeStream AI Mentor",
    tagline: "24/7 Context-Aware Coding Copilot",
    icon: Cpu,
    color: "#06B6D4",
    gradient: "from-cyan-500 to-blue-600",
    features: [
      "Deep AST level code analysis",
      "Security vulnerability scanner",
      "Architecture pattern recommendations",
      "Multi-language code translation",
    ],
  },
  {
    id: "analytics",
    title: "KnowledgeStream Analytics",
    tagline: "Enterprise Productivity & AI Insights",
    icon: BarChart3,
    color: "#10B981",
    gradient: "from-emerald-500 to-teal-600",
    features: [
      "Code velocity & throughput tracking",
      "Token usage & cost optimization",
      "Team collaboration bottleneck alerts",
      "Custom executive reports",
    ],
  },
];

export function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);

  return (
    <section id="products" className="py-28 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-400 px-3.5 py-1.5 rounded-full glass-panel border border-purple-500/30">
          Integrated Product Suite
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
          Five Modules. <span className="gradient-text font-black">One Intelligent Platform.</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          Select any product below to explore its holographic architecture and core features.
        </p>
      </div>

      {/* Holographic Product Cube Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
        {PRODUCTS.map((prod) => {
          const Icon = prod.icon;
          const isSelected = selectedProduct.id === prod.id;
          return (
            <motion.button
              key={prod.id}
              onClick={() => setSelectedProduct(prod)}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-36 ${
                isSelected
                  ? "bg-gradient-to-b from-white/15 to-white/5 border-cyan-400 shadow-xl shadow-cyan-500/20 glow-border-blue"
                  : "glass-panel border-white/10 hover:border-white/20 opacity-75 hover:opacity-100"
              }`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: prod.color }}
              >
                <Icon size={20} />
              </div>
              <div className="font-bold text-sm text-white line-clamp-1">
                {prod.title.replace("KnowledgeStream ", "")}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Expanded Holographic Showcase Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedProduct.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/15 relative overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl"
                  style={{ backgroundColor: selectedProduct.color }}
                >
                  {React.createElement(selectedProduct.icon, { size: 24 })}
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {selectedProduct.title}
                  </h3>
                  <p className="text-cyan-400 font-medium text-sm">
                    {selectedProduct.tagline}
                  </p>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {selectedProduct.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-slate-300 text-sm">
                    <CheckCircle size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <a
                  href="#pricing"
                  className="px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 glow-btn flex items-center gap-2"
                >
                  Explore Module
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* Right Interactive Hologram Visual */}
            <div className="lg:col-span-5 h-64 bg-[#12121D] rounded-2xl border border-white/10 p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
              <div
                className="w-32 h-32 rounded-full border-2 border-dashed animate-spin-slow flex items-center justify-center opacity-70"
                style={{ borderColor: selectedProduct.color }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse"
                  style={{ backgroundColor: selectedProduct.color }}
                >
                  {React.createElement(selectedProduct.icon, { size: 36 })}
                </div>
              </div>
              <span className="mt-4 text-xs font-mono text-slate-400 uppercase tracking-widest">
                HOLOGRAPHIC PREVIEW ACTIVE
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
