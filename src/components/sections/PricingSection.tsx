"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, ShieldAlert } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for students & individual developers exploring AI learning.",
    popular: false,
    color: "#3B82F6",
    features: [
      "Access to basic AI Learning courses",
      "50 AI Coding Mentor queries / month",
      "1 Ephemeral Cloud Sandbox",
      "Community support discord",
    ],
    buttonText: "Start Free",
  },
  {
    name: "Pro Developer",
    price: "$29",
    period: "/ month",
    description: "Designed for full-stack developers and high-growth engineers.",
    popular: true,
    color: "#7C3AED",
    features: [
      "Unlimited AI Learning curriculum",
      "Unlimited AI Coding Mentor & AST refactor",
      "10 Concurrent Cloud Sandboxes",
      "2 Autonomous AI Agent workers",
      "Priority edge node execution",
      "24/7 dedicated support",
    ],
    buttonText: "Claim Pro Access",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "flexible",
    description: "Built for companies, universities, and enterprise engineering teams.",
    popular: false,
    color: "#06B6D4",
    features: [
      "Custom on-premise AI model fine-tuning",
      "Unlimited Autonomous AI Workforce agents",
      "KnowledgeStream Recruit ATS integration",
      "SSO & SOC2 Type II compliance",
      "Dedicated account manager",
      "SLA 99.99% uptime guarantee",
    ],
    buttonText: "Contact Enterprise",
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-28 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30">
          Transparent Investment
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
          Predictable Pricing for <span className="gradient-text-hero">Every Scale</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          Start for free, scale effortlessly with your project or engineering organization.
        </p>

        {/* Billing Toggle */}
        <div className="pt-4 flex items-center justify-center gap-4">
          <span className={`text-sm font-semibold ${!annual ? "text-white" : "text-slate-400"}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className="w-14 h-8 rounded-full glass-panel border border-white/20 p-1 flex items-center transition-colors relative"
          >
            <motion.div
              animate={{ x: annual ? 24 : 0 }}
              className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-md"
            />
          </button>
          <span className={`text-sm font-semibold flex items-center gap-1.5 ${annual ? "text-white" : "text-slate-400"}`}>
            Annual Billing
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {PLANS.map((plan, idx) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            whileHover={{ y: -10 }}
            className={`p-8 rounded-3xl border relative flex flex-col justify-between transition-all duration-300 ${
              plan.popular
                ? "bg-gradient-to-b from-blue-950/40 via-[#0F0F1D]/80 to-[#09090B]/90 border-blue-500/80 shadow-2xl shadow-blue-500/25 glow-border-blue"
                : "glass-panel border-white/10 hover:border-white/20"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-400 text-white text-xs font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1">
                <Sparkles size={13} /> MOST POPULAR
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-extrabold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                  {annual && plan.price.startsWith("$")
                    ? `$${Math.round(parseInt(plan.price.slice(1)) * 0.8)}`
                    : plan.price}
                </span>
                <span className="text-slate-400 text-sm font-medium">{plan.period}</span>
              </div>

              <ul className="space-y-3 pt-4 border-t border-white/10">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                    <Check size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <a
                href="#"
                className={`w-full py-4 rounded-full text-sm font-bold flex items-center justify-center transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-400 text-white glow-btn shadow-xl shadow-blue-500/30"
                    : "glass-panel hover:bg-white/10 text-white border border-white/20"
                }`}
              >
                {plan.buttonText}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
