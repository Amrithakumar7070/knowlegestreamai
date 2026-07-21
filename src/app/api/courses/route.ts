import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const LANGUAGE_COURSES = [
  {
    title: "C Language Mastery & System Programming",
    description: "Learn C programming from scratch: pointers, memory allocation (malloc/free), structs, file I/O, and low-level system design. 90-day course validity.",
    language: "c",
    price: 1499,
    validityDays: 90,
    instructor: "Dr. Elena Rostova",
    level: "Beginner",
    category: "C Programming",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    duration: "90 Days Access &bull; 20 Hours",
    lessons: 15,
    rating: 4.95,
  },
  {
    title: "C++ Object-Oriented & STL Masterclass",
    description: "Master modern C++17/C++20: OOP design, smart pointers, Standard Template Library (STL vectors, maps), and performance optimization. 90-day course validity.",
    language: "cpp",
    price: 1999,
    validityDays: 90,
    instructor: "Marcus Vance",
    level: "Intermediate",
    category: "C++ Programming",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    duration: "90 Days Access &bull; 25 Hours",
    lessons: 18,
    rating: 4.9,
  },
  {
    title: "Python AI & Data Structures Architecture",
    description: "Master Python programming: OOP, list comprehensions, decorators, algorithms, DSA, and AI model integration. 90-day course validity.",
    language: "python",
    price: 2499,
    validityDays: 90,
    instructor: "Sophia Chen",
    level: "Beginner to Advanced",
    category: "Python Programming",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    duration: "90 Days Access &bull; 30 Hours",
    lessons: 22,
    rating: 4.98,
  },
  {
    title: "Java Enterprise & Object-Oriented Architecture",
    description: "Master Core Java, Multithreading, JVM Memory Management, Collections, Streams API, and Spring Boot foundations. 90-day course validity.",
    language: "java",
    price: 1999,
    validityDays: 90,
    instructor: "Alex Rivera",
    level: "Intermediate",
    category: "Java Programming",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    duration: "90 Days Access &bull; 28 Hours",
    lessons: 20,
    rating: 4.88,
  },
];

export async function GET() {
  try {
    let courses = await db.course.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Re-seed C, C++, Python, Java catalog if empty or outdated
    if (courses.length === 0 || !courses.some((c) => c.language === "c")) {
      await db.course.deleteMany({});
      
      for (const courseData of LANGUAGE_COURSES) {
        await db.course.create({
          data: {
            ...courseData,
            topics: {
              create: [
                {
                  orderNumber: 1,
                  title: "Topic 1: Language Syntax, Variables & Data Types",
                  explanation: `Welcome to Topic 1! In this lesson, we will explore fundamental data types, variable declarations, memory representation, and syntax rules for ${courseData.title}. Variables store data values in computer memory. Pay close attention to data type constraints and memory allocation.`,
                  quizData: JSON.stringify([
                    { id: 1, question: "What is the size of an integer in memory?", options: ["2 or 4 Bytes", "1 Byte", "8 Bytes", "Depends on OS"], answer: 0 },
                    { id: 2, question: "Which keyword is used to declare a constant?", options: ["const", "final", "static", "immutable"], answer: 0 },
                    { id: 3, question: "What is the default value of uninitialized local variables?", options: ["Garbage Value / Undefined", "Zero", "Null", "False"], answer: 0 },
                    { id: 4, question: "Which operator is used to fetch memory address in C/C++?", options: ["& (Address-of)", "* (Dereference)", "%", "->"], answer: 0 },
                    { id: 5, question: "What happens when you divide an integer by zero?", options: ["Runtime Error / DivideByZero Exception", "Infinity", "Zero", "NaN"], answer: 0 },
                  ]),
                  challenges: JSON.stringify([
                    { id: "easy", title: "Print Hello World & User Age", difficulty: "Easy", initialCode: "// Write your code below\n" },
                    { id: "medium", title: "Calculate Circle Area & Perimeter", difficulty: "Medium", initialCode: "// Calculate area = PI * r * r\n" },
                    { id: "hard", title: "Swap Two Variables Without Temp Variable", difficulty: "Hard", initialCode: "// Swap a and b without third variable\n" },
                  ]),
                },
                {
                  orderNumber: 2,
                  title: "Topic 2: Conditional Logic, Loops & Control Flow",
                  explanation: "Topic 2 focuses on decision making using if-else statements, switch cases, and iteration loops (for, while, do-while). Control flow allows your code to branch and repeat execution dynamically.",
                  quizData: JSON.stringify([
                    { id: 1, question: "Which loop guarantees at least one execution?", options: ["do-while loop", "for loop", "while loop", "foreach loop"], answer: 0 },
                  ]),
                  challenges: JSON.stringify([
                    { id: "easy", title: "Check Even or Odd Number", difficulty: "Easy", initialCode: "// Write code to check if n is even or odd\n" },
                  ]),
                },
                {
                  orderNumber: 3,
                  title: "Topic 3: Functions, Scope & Recursion",
                  explanation: "Topic 3 covers modular programming: function definitions, parameters, return types, call stack execution, and recursive algorithm design.",
                  quizData: JSON.stringify([]),
                  challenges: JSON.stringify([]),
                },
                {
                  orderNumber: 4,
                  title: "Topic 4: Arrays, Pointers & Memory Management",
                  explanation: "Topic 4 delves into memory layout, array indexing, pointer arithmetic, and heap vs stack allocation.",
                  quizData: JSON.stringify([]),
                  challenges: JSON.stringify([]),
                },
                {
                  orderNumber: 5,
                  title: "Topic 5: Object-Oriented Design & Projects",
                  explanation: "Topic 5 brings everything together: classes, objects, inheritance, polymorphism, and building full-scale applications.",
                  quizData: JSON.stringify([]),
                  challenges: JSON.stringify([]),
                },
              ],
            },
          },
        });
      }

      courses = await db.course.findMany({
        orderBy: { createdAt: "desc" },
        include: { topics: true },
      });
    }

    return NextResponse.json({ success: true, courses });
  } catch (error) {
    console.error("Fetch Courses Error:", error);
    return NextResponse.json(
      { error: "Failed to load programming courses catalog." },
      { status: 500 }
    );
  }
}
