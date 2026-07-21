"use client";

import React from "react";
import { Users, MessageSquare, Flame, Sparkles, Terminal } from "lucide-react";

export function CommunityWidget() {
  return (
    <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-purple-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Trending Community Discussions &amp; Hackathons
          </h3>
        </div>
        <span className="text-[10px] text-purple-300 font-mono">1.2k Online</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all cursor-pointer">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-300 mb-1">
            <Flame size={14} className="text-amber-400 fill-amber-400" />
            <span>KnowledgeStream Global AI Hackathon 2026</span>
          </div>
          <p className="text-[11px] text-slate-300">
            Build autonomous agent applications in 48 hours. $50,000 prize pool.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 mb-1">
            <MessageSquare size={14} className="text-cyan-400" />
            <span>Next.js 16 Server Actions vs WebSockets Thread</span>
          </div>
          <p className="text-[11px] text-slate-300">
            Discussion led by senior architects on low-latency streaming optimization.
          </p>
        </div>
      </div>
    </div>
  );
}
