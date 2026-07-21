"use client";

import React from "react";
import { FolderGit2, Clock, Users, ArrowUpRight } from "lucide-react";

export function ProjectsWidget() {
  return (
    <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <FolderGit2 size={18} className="text-purple-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Active Workspace Projects
          </h3>
        </div>
        <span className="text-xs text-purple-300 font-mono">3 Active</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          {
            name: "KnowledgeStream AI Core Engine",
            tag: "Next.js + Three.js",
            progress: 88,
            deadline: "Jul 25",
            team: ["👨‍💻", "👩‍🔬", "🤖"],
            status: "In Review",
            color: "#3B82F6",
          },
          {
            name: "Autonomous Hiring Swarm Agent",
            tag: "Python + Fast-API",
            progress: 70,
            deadline: "Jul 28",
            team: ["👨‍💻", "🤖"],
            status: "Active",
            color: "#7C3AED",
          },
          {
            name: "Holographic Telemetry Dashboard",
            tag: "TypeScript + Tailwind",
            progress: 95,
            deadline: "Jul 30",
            team: ["👩‍💻", "👨‍💻", "🤖"],
            status: "Deploy Ready",
            color: "#10B981",
          },
        ].map((p) => (
          <div
            key={p.name}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all space-y-3 group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {p.name}
                </h4>
                <span className="text-[10px] font-mono text-slate-400">{p.tag}</span>
              </div>
              <ArrowUpRight size={14} className="text-slate-400 group-hover:text-cyan-400" />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-300">
                <span>Completion</span>
                <span className="font-bold text-cyan-400">{p.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${p.progress}%`, backgroundColor: p.color }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400 border-t border-white/5">
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{p.deadline}</span>
              </div>

              <div className="flex items-center gap-1">
                <Users size={12} />
                <span>{p.team.join(" ")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
