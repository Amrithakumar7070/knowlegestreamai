"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Mic,
  Image as ImageIcon,
  Paperclip,
  ArrowRight,
  Code2,
  Cpu,
  FileText,
  Video,
  BookOpen,
} from "lucide-react";

interface AICommandBarProps {
  onExecutePrompt: (prompt: string) => void;
}

const PROMPT_CHIPS = [
  { label: "Generate React Project", icon: Code2, prompt: "Create a modern Next.js 16 React project architecture with TypeScript and Tailwind CSS." },
  { label: "Fix my Java Code", icon: Cpu, prompt: "Optimize my Java multithreaded executor service code for lower CPU latency." },
  { label: "Explain DSA", icon: BookOpen, prompt: "Explain Graph Dijkstra's Shortest Path algorithm with visual step-by-step code." },
  { label: "Create Resume", icon: FileText, prompt: "Build an ATS-optimized Full-Stack Developer resume tailored for top tech roles." },
  { label: "Prepare Interview", icon: Video, prompt: "Simulate a mock system design interview question for high-throughput messaging queues." },
];

export function AICommandBar({ onExecutePrompt }: AICommandBarProps) {
  const [prompt, setPrompt] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onExecutePrompt(prompt);
    setPrompt("");
  };

  return (
    <div className="space-y-3">
      {/* Large Glass Command Box */}
      <form
        onSubmit={handleSubmit}
        className="glass-panel p-2.5 rounded-2xl border border-blue-500/40 relative shadow-xl shadow-blue-500/10 focus-within:border-cyan-400 focus-within:ring-1 focus-within:ring-cyan-400 transition-all flex flex-col sm:flex-row items-center gap-3 bg-[#0C0C16]/90"
      >
        <div className="flex items-center gap-2 px-2 w-full sm:w-auto text-cyan-400">
          <Sparkles size={20} className="animate-pulse shrink-0" />
        </div>

        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask KnowledgeStream AI OS anything..."
          className="w-full flex-1 bg-transparent border-none text-white placeholder-slate-500 text-sm focus:outline-none"
        />

        {/* Action Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-white/10 pt-2 sm:pt-0">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsRecording(!isRecording)}
              title="Voice Input"
              className={`p-2 rounded-xl text-xs transition-colors ${
                isRecording ? "bg-red-500 text-white animate-pulse" : "glass-panel text-slate-400 hover:text-white"
              }`}
            >
              <Mic size={16} />
            </button>
            <button
              type="button"
              title="Upload Image"
              className="p-2 rounded-xl glass-panel text-slate-400 hover:text-white transition-colors"
            >
              <ImageIcon size={16} />
            </button>
            <button
              type="button"
              title="Attach File"
              className="p-2 rounded-xl glass-panel text-slate-400 hover:text-white transition-colors"
            >
              <Paperclip size={16} />
            </button>
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-400 text-white text-xs font-bold glow-btn flex items-center gap-1.5 shadow-md"
          >
            Run Command
            <ArrowRight size={14} />
          </button>
        </div>
      </form>

      {/* Prompt Suggestion Chips */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
        {PROMPT_CHIPS.map((chip) => {
          const Icon = chip.icon;
          return (
            <button
              key={chip.label}
              type="button"
              onClick={() => {
                setPrompt(chip.prompt);
                onExecutePrompt(chip.prompt);
              }}
              className="px-3 py-1.5 rounded-full glass-panel border border-white/10 hover:border-cyan-400 text-[11px] font-semibold text-slate-300 hover:text-white transition-all shrink-0 flex items-center gap-1.5"
            >
              <Icon size={13} className="text-cyan-400" />
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
