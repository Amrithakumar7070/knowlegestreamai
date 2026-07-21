"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, Sparkles, CheckCircle2 } from "lucide-react";

interface TopicExplanationSpeechProps {
  title: string;
  explanation: string;
  onCompleteExplanation: () => void;
}

export function TopicExplanationSpeech({
  title,
  explanation,
  onCompleteExplanation,
}: TopicExplanationSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Reset speech synthesis on unmount
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      alert("Text-to-Speech API not supported in browser.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(explanation);
        utterance.rate = speechRate;
        utterance.pitch = 1.0;
        utterance.onend = () => {
          setIsPlaying(false);
          setIsCompleted(true);
          onCompleteExplanation();
        };
        window.speechSynthesis.speak(utterance);
      }
      setIsPlaying(true);
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
    onCompleteExplanation();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-blue-500/30 space-y-4 shadow-xl bg-[#0C0C16]">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center text-cyan-400">
            <Volume2 size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Step A: AI Voice Concept Explainer</h3>
            <span className="text-[10px] text-cyan-400 font-mono">Web Speech Synthesis Engine</span>
          </div>
        </div>

        {/* Speech Controls */}
        <div className="flex items-center gap-2">
          <select
            value={speechRate}
            onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
            className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
          >
            <option value="0.8">0.8x Speed</option>
            <option value="1.0">1.0x Speed</option>
            <option value="1.25">1.25x Speed</option>
            <option value="1.5">1.5x Speed</option>
          </select>

          <button
            onClick={toggleSpeech}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md ${
              isPlaying
                ? "bg-purple-600 text-white animate-pulse"
                : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white glow-btn"
            }`}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            {isPlaying ? "Pause AI Voice" : "Listen AI Voice"}
          </button>
        </div>
      </div>

      {/* Explanation Text */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-200 text-sm leading-relaxed font-sans">
        {explanation}
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-slate-400 flex items-center gap-1.5">
          <Sparkles size={14} className="text-cyan-400" /> Listen to full audio or mark complete to proceed to Quiz.
        </span>

        <button
          onClick={handleComplete}
          className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            isCompleted
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
              : "glass-panel text-white hover:border-cyan-400"
          }`}
        >
          <CheckCircle2 size={14} className={isCompleted ? "text-emerald-400" : "text-slate-400"} />
          {isCompleted ? "Step A Completed" : "Mark Step A Complete"}
        </button>
      </div>
    </div>
  );
}
