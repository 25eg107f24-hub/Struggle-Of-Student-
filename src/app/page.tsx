import React from 'react';
import prisma from '@/lib/prisma';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import UpcomingEventsPreview from '@/components/home/UpcomingEventsPreview';
import OpportunitiesPreview from '@/components/home/OpportunitiesPreview';
import PlacementsPreview from '@/components/home/PlacementsPreview';
import ServicesPreview from '@/components/home/ServicesPreview';
import AnnouncementBanner from '@/components/home/AnnouncementBanner';
import Link from 'next/link';
import { Sparkles, Users, Award, Calendar, ArrowRight } from 'lucide-react';

export const revalidate = 0; // Fresh dynamic data on every request

export default async function HomePage() {
  // Fetch real database records
  const [
    announcements,
    upcomingEvents,
    featuredOpportunities,
    placements,
    services,
    totalMembers,
    activeTeamCount,
  ] = await Promise.all([
    prisma.announcement.findMany({
      where: { isActive: true },
      orderBy: { priority: 'desc' },
      take: 2,
    }).catch(() => []),
    prisma.event.findMany({
      where: { isPublished: true },
      orderBy: { eventDate: 'asc' },
      take: 3,
    }).catch(() => []),
    prisma.opportunity.findMany({
      where: { isOpen: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }).catch(() => []),
    prisma.placement.findMany({
      where: { verified: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }).catch(() => []),
    prisma.service.findMany({
      where: { isActive: true },
      take: 6,
    }).catch(() => []),
    prisma.communityMember.count().catch(() => 0),
    prisma.teamMember.count({ where: { isActive: true } }).catch(() => 0),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      {/* Top Banner */}
      <AnnouncementBanner announcements={announcements} />

      {/* Hero Section */}
      <HeroSection />

      {/* About & 4 Pillars */}
      <AboutSection />

      {/* Upcoming Events Preview with Volunteer Status */}
      <UpcomingEventsPreview events={upcomingEvents} />

      {/* Featured Opportunities Preview */}
      <OpportunitiesPreview opportunities={featuredOpportunities} />

      {/* Placements Hall of Fame */}
      <PlacementsPreview placements={placements} />

      {/* Our Services (SS Band, IT Solutions, Event Mgmt, Guidance) */}
      <ServicesPreview services={services} />

      {/* Final Join Community CTA Banner */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/60 to-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold shadow-2xs">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <span>JOIN 5,000+ STUDENTS NATIONWIDE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Ready to Stop Struggling Alone and Start{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Winning Together?
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Get instant access to verified campus referrals, open hackathons, live music gigs, peer mentorship,
            and leadership roles. 100% free forever for enrolled college students.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/join"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Register for SS Membership</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/team"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold text-slate-700 bg-white border border-slate-300 hover:border-indigo-400 hover:text-slate-900 shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4 text-indigo-600" />
              <span>Meet the {activeTeamCount > 0 ? `${activeTeamCount}+ Active` : ''} SS Team</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
