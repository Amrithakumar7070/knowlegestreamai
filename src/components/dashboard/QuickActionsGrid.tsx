"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  PlayCircle,
  Bot,
  Rocket,
  Terminal,
  FileText,
  Briefcase,
  LayoutGrid,
  UploadCloud,
  ArrowUpRight,
} from "lucide-react";

const QUICK_ACTIONS = [
  { title: "Start Learning", icon: GraduationCap, color: "#3B82F6", desc: "Explore adaptive AI courses" },
  { title: "Continue Course", icon: PlayCircle, color: "#06B6D4", desc: "Resume Next.js 16 Mastery" },
  { title: "AI Coding Mentor", icon: Bot, color: "#7C3AED", desc: "Pair program with AST copilot" },
  { title: "Build Project", icon: Rocket, color: "#10B981", desc: "Launch new full-stack app" },
  { title: "Practice Coding", icon: Terminal, color: "#EC4899", desc: "Solve DSA & algorithm challenges" },
  { title: "Resume Review", icon: FileText, color: "#F59E0B", desc: "ATS AI Score optimization" },
  { title: "Apply Jobs", icon: Briefcase, color: "#60A5FA", desc: "Matched enterprise roles" },
  { title: "Create Workspace", icon: LayoutGrid, color: "#A855F7", desc: "Deploy cloud sandbox" },
  { title: "Upload Assignment", icon: UploadCloud, color: "#34D399", desc: "Submit for AI grading" },
];

export function QuickActionsGrid() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Quick Launch Actions
        </h3>
        <span className="text-xs text-cyan-400 font-mono">9 AI Tools Ready</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {QUICK_ACTIONS.map((action, idx) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 relative group cursor-pointer overflow-hidden shadow-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110"
                  style={{ backgroundColor: action.color }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-[11px] text-slate-400">{action.desc}</p>
                </div>
              </div>

              <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:bg-blue-500/20 transition-all">
                <ArrowUpRight size={14} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
