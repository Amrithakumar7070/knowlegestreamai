"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  X,
  Star,
  Clock,
  BookOpen,
  User,
  CheckCircle,
  CreditCard,
  Sparkles,
  FileText,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { SyllabusDocViewerModal } from "./SyllabusDocViewerModal";

export interface CourseData {
  id: string;
  title: string;
  description: string;
  language: string;
  price: number;
  validityDays: number;
  instructor: string;
  level: string;
  category: string;
  thumbnail: string;
  duration: string;
  lessons: number;
  rating: number;
}

interface CourseDetailsModalProps {
  course: CourseData;
  userEmail?: string;
  onClose: () => void;
  onPaymentSuccess: (course: CourseData) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const LANGUAGE_SYLLABUS: Record<string, { modules: { title: string; topics: string[] }[] }> = {
  python: {
    modules: [
      {
        title: "Part I & II: Python Fundamentals, Syntax & Control Flow",
        topics: [
          "Chapter 0: Introduction to Programming, Python Applications & IDE Setup",
          "Chapter 1: Python Basics, Syntax, Variables, Data Types & PEP 8",
          "Chapter 2: Decision Making, Boolean Expressions, for/while Loops & enumerate()",
          "Chapter 3: Python Data Structures: Lists, Tuples, Dictionaries, Sets & Comprehensions",
          "Chapter 4: Modular Functions, Parameters, Lambda Functions & Recursion",
        ],
      },
      {
        title: "Part III & IV: Object-Oriented Programming & Advanced Python",
        topics: [
          "Chapter 5: OOP Classes, Objects, Inheritance, Encapsulation & Magic Methods",
          "Chapter 6: Iterators, Generators, yield, Decorators & Context Managers",
          "Chapter 7: Exception Handling (try-except-finally) & File Operations (CSV/JSON)",
          "Chapter 8: Modules, Packages, Virtual Environments & pip",
        ],
      },
      {
        title: "Part V, VI & VII: Applied Python, Capstones & Interview Prep",
        topics: [
          "Chapter 9 & 10: APIs, Web Scraping, Threading, Asyncio & Memory Management",
          "Chapter 11-14 Capstones: Banking System, Weather App, E-Commerce Backend",
          "Chapter 15: Python Interview Preparation, Unit Testing & Resume Projects",
        ],
      },
    ],
  },
  c: {
    modules: [
      {
        title: "Module 1: C Compilers, GCC & Memory Structure",
        topics: [
          "Compilation Pipeline, Variables, Primitive Data Types & Formatted I/O",
          "Arithmetic, Bitwise Operators & Decision Control (if-else, switch-case)",
        ],
      },
      {
        title: "Module 2: Pointers, Dynamic Memory & System Design",
        topics: [
          "Functions, Parameters, Call-by-Value & Call Stack",
          "Pointers, Address Arithmetic, malloc(), free() & File Handling",
        ],
      },
    ],
  },
  cpp: {
    modules: [
      {
        title: "Module 1: Modern C++ Fundamentals & OOP Principles",
        topics: [
          "Classes, Objects, Constructors, Encapsulation & Inheritance",
          "Virtual Functions, Abstract Classes & Operator Overloading",
        ],
      },
      {
        title: "Module 2: Standard Template Library (STL) & Memory",
        topics: [
          "STL Vectors, Maps, Sets, Smart Pointers & Templates",
          "Exception Handling, Move Semantics & RAII Pattern",
        ],
      },
    ],
  },
  java: {
    modules: [
      {
        title: "Module 1: JVM Architecture & Object-Oriented Java",
        topics: [
          "JVM Bytecode, JIT Compiler, Primitive Types & Arrays",
          "Encapsulation, Inheritance, Polymorphism & Interfaces",
        ],
      },
      {
        title: "Module 2: Collections, Multithreading & Streams",
        topics: [
          "Collections Framework (ArrayList, HashMap, HashSet)",
          "Multithreading, Locks, Executors, Lambda & Streams API",
        ],
      },
    ],
  },
};

export function CourseDetailsModal({
  course,
  userEmail = "chandu@gmail.com",
  onClose,
  onPaymentSuccess,
}: CourseDetailsModalProps) {
  const [docViewerOpen, setDocViewerOpen] = useState(false);
  const [loadingRazorpay, setLoadingRazorpay] = useState(false);

  // Dynamically load Official Razorpay Checkout Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const langKey = course.category.toLowerCase().includes("c++")
    ? "cpp"
    : course.category.toLowerCase().includes("java")
    ? "java"
    : course.category.toLowerCase().includes("python")
    ? "python"
    : "c";

  const syllabus = LANGUAGE_SYLLABUS[langKey] || LANGUAGE_SYLLABUS.python;

  const completeEnrollment = async (paymentId: string) => {
    try {
      const enrollRes = await fetch("/api/courses/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail,
          courseId: course.id,
          paidAmount: course.price,
          paymentId,
        }),
      });

      const enrollData = await enrollRes.json();
      if (enrollData.success) {
        onPaymentSuccess(course);
      } else {
        alert(enrollData.error || "Payment verification failed.");
      }
    } catch (err) {
      console.error("Enrollment error:", err);
    }
  };

  const handleOpenRealRazorpayCheckout = async () => {
    setLoadingRazorpay(true);

    try {
      // 1. Create order on backend API with user's real Razorpay keys
      const resData = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: course.price,
          currency: "INR",
          courseId: course.id,
          userEmail,
        }),
      });

      const data = await resData.json();

      if (!data.success || !data.order) {
        alert(`Razorpay API Error: ${data.error || "Could not create order"}`);
        setLoadingRazorpay(false);
        return;
      }

      const { order, key } = data;

      // 2. Configure Official Razorpay SDK options with REAL order.id
      const options: any = {
        key: key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "KnowledgeStream AI",
        description: course.title,
        order_id: order.id, // REAL Order ID from Razorpay API!
        handler: async function (response: any) {
          const paymentId = response.razorpay_payment_id;
          await completeEnrollment(paymentId);
        },
        prefill: {
          name: "Ajmeera Chandu",
          email: userEmail,
          contact: "9999999999",
        },
        theme: {
          color: "#3B82F6",
        },
      };

      setLoadingRazorpay(false);

      if (typeof window !== "undefined" && window.Razorpay) {
        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response: any) {
          alert(`Razorpay Payment Failed: ${response.error?.description || "Payment was cancelled or failed."}`);
        });
        rzp1.open();
      } else {
        alert("Razorpay SDK is loading. Please try again in 2 seconds.");
      }
    } catch (err: any) {
      console.error("Razorpay Checkout Error:", err);
      alert(`Razorpay Error: ${err.message}`);
      setLoadingRazorpay(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#09090B]/95 backdrop-blur-3xl flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 max-w-3xl w-full relative overflow-hidden shadow-2xl bg-[#09090D] z-[10000] my-8 max-h-[90vh] flex flex-col justify-between"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full glass-panel text-slate-400 hover:text-white z-10"
        >
          <X size={20} />
        </button>

        <div className="space-y-6 overflow-y-auto pr-2">
          {/* Top Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                {course.category} &bull; 90 Days Validity
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-400 font-bold ml-auto">
                <Star size={15} className="fill-amber-400" />
                <span>{course.rating} Rating</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {course.title}
            </h2>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <User size={15} className="text-blue-400" /> {course.instructor}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={15} className="text-purple-400" /> 90 Days Access ({course.duration})
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {course.description}
          </p>

          {/* DETAILED SYLLABUS DOCUMENT INDEX */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText size={18} className="text-cyan-400" />
                Official Complete Syllabus Index
              </h3>

              <button
                type="button"
                onClick={() => setDocViewerOpen(true)}
                className="px-3 py-1 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
              >
                <FileText size={14} />
                Full Document View (.docx) <ExternalLink size={12} />
              </button>
            </div>

            <div className="space-y-3">
              {syllabus.modules.map((mod, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2"
                >
                  <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                    <ChevronRight size={16} className="text-purple-400 shrink-0" />
                    {mod.title}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6 text-xs sm:text-sm text-slate-300 list-disc">
                    {mod.topics.map((t, tIdx) => (
                      <li key={tIdx} className="leading-snug">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Price & Official Razorpay Action */}
        <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs text-slate-400 uppercase font-mono block">90 Days Full Course Access</span>
            <div className="text-3xl font-black text-white font-mono flex items-baseline gap-1">
              <span>₹{course.price}</span>
              <span className="text-xs text-slate-400 font-normal">INR</span>
            </div>
          </div>

          <button
            onClick={handleOpenRealRazorpayCheckout}
            disabled={loadingRazorpay}
            className="px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 glow-btn flex items-center gap-2 shadow-xl shadow-blue-500/25 disabled:opacity-50"
          >
            <CreditCard size={18} />
            {loadingRazorpay ? "Creating Order..." : "Subscribe & Pay with Razorpay"}
          </button>
        </div>

        {/* Full Document Reader Modal */}
        {docViewerOpen && (
          <SyllabusDocViewerModal
            courseTitle={course.title}
            language={langKey}
            onClose={() => setDocViewerOpen(false)}
          />
        )}
      </motion.div>
    </div>
  );
}
