import React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Calendar,
  Sparkles,
  MapPin,
  ArrowRight,
  Search,
  CheckCircle2,
} from 'lucide-react';

interface OpportunityItem {
  id: string;
  title: string;
  slug: string;
  organization: string;
  category: string;
  location: string;
  type: string;
  stipendOrPerks: string;
  deadline: string | Date;
  eligibility: string;
  isOpen: boolean;
}

interface Props {
  opportunities: OpportunityItem[];
}

export const OpportunitiesPreview: React.FC<Props> = ({ opportunities }) => {
  return (
    <section className="py-20 relative bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold mb-3">
              <Briefcase className="w-3.5 h-3.5 text-cyan-600" />
              <span>CAREER & GROWTH HUB</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Featured{' '}
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Opportunities
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Curated tech internships, campus ambassador cohorts, band auditions, and hands-on projects vetted by SS.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/opportunities?tab=track"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all"
            >
              <Search className="w-3.5 h-3.5 text-indigo-600" />
              <span>Track Application Status</span>
            </Link>

            <Link
              href="/opportunities"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all"
            >
              <span>Explore All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Opportunities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.slice(0, 3).map((opp) => {
            const deadlineDate = new Date(opp.deadline).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            });

            return (
              <div
                key={opp.id}
                className="group rounded-2xl bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between hover:border-cyan-400 hover:bg-white hover:shadow-lg transition-all duration-300 shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-cyan-100 text-cyan-800 border border-cyan-200">
                      {opp.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      Due {deadlineDate}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-cyan-700 transition-colors line-clamp-2">
                    {opp.title}
                  </h3>

                  <p className="text-xs font-medium text-slate-600 mb-4 flex items-center gap-2">
                    <span>{opp.organization}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {opp.location}
                    </span>
                  </p>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2 mb-4 shadow-2xs">
                    <div className="text-xs">
                      <span className="text-slate-500">Perks/Stipend: </span>
                      <span className="font-bold text-emerald-700">{opp.stipendOrPerks}</span>
                    </div>
                    <div className="text-xs text-slate-600 line-clamp-1">
                      <span>Eligibility: </span>
                      <span className="text-slate-800">{opp.eligibility}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Applications Open
                  </span>

                  <Link
                    href={`/opportunities?apply=${opp.id}`}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-800 bg-white hover:bg-cyan-600 hover:text-white border border-slate-300 hover:border-cyan-600 transition-all flex items-center gap-1 shadow-2xs"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesPreview;
