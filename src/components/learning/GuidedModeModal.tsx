"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Sparkles, AlertCircle, Lightbulb, ShieldCheck } from "lucide-react";

interface GuidedModeModalProps {
  data: {
    mistakeType: string;
    diagnosis: string;
    preventiveAdvice: string;
    explanation: string;
  };
  onClose: () => void;
}

export function GuidedModeModal({ data, onClose }: GuidedModeModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-[#09090B]/85 backdrop-blur-2xl flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/40 max-w-xl w-full relative overflow-hidden shadow-2xl bg-[#0D0D18]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full glass-panel text-slate-400 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI Guided Mode Diagnosis</h3>
              <span className="text-xs text-cyan-400 font-mono">Automated AST &amp; Syntax Inspector</span>
            </div>
          </div>

          {/* Mistake Type Pill */}
          <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle size={16} className="text-red-400 shrink-0" />
            <span>Mistake Identified: {data.mistakeType || "Syntax Error"}</span>
          </div>

          {/* Diagnosis */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb size={14} className="text-yellow-400" /> Why This Mistake Came Up
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed p-3 rounded-xl bg-white/5 border border-white/10">
              {data.diagnosis}
            </p>
          </div>

          {/* Preventive Advice */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" /> What You Should NOT Do For Next Code
            </h4>
            <p className="text-sm text-emerald-300 leading-relaxed p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 font-medium">
              {data.preventiveAdvice}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-bold text-white text-xs bg-gradient-to-r from-purple-600 to-cyan-500 glow-btn"
          >
            I Understand — Back to Editor
          </button>
        </div>
      </motion.div>
    </div>
  );
}
