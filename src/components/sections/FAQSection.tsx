"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    question: "What makes KnowledgeStream AI different from traditional coding platforms?",
    answer: "KnowledgeStream AI is a complete full-stack AI operating system that unifies 3D adaptive learning, autonomous AI workforce agent swarms, live cloud pair programming, and candidate recruitment into a single interconnected platform.",
  },
  {
    question: "How does the AI Coding Mentor work?",
    answer: "Our AI Coding Mentor analyzes your project's Abstract Syntax Tree (AST) in real time. It offers intelligent refactoring, security vulnerability warnings, automated test suite generation, and step-by-step guidance tailored to your specific code style.",
  },
  {
    question: "Can KnowledgeStream AI be deployed for Enterprise teams?",
    answer: "Yes! KnowledgeStream AI offers Enterprise plan options including custom fine-tuned models on your proprietary codebase, SSO, SOC2 compliance, dedicated on-premise edge clusters, and ATS candidate integration.",
  },
  {
    question: "Is there a free tier for students and solo developers?",
    answer: "Absolutely. Our Starter plan is 100% free forever and includes access to core AI learning paths, ephemeral cloud sandboxes, and monthly AI mentor queries.",
  },
  {
    question: "What programming languages and frameworks are supported?",
    answer: "KnowledgeStream AI supports over 30 languages and frameworks including Python, Java, JavaScript, TypeScript, Rust, Go, C++, React, Next.js, Docker, Kubernetes, PyTorch, and TensorFlow.",
  },
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30">
          Got Questions?
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          Everything you need to know about KnowledgeStream AI platform and ecosystem.
        </p>
      </div>

      {/* Accordion Container */}
      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "bg-blue-600/10 border-blue-500/50 shadow-lg shadow-blue-500/10"
                  : "glass-panel border-white/10 hover:border-white/20"
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="font-bold text-base sm:text-lg text-white flex items-center gap-3">
                  <HelpCircle size={20} className={isOpen ? "text-cyan-400" : "text-slate-500"} />
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-slate-400 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-cyan-400" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-2 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
