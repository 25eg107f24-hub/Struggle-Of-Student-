import React from 'react';
import Link from 'next/link';
import {
  Award,
  ShieldCheck,
  Building2,
  TrendingUp,
  ArrowRight,
  Quote,
  Star,
} from 'lucide-react';

interface PlacementItem {
  id: string;
  studentName: string;
  photoUrl: string | null;
  college: string;
  degree: string;
  batchYear: string;
  company: string;
  role: string;
  packageLpa: string;
  verified: boolean;
  testimonial: string | null;
}

interface Props {
  placements: PlacementItem[];
}

export const PlacementsPreview: React.FC<Props> = ({ placements }) => {
  return (
    <section className="py-20 relative bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% VERIFIED STUDENT ACHIEVEMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Placement{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Hall of Fame
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Real offers secured by SS community members from tier-1, tier-2, and tier-3 colleges.
              Verified credentials only.
            </p>
          </div>

          <Link
            href="/placements"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:border-emerald-400 hover:text-emerald-700 transition-all self-start md:self-auto shadow-sm"
          >
            <span>View All Placements & Stats</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Placements Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placements.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-400 hover:shadow-lg transition-all duration-300 relative overflow-hidden shadow-sm"
            >
              <div>
                {/* Top Company & Package Bar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-800 text-sm shadow-2xs">
                      {item.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 leading-tight">
                        {item.company}
                      </h4>
                      <span className="text-xs text-slate-500">{item.role}</span>
                    </div>
                  </div>

                  <span className="px-3 py-1.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                    {item.packageLpa}
                  </span>
                </div>

                {/* Testimonial Quote */}
                {item.testimonial && (
                  <div className="my-4 p-3 rounded-xl bg-slate-50 border border-slate-200 relative">
                    <Quote className="w-4 h-4 text-emerald-500/50 absolute top-2 right-2" />
                    <p className="text-xs text-slate-700 italic leading-relaxed pr-5">
                      “{item.testimonial}”
                    </p>
                  </div>
                )}
              </div>

              {/* Student Details Footer */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-900">{item.studentName}</span>
                    <span title="Verified by SS Verification Cell">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate max-w-[200px]">
                    {item.college} • Batch {item.batchYear}
                  </div>
                </div>

                <span className="text-[10px] font-bold tracking-wider text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlacementsPreview;
