"use client";

import React from "react";
import { GraduationCap, Briefcase, Shield, UserCheck, Building2 } from "lucide-react";

export type RoleType = "Student" | "Employee" | "Admin" | "Recruiter" | "Company";

interface RoleSelectorProps {
  selectedRole: RoleType;
  onSelectRole: (role: RoleType) => void;
}

interface RoleItem {
  id: RoleType;
  label: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>;
  color: string;
}

const ROLES: RoleItem[] = [
  { id: "Student", label: "Student", icon: GraduationCap, color: "#3B82F6" },
  { id: "Employee", label: "Employee", icon: Briefcase, color: "#06B6D4" },
  { id: "Admin", label: "Admin", icon: Shield, color: "#7C3AED" },
  { id: "Recruiter", label: "Recruiter", icon: UserCheck, color: "#EC4899" },
  { id: "Company", label: "Company", icon: Building2, color: "#10B981" },
];

export function RoleSelector({ selectedRole, onSelectRole }: RoleSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
        Select Account Role
      </label>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {ROLES.map((r) => {
          const Icon = r.icon;
          const isSelected = selectedRole === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => onSelectRole(r.id)}
              className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                isSelected
                  ? "bg-blue-600/20 border-cyan-400 text-white shadow-lg shadow-blue-500/20"
                  : "glass-panel border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20"
              }`}
            >
              <Icon size={16} style={{ color: isSelected ? r.color : undefined }} />
              <span className="text-[11px] font-semibold">{r.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
