"use client";

import React, { useState } from "react";
import { CheckSquare, Plus, Sparkles, Calendar, Clock } from "lucide-react";

export function TasksScheduleWidget() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Review AI AST Refactoring Pull Request", done: true, tag: "AI Suggested" },
    { id: 2, text: "Submit System Design Mock Interview Video", done: false, tag: "Due Today" },
    { id: 3, text: "Test Local SQLite Database Session Cookies", done: true, tag: "Completed" },
    { id: 4, text: "Deploy Next.js 16 Edge Cloud Microservice", done: false, tag: "High Priority" },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <CheckSquare size={18} className="text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Today&apos;s AI &amp; Study Tasks
          </h3>
        </div>
        <button className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-cyan-300 flex items-center gap-1">
          <Plus size={12} /> Add Task
        </button>
      </div>

      <div className="space-y-2">
        {tasks.map((t) => (
          <div
            key={t.id}
            onClick={() => toggleTask(t.id)}
            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              t.done
                ? "bg-white/5 border-white/5 opacity-60 line-through"
                : "glass-panel border-white/10 hover:border-cyan-400/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => {}}
                className="rounded border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-xs font-semibold text-slate-200">{t.text}</span>
            </div>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                t.tag === "AI Suggested"
                  ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                  : t.tag === "High Priority"
                  ? "bg-red-500/20 text-red-300 border-red-500/30"
                  : "bg-blue-500/20 text-cyan-300 border-blue-500/30"
              }`}
            >
              {t.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
