import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/auth';
import prisma from '@/lib/prisma';
import AdminDashboardClient from '@/components/admin/AdminDashboardClient';
import { isZoomApiConfigured } from '@/lib/zoom';

export const revalidate = 0;

export default async function AdminPage() {
  const currentAdmin = await getCurrentAdmin();

  if (!currentAdmin) {
    redirect('/admin/login');
  }

  // Fetch all administrative metrics & collections in parallel
  const [
    memberCount,
    events,
    volunteerApplications,
    opportunities,
    opportunityApplications,
    communityMembers,
    placements,
    teamMembers,
    services,
    serviceEnquiries,
    meetings,
    announcements,
  ] = await Promise.all([
    prisma.communityMember.count(),
    prisma.event.findMany({ orderBy: { eventDate: 'desc' } }),
    prisma.volunteerApplication.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.opportunity.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.opportunityApplication.findMany({
      include: { opportunity: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.communityMember.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    }),
    prisma.placement.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.teamMember.findMany({ orderBy: { orderIndex: 'asc' } }),
    prisma.service.findMany({ orderBy: { createdAt: 'asc' } }),
    prisma.serviceEnquiry.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.onlineMeeting.findMany({ orderBy: { scheduledAt: 'desc' } }),
    prisma.announcement.findMany({ orderBy: { createdAt: 'desc' } }),
  ]);

  const activeTeamCount = teamMembers.filter((m) => m.isActive).length;

  const initialData = {
    counts: {
      members: memberCount,
      events: events.length,
      volunteers: volunteerApplications.length,
      opportunities: opportunities.length,
      applications: opportunityApplications.length,
      placements: placements.length,
      team: teamMembers.length,
      activeTeam: activeTeamCount,
      meetings: meetings.length,
      enquiries: serviceEnquiries.length,
    },
    events,
    volunteerApplications,
    opportunities,
    opportunityApplications,
    communityMembers,
    placements,
    teamMembers,
    services,
    serviceEnquiries,
    meetings,
    announcements,
    zoomApiConfigured: isZoomApiConfigured(),
  };

  return <AdminDashboardClient admin={currentAdmin} initialData={initialData} />;
}
