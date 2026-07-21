"use client";

import React from "react";
import { Flame, Zap, Award, BookOpen, CheckCircle } from "lucide-react";

export function LearningProgressWidget() {
  return (
    <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4">
      {/* Header Stats */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
            <Flame size={15} className="text-amber-400 fill-amber-400" />
            <span>14 Day Streak</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs border border-purple-500/30">
            <Zap size={15} className="text-purple-400 fill-purple-400" />
            <span>2,450 XP</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
          <Award size={16} />
          <span>Top 5% Learner</span>
        </div>
      </div>

      {/* Course Progress Cards */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
          <span>Active Courses In Progress</span>
          <BookOpen size={14} className="text-blue-400" />
        </div>

        {[
          { name: "Full-Stack Next.js 16 & React 19 Mastery", progress: 78, lesson: "Lesson 14: Server Actions & R3F", color: "#3B82F6" },
          { name: "Advanced Java Concurrency & Microservices", progress: 62, lesson: "Lesson 8: Executor Framework", color: "#7C3AED" },
          { name: "System Design for AI Autonomous Swarms", progress: 45, lesson: "Lesson 5: Distributed Event Queues", color: "#06B6D4" },
        ].map((course) => (
          <div key={course.name} className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white line-clamp-1">{course.name}</span>
              <span className="font-mono text-cyan-400 font-bold">{course.progress}%</span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>{course.lesson}</span>
              <CheckCircle size={13} className="text-emerald-400" />
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${course.progress}%`, backgroundColor: course.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
