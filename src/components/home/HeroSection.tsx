import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Users,
  Award,
  Calendar,
  Music,
  Briefcase,
  ShieldCheck,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Background radial glows for light theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-indigo-200/50 via-blue-200/40 to-cyan-200/30 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-200/40 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-cyan-200/40 blur-[120px] pointer-events-none rounded-full" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Official SS Logo Showcase & Eyebrow Badge */}
          <div className="flex flex-col items-center justify-center gap-3.5 animate-fade-in">
            <div className="p-1.5 rounded-2xl bg-white shadow-xl shadow-slate-200/90 border border-slate-200/90 hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-black shadow-inner">
                <img
                  src="/ss-logo.jpg"
                  alt="Struggle of Students (SS) Official Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs sm:text-sm font-bold shadow-md shadow-slate-900/10">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <span className="tracking-wider text-red-400 font-black">SS</span>
              <span className="text-slate-600">·</span>
              <span className="tracking-wide uppercase text-slate-200 text-[11px] sm:text-xs font-semibold">
                YOUR TALENT • YOUR SKILLS • YOUR OPPORTUNITY
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] sm:leading-[1.15]">
            Turn Every Campus Struggle Into Your{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent underline decoration-cyan-400 decoration-wavy decoration-2">
              Greatest Breakthrough
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            The hyper-active student collective bridging the gap between college halls and the real world.
            From high-energy rock bands and massive college fests to off-campus tech placements and 24/7 peer guidance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/join"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 group"
            >
              <span>Join Community Today</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/opportunities"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm hover:border-indigo-400 transition-all flex items-center justify-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-cyan-600" />
              <span>Explore Opportunities</span>
            </Link>

            <Link
              href="/services"
              className="w-full sm:w-auto px-7 py-4 rounded-full text-base font-semibold text-slate-700 hover:text-slate-900 bg-white/60 hover:bg-white border border-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <Music className="w-4 h-4 text-indigo-600" />
              <span>Our Services & Band</span>
            </Link>
          </div>

          {/* Micro trust indicators */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Free Student Membership
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Verified Placements & Fair Referrals
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Users className="w-4 h-4 text-cyan-600" />
              Active in 45+ Colleges
            </span>
          </div>
        </div>

        {/* Quick Impact Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 max-w-5xl mx-auto">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center hover:border-indigo-400 transition-colors">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">5,000+</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Student Members</div>
            <div className="text-[11px] text-cyan-600 font-bold mt-1">Across 45+ Campuses</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center hover:border-indigo-400 transition-colors">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">120+</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Events & Fests Hosted</div>
            <div className="text-[11px] text-indigo-600 font-bold mt-1">Hackathons & Pro-Nights</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center hover:border-indigo-400 transition-colors">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">320+</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Verified Placements</div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1">Top Tier-1 Tech MNCs</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center hover:border-indigo-400 transition-colors">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">₹57 LPA</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Highest Package</div>
            <div className="text-[11px] text-amber-600 font-bold mt-1">Atlassian & Microsoft</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
