'use client';

import React, { useState } from 'react';
import {
  Users,
  Linkedin,
  Github,
  Instagram,
  Sparkles,
  ShieldCheck,
  Building2,
  Mail,
  Heart,
} from 'lucide-react';

interface TeamMemberItem {
  id: string;
  name: string;
  designation: string;
  department: string;
  responsibilities: string;
  bio: string | null;
  photoUrl: string | null;
  college: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  instagramUrl: string | null;
  isActive: boolean;
  isLeadership: boolean;
}

interface Props {
  leadershipMembers: TeamMemberItem[];
  allMembers: TeamMemberItem[];
  activeCount: number;
}

const DEPARTMENTS = [
  { key: 'ALL', label: 'All Domains' },
  { key: 'LEADERSHIP', label: 'Leadership' },
  { key: 'TECH_DEV', label: 'Tech & Engineering' },
  { key: 'CREATIVE_BAND', label: 'SS Band & Creative' },
  { key: 'EVENTS', label: 'Event Operations' },
  { key: 'PR_OUTREACH', label: 'PR & Outreach' },
  { key: 'OPERATIONS', label: 'Student Guidance' },
];

export const TeamClientView: React.FC<Props> = ({
  leadershipMembers,
  allMembers,
  activeCount,
}) => {
  const [selectedDept, setSelectedDept] = useState('ALL');

  const filteredMembers = allMembers.filter((m) => {
    if (selectedDept === 'ALL') return true;
    return m.department === selectedDept;
  });

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
          <Users className="w-3.5 h-3.5 text-indigo-600" />
          <span>STUDENT COUNCIL & COLLECTIVE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Meet the Minds Behind{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            Struggle of Students
          </span>
        </h1>

        <p className="text-slate-600 text-sm sm:text-base">
          A powerhouse student team coordinating college events, playing live music, building open tech,
          and helping thousands of students break into top tier careers.
        </p>

        {/* Live Active Members Dynamic Pill */}
        <div className="pt-2">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-white border border-emerald-300 text-emerald-800 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Currently Active Core Team Members:</span>
            <strong className="text-slate-900 text-sm font-mono">{activeCount} Leaders</strong>
          </span>
        </div>
      </div>

      {/* Leadership Spotlight Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Executive Leadership</h2>
            <p className="text-xs text-slate-500">Founders, Directors & Strategic Visionaries</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leadershipMembers.map((member) => (
            <div
              key={member.id}
              className="group rounded-3xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-indigo-400 hover:shadow-xl transition-all duration-300 shadow-sm"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-64 bg-slate-100 overflow-hidden">
                  {member.photoUrl ? (
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-indigo-100 to-slate-100 flex items-center justify-center">
                      <Users className="w-16 h-16 text-indigo-500" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

                  {/* Active Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 text-emerald-800 border border-emerald-200 shadow-sm">
                      Active Lead
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs font-bold text-indigo-600 mb-1">
                    {member.designation}
                  </div>
                  {member.college && (
                    <div className="text-xs text-slate-500 flex items-center gap-1 mb-4">
                      <Building2 className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{member.college}</span>
                    </div>
                  )}

                  {member.bio && (
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {member.bio}
                    </p>
                  )}

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Key Responsibilities
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {member.responsibilities}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center gap-3">
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-blue-600 hover:bg-slate-200 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.githubUrl && (
                  <a
                    href={member.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {member.instagramUrl && (
                  <a
                    href={member.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-pink-600 hover:bg-slate-200 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Team Members by Domain */}
      <section className="space-y-8 pt-8 border-t border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Department Leads & Core Volunteers</h2>
            <p className="text-xs text-slate-500">The boots-on-the-ground driving everyday operations</p>
          </div>

          {/* Department Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.key}
                onClick={() => setSelectedDept(dept.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedDept === dept.key
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                }`}
              >
                {dept.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col justify-between hover:border-indigo-400 hover:shadow-md transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-indigo-700 text-sm bg-indigo-50">
                        {member.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">{member.name}</h4>
                    <span className="text-[11px] font-semibold text-indigo-600 block mt-0.5">
                      {member.designation}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 mb-2 truncate">
                  {member.college || 'Core Member'}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {member.responsibilities}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Active
                </span>

                <div className="flex items-center gap-2">
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-500 hover:text-blue-600"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.githubUrl && (
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-500 hover:text-slate-900"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.instagramUrl && (
                    <a
                      href={member.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-500 hover:text-pink-600"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeamClientView;
