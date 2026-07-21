"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, FileText, Download, CheckCircle, BookOpen, Layers, Sparkles } from "lucide-react";

interface SyllabusDocViewerModalProps {
  courseTitle: string;
  language: string;
  onClose: () => void;
}

const PYTHON_OFFICIAL_DOCX_SYLLABUS = [
  {
    part: "Part I – Programming Foundations",
    chapter: "Chapter 0 – Introduction to Programming",
    topics: [
      "0.1 What is Programming?",
      "0.2 What is Python?",
      "0.3 Why Python?",
      "0.4 Applications: AI & Machine Learning, Web Development, Automation, Data Science, Cybersecurity, Game Development",
      "0.5 How Python Executes Code",
      "0.6 Interpreted vs Compiled Languages",
      "0.7 Installing Python & Choosing an IDE",
      "0.9 Writing Your First Python Program",
    ],
  },
  {
    part: "Part II – Python Fundamentals",
    chapter: "Chapter 1 – Python Basics & Syntax",
    topics: [
      "1.1 Python Syntax & Variables",
      "1.3 Naming Conventions & Data Types",
      "1.5 Type Conversion & Operators",
      "1.7 User Input & String Formatting",
      "1.9 Comments & PEP 8 Coding Style",
      "1.10 Practice Exercises & Mini Project",
    ],
  },
  {
    part: "Part II – Python Fundamentals",
    chapter: "Chapter 2 – Decision Making & Loops",
    topics: [
      "2.1 Boolean Expressions & if-else Statements",
      "2.4 Nested Conditions & for Loops",
      "2.6 while Loops, break, continue, pass",
      "2.10 range(), enumerate(), and zip()",
      "Practice Exercises & Mini Project",
    ],
  },
  {
    part: "Part II – Python Fundamentals",
    chapter: "Chapter 3 – Python Data Structures",
    topics: [
      "3.1 Lists, Tuples, Dictionaries, Sets & Strings",
      "3.6 Nested Data Structures & Choosing Right Data Structure",
      "List Comprehensions, Dictionary & Set Comprehensions",
      "Practice Exercises & Mini Project",
    ],
  },
  {
    part: "Part II – Python Fundamentals",
    chapter: "Chapter 4 – Functions",
    topics: [
      "4.1 Introduction to Functions & Parameters",
      "4.3 Return Values & Variable Scope",
      "4.5 Lambda Functions & Recursion",
      "Function Documentation & Mini Project",
    ],
  },
  {
    part: "Part III – Object-Oriented Programming",
    chapter: "Chapter 5 – Object-Oriented Programming (OOP)",
    topics: [
      "5.1 Classes, Objects & Constructors",
      "5.4 Attributes, Methods & Encapsulation",
      "5.6 Inheritance, Polymorphism & Magic Methods",
      "5.10 Abstract Classes & Composition vs Inheritance",
    ],
  },
  {
    part: "Part IV – Advanced Python Programming",
    chapter: "Chapter 6 – Functional & Pythonic Programming",
    topics: [
      "6.1 Iterators, Iterables & Generators",
      "6.4 yield, Decorators & Context Managers",
      "6.7 map(), filter(), reduce(), Closures",
    ],
  },
  {
    part: "Part IV – Advanced Python Programming",
    chapter: "Chapter 7 – Exception Handling & File Operations",
    topics: [
      "7.1 Errors vs Exceptions (try, except, else, finally)",
      "7.6 Custom Exceptions",
      "7.7 Reading & Writing Files (TXT, CSV, JSON)",
    ],
  },
  {
    part: "Part IV – Advanced Python Programming",
    chapter: "Chapter 8 – Modules, Packages & Virtual Environments",
    topics: [
      "8.1 Importing Modules & Packages (__init__.py)",
      "8.4 Standard Library, Virtual Environments & pip",
      "8.7 requirements.txt & Custom Modules",
    ],
  },
  {
    part: "Part V – Applied Python Programming",
    chapter: "Chapter 9 & 10 – Applied Python & Advanced Concepts",
    topics: [
      "9.1 Working with APIs & requests Library",
      "9.4 Web Scraping & Regular Expressions",
      "10.1 Python Data Model & Memory Management",
      "10.7 Threading, Multiprocessing & Asyncio",
    ],
  },
  {
    part: "Part VI – Real-World & Capstone Projects",
    chapter: "Chapter 11 to 14 – Capstone Projects",
    topics: [
      "Beginner: Calculator, To-Do List, Contact Book",
      "Intermediate: Library System, Quiz Application, Expense Tracker",
      "Advanced: Weather App, Web Scraper, FastAPI Notes Backend",
      "Capstone: Banking System, Student Management System, E-commerce Backend",
    ],
  },
  {
    part: "Part VII – Interview Preparation",
    chapter: "Chapter 15 – Python Interview & Career Preparation",
    topics: [
      "PEP 8 Best Practices & Common Python Interview Questions",
      "Debugging Strategies, Reading Tracebacks & Unit Testing (pytest)",
      "Git Basics, Code Reviews, Resume Projects & GitHub Portfolio",
    ],
  },
];

export function SyllabusDocViewerModal({
  courseTitle,
  language,
  onClose,
}: SyllabusDocViewerModalProps) {
  const [activeTab, setActiveTab] = useState<string>("All Parts");

  const handleDownloadDocx = () => {
    alert(`📥 Downloading Official ${courseTitle} Syllabus Document (Table of Contents.docx)...`);
  };

  return (
    <div className="fixed inset-0 z-[11000] bg-[#09090B]/95 backdrop-blur-3xl flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 max-w-4xl w-full relative overflow-hidden shadow-2xl bg-[#080812] z-[12000] my-6 max-h-[92vh] flex flex-col justify-between"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <FileText size={22} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                Official Curriculum Index (.docx)
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                  Verified Document
                </span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                {courseTitle} &bull; Table of Contents(Python Index).docx
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadDocx}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 glow-btn flex items-center gap-1.5 shadow-lg"
            >
              <Download size={15} /> Download .docx
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full glass-panel text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Document Body View */}
        <div className="space-y-4 my-4 overflow-y-auto pr-2 flex-1">
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-xs sm:text-sm text-cyan-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles size={16} className="text-cyan-400" />
              <span>Viewing parsed official document: <strong>Table of Contents(Python Index).docx</strong></span>
            </span>
            <span className="font-mono text-xs text-slate-400">15 Chapters &bull; Capstones Included</span>
          </div>

          <div className="space-y-4">
            {PYTHON_OFFICIAL_DOCX_SYLLABUS.map((sec, idx) => (
              <div
                key={idx}
                className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3 bg-[#0C0C18]"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider block">
                      {sec.part}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">{sec.chapter}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                  {sec.topics.map((top, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{top}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between shrink-0 text-xs text-slate-400">
          <span>Official Syllabus Document &bull; KnowledgeStream AI Curriculum Engine</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15"
          >
            Close Document Reader
          </button>
        </div>
      </motion.div>
    </div>
  );
}
