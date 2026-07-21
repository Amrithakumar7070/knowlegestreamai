"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Alex Rivera",
    role: "VP of Engineering @ NexaScale",
    avatar: "👨‍💻",
    content: "KnowledgeStream AI cut our developer onboarding time by 65%. The AI Workforce agents handle automated candidate code evaluations seamlessly.",
    rating: 5,
    tag: "Enterprise Impact",
  },
  {
    name: "Dr. Elena Rostova",
    role: "Lead AI Researcher @ Stanford AI Lab",
    avatar: "👩‍🔬",
    content: "The 3D interactive learning journey is lightyears ahead of traditional course platforms. Students retain complex system design concepts twice as fast.",
    rating: 5,
    tag: "Higher Education",
  },
  {
    name: "Marcus Vance",
    role: "Senior Full-Stack Architect",
    avatar: "🚀",
    content: "The AI Coding Mentor in KnowledgeStream Workspace refactored our legacy monolithic microservices into clean Rust & TypeScript AST modules in minutes.",
    rating: 5,
    tag: "Developer Velocity",
  },
  {
    name: "Sophia Chen",
    role: "Founder & CTO @ Horizon AI",
    avatar: "👩‍💻",
    content: "KnowledgeStream is like having Apple design elegance combined with OpenAI intelligence. It is the definitive operating system for futuristic tech teams.",
    rating: 5,
    tag: "Startup Scale",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-28 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 px-3.5 py-1.5 rounded-full glass-panel border border-emerald-500/30">
          Global Endorsements
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
          Loved by <span className="gradient-text font-black">Leaders & Creators</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          See what top engineers, researchers, and tech executives are saying about KnowledgeStream AI.
        </p>
      </div>

      {/* Floating 3D Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TESTIMONIALS.map((t, idx) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            whileHover={{ y: -8, rotateZ: idx % 2 === 0 ? 0.5 : -0.5 }}
            className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-blue-500/40 relative overflow-hidden shadow-2xl flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400" />
                  ))}
                </div>
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                  {t.tag}
                </span>
              </div>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed italic relative">
                <Quote size={32} className="text-white/10 absolute -top-4 -left-3 pointer-events-none" />
                &ldquo;{t.content}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-white/10 mt-6">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-xl shadow-md">
                {t.avatar}
              </div>
              <div>
                <div className="font-bold text-white text-base">{t.name}</div>
                <div className="text-xs text-slate-400 font-medium">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
