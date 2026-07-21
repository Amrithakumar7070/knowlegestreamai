"use client";

import React from "react";
import { Sparkles, Terminal, ShieldCheck, Heart } from "lucide-react";

export function DashboardFooter() {
  return (
    <footer className="pt-8 pb-4 border-t border-white/5 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Sparkles size={14} className="text-cyan-400" />
        <span>KnowledgeStream AI OS v3.4.0 &bull; Build 2026.07.21</span>
      </div>

      <div className="flex items-center gap-6">
        <a href="#" className="hover:text-slate-300 transition-colors">Documentation</a>
        <a href="#" className="hover:text-slate-300 transition-colors font-mono text-cyan-400">API Status: 100% Operational</a>
        <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
        <a href="#" className="hover:text-slate-300 transition-colors">Support</a>
      </div>
    </footer>
  );
}
