import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Code2,
  Music,
  Briefcase,
  Users2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Music,
      color: 'from-pink-500 to-rose-600',
      badge: 'SS BAND & CULTURE',
      title: 'Youth Culture & Live Music',
      description:
        'Rocking college fest stages nationwide! Our official SS Band brings electric performances, jam circles, and fest production to every campus.',
      link: '/services#ss-band',
    },
    {
      icon: Code2,
      color: 'from-indigo-500 to-blue-600',
      badge: 'TECH & BUILDERS',
      title: 'Real Engineering Experience',
      description:
        'Beyond classroom syntax. Build production Next.js apps, open-source projects, and student hackathons with SS IT Solutions.',
      link: '/services#ss-it-solutions',
    },
    {
      icon: Briefcase,
      color: 'from-emerald-500 to-teal-600',
      badge: 'CAREER & PLACEMENTS',
      title: 'Verified Off-Campus Placements',
      description:
        'Leveling the playing field for tier-2/3 students. 1-on-1 resume reviews, alumni mock interviews, and genuine corporate referral pipelines.',
      link: '/placements',
    },
    {
      icon: Compass,
      color: 'from-amber-500 to-orange-600',
      badge: 'PEER GUIDANCE',
      title: 'Confidential Student Support',
      description:
        'No student struggles alone. Dedicated peer counseling, academic backlog recovery advice, and proactive anti-ragging assistance.',
      link: '/services#student-problems-and-guidance',
    },
  ];

  return (
    <section id="about" className="py-20 relative bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>THE SS REVOLUTION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Built by Students, Designed for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Real Impact
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Struggle of Students (SS) was born from a simple campus reality: university curriculums
            often leave students unprepared for industry, isolated in academic stress, and craving
            creative expression. SS exists to transform those struggles into your strongest edge.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between hover:border-indigo-400 hover:bg-white transition-all duration-300 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-slate-600 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-2xs">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-200">
                  <Link
                    href={pillar.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mission Statement Box */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 border border-indigo-200 p-8 sm:p-12 relative overflow-hidden shadow-sm">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                Our Non-Negotiable Promise
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                “Every student deserves a stage, a mentor, and a fair opportunity.”
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Whether you want to play guitar in front of thousands at a college fest, build
                next-generation open source web platforms, or prepare for FAANG coding interviews,
                the SS community has your back every step of the way.
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/join"
                className="px-6 py-3.5 rounded-full text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all text-center"
              >
                Become a Member
              </Link>
              <Link
                href="/team"
                className="px-6 py-3.5 rounded-full text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all text-center"
              >
                Meet Our Leadership
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
