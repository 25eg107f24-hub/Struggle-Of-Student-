import { NextResponse } from 'next/server';
import { getCurrentStudent } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const studentSession = await getCurrentStudent();
    if (!studentSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const member = await prisma.communityMember.findUnique({
      where: { id: studentSession.id },
    });

    if (!member) {
      return NextResponse.json({ error: 'Student member not found' }, { status: 404 });
    }

    // Parse interests JSON if stored as string
    let parsedInterests: string[] = [];
    try {
      if (member.interests) {
        parsedInterests = JSON.parse(member.interests);
      }
    } catch {
      parsedInterests = [member.interests];
    }

    // Fetch volunteer applications submitted with this student's email
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
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Fetch opportunity applications submitted with this student's email
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

    // Fetch online meeting registrations submitted with this student's email
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

    return NextResponse.json({
      member: {
        ...member,
        interests: parsedInterests,
      },
      volunteerApplications,
      opportunityApplications,
      meetingRegistrations,
    });
  } catch (error) {
    console.error('Fetch student profile error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve student profile records' },
      { status: 500 }
    );
  }
}
