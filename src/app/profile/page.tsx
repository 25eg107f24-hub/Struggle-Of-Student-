import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentStudent } from '@/lib/auth';
import prisma from '@/lib/prisma';
import StudentProfileClientView from './StudentProfileClientView';

export const dynamic = 'force-dynamic';

export default async function StudentProfilePage() {
  const session = await getCurrentStudent();

  if (!session) {
    redirect('/login');
  }

  const member = await prisma.communityMember.findUnique({
    where: { id: session.id },
  });

  if (!member) {
    redirect('/login');
  }

  // Parse interests if valid JSON
  let interests: string[] = [];
  try {
    if (member.interests) {
      interests = JSON.parse(member.interests);
    }
  } catch {
    interests = [member.interests];
  }

  // Fetch volunteer applications
  const volunteerApplications = await prisma.volunteerApplication.findMany({
    where: { email: member.email },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          eventDate: true,
          time: true,
          venue: true,
          category: true,
          mode: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Fetch opportunity applications
  const opportunityApplications = await prisma.opportunityApplication.findMany({
    where: { email: member.email },
    include: {
      opportunity: {
        select: {
          id: true,
          title: true,
          organization: true,
          type: true,
          deadline: true,
          location: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Fetch meeting registrations
  const meetingRegistrations = await prisma.meetingRegistration.findMany({
    where: { email: member.email },
    include: {
      meeting: {
        select: {
          id: true,
          title: true,
          speakerName: true,
          speakerBio: true,
          scheduledAt: true,
          durationMinutes: true,
          platform: true,
          meetingUrl: true,
          zoomPassword: true,
          status: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <StudentProfileClientView
      member={{
        ...member,
        createdAt: member.createdAt.toISOString(),
        interests,
      }}
      volunteerApplications={volunteerApplications.map((v) => ({
        ...v,
        createdAt: v.createdAt.toISOString(),
        event: {
          ...v.event,
          eventDate: v.event.eventDate.toISOString(),
        },
      }))}
      opportunityApplications={opportunityApplications.map((o) => ({
        ...o,
        createdAt: o.createdAt.toISOString(),
        opportunity: {
          ...o.opportunity,
          deadline: o.opportunity.deadline.toISOString(),
        },
      }))}
      meetingRegistrations={meetingRegistrations.map((m) => ({
        ...m,
        createdAt: m.createdAt.toISOString(),
        meeting: {
          ...m.meeting,
          scheduledAt: m.meeting.scheduledAt.toISOString(),
        },
      }))}
    />
  );
}
