"use client";

import React, { useState } from "react";
import { Lock, Unlock, CheckCircle2, Play, Sparkles, BookOpen, ChevronRight, Clock, Award, ShieldCheck, ArrowLeft, Layers } from "lucide-react";
import { TopicExplanationSpeech } from "./TopicExplanationSpeech";
import { TopicQuizWidget } from "./TopicQuizWidget";
import { MonacoAIEditor } from "./MonacoAIEditor";

interface CourseCurriculumViewProps {
  courseTitle: string;
  language: string;
  onBackToCourses: () => void;
}

export function CourseCurriculumView({
  courseTitle,
  language = "cpp",
  onBackToCourses,
}: CourseCurriculumViewProps) {
  const [completedTopicIds, setCompletedTopicIds] = useState<number[]>([1]);
  const [activeTopicId, setActiveTopicId] = useState<number>(1);
  const [stepAComplete, setStepAComplete] = useState(false);
  const [stepBComplete, setStepBComplete] = useState(false);
  const [stepCComplete, setStepCComplete] = useState(false);

  const topics = [
    {
      id: 1,
      title: "Topic 1: Language Syntax, Variables & Primitive Memory",
      unlocked: true,
      description: "Master variables, data types, RAM memory allocation, and basic syntax rules.",
    },
    {
      id: 2,
      title: "Topic 2: Decision Logic, Loops & Control Flow",
      unlocked: completedTopicIds.includes(1),
      description: "Master if-else conditions, switch cases, for/while loops, and break statements.",
    },
    {
      id: 3,
      title: "Topic 3: Functions, Stack Frame & Scope",
      unlocked: completedTopicIds.includes(2),
      description: "Master function declarations, parameters, return values, and call stack execution.",
    },
    {
      id: 4,
      title: "Topic 4: Arrays, Pointers & Heap Memory Allocation",
      unlocked: completedTopicIds.includes(3),
      description: "Master array indexing, pointer arithmetic, malloc/free, and memory layout.",
    },
    {
      id: 5,
      title: "Topic 5: Object-Oriented Architecture & Capstone Project",
      unlocked: completedTopicIds.includes(4),
      description: "Master classes, encapsulation, inheritance, polymorphism, and full project build.",
    },
  ];

  const currentTopic = topics.find((t) => t.id === activeTopicId) || topics[0];

  const handleFinishTopic1 = () => {
    if (!completedTopicIds.includes(1)) {
      setCompletedTopicIds([...completedTopicIds, 1]);
    }
    alert("🎉 Congratulations! You completed Topic 1 (AI Voice Explainer + Quiz + Monaco Code Editor). Topic 2 is now UNLOCKED!");
    setActiveTopicId(2);
  };

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
              <span>Overall Progress: {completedTopicIds.length * 20}%</span>
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-300 font-mono">
            <span>Sequential Curriculum Progress</span>
            <span className="text-cyan-400 font-bold">{completedTopicIds.length} of 5 Topics Unlocked</span>
          </div>
          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 rounded-full transition-all duration-700"
              style={{ width: `${completedTopicIds.length * 20}%` }}
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
            Topic 1 Active &bull; Topics 2..5 Locked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {topics.map((t) => {
            const isUnlocked = t.unlocked || completedTopicIds.includes(t.id - 1);
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
                    TOPIC {t.id}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 size={18} className="text-emerald-400" />
                  ) : isUnlocked ? (
                    <Unlock size={16} className="text-cyan-400" />
                  ) : (
                    <Lock size={16} className="text-slate-500" />
                  )}
                </div>

                <div>
                  <div className="text-xs font-extrabold line-clamp-2 mt-1">{t.title}</div>
                  {!isUnlocked && (
                    <span className="text-[10px] text-slate-500 block mt-1 font-mono">🔒 Complete Topic {t.id - 1} to Unlock</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE TOPIC DEEP LEARNING STUDIO */}
      {activeTopicId === 1 ? (
        <div className="space-y-8 pt-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">ACTIVE TOPIC WORKSPACE</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">{currentTopic.title}</h2>
              <p className="text-xs text-slate-400">{currentTopic.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck size={14} /> Topic 1 Unlocked
              </span>
            </div>
          </div>

          {/* STEP A: AI VOICE CONCEPT EXPLAINER */}
          <TopicExplanationSpeech
            title="Topic 1: Language Syntax & Variables"
            explanation={`Welcome to Topic 1 of ${courseTitle}! In this initial module, we master core syntax, memory representation, and data types. Variables store values in computer memory registers. Remember: static typing requires variable type definitions and semicolons at the end of each statement. Listen to the AI voice explainer below, then proceed to the Quiz and Code Editor.`}
            onCompleteExplanation={() => setStepAComplete(true)}
          />

          {/* STEP B: TOPIC QUIZ (5-10 QUESTIONS) */}
          <TopicQuizWidget
            quizDataJson=""
            onCompleteQuiz={() => setStepBComplete(true)}
          />

          {/* STEP C: MONACO AI CODE EDITOR */}
          <MonacoAIEditor
            language={language}
            onCompleteCode={() => {
              setStepCComplete(true);
              handleFinishTopic1();
            }}
          />
        </div>
      ) : (
        <div className="glass-panel p-10 rounded-3xl border border-white/10 text-center space-y-4 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400 mx-auto flex items-center justify-center text-cyan-400">
            <Unlock size={28} />
          </div>
          <h3 className="text-2xl font-black text-white">Topic {activeTopicId} Unlocked &amp; Active</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Congratulations on unlocking Topic {activeTopicId}! Master the AI Voice Concept Explainer, complete the 5-10 Question Quiz, and execute your code in the Monaco AI Editor to complete the curriculum.
          </p>
        </div>
      )}
    </div>
  );
}
