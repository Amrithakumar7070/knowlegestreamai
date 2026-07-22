"use client";

import React, { useState } from "react";
import { Lock, Unlock, CheckCircle2, Clock, Award, ShieldCheck, ArrowLeft, Layers } from "lucide-react";
import { TopicExplanationSpeech } from "./TopicExplanationSpeech";
import { TopicQuizWidget } from "./TopicQuizWidget";
import { MonacoAIEditor } from "./MonacoAIEditor";

interface CourseCurriculumViewProps {
  courseTitle: string;
  language: string;
  onBackToCourses: () => void;
}

const DEFAULT_TOPICS = [
  {
    id: 1,
    title: "Topic 1: Language Syntax, Variables & Primitive Memory",
    description: "Master variables, data types, RAM memory allocation, and basic syntax rules.",
  },
  {
    id: 2,
    title: "Topic 2: Decision Logic, Loops & Control Flow",
    description: "Master if-else conditions, switch cases, for/while loops, and break statements.",
  },
  {
    id: 3,
    title: "Topic 3: Functions, Stack Frame & Scope",
    description: "Master function declarations, parameters, return values, and call stack execution.",
  },
  {
    id: 4,
    title: "Topic 4: Arrays, Pointers & Heap Memory Allocation",
    description: "Master array indexing, pointer arithmetic, malloc/free, and memory layout.",
  },
  {
    id: 5,
    title: "Topic 5: Object-Oriented Architecture & Capstone Project",
    description: "Master classes, encapsulation, inheritance, polymorphism, and full project build.",
  },
];

const PYTHON_CHAPTERS = [
  {
    id: 1,
    title: "Chapter 0: Introduction to Programming",
    description: "Understand the core concepts of programming, how computers execute code, why Python is an industry standard, and configure your local workspace IDE environment.",
  },
  {
    id: 2,
    title: "Chapter 1: Python Basics & Syntax",
    description: "Learn variables, basic statements, comments, core data types, type conversions, reading user keyboard input, and standard PEP 8 formatting guidelines.",
  },
  {
    id: 3,
    title: "Chapter 2: Decision Making & Loops",
    description: "Master conditionals, nested boolean logic, loop iterations using 'for' and 'while', flow modifiers like break, continue, and pass, and standard iteration helpers.",
  },
  {
    id: 4,
    title: "Chapter 3: Python Data Structures",
    description: "Dive deep into lists, tuples, dictionaries, and sets. Learn their characteristics, common methods, slicing, indexing, and performance implications.",
  },
  {
    id: 5,
    title: "Chapter 4: Functions & Scope",
    description: "Learn to write clean, reusable code. Cover function arguments, default parameters, variable-length arguments, scopes, namespaces, and recursion.",
  },
  {
    id: 6,
    title: "Chapter 5: Object-Oriented Programming (OOP)",
    description: "Explore classes, objects, class constructors, method types, encapsulation, single/multiple inheritance, polymorphism, abstract classes, and composition.",
  },
  {
    id: 7,
    title: "Chapter 6: Functional & Pythonic Programming",
    description: "Write elegant Python using map, filter, reduce, list/dict comprehensions, generators, custom decorators, closures, and the itertools library.",
  },
  {
    id: 8,
    title: "Chapter 7: Exception Handling & File Operations",
    description: "Build resilient apps using try-except blocks, raising custom errors, file reader/writer contexts, and structured data handling (CSV, JSON).",
  },
  {
    id: 9,
    title: "Chapter 8: Modules, Packages & Virtual Environments",
    description: "Organize large programs. Study absolute vs relative imports, package structure, virtual environments (venv), and pip dependency management.",
  },
  {
    id: 10,
    title: "Chapter 9: Working with Web APIs",
    description: "Perform network calls using HTTP requests, fetch RESTful JSON payloads, handle authentication headers, and perform basic web scraping.",
  },
  {
    id: 11,
    title: "Chapter 10: Multithreading & AsyncIO",
    description: "Master asynchronous code using async/await syntax, parallel thread pools, CPU vs I/O-bound optimizations, and concurrent event loops.",
  },
  {
    id: 12,
    title: "Chapter 11: CLI & Automation Tools",
    description: "Build advanced command line tools with argparse, log output streams, automate filesystem workflows, and script background tasks.",
  },
  {
    id: 13,
    title: "Chapter 12: Web Development (Flask/FastAPI)",
    description: "Develop high-performance REST APIs with FastAPI, specify request validation schemas, implement database persistence with SQLAlchemy, and dockerize.",
  },
  {
    id: 14,
    title: "Chapter 13: Data Analysis & Visualization",
    description: "Learn data science fundamentals. Process arrays with NumPy, clean dataframes with Pandas, and construct visualization plots with Matplotlib.",
  },
  {
    id: 15,
    title: "Chapter 14: AI Integration & Model Architectures",
    description: "Build AI services. Run local model inferences, connect to HuggingFace transformers, build LLM pipelines with LangChain, and wrap in API endpoints.",
  },
  {
    id: 16,
    title: "Chapter 15: Python Interview & Career Prep",
    description: "Prepare for your dream role. Solve coding challenges, review mock interviews, optimize your tech resume, and polish your GitHub portfolio.",
  }
];

export function CourseCurriculumView({
  courseTitle,
  language = "cpp",
  onBackToCourses,
}: CourseCurriculumViewProps) {
  const isPython = language === "python";
  const topics = isPython ? PYTHON_CHAPTERS : DEFAULT_TOPICS;

  const [completedTopicIds, setCompletedTopicIds] = useState<number[]>([1]);
  const [activeTopicId, setActiveTopicId] = useState<number>(1);

  const currentTopic = topics.find((t) => t.id === activeTopicId) || topics[0];

  const handleFinishTopic = (id: number) => {
    if (!completedTopicIds.includes(id)) {
      setCompletedTopicIds([...completedTopicIds, id]);
    }
    if (id < topics.length) {
      alert(`🎉 Congratulations! You completed Topic ${id} (${currentTopic.title}). Next Topic is now UNLOCKED!`);
      setActiveTopicId(id + 1);
    } else {
      alert("🎉 Congratulations! You have completed all units in this programming curriculum!");
    }
  };

  const progressPercent = Math.round((completedTopicIds.length / topics.length) * 100);

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-12">
      {/* Top Learning Hub Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-[#0C0C16] to-purple-950/40 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToCourses}
              className="px-4 py-2 rounded-xl glass-panel text-slate-300 hover:text-white text-xs font-bold flex items-center gap-2 hover:border-cyan-400/50 transition-all"
            >
              <ArrowLeft size={16} /> Back to My Courses
            </button>
            <div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Active Enrolled Course
              </span>
              <h1 className="text-xl sm:text-3xl font-black text-white mt-1 tracking-tight">
                {courseTitle}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
              <Clock size={14} className="text-purple-400" />
              <span>Validity: 89 Days Remaining</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
              <Award size={14} className="text-cyan-400" />
              <span>Overall Progress: {progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-300 font-mono">
            <span>Sequential Curriculum Progress</span>
            <span className="text-cyan-400 font-bold">{completedTopicIds.length} of {topics.length} Topics Unlocked</span>
          </div>
          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* TOPIC CURRICULUM PIPELINE INDEX */}
      <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers size={18} className="text-cyan-400" />
            Topic Curriculum Pipeline (Sequential Unlock)
          </h2>
          <span className="text-xs text-cyan-400 font-mono">
            Topic {activeTopicId} Active &bull; Topics {activeTopicId + 1}..{topics.length} Locked
          </span>
        </div>

        <div className={`grid grid-cols-2 ${isPython ? "sm:grid-cols-4 lg:grid-cols-8" : "sm:grid-cols-5"} gap-3`}>
          {topics.map((t) => {
            const isUnlocked = t.id === 1 || completedTopicIds.includes(t.id - 1) || completedTopicIds.includes(t.id);
            const isSelected = activeTopicId === t.id;
            const isCompleted = completedTopicIds.includes(t.id);

            return (
              <button
                key={t.id}
                type="button"
                disabled={!isUnlocked}
                onClick={() => isUnlocked && setActiveTopicId(t.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-32 relative group ${
                  isSelected
                    ? "bg-gradient-to-b from-blue-600/30 to-purple-600/20 border-cyan-400 text-white shadow-xl shadow-blue-500/10 glow-border-blue"
                    : isUnlocked
                    ? "glass-panel border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/40"
                    : "bg-white/5 border-white/5 text-slate-500 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-cyan-300">
                    {isPython ? `CH ${t.id - 1}` : `TOPIC ${t.id}`}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 size={18} className="text-emerald-400 font-bold" />
                  ) : isUnlocked ? (
                    <Unlock size={15} className="text-cyan-400" />
                  ) : (
                    <Lock size={15} className="text-slate-500" />
                  )}
                </div>

                <div>
                  <div className="text-[11px] font-extrabold line-clamp-2 mt-1 leading-snug">{t.title}</div>
                  {!isUnlocked && (
                    <span className="text-[8px] text-slate-500 block mt-1 font-mono leading-none">🔒 Complete previous topic</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE TOPIC DEEP LEARNING STUDIO */}
      <div className="space-y-8 pt-2">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">ACTIVE TOPIC WORKSPACE</span>
            <h2 className="text-xl sm:text-2xl font-black text-white">{currentTopic.title}</h2>
            <p className="text-xs text-slate-400">{currentTopic.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck size={14} /> Synced &amp; Unlocked
            </span>
          </div>
        </div>

        {/* STEP A: AI VOICE CONCEPT EXPLAINER */}
        <TopicExplanationSpeech
          title={currentTopic.title}
          explanation={`Welcome to ${currentTopic.title} of ${courseTitle}! In this module, we cover: ${currentTopic.description}. Pay close attention to standard syntactical guidelines, performance trade-offs, and memory paradigms. Listen to the AI voice explainer below, then complete the topic challenge.`}
          onCompleteExplanation={() => {}}
        />

        {/* STEP B: TOPIC QUIZ (5-10 QUESTIONS) */}
        <TopicQuizWidget
          quizDataJson=""
          onCompleteQuiz={() => {}}
        />

        {/* STEP C: MONACO AI CODE EDITOR */}
        <MonacoAIEditor
          language={language}
          onCompleteCode={() => {
            handleFinishTopic(currentTopic.id);
          }}
        />
      </div>
    </div>
  );
}
