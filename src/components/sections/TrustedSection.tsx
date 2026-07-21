"use client";

import React from "react";
import { motion } from "framer-motion";

const LOGOS = [
  { name: "Microsoft", symbol: "❖" },
  { name: "Google", symbol: "G" },
  { name: "OpenAI", symbol: "✴" },
  { name: "GitHub", symbol: "🐙" },
  { name: "Docker", symbol: "🐳" },
  { name: "Linux", symbol: "🐧" },
  { name: "AWS", symbol: "☁" },
  { name: "Oracle", symbol: "O" },
  { name: "Intel", symbol: "intel." },
];

export function TrustedSection() {
  return (
    <section className="py-16 relative z-10 border-y border-white/5 bg-[#09090B]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <p className="text-xs uppercase font-bold tracking-widest text-slate-400">
          POWERING THE NEXT GENERATION OF INNOVATORS AT GLOBAL TECH LEADERS
        </p>
      </div>

      {/* 3D Infinite Marquee Container */}
      <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex items-center gap-12 whitespace-nowrap py-4"
        >
          {[...LOGOS, ...LOGOS].map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl glass-panel border border-white/10 hover:border-blue-500/40 text-slate-300 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 shadow-lg shadow-black/40 group"
            >
              <span className="text-xl font-bold text-cyan-400 group-hover:text-blue-400 transition-colors">
                {logo.symbol}
              </span>
              <span className="text-base font-bold tracking-tight opacity-80 group-hover:opacity-100">
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
