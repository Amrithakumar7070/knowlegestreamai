"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Cpu, Sparkles, ShieldCheck } from "lucide-react";

interface AuthLoadingOverlayProps {
  onComplete: () => void;
}

const STEPS = [
  { text: "Authenticating...", icon: ShieldCheck, color: "#3B82F6" },
  { text: "Connecting to AI Workspace...", icon: Cpu, color: "#7C3AED" },
  { text: "Verifying Identity...", icon: Sparkles, color: "#06B6D4" },
  { text: "Welcome Back.", icon: CheckCircle2, color: "#10B981" },
];

export function AuthLoadingOverlay({ onComplete }: AuthLoadingOverlayProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 1200);
          return prev;
        }
      });
    }, 900);

    return () => clearInterval(timer);
  }, [onComplete]);

  const currentStep = STEPS[currentStepIndex];
  const isFinished = currentStepIndex === STEPS.length - 1;
  const StepIcon = currentStep.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#09090B]/90 backdrop-blur-2xl flex flex-col items-center justify-center p-6"
    >
      {/* Central 3D Spinning Spinner */}
      <div className="relative mb-8">
        <div
          className={`w-32 h-32 rounded-full border-4 border-dashed animate-spin-slow flex items-center justify-center transition-colors duration-500 ${
            isFinished ? "border-emerald-400" : "border-blue-500"
          }`}
        >
          <motion.div
            key={currentStepIndex}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-500 ${
              isFinished ? "bg-emerald-500 shadow-emerald-500/50" : "bg-gradient-to-tr from-blue-600 to-purple-600"
            }`}
          >
            <StepIcon size={40} className={isFinished ? "scale-110" : "animate-pulse"} />
          </motion.div>
        </div>

        {/* Pulse rings */}
        <div className="absolute -inset-4 rounded-full border border-blue-500/20 animate-ping pointer-events-none" />
      </div>

      {/* Text Sequence */}
      <div className="text-center space-y-2 max-w-sm">
        <AnimatePresence mode="wait">
          <motion.h3
            key={currentStep.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-2xl font-black text-white tracking-tight font-mono"
          >
            {currentStep.text}
          </motion.h3>
        </AnimatePresence>

        <p className="text-xs text-slate-400 font-mono">
          KnowledgeStream OS &bull; Session Handshake
        </p>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-6">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
