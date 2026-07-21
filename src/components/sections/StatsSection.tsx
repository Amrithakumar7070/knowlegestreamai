"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, MessageSquareCode, Building2, Rocket } from "lucide-react";

const STATS = [
  {
    label: "Active Students & Engineers",
    value: 100000,
    suffix: "K+",
    displayVal: "100",
    icon: Users,
    color: "#3B82F6",
  },
  {
    label: "AI Code Syntheses",
    value: 5000000,
    suffix: "M+",
    displayVal: "5",
    icon: MessageSquareCode,
    color: "#06B6D4",
  },
  {
    label: "Enterprise Customers",
    value: 500,
    suffix: "+",
    displayVal: "500",
    icon: Building2,
    color: "#7C3AED",
  },
  {
    label: "Deployed Projects",
    value: 50000,
    suffix: "K+",
    displayVal: "50",
    icon: Rocket,
    color: "#10B981",
  },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 40;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts([
        Math.floor(100 * progress),
        Math.floor(5 * progress),
        Math.floor(500 * progress),
        Math.floor(50 * progress),
      ]);
      if (step >= steps) {
        clearInterval(timer);
        setCounts([100, 5, 500, 50]);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <section ref={ref} className="py-24 relative z-10 border-y border-white/5 bg-[#09090B]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 text-center relative overflow-hidden group hover:border-blue-500/50 transition-all"
              >
                <div
                  className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white shadow-xl"
                  style={{ backgroundColor: stat.color }}
                >
                  <Icon size={24} />
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2 flex items-center justify-center font-mono">
                  <span>{counts[index]}</span>
                  <span style={{ color: stat.color }}>{stat.suffix}</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
