import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { meetingId, accessCode, email } = await req.json();

    if (!meetingId) {
      return NextResponse.json({ error: 'Meeting ID is required.' }, { status: 400 });
    }

    if (!accessCode && !email) {
      return NextResponse.json({ error: 'Please provide either your Access Code or registered Email.' }, { status: 400 });
    }

    const registration = await prisma.meetingRegistration.findFirst({
      where: {
        meetingId,
        OR: [
          accessCode ? { accessCode: accessCode.trim().toUpperCase() } : {},
          email ? { email: email.trim().toLowerCase() } : {},
        ],
      },
      include: {
        meeting: true,
      },
    });

    if (!registration) {
      return NextResponse.json(
        { error: 'No authorized registration found matching your details for this session.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      fullName: registration.fullName,
      meetingUrl: registration.meeting.meetingUrl,
      platform: registration.meeting.platform,
      scheduledAt: registration.meeting.scheduledAt,
      title: registration.meeting.title,
    });
  } catch (error: any) {
    console.error('Meeting access verification error:', error);
    return NextResponse.json(
      { error: 'Server error verifying access.' },
      { status: 500 }
    );
  }
}
