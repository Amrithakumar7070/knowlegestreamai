"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeroCoreCanvas } from "../canvas/HeroCoreCanvas";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-28 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-panel p-10 sm:p-16 rounded-[40px] border border-blue-500/40 relative overflow-hidden shadow-2xl bg-gradient-to-b from-blue-950/30 via-[#0C0C16] to-[#09090B]">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text & Buttons */}
          <div className="lg:col-span-7 space-y-8 z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-semibold text-cyan-300 uppercase">
              <Sparkles size={14} className="text-cyan-400" /> Unlock Infinite Capability
            </div>

            <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              The Future of AI Learning <span className="gradient-text-hero">Starts Today.</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-xl">
              Join over 100,000 students, engineers, and tech companies building the next decade of intelligent software.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#pricing"
                className="px-9 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-400 glow-btn flex items-center gap-3 shadow-xl shadow-blue-500/30"
              >
                Join Now
                <ArrowRight size={18} />
              </a>

              <a
                href="#pricing"
                className="px-8 py-4 rounded-full text-base font-semibold text-slate-200 glass-panel hover:bg-white/10 text-white border border-white/20 transition-all flex items-center gap-2.5"
              >
                <Calendar size={18} className="text-cyan-400" />
                Book Demo
              </a>
            </div>
          </div>

          {/* Right Column Massive AI Core Canvas */}
          <div className="lg:col-span-5 h-[380px] sm:h-[450px] relative flex items-center justify-center">
            <HeroCoreCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}
