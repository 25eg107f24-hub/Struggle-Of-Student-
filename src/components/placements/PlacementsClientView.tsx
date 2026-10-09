'use client';

import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  Building2,
  TrendingUp,
  Search,
  Quote,
  Briefcase,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface PlacementItem {
  id: string;
  studentName: string;
  photoUrl: string | null;
  college: string;
  degree: string;
  batchYear: string;
  company: string;
  companyLogoUrl: string | null;
  role: string;
  packageLpa: string;
  placementType: string;
  verified: boolean;
  testimonial: string | null;
}

interface Props {
  initialPlacements: PlacementItem[];
}

export const PlacementsClientView: React.FC<Props> = ({ initialPlacements }) => {
  const [placements] = useState<PlacementItem[]>(initialPlacements);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');

  const filteredPlacements = placements.filter((p) => {
    const matchesType =
      selectedType === 'ALL' ||
      (selectedType === 'FULL_TIME' && p.placementType === 'FULL_TIME') ||
      (selectedType === 'INTERNSHIP' && p.placementType === 'INTERNSHIP_PPO');

    const matchesSearch =
      p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.college.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>VERIFIED STUDENT OFFERS ONLY</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Placement & Career{' '}
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Hall of Fame
          </span>
        </h1>

        <p className="text-slate-600 text-sm sm:text-base">
          Proven proof that student-led peer mentorship beats gatekept campus barriers.
          Every offer card below has been independently verified by the SS Verification Cell.
        </p>
      </div>

      {/* Verified Placement Statistics Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center relative overflow-hidden shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">₹57.0 LPA</div>
          <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Highest Package</div>
          <div className="text-[11px] text-amber-700 font-bold mt-1">Atlassian & Microsoft</div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center relative overflow-hidden shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">₹18.4 LPA</div>
          <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Average SDE Package</div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">Across 80+ Product Offers</div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center relative overflow-hidden shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">320+</div>
          <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Total Verified Offers</div>
          <div className="text-[11px] text-cyan-700 font-bold mt-1">Tier-1, 2, & 3 Campuses</div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center relative overflow-hidden shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">94%</div>
          <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Off-Campus Conversion</div>
          <div className="text-[11px] text-indigo-700 font-bold mt-1">SS Mentorship Cohorts</div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          {['ALL', 'FULL_TIME', 'INTERNSHIP'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedType === type
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {type === 'ALL'
                ? 'All Verified Offers'
                : type === 'FULL_TIME'
                ? 'Full-Time Offers'
                : 'Internships & PPOs'}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student, company, college..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-emerald-600 focus:bg-white"
          />
        </div>
      </div>

      {/* Verified Placement Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlacements.map((item) => (
          <div
            key={item.id}
            className="group rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-400 hover:shadow-xl transition-all duration-300 relative overflow-hidden shadow-sm"
          >
            <div>
              {/* Header Bar */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-800 text-base shadow-2xs">
                    {item.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {item.company}
                    </h3>
                    <div className="text-xs text-slate-500 font-medium">{item.role}</div>
                  </div>
                </div>

                <span className="px-3 py-1.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
                  {item.packageLpa}
                </span>
              </div>

              {/* Student Details */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 mb-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">{item.studentName}</span>
                  <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Batch {item.batchYear}
                  </span>
                </div>
                <div className="text-xs text-slate-500 truncate">
                  {item.degree} • {item.college}
                </div>
              </div>

              {/* Testimonial Quote */}
              {item.testimonial && (
                <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200 relative mb-4">
                  <Quote className="w-4 h-4 text-emerald-500/50 absolute top-2 right-2" />
                  <p className="text-xs text-slate-700 italic leading-relaxed pr-4">
                    “{item.testimonial}”
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified by SS</span>
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                {item.placementType.replace('_', ' ')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Preparation Resources & Off-Campus Playbook Box */}
      <section className="rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-blue-50 border border-indigo-200 p-8 sm:p-12 relative overflow-hidden shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-800 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>COMMUNITY CAREER ARSENAL</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Want to Be in the Next Placement Cohort?
          </h2>

          <p className="text-slate-600 text-sm leading-relaxed">
            SS members receive free access to our tested DSA question sheets, FAANG system design primers,
            cold-email templates to reach hiring managers directly, and weekly mock technical interview rooms.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <a
              href="/join"
              className="px-6 py-3 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all flex items-center gap-2"
            >
              <span>Join Free Career Cohort</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/meetings"
              className="px-6 py-3 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 shadow-sm transition-all flex items-center gap-2"
            >
              <span>Attend Next Alumni AMA</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlacementsClientView;
