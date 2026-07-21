"use client";

import React from "react";
import { BookOpen, Play, CheckCircle2, Award } from "lucide-react";
import { CourseData } from "./CourseDetailsModal";

interface EnrollmentItem {
  id: string;
  course: CourseData;
  progress: number;
  paidAmount: number;
  paymentId: string;
}

interface MyCoursesWidgetProps {
  enrollments: EnrollmentItem[];
  onStartLearning: (course: CourseData) => void;
}

export function MyCoursesWidget({ enrollments, onStartLearning }: MyCoursesWidgetProps) {
  if (enrollments.length === 0) {
    return (
      <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 mx-auto flex items-center justify-center text-cyan-400">
          <BookOpen size={24} />
        </div>
        <h3 className="text-base font-bold text-white">No Enrolled Courses Yet</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Explore the Available Courses catalog above, subscribe via Razorpay, and start learning instantly!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <BookOpen size={16} className="text-cyan-400" />
          My Purchased Courses ({enrollments.length})
        </h3>
        <span className="text-xs text-emerald-400 font-mono">100% Unlocked</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {enrollments.map((item) => (
          <div
            key={item.id}
            className="glass-panel p-5 rounded-3xl border border-blue-500/30 hover:border-cyan-400/60 transition-all space-y-4 shadow-xl bg-gradient-to-b from-blue-950/20 to-[#0C0C16]"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Paid ₹{item.paidAmount} &bull; {item.paymentId}
                </span>
                <h4 className="text-base font-bold text-white mt-1 line-clamp-1">
                  {item.course.title}
                </h4>
                <div className="text-xs text-slate-400">Instructor: {item.course.instructor}</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Learning Progress</span>
                <span className="font-mono font-bold text-cyan-400">{item.progress}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 rounded-full"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>

            {/* Start Learning Action Button */}
            <button
              onClick={() => onStartLearning(item.course)}
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-400 glow-btn flex items-center justify-center gap-2 shadow-lg"
            >
              <Play size={14} className="fill-white" />
              Start Learning Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
