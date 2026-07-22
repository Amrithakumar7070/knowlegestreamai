"use client";

import React, { useState } from "react";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import {
  Sparkles,
  BookOpen,
  Award,
  Clock,
  Flame,
  CheckCircle2,
  Lock,
  ChevronRight,
  ChevronDown,
  Play,
  Trophy,
  ArrowLeft,
  Calendar,
  Layers,
  Terminal,
  RefreshCw,
  Cpu
} from "lucide-react";

// Structure of curriculum data for sidebar
interface ChapterItem {
  id: string;
  name: string;
  progress: number;
  totalTopics: number;
}

interface PartItem {
  id: string;
  title: string;
  subtitle: string;
  chapters: ChapterItem[];
  status: "completed" | "active" | "locked";
}

const SYLLABUS_PARTS: PartItem[] = [
  {
    id: "part_1",
    title: "Part I – Programming Foundations",
    subtitle: "Fundamentals of algorithms and computer execution",
    status: "completed",
    chapters: [
      { id: "ch0", name: "Chapter 0 – Introduction to Programming", progress: 100, totalTopics: 8 }
    ]
  },
  {
    id: "part_2",
    title: "Part II – Python Fundamentals",
    subtitle: "Core Python syntax, control flow, data structures, and functions",
    status: "active",
    chapters: [
      { id: "ch1", name: "Chapter 1 – Python Basics & Syntax", progress: 83, totalTopics: 6 },
      { id: "ch2", name: "Chapter 2 – Decision Making & Loops", progress: 0, totalTopics: 6 },
      { id: "ch3", name: "Chapter 3 – Python Data Structures", progress: 0, totalTopics: 8 },
      { id: "ch4", name: "Chapter 4 – Functions & Scope", progress: 0, totalTopics: 8 }
    ]
  },
  {
    id: "part_3",
    title: "Part III – Object-Oriented Programming",
    subtitle: "Classes, objects, inheritance, encapsulation, and magic methods",
    status: "locked",
    chapters: [
      { id: "ch5", name: "Chapter 5 – Object-Oriented Programming (OOP)", progress: 0, totalTopics: 10 }
    ]
  },
  {
    id: "part_4",
    title: "Part IV – Advanced Python Programming",
    subtitle: "Iterators, generators, decorators, exception handling, and packages",
    status: "locked",
    chapters: [
      { id: "ch6", name: "Chapter 6 – Functional & Pythonic Programming", progress: 0, totalTopics: 8 },
      { id: "ch7", name: "Chapter 7 – Exception Handling & File Operations", progress: 0, totalTopics: 8 },
      { id: "ch8", name: "Chapter 8 – Modules, Packages & Virtual Environments", progress: 0, totalTopics: 8 }
    ]
  },
  {
    id: "part_5",
    title: "Part V – Applied Python Programming",
    subtitle: "Working with APIs, web scraping, threading, and asyncio",
    status: "locked",
    chapters: [
      { id: "ch9", name: "Chapter 9 – Working with Web APIs", progress: 0, totalTopics: 8 },
      { id: "ch10", name: "Chapter 10 – Multithreading & AsyncIO", progress: 0, totalTopics: 8 }
    ]
  },
  {
    id: "part_6",
    title: "Part VI – Real-World & Capstone Projects",
    subtitle: "Portfolio development from basic utilities to full-stack backends",
    status: "locked",
    chapters: [
      { id: "ch11", name: "Chapter 11 – CLI & Automation Tools", progress: 0, totalTopics: 10 },
      { id: "ch12", name: "Chapter 12 – Web Development (Flask/FastAPI)", progress: 0, totalTopics: 12 },
      { id: "ch13", name: "Chapter 13 – Data Analysis & Visualization", progress: 0, totalTopics: 12 },
      { id: "ch14", name: "Chapter 14 – AI Integration & Model Architectures", progress: 0, totalTopics: 12 }
    ]
  },
  {
    id: "part_7",
    title: "Part VII – Interview Preparation",
    subtitle: "PEP 8 best practices, debugging, testing, and resume building",
    status: "locked",
    chapters: [
      { id: "ch15", name: "Chapter 15 – Python Interview & Career Prep", progress: 0, totalTopics: 11 }
    ]
  }
];

// Timeline chapters details
interface Topic {
  id: string;
  name: string;
}

interface ChapterDetails {
  id: string;
  number: number;
  title: string;
  description: string;
  topics: Topic[];
}

const TIMELINE_CHAPTERS: ChapterDetails[] = [
  {
    id: "ch0",
    number: 0,
    title: "Introduction to Programming",
    description: "Understand the core concepts of programming, how computers execute code, why Python is an industry standard, and configure your local workspace IDE environment.",
    topics: [
      { id: "ch0_1", name: "0.1 What is Programming?" },
      { id: "ch0_2", name: "0.2 What is Python?" },
      { id: "ch0_3", name: "0.3 Why Python?" },
      { id: "ch0_4", name: "0.4 Applications: AI, Data Science & Web" },
      { id: "ch0_5", name: "0.5 How Python Executes Code" },
      { id: "ch0_6", name: "0.6 Interpreted vs Compiled Languages" },
      { id: "ch0_7", name: "0.7 Installing Python & IDEs" },
      { id: "ch0_8", name: "0.8 Writing Your First Python Program" }
    ]
  },
  {
    id: "ch1",
    number: 1,
    title: "Python Basics & Syntax",
    description: "Learn variables, basic statements, comments, core data types, type conversions, reading user keyboard input, and standard PEP 8 formatting guidelines.",
    topics: [
      { id: "ch1_1", name: "1.1 Python Syntax & Variables" },
      { id: "ch1_2", name: "1.2 Naming Conventions & Rules" },
      { id: "ch1_3", name: "1.3 Core Data Types & Type Conversion" },
      { id: "ch1_4", name: "1.4 User Keyboard Input & Output" },
      { id: "ch1_5", name: "1.5 String Formatting & Escape Sequences" },
      { id: "ch1_6", name: "1.6 Comments & PEP 8 Coding Style" }
    ]
  },
  {
    id: "ch2",
    number: 2,
    title: "Decision Making & Loops",
    description: "Master conditionals, nested boolean logic, loop iterations using 'for' and 'while', flow modifiers like break, continue, and pass, and standard iteration helpers.",
    topics: [
      { id: "ch2_1", name: "2.1 Boolean Logic & Expressions" },
      { id: "ch2_2", name: "2.2 Conditional Statements (if-elif-else)" },
      { id: "ch2_3", name: "2.3 Loops: while Loop Iteration" },
      { id: "ch2_4", name: "2.4 Loops: for Loop Iteration" },
      { id: "ch2_5", name: "2.5 Loop Controls: break, continue, pass" },
      { id: "ch2_6", name: "2.6 Iteration Helpers: range() & enumerate()" }
    ]
  },
  {
    id: "ch3",
    number: 3,
    title: "Python Data Structures",
    description: "Dive deep into lists, tuples, dictionaries, and sets. Learn their characteristics, common methods, slicing, indexing, and performance implications.",
    topics: [
      { id: "ch3_1", name: "3.1 Python Lists: Creation & Operations" },
      { id: "ch3_2", name: "3.2 List Methods: append, extend, insert" },
      { id: "ch3_3", name: "3.3 Tuples: Immutable Sequences" },
      { id: "ch3_4", name: "3.4 Dictionaries: Key-Value Pairs" },
      { id: "ch3_5", name: "3.5 Dictionary Methods & Operations" },
      { id: "ch3_6", name: "3.6 Sets: Unordered Unique Collections" },
      { id: "ch3_7", name: "3.7 Slicing and Indexing Techniques" },
      { id: "ch3_8", name: "3.8 Comprehensions: Lists, Dicts & Sets" }
    ]
  },
  {
    id: "ch4",
    number: 4,
    title: "Functions & Scope",
    description: "Learn to write clean, reusable code. Cover function arguments, default parameters, variable-length arguments, scopes, namespaces, and recursion.",
    topics: [
      { id: "ch4_1", name: "4.1 Defining & Calling Functions" },
      { id: "ch4_2", name: "4.2 Function Arguments: Positional vs Keyword" },
      { id: "ch4_3", name: "4.3 Default Arguments & *args / **kwargs" },
      { id: "ch4_4", name: "4.4 Return Statements & Multiple Returns" },
      { id: "ch4_5", name: "4.5 Variable Scope: Local, Global, Enclosing" },
      { id: "ch4_6", name: "4.6 Lambda Functions & Anonymous Execution" },
      { id: "ch4_7", name: "4.7 Docstrings & Function Documentation" },
      { id: "ch4_8", name: "4.8 Recursion Basics & Stack Trace" }
    ]
  },
  {
    id: "ch5",
    number: 5,
    title: "Object-Oriented Programming (OOP)",
    description: "Explore classes, objects, class constructors, method types, encapsulation, single/multiple inheritance, polymorphism, abstract classes, and composition.",
    topics: [
      { id: "ch5_1", name: "5.1 Introduction to OOP Concepts" },
      { id: "ch5_2", name: "5.2 Defining Classes & Creating Objects" },
      { id: "ch5_3", name: "5.3 Class Constructor (__init__) & Attributes" },
      { id: "ch5_4", name: "5.4 Instance, Class, and Static Methods" },
      { id: "ch5_5", name: "5.5 Encapsulation: Private & Protected" },
      { id: "ch5_6", name: "5.6 Inheritance: Single vs Multiple" },
      { id: "ch5_7", name: "5.7 Polymorphism & Method Overriding" },
      { id: "ch5_8", name: "5.8 Abstract Classes & Interfaces" },
      { id: "ch5_9", name: "5.9 Magic/Dunder Methods (__str__, __repr__)" },
      { id: "ch5_10", name: "5.10 Composition vs Inheritance" }
    ]
  },
  {
    id: "ch6",
    number: 6,
    title: "Functional & Pythonic Programming",
    description: "Write elegant Python using map, filter, reduce, list/dict comprehensions, generators, custom decorators, closures, and the itertools library.",
    topics: [
      { id: "ch6_1", name: "6.1 Functional Programming Principles" },
      { id: "ch6_2", name: "6.2 High-Order Functions: map(), filter(), reduce()" },
      { id: "ch6_3", name: "6.3 List, Set & Dict Comprehensions" },
      { id: "ch6_4", name: "6.4 Generator Expressions & Yield Keyword" },
      { id: "ch6_5", name: "6.5 Closures & Nested Functions" },
      { id: "ch6_6", name: "6.6 Decorators: Creating & Chaining" },
      { id: "ch6_7", name: "6.7 Decorators with Arguments" },
      { id: "ch6_8", name: "6.8 Built-in itertools Module" }
    ]
  },
  {
    id: "ch7",
    number: 7,
    title: "Exception Handling & File Operations",
    description: "Build resilient apps using try-except blocks, raising custom errors, file reader/writer contexts, and structured data handling (CSV, JSON).",
    topics: [
      { id: "ch7_1", name: "7.1 Exception Handling Concepts (try-except)" },
      { id: "ch7_2", name: "7.2 Multiple Exceptions & finally Block" },
      { id: "ch7_3", name: "7.3 Raising Exceptions & Custom Errors" },
      { id: "ch7_4", name: "7.4 Assertions & Debugging Basics" },
      { id: "ch7_5", name: "7.5 File I/O: Reading Text Files" },
      { id: "ch7_6", name: "7.6 File I/O: Writing & Appending Files" },
      { id: "ch7_7", name: "7.7 Context Managers (with statement)" },
      { id: "ch7_8", name: "7.8 Working with CSV & JSON Formats" }
    ]
  },
  {
    id: "ch8",
    number: 8,
    title: "Modules, Packages & Virtual Environments",
    description: "Organize large programs. Study absolute vs relative imports, package structure, virtual environments (venv), and pip dependency management.",
    topics: [
      { id: "ch8_1", name: "8.1 Modules & Imports in Python" },
      { id: "ch8_2", name: "8.2 Creating & Structuring Packages" },
      { id: "ch8_3", name: "8.3 Module Search Paths & sys.path" },
      { id: "ch8_4", name: "8.4 Virtual Environments (venv/conda)" },
      { id: "ch8_5", name: "8.5 Managing Dependencies (pip & requirements.txt)" },
      { id: "ch8_6", name: "8.6 The __name__ == '__main__' Idiom" },
      { id: "ch8_7", name: "8.7 Standard Library Overview" },
      { id: "ch8_8", name: "8.8 Packaging & Distribution Basics" }
    ]
  },
  {
    id: "ch9",
    number: 9,
    title: "Working with Web APIs",
    description: "Perform network calls using HTTP requests, fetch RESTful JSON payloads, handle authentication headers, and perform basic web scraping.",
    topics: [
      { id: "ch9_1", name: "9.1 HTTP Protocol Basics & Methods" },
      { id: "ch9_2", name: "9.2 The requests Library in Python" },
      { id: "ch9_3", name: "9.3 Handling JSON API Responses" },
      { id: "ch9_4", name: "9.4 Query Parameters & Request Headers" },
      { id: "ch9_5", name: "9.5 Authentication: API Keys & OAuth" },
      { id: "ch9_6", name: "9.6 Error Handling in Network Requests" },
      { id: "ch9_7", name: "9.7 Web Scraping with BeautifulSoup" },
      { id: "ch9_8", name: "9.8 Rate Limiting & Scraping Ethics" }
    ]
  },
  {
    id: "ch10",
    number: 10,
    title: "Multithreading & AsyncIO",
    description: "Master asynchronous code using async/await syntax, parallel thread pools, CPU vs I/O-bound optimizations, and concurrent event loops.",
    topics: [
      { id: "ch10_1", name: "10.1 Concurrency vs Parallelism" },
      { id: "ch10_2", name: "10.2 Introduction to Multithreading" },
      { id: "ch10_3", name: "10.3 Thread Synchronization & Locks" },
      { id: "ch10_4", name: "10.4 Introduction to Multiprocessing" },
      { id: "ch10_5", name: "10.5 CPU-Bound vs I/O-Bound Workloads" },
      { id: "ch10_6", name: "10.6 Asynchronous Programming with asyncio" },
      { id: "ch10_7", name: "10.7 async/await Syntax & Event Loop" },
      { id: "ch10_8", name: "10.8 Concurrent Tasks: asyncio.gather" }
    ]
  },
  {
    id: "ch11",
    number: 11,
    title: "CLI & Automation Tools",
    description: "Build advanced command line tools with argparse, log output streams, automate filesystem workflows, and script background tasks.",
    topics: [
      { id: "ch11_1", name: "11.1 Planning CLI Application Flow" },
      { id: "ch11_2", name: "11.2 The sys.argv & argparse Modules" },
      { id: "ch11_3", name: "11.3 Rich CLI Layouts with rich Library" },
      { id: "ch11_4", name: "11.4 Logging in Python (logging module)" },
      { id: "ch11_5", name: "11.5 Automated File Organization Scripts" },
      { id: "ch11_6", name: "11.6 Interacting with OS (os & shutil)" },
      { id: "ch11_7", name: "11.7 Subprocess Module: Executing Commands" },
      { id: "ch11_8", name: "11.8 Scheduling Scripts with Cron/Task Scheduler" },
      { id: "ch11_9", name: "11.9 Configuration Files (INI, YAML, TOML)" },
      { id: "ch11_10", name: "11.10 Packaging CLI Tools" }
    ]
  },
  {
    id: "ch12",
    number: 12,
    title: "Web Development (Flask/FastAPI)",
    description: "Develop high-performance REST APIs with FastAPI, specify request validation schemas, implement database persistence with SQLAlchemy, and dockerize.",
    topics: [
      { id: "ch12_1", name: "12.1 Web Frameworks: Flask vs FastAPI" },
      { id: "ch12_2", name: "12.2 Setting up a FastAPI Application" },
      { id: "ch12_3", name: "12.3 Routing, Path & Query Parameters" },
      { id: "ch12_4", name: "12.4 Request & Response Models (Pydantic)" },
      { id: "ch12_5", name: "12.5 Dependency Injection in FastAPI" },
      { id: "ch12_6", name: "12.6 RESTful API Design Principles" },
      { id: "ch12_7", name: "12.7 Connect FastAPI to a Database" },
      { id: "ch12_8", name: "12.8 CRUD Operations & Database Sessions" },
      { id: "ch12_9", name: "12.9 Authentication: JWT & Passwords" },
      { id: "ch12_10", name: "12.10 Middleware & CORS Settings" },
      { id: "ch12_11", name: "12.11 API Testing with TestClient & pytest" },
      { id: "ch12_12", name: "12.12 Containerization: Dockerizing Web APIs" }
    ]
  },
  {
    id: "ch13",
    number: 13,
    title: "Data Analysis & Visualization",
    description: "Learn data science fundamentals. Process arrays with NumPy, clean dataframes with Pandas, and construct visualization plots with Matplotlib.",
    topics: [
      { id: "ch13_1", name: "13.1 Data Science Libraries: NumPy Basics" },
      { id: "ch13_2", name: "13.2 NumPy Arrays: Slicing & Operations" },
      { id: "ch13_3", name: "13.3 Pandas DataFrames & Series" },
      { id: "ch13_4", name: "13.4 Reading Data: CSV, Excel & SQL" },
      { id: "ch13_5", name: "13.5 Data Cleaning & Handling Nulls" },
      { id: "ch13_6", name: "13.6 Data Filtering & Querying DataFrames" },
      { id: "ch13_7", name: "13.7 Grouping & Aggregating Data" },
      { id: "ch13_8", name: "13.8 Merging & Joining DataFrames" },
      { id: "ch13_9", name: "13.9 Time Series Data Analysis" },
      { id: "ch13_10", name: "13.10 Data Visualization with Matplotlib" },
      { id: "ch13_11", name: "13.11 Premium Plots with Seaborn" },
      { id: "ch13_12", name: "13.12 Exploratory Data Analysis (EDA) Project" }
    ]
  },
  {
    id: "ch14",
    number: 14,
    title: "AI Integration & Model Architectures",
    description: "Build AI services. Run local model inferences, connect to HuggingFace transformers, build LLM pipelines with LangChain, and wrap in API endpoints.",
    topics: [
      { id: "ch14_1", name: "14.1 Introduction to Machine Learning" },
      { id: "ch14_2", name: "14.2 Scikit-Learn: Classification Workflows" },
      { id: "ch14_3", name: "14.3 Scikit-Learn: Regression Workflows" },
      { id: "ch14_4", name: "14.4 Model Evaluation Metrics" },
      { id: "ch14_5", name: "14.5 Data Preprocessing: Scaling & Encoding" },
      { id: "ch14_6", name: "14.6 Pipeline Architectures in Scikit-Learn" },
      { id: "ch14_7", name: "14.7 Neural Networks Basics & PyTorch" },
      { id: "ch14_8", name: "14.8 AI Architectures: Transformers Overview" },
      { id: "ch14_9", name: "14.9 HuggingFace Transformers Library" },
      { id: "ch14_10", name: "14.10 Local LLM Inference with Ollama" },
      { id: "ch14_11", name: "14.11 Prompt Engineering with LangChain" },
      { id: "ch14_12", name: "14.12 Capstone: Build an AI Assistant API" }
    ]
  },
  {
    id: "ch15",
    number: 15,
    title: "Python Interview & Career Prep",
    description: "Prepare for your dream role. Solve coding challenges, review mock interviews, optimize your tech resume, and polish your GitHub portfolio.",
    topics: [
      { id: "ch15_1", name: "15.1 Python Coding Style & Best Practices" },
      { id: "ch15_2", name: "15.2 Unit Testing with unittest & pytest" },
      { id: "ch15_3", name: "15.3 Mocking and Patching in Tests" },
      { id: "ch15_4", name: "15.4 Code Quality Tools: Ruff, Black, MyPy" },
      { id: "ch15_5", name: "15.5 Git and Collaborative Workflows" },
      { id: "ch15_6", name: "15.6 Solving Algorithmic Challenges" },
      { id: "ch15_7", name: "15.7 Common Python Interview Questions" },
      { id: "ch15_8", name: "15.8 System Design for Python Applications" },
      { id: "ch15_9", name: "15.9 Building a Tech Resume & Portfolio" },
      { id: "ch15_10", name: "15.10 Mock Interview Strategies" },
      { id: "ch15_11", name: "15.11 Final Review & Capstone Presentation" }
    ]
  }
];

const CODE_SANDBOX_TEMPLATES = [
  {
    fileName: "1_variables_intro.py",
    description: "Variables & Output Formatting",
    code: `# Lesson 1.5 - String Interpolation\nname = "Naveen"\nprogress = 25\ntotal = 142\npercentage = round((progress / total) * 100)\n\nprint(f"👋 Welcome back, {name}!")\nprint(f"📊 Completed {progress}/{total} topics ({percentage}%)")`,
    output: [
      "👋 Welcome back, Naveen!",
      "📊 Completed 25/142 topics (18%)"
    ]
  },
  {
    fileName: "2_loops_arrays.py",
    description: "Looping through curriculum items",
    code: `# Lesson 2.6 - Iterative Helpers\nactive_modules = ["Part I", "Part II", "Part III"]\n\nfor idx, module in enumerate(active_modules, start=1):\n    status = "Active" if idx == 2 else "Completed" if idx == 1 else "Locked"\n    print(f"🔹 {module}: [{status}]")`,
    output: [
      "🔹 Part I: [Completed]",
      "🔹 Part II: [Active]",
      "🔹 Part III: [Locked]"
    ]
  },
  {
    fileName: "3_oop_wizardry.py",
    description: "Mock Class & Method Definition",
    code: `# Lesson 5.4 - OOP Design Patterns\nclass AIStreamer:\n    def __init__(self, name, streak):\n        self.name = name\n        self.streak = streak\n        \n    def show_stats(self):\n        return f"🔥 {self.name} is on an {self.streak}-day learning streak!"\n\nuser = AIStreamer("Naveen", 8)\nprint(user.show_stats())`,
    output: [
      "🔥 Naveen is on an 8-day learning streak!"
    ]
  }
];

export default function PythonLearningPathPage() {
  const [completedTopics, setCompletedTopics] = useState<string[]>([
    // Chapter 0: 8 completed (100% complete)
    "ch0_1", "ch0_2", "ch0_3", "ch0_4", "ch0_5", "ch0_6", "ch0_7", "ch0_8",
    // Chapter 1: 5 completed (83% complete, ACTIVE)
    "ch1_1", "ch1_2", "ch1_3", "ch1_4", "ch1_5",
    // Chapter 2 (Locked): 4 topics pre-completed
    "ch2_1", "ch2_2", "ch2_3", "ch2_4",
    // Chapter 3 (Locked): 4 topics pre-completed
    "ch3_1", "ch3_2", "ch3_3", "ch3_4",
    // Chapter 4 (Locked): 4 topics pre-completed
    "ch4_1", "ch4_2", "ch4_3", "ch4_4"
  ]);

  // Sidebar modules expanding state
  const [expandedParts, setExpandedParts] = useState<Record<string, boolean>>({
    part_1: true,
    part_2: true
  });

  // Timeline chapters expanding state (Chapter 1 open by default)
  const [expandedTimelineChapters, setExpandedTimelineChapters] = useState<Record<string, boolean>>({
    ch0: false,
    ch1: true
  });

  // Mobile navigation tabs: "timeline" | "syllabus" | "stats"
  const [activeMobileTab, setActiveMobileTab] = useState<"timeline" | "syllabus" | "stats">("timeline");

  // Code Playground Simulator States
  const [selectedSnippetIdx, setSelectedSnippetIdx] = useState(0);
  const [playgroundCode, setPlaygroundCode] = useState(CODE_SANDBOX_TEMPLATES[0].code);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [activeRoadmapTooltip, setActiveRoadmapTooltip] = useState<string | null>(null);

  const totalTopicsInCourse = 142;
  const completedCount = completedTopics.length;
  const progressPercentage = Math.round((completedCount / totalTopicsInCourse) * 100);

  const handleSelectSnippet = (idx: number) => {
    setSelectedSnippetIdx(idx);
    setPlaygroundCode(CODE_SANDBOX_TEMPLATES[idx].code);
    setTerminalLines([]);
  };

  const runSimulatedCode = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTerminalLines([">>> initializing sandbox runner...", ">>> loading python 3.11 environment..."]);
    
    setTimeout(() => {
      setTerminalLines(prev => [...prev, ">>> running: " + CODE_SANDBOX_TEMPLATES[selectedSnippetIdx].fileName]);
      
      setTimeout(() => {
        setTerminalLines(prev => [
          ...prev,
          ...CODE_SANDBOX_TEMPLATES[selectedSnippetIdx].output,
          "",
          ">>> process finished with exit code 0"
        ]);
        setIsRunning(false);
      }, 800);
    }, 600);
  };

  const toggleTopic = (topicId: string, chapterNumber: number) => {
    // Only allow toggling if chapter is not locked (Chapter 0 is completed, Chapter 1 is active/editable)
    if (chapterNumber > 1) {
      return;
    }
    if (completedTopics.includes(topicId)) {
      setCompletedTopics(completedTopics.filter((id) => id !== topicId));
    } else {
      setCompletedTopics([...completedTopics, topicId]);
    }
  };

  const togglePart = (partId: string) => {
    setExpandedParts((prev) => ({
      ...prev,
      [partId]: !prev[partId]
    }));
  };

  const toggleTimelineChapter = (chapterId: string) => {
    setExpandedTimelineChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  // Helper to determine the chapter percentage
  const getChapterProgress = (chapterId: string, topics: Topic[]) => {
    if (topics.length === 0) return 0;
    const completed = topics.filter((t) => completedTopics.includes(t.id)).length;
    return Math.round((completed / topics.length) * 100);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar */}
      <TopNavbar userName="Naveen" userRole="Student" />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex w-full">
        
        {/* LEFT SIDEBAR: Course progress & Parts Navigator */}
        <aside className="hidden lg:flex w-80 shrink-0 border-r border-white/10 bg-[#09090B]/95 backdrop-blur-xl flex-col h-[calc(100vh-4rem)] sticky top-16 z-30 select-none overflow-y-auto custom-scrollbar">
          <div className="p-4 border-b border-white/10 flex flex-col gap-2">
            <a 
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors py-1"
            >
              <ArrowLeft size={14} /> Back to Dashboard
            </a>
            
            {/* Progress Panel in #0C0C16 */}
            <div className="p-4 rounded-2xl border border-white/10 mt-2 bg-[#0C0C16] shadow-2xl relative overflow-hidden group/progress hover:border-cyan-500/20 transition-all duration-300">
              <div className="absolute w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl -top-6 -right-6 pointer-events-none group-hover/progress:bg-cyan-500/10 transition-all duration-500" />
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Course Progress</span>
                <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20">
                  {progressPercentage}%
                </span>
              </div>
              
              {/* Circular Progress Representation */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-white/5"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]"
                      strokeWidth="3.5"
                      strokeDasharray={`${progressPercentage}, 100`}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute text-[10px] font-mono font-bold text-white">
                    {completedCount}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] text-slate-400 leading-tight">
                    Topics Completed
                  </div>
                  <div className="text-sm font-black text-white font-mono leading-none">
                    {completedCount} <span className="text-xs text-slate-500 font-normal">/ {totalTopicsInCourse}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-4 border border-white/5">
                <div 
                  className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Module Part I through Part VII Items */}
          <div className="flex-1 p-3 space-y-2">
            <h3 className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Learning Path Modules</h3>
            
            {SYLLABUS_PARTS.map((part) => {
              const isExpanded = !!expandedParts[part.id];
              const isCompleted = part.status === "completed";
              const isActive = part.status === "active";
              const isLocked = part.status === "locked";

              return (
                <div 
                  key={part.id} 
                  className={`rounded-2xl transition-all border duration-300 ${
                    isActive 
                      ? "bg-[#0C0C16] border-blue-500/30" 
                      : "border-transparent hover:bg-white/5"
                  }`}
                >
                  {/* Header click toggle */}
                  <button
                    onClick={() => togglePart(part.id)}
                    className="w-full flex items-center justify-between p-2.5 text-left rounded-2xl group transition-all"
                  >
                    <div className="space-y-1 flex-1 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.25 rounded ${
                          isCompleted 
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                            : isActive 
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : "bg-white/5 text-slate-500"
                        }`}>
                          {part.id.replace("_", " ")}
                        </span>
                        
                        {isCompleted && <CheckCircle2 size={11} className="text-emerald-400 shrink-0" />}
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shrink-0" />}
                        {isLocked && <Lock size={10} className="text-slate-600 shrink-0" />}
                      </div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors truncate max-w-[190px]">
                        {part.title.split("–")[1]?.trim() || part.title}
                      </div>
                    </div>
                    <div>
                      {isExpanded ? (
                        <ChevronDown size={14} className="text-slate-500" />
                      ) : (
                        <ChevronRight size={14} className="text-slate-500" />
                      )}
                    </div>
                  </button>

                  {/* Expanded chapters child list */}
                  {isExpanded && (
                    <div className="px-2 pb-2.5 pt-0.5 space-y-1 border-t border-white/5 mx-2.5">
                      {part.chapters.map((ch) => {
                        const isTimelineCh = TIMELINE_CHAPTERS.find((tc) => tc.id === ch.id);
                        const displayProg = isTimelineCh 
                          ? getChapterProgress(ch.id, isTimelineCh.topics) 
                          : ch.progress;
                        
                        return (
                          <div 
                            key={ch.id} 
                            className="flex flex-col gap-1 py-1.5 px-2 rounded-lg hover:bg-white/5 text-[11px] transition-colors"
                          >
                            <div className="flex items-center justify-between text-slate-300">
                              <span className="truncate max-w-[160px] font-medium">{ch.name}</span>
                              <span className="font-mono text-[9px] text-slate-400">{displayProg}%</span>
                            </div>
                            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-300 ${
                                  displayProg === 100 
                                    ? "bg-emerald-500" 
                                    : "bg-blue-500"
                                  }`}
                                style={{ width: `${displayProg}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* CENTER MAIN WORKSPACE */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto custom-scrollbar">
          
          {/* Mobile responsive tab headers */}
          <div className="flex lg:hidden items-center justify-between border-b border-white/10 pb-3 gap-2">
            <button
              onClick={() => setActiveMobileTab("timeline")}
              className={`flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all ${
                activeMobileTab === "timeline"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-[#0C0C16] border border-white/10 text-slate-400"
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setActiveMobileTab("syllabus")}
              className={`flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all ${
                activeMobileTab === "syllabus"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-[#0C0C16] border border-white/10 text-slate-400"
              }`}
            >
              Syllabus
            </button>
            <button
              onClick={() => setActiveMobileTab("stats")}
              className={`flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all ${
                activeMobileTab === "stats"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-[#0C0C16] border border-white/10 text-slate-400"
              }`}
            >
              Stats &amp; Badges
            </button>
          </div>

          {/* MOBILE BACK TO DASHBOARD SHORTCUT */}
          <div className="lg:hidden flex items-center">
            <a 
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              <ArrowLeft size={14} /> Back to Dashboard
            </a>
          </div>

          {/* TIMELINE SECTION VIEW */}
          <div className={`${activeMobileTab === "timeline" ? "block" : "hidden lg:block"} space-y-6`}>
            
            {/* Welcome Greeting Banner in #0C0C16 */}
            <div className="p-6 rounded-3xl border border-white/10 space-y-4 relative overflow-hidden bg-gradient-to-br from-blue-950/20 via-[#0C0C16] to-purple-950/20 shadow-2xl">
              {/* Dynamic Glow Circles */}
              <div className="absolute w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -top-28 -left-28 animate-pulse-slow" />
              <div className="absolute w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -bottom-28 -right-28 animate-pulse-slow" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />

              <div className="relative space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-cyan-300 text-[10px] font-semibold border border-blue-500/20 uppercase tracking-wider">
                  <Sparkles size={12} className="text-cyan-400" /> ACTIVE LEARNING PATH
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-300">Welcome back, Naveen 👋</p>
                  <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                    Python AI &amp; <span className="gradient-text-hero">Data Structures</span>
                  </h1>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  Master standard syntax, data structures, object-oriented concepts, asynchronous patterns, and capstone API model architectures. Your course access is valid for 90 days.
                </p>
                
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="#ch1"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 glow-btn flex items-center gap-2 transition-transform duration-300"
                  >
                    <Play size={13} fill="currentColor" /> Resume Chapter 1
                  </a>
                  
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono px-3 py-2 rounded-xl bg-white/5 border border-white/5">
                    <Calendar size={13} className="text-slate-500" />
                    <span>Expires: Oct 20, 2026 (90 Days)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MILESTONE PROGRESS ROAD - HORIZONTAL INTERACTIVE FLOW */}
            <div className="p-5 rounded-3xl border border-white/10 bg-[#0C0C16] shadow-2xl relative overflow-hidden">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Cpu size={14} className="text-purple-400" /> Visual Milestone Road Map
              </h3>
              
              <div className="relative flex items-center justify-between gap-2 overflow-x-auto pb-2 custom-scrollbar select-none pt-4 min-w-[600px]">
                {/* Horizontal Connection bar */}
                <div className="absolute left-[3%] right-[3%] top-[34px] h-[3px] bg-white/5 -translate-y-1/2 z-0" />
                <div className="absolute left-[3%] top-[34px] h-[3px] bg-gradient-to-r from-emerald-500 via-blue-500 to-white/5 -translate-y-1/2 z-0 transition-all duration-500" style={{ width: "20%" }} />

                {SYLLABUS_PARTS.map((part, index) => {
                  const isCompleted = part.status === "completed";
                  const isActive = part.status === "active";
                  
                  return (
                    <div 
                      key={part.id} 
                      className="relative z-10 flex flex-col items-center flex-1"
                      onMouseEnter={() => setActiveRoadmapTooltip(part.id)}
                      onMouseLeave={() => setActiveRoadmapTooltip(null)}
                    >
                      {/* Node circle */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 cursor-pointer ${
                        isCompleted 
                          ? "bg-emerald-950 border-emerald-400 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)] hover:scale-110" 
                          : isActive 
                          ? "bg-blue-950 border-blue-400 text-cyan-400 shadow-[0_0_12px_rgba(59,130,246,0.5)] animate-pulse hover:scale-110" 
                          : "bg-slate-900 border-white/10 text-slate-600 hover:border-white/20"
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 size={18} fill="currentColor" className="text-emerald-950" />
                        ) : (
                          <span className="text-xs font-mono font-bold">{index + 1}</span>
                        )}
                      </div>
                      
                      {/* Label */}
                      <span className={`text-[10px] font-bold mt-2 text-center truncate max-w-[80px] transition-colors duration-300 ${
                        isActive ? "text-cyan-400" : isCompleted ? "text-emerald-400" : "text-slate-500"
                      }`}>
                        {part.title.split("–")[0].trim()}
                      </span>

                      {/* Interactive Float details tooltip */}
                      {activeRoadmapTooltip === part.id && (
                        <div className="absolute bottom-12 w-48 p-3 rounded-xl border border-white/15 bg-slate-950/95 backdrop-blur-xl shadow-2xl z-50 animate-float">
                          <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">{part.id.replace("_", " ")}</div>
                          <div className="text-xs font-bold text-white leading-snug mt-1">{part.title.split("–")[1]?.trim() || part.title}</div>
                          <p className="text-[9px] text-slate-400 mt-1.5 leading-normal">{part.subtitle}</p>
                          <div className="border-t border-white/5 mt-2 pt-2 flex items-center justify-between text-[8px] font-mono text-slate-500">
                            <span>Chapters: {part.chapters.length}</span>
                            <span className={isCompleted ? "text-emerald-400" : isActive ? "text-blue-400" : ""}>
                              {isCompleted ? "COMPLETED" : isActive ? "IN PROGRESS" : "LOCKED"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CURRICULUM CHAPTER TIMELINE SECTION */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                  <Layers size={18} className="text-cyan-400" /> Focus Chapters Timeline
                </h2>
                <span className="text-[10px] text-slate-400 font-mono">
                  Chapters 0 to 15
                </span>
              </div>

              {/* Vertical Timeline container */}
              <div className="relative pl-6 sm:pl-8 space-y-6 pt-2">
                
                <div className="absolute left-3.5 sm:left-[17px] top-0 bottom-4 w-0.5 bg-gradient-to-b from-emerald-500 via-blue-500 to-slate-800" />

                {TIMELINE_CHAPTERS.map((chapter) => {
                  const isExpanded = !!expandedTimelineChapters[chapter.id];
                  
                  // Calculate dynamic progress
                  const totalTopics = chapter.topics.length;
                  const completedInCh = chapter.topics.filter((t) => completedTopics.includes(t.id)).length;
                  const percent = Math.round((completedInCh / totalTopics) * 100);

                  const isComplete = chapter.number === 0;
                  const isActive = chapter.number === 1;
                  const isLocked = chapter.number > 1;

                  return (
                    <div 
                      key={chapter.id} 
                      id={chapter.id} 
                      className="relative group scroll-mt-20"
                    >
                      {/* Timeline Node Icon Pin */}
                      <div className="absolute -left-[30px] sm:-left-[37px] top-4 z-10 flex items-center justify-center">
                        {isComplete ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white ring-4 ring-[#09090B] shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                            <CheckCircle2 size={13} fill="currentColor" className="text-emerald-950" />
                          </div>
                        ) : isActive ? (
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white ring-4 ring-[#09090B] animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500 ring-4 ring-[#09090B]">
                            <Lock size={10} />
                          </div>
                        )}
                      </div>

                      {/* Chapter Card */}
                      <div 
                        className={`rounded-2xl border transition-all duration-300 transform hover:scale-[1.005] hover:-translate-y-[1px] ${
                          isActive 
                            ? "border-blue-500/40 bg-gradient-to-br from-blue-950/15 via-[#0C0C16] to-purple-950/5 shadow-[0_8px_30px_rgba(59,130,246,0.12)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.22)] hover:border-blue-500/60" 
                            : isComplete
                            ? "bg-[#0C0C16]/90 border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)]"
                            : "bg-[#0C0C16]/50 border-white/5 opacity-60 hover:opacity-85 hover:border-white/10 shadow-lg"
                        }`}
                      >
                        {/* Chapter summary bar */}
                        <div 
                          className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                          onClick={() => toggleTimelineChapter(chapter.id)}
                        >
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center flex-wrap gap-2 text-xs">
                              <span className="font-mono text-cyan-400 font-bold">Chapter {chapter.number}</span>
                              <span className="text-slate-600">&bull;</span>
                              <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wider ${
                                isComplete 
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                  : isActive
                                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                  : "bg-white/5 text-slate-500 border border-white/5"
                              }`}>
                                {isComplete ? "Completed" : isActive ? "Active" : "Locked"}
                              </span>
                              <span className="text-slate-600">&bull;</span>
                              <span className="text-slate-400 font-mono">{completedInCh}/{totalTopics} topics</span>
                            </div>

                            <h3 className="text-base sm:text-lg font-black text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                              {chapter.title}
                              {isLocked && <Lock size={14} className="text-slate-500 shrink-0" />}
                            </h3>
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Linear progress dial for chapter */}
                            <div className="w-24 sm:w-28 text-right space-y-1">
                              <div className="text-[10px] text-slate-400 font-mono">{percent}% Complete</div>
                              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
                                <div 
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    isComplete ? "bg-emerald-500" : "bg-gradient-to-r from-blue-500 to-cyan-400"
                                  }`} 
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                            </div>
                            
                            <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-white/10">
                              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            </button>
                          </div>
                        </div>

                        {/* Collapsed Description and Topics List */}
                        {isExpanded && (
                          <div className="px-5 pb-5 pt-1 border-t border-white/5 space-y-4 bg-black/10 rounded-b-2xl">
                            <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                              {chapter.description}
                            </p>

                            <div className="space-y-2">
                              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                                <span>Topic Checklist</span>
                                {isLocked && <span className="text-[9px] text-amber-500 border border-amber-500/20 bg-amber-500/5 px-2 py-0.5 rounded font-mono font-normal">Active Chapter Required</span>}
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {chapter.topics.map((topic) => {
                                  const isTopicDone = completedTopics.includes(topic.id);
                                  
                                  return (
                                    <button
                                      key={topic.id}
                                      onClick={() => toggleTopic(topic.id, chapter.number)}
                                      disabled={isLocked}
                                      className={`flex items-center gap-3 p-3 rounded-xl border text-left text-xs font-semibold transition-all group/topic ${
                                        isTopicDone
                                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/10 shadow-[inset_0_1px_2px_rgba(16,185,129,0.05)]"
                                          : isLocked
                                          ? "bg-white/[0.01] border-transparent text-slate-500 cursor-not-allowed"
                                          : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/10 hover:scale-[1.01]"
                                      }`}
                                    >
                                      <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-all ${
                                        isTopicDone
                                          ? "bg-emerald-500 border-emerald-400 text-slate-950"
                                          : isLocked
                                          ? "border-slate-800 text-slate-600 bg-slate-950"
                                          : "border-slate-600 group-hover/topic:border-slate-400"
                                      }`}>
                                        {isTopicDone ? (
                                          <CheckCircle2 size={12} strokeWidth={3} className="text-emerald-950" />
                                        ) : isLocked ? (
                                          <Lock size={9} />
                                        ) : null}
                                      </div>
                                      
                                      <span className="truncate flex-1 pr-1">{topic.name}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* INTERACTIVE WORKSPACE CODE PLAYGROUND in #0C0C16 */}
            <div className="p-5 rounded-3xl border border-white/10 space-y-4 bg-[#0C0C16] shadow-2xl relative overflow-hidden group/editor">
              <div className="absolute w-48 h-48 bg-purple-500/5 rounded-full blur-2xl -bottom-12 -left-12 pointer-events-none group-hover/editor:bg-purple-500/10 transition-all duration-500" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="text-cyan-400" size={18} />
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Interactive Python Playground</h3>
                    <p className="text-[10px] text-slate-400">Select templates to simulate real sandbox execution</p>
                  </div>
                </div>
                
                {/* File picker */}
                <div className="flex items-center gap-2">
                  <select 
                    value={selectedSnippetIdx} 
                    onChange={(e) => handleSelectSnippet(Number(e.target.value))}
                    className="bg-[#050508] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-300 font-mono focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    {CODE_SANDBOX_TEMPLATES.map((tmpl, idx) => (
                      <option key={idx} value={idx}>{tmpl.fileName}</option>
                    ))}
                  </select>
                  
                  <button 
                    onClick={runSimulatedCode}
                    disabled={isRunning}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-1.5 transition-all ${
                      isRunning 
                        ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                        : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 hover:scale-105 active:scale-95"
                    }`}
                  >
                    {isRunning ? (
                      <RefreshCw size={13} className="animate-spin" />
                    ) : (
                      <Play size={11} fill="currentColor" />
                    )}
                    Run Code
                  </button>
                </div>
              </div>

              {/* Editor + Terminal Output split screen */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                {/* Code Editor view */}
                <div className="bg-[#050508] border border-white/5 p-4 rounded-2xl font-mono text-xs text-slate-300 space-y-1 relative shadow-inner h-48 overflow-y-auto">
                  <div className="absolute top-2 right-3 text-[9px] bg-slate-900 px-2 py-0.5 rounded text-slate-500 select-none">
                    EDITABLE WINDOW
                  </div>
                  <textarea 
                    value={playgroundCode}
                    onChange={(e) => setPlaygroundCode(e.target.value)}
                    className="w-full h-full bg-transparent border-none text-slate-300 font-mono text-xs focus:outline-none resize-none"
                    spellCheck="false"
                  />
                </div>

                {/* Simulated Terminal Console */}
                <div className="bg-[#030305] border border-white/10 p-4 rounded-2xl font-mono text-[11px] text-cyan-300 h-48 overflow-y-auto shadow-inner flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="text-slate-600 border-b border-white/5 pb-1 mb-2 select-none flex items-center justify-between">
                      <span>CONSOLE OUTPUT</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    {terminalLines.length === 0 ? (
                      <div className="text-slate-500 italic select-none">Console is idle. Press &quot;Run Code&quot; to execute scripts.</div>
                    ) : (
                      terminalLines.map((line, idx) => {
                        const isSystem = line.startsWith(">>>");
                        return (
                          <div key={idx} className={isSystem ? "text-slate-500" : "text-white font-bold"}>
                            {line}
                          </div>
                        );
                      })
                    )}
                  </div>
                  
                  {isRunning && (
                    <div className="flex items-center gap-1.5 text-cyan-400 animate-pulse text-[10px] select-none border-t border-white/5 pt-1.5 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      <span>Sandbox VM executing...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE ONLY SYLLABUS LIST VIEW */}
          <div className={`${activeMobileTab === "syllabus" ? "block" : "hidden"} lg:hidden space-y-4`}>
            <div className="p-4 rounded-2xl border border-white/10 space-y-3 bg-[#0C0C16] shadow-2xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Curriculum Outline</h3>
              <p className="text-xs text-slate-400">Click headers to expand parts details.</p>
            </div>
            
            <div className="space-y-2">
              {SYLLABUS_PARTS.map((part) => {
                const isExpanded = !!expandedParts[part.id];
                const isActive = part.status === "active";

                return (
                  <div key={part.id} className={`rounded-xl border p-2 ${isActive ? "bg-[#0C0C16] border-blue-500/30" : "border-white/5 bg-[#0C0C16]/50 shadow"}`}>
                    <button onClick={() => togglePart(part.id)} className="w-full flex items-center justify-between p-2 text-left">
                      <div>
                        <div className="text-[10px] font-mono text-cyan-400 font-bold">{part.id.toUpperCase().replace("_", " ")}</div>
                        <div className="text-xs font-bold text-slate-200">{part.title.split("–")[1]?.trim() || part.title}</div>
                      </div>
                      <div>{isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</div>
                    </button>
                    {isExpanded && (
                      <div className="mt-2 pl-2 border-l border-white/10 space-y-2 py-2">
                        {part.chapters.map((ch) => (
                          <div key={ch.id} className="text-xs flex justify-between text-slate-400">
                            <span>{ch.name}</span>
                            <span>{ch.progress}%</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* MOBILE ONLY STATS & ACHIEVEMENTS VIEW */}
          <div className={`${activeMobileTab === "stats" ? "block" : "hidden"} xl:hidden space-y-6`}>
            
            {/* Stats Cards mobile view in #0C0C16 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-white/10 flex items-start gap-3 bg-[#0C0C16] shadow-xl">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Clock size={16} />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Time Spent</div>
                  <div className="text-base font-black text-white font-mono">14h 30m</div>
                </div>
              </div>
              <div className="p-4 rounded-2xl border border-white/10 flex items-start gap-3 bg-[#0C0C16] shadow-xl">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Trophy size={16} />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Badges</div>
                  <div className="text-base font-black text-white font-mono">5 Earned</div>
                </div>
              </div>
              <div className="p-4 rounded-2xl border border-white/10 flex items-start gap-3 bg-[#0C0C16] shadow-xl">
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  <Flame size={16} className="fill-orange-500/20" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Streak</div>
                  <div className="text-base font-black text-white font-mono">8 Days</div>
                </div>
              </div>
              <div className="p-4 rounded-2xl border border-white/10 flex items-start gap-3 bg-[#0C0C16] shadow-xl">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Award size={16} />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Top Batch</div>
                  <div className="text-base font-black text-white font-mono">94% Score</div>
                </div>
              </div>
            </div>

            {/* Achievements Card List mobile view in #0C0C16 */}
            <div className="p-5 rounded-3xl border border-white/10 space-y-4 bg-[#0C0C16] shadow-2xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Award size={16} className="text-amber-400" /> Milestone Achievements
              </h3>
              
              <div className="space-y-3">
                {[
                  { title: "First Script", desc: "Wrote and executed first Python program.", icon: Trophy, unlocked: true },
                  { title: "Syntax Explorer", desc: "Mastered variables, operations & PEP 8.", icon: BookOpen, unlocked: true },
                  { title: "Logic Master", desc: "Completed decision logic & loop models.", icon: Award, unlocked: true },
                  { title: "Streak Setter", desc: "Kept a 7-day learning streak active.", icon: Flame, unlocked: true },
                  { title: "OOP Wizard", desc: "Complete OOP chapter inheritance lessons.", icon: Lock, unlocked: false }
                ].map((ach, idx) => {
                  const Icon = ach.icon;
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-start gap-3 p-3 rounded-xl border ${
                        ach.unlocked 
                          ? "bg-white/5 border-white/5 text-slate-300" 
                          : "bg-white/5 border-transparent opacity-50 text-slate-500"
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        ach.unlocked 
                          ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-cyan-400 border border-cyan-400/20" 
                          : "bg-slate-800 text-slate-500 border border-slate-700"
                      }`}>
                        <Icon size={14} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-100">{ach.title}</div>
                        <div className="text-[10px] text-slate-400">{ach.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR: Stats & Achievements (Desktop only) */}
        <aside className="hidden xl:flex w-80 shrink-0 border-l border-white/10 bg-[#09090B]/95 backdrop-blur-xl flex-col h-[calc(100vh-4rem)] sticky top-16 z-30 select-none overflow-y-auto custom-scrollbar p-4 space-y-6">
          
          {/* STATS PANEL */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Learning Analytics</h3>
            
            <div className="grid grid-cols-2 gap-3">
              
              {/* Stat Card 1 in #0C0C16 */}
              <div className="p-3.5 rounded-2xl border border-white/10 bg-[#0C0C16] hover:border-cyan-500/40 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_8px_25px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col justify-between h-24 shadow-xl group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Time Spent</span>
                  <Clock size={15} className="text-cyan-400 transition-transform group-hover:rotate-12" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-lg font-black text-white font-mono leading-none">14h 30m</div>
                  <div className="text-[9px] text-emerald-400 font-mono">+2h today</div>
                </div>
              </div>

              {/* Stat Card 2 in #0C0C16 */}
              <div className="p-3.5 rounded-2xl border border-white/10 bg-[#0C0C16] hover:border-amber-500/40 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_8px_25px_rgba(245,158,11,0.15)] transition-all duration-300 flex flex-col justify-between h-24 shadow-xl group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Badges</span>
                  <Trophy size={15} className="text-amber-400 transition-transform group-hover:scale-110" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-lg font-black text-white font-mono leading-none">5 Earned</div>
                  <div className="text-[9px] text-slate-400 font-mono font-bold">Out of 8</div>
                </div>
              </div>

              {/* Stat Card 3 in #0C0C16 */}
              <div className="p-3.5 rounded-2xl border border-white/10 bg-[#0C0C16] hover:border-orange-500/40 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_8px_25px_rgba(249,115,22,0.15)] transition-all duration-300 flex flex-col justify-between h-24 shadow-xl group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Streak</span>
                  <Flame size={15} className="text-orange-500 fill-orange-500/10 group-hover:animate-bounce" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-lg font-black text-white font-mono leading-none">8 Days</div>
                  <div className="text-[9px] text-slate-400 font-mono font-bold">Max: 12 days</div>
                </div>
              </div>

              {/* Stat Card 4 in #0C0C16 */}
              <div className="p-3.5 rounded-2xl border border-white/10 bg-[#0C0C16] hover:border-purple-500/40 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_8px_25px_rgba(124,58,237,0.15)] transition-all duration-300 flex flex-col justify-between h-24 shadow-xl group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Practice</span>
                  <Award size={15} className="text-purple-400 transition-transform group-hover:rotate-12" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-lg font-black text-white font-mono leading-none">94% Score</div>
                  <div className="text-[9px] text-purple-400 font-mono font-bold">Top 5% batch</div>
                </div>
              </div>
            </div>
          </div>

          {/* ACHIEVEMENTS PANEL */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Badges &amp; Milestones</h3>
              <span className="text-[9px] text-cyan-400 font-mono font-bold">5 / 8 Unlocked</span>
            </div>

            <div className="space-y-2.5">
              
              {/* Achievement 1 in #0C0C16 */}
              <div className="p-3 rounded-2xl border border-white/5 bg-[#0C0C16] flex gap-3 hover:bg-white/5 hover:-translate-y-[2px] transition-all duration-300 shadow-md cursor-pointer group">
                <div className="p-2 h-9 w-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
                  <Trophy size={16} className="fill-amber-400/10" />
                </div>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-100 flex items-center justify-between font-mono">
                    <span>First Script</span>
                    <span className="text-[8px] px-1.5 py-0.25 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">UNLOCKED</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight truncate">
                    Wrote and executed first Python program.
                  </p>
                </div>
              </div>

              {/* Achievement 2 in #0C0C16 */}
              <div className="p-3 rounded-2xl border border-white/5 bg-[#0C0C16] flex gap-3 hover:bg-white/5 hover:-translate-y-[2px] transition-all duration-300 shadow-md cursor-pointer group">
                <div className="p-2 h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/30 text-cyan-400 flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
                  <BookOpen size={16} />
                </div>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-100 flex items-center justify-between font-mono">
                    <span>Syntax Explorer</span>
                    <span className="text-[8px] px-1.5 py-0.25 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">UNLOCKED</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight truncate">
                    Mastered standard variables &amp; types.
                  </p>
                </div>
              </div>

              {/* Achievement 3 in #0C0C16 */}
              <div className="p-3 rounded-2xl border border-white/5 bg-[#0C0C16] flex gap-3 hover:bg-white/5 hover:-translate-y-[2px] transition-all duration-300 shadow-md cursor-pointer group">
                <div className="p-2 h-9 w-9 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
                  <Award size={16} />
                </div>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-100 flex items-center justify-between font-mono">
                    <span>PEP 8 Champion</span>
                    <span className="text-[8px] px-1.5 py-0.25 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">UNLOCKED</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight truncate">
                    Formatted code to pure standard PEP 8.
                  </p>
                </div>
              </div>

              {/* Achievement 4 in #0C0C16 */}
              <div className="p-3 rounded-2xl border border-white/5 bg-[#0C0C16] flex gap-3 hover:bg-white/5 hover:-translate-y-[2px] transition-all duration-300 shadow-md cursor-pointer group">
                <div className="p-2 h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 border border-cyan-500/30 text-emerald-400 flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
                  <CheckCircle2 size={16} />
                </div>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-100 flex items-center justify-between font-mono">
                    <span>Logic Master</span>
                    <span className="text-[8px] px-1.5 py-0.25 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">UNLOCKED</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight truncate">
                    Passed loops and conditionals logic.
                  </p>
                </div>
              </div>

              {/* Achievement 5 in #0C0C16 */}
              <div className="p-3 rounded-2xl border border-white/5 bg-[#0C0C16] flex gap-3 hover:bg-white/5 hover:-translate-y-[2px] transition-all duration-300 shadow-md cursor-pointer group">
                <div className="p-2 h-9 w-9 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
                  <Flame size={16} className="fill-orange-400/10" />
                </div>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-100 flex items-center justify-between font-mono">
                    <span>Streak Setter</span>
                    <span className="text-[8px] px-1.5 py-0.25 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">UNLOCKED</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight truncate">
                    Logged in and completed work 7 days.
                  </p>
                </div>
              </div>

              {/* Achievement 6 (Locked) in #0C0C16 */}
              <div className="p-3 rounded-2xl border border-white/5 bg-[#0C0C16] flex gap-3 opacity-40 shadow-sm">
                <div className="p-2 h-9 w-9 rounded-xl bg-slate-800 border border-slate-700 text-slate-500 flex items-center justify-center shrink-0">
                  <Lock size={15} />
                </div>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-400 flex items-center justify-between font-mono">
                    <span>OOP Wizard</span>
                    <span className="text-[8px] px-1.5 py-0.25 rounded-full bg-slate-800 text-slate-500 border border-slate-700 font-bold">LOCKED</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight truncate">
                    Unlock Part III &amp; Chapter 5 OOP.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
