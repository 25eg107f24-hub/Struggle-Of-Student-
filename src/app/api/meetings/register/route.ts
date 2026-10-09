import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { meetingId, fullName, email, phone, college } = body;

    if (!meetingId || typeof meetingId !== 'string') {
      return NextResponse.json({ error: 'Meeting ID is required.' }, { status: 400 });
    }

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
      return NextResponse.json({ error: 'Please enter a valid contact phone number.' }, { status: 400 });
    }

    if (!college || typeof college !== 'string') {
      return NextResponse.json({ error: 'Please specify your college or university.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Transactional registration & limit check
    const result = await prisma.$transaction(async (tx) => {
      const meeting = await tx.onlineMeeting.findUnique({
        where: { id: meetingId },
        select: {
          id: true,
          title: true,
          maxParticipants: true,
          registeredCount: true,
          meetingUrl: true,
          platform: true,
          scheduledAt: true,
        },
      });

      if (!meeting) {
        throw new Error('MEETING_NOT_FOUND');
      }

      // Check participant limit
      if (meeting.registeredCount >= meeting.maxParticipants) {
        throw new Error('CAPACITY_FULL');
      }

      // Check if already registered
      const existing = await tx.meetingRegistration.findUnique({
        where: {
          meetingId_email: {
            meetingId: meeting.id,
            email: cleanEmail,
          },
        },
      });

      if (existing) {
        // Return existing registration and authorized link
        return {
          registration: existing,
          meeting,
          alreadyRegistered: true,
        };
      }

      // Generate unique access code e.g. SS-MEET-8204
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const accessCode = `SS-MEET-${randomSuffix}`;

      const registration = await tx.meetingRegistration.create({
        data: {
          meetingId: meeting.id,
          fullName: fullName.trim(),
          email: cleanEmail,
          phone: phone.trim(),
          college: college.trim(),
          accessCode,
          attendanceConfirmed: true,
        },
      });

      // Increment registeredCount
      const updatedMeeting = await tx.onlineMeeting.update({
        where: { id: meeting.id },
        data: {
          registeredCount: { increment: 1 },
        },
      });

      return {
        registration,
        meeting: updatedMeeting,
        alreadyRegistered: false,
      };
    });

    return NextResponse.json({
      success: true,
      message: result.alreadyRegistered
        ? 'You were already registered for this session! Your access code and link are below.'
        : 'Registration confirmed! Your seat is reserved.',
      accessCode: result.registration.accessCode,
      meetingUrl: result.meeting.meetingUrl, // Revealed securely to authorized registrant!
      registeredCount: result.meeting.registeredCount,
      maxParticipants: result.meeting.maxParticipants,
    });
  } catch (error: any) {
    if (error.message === 'MEETING_NOT_FOUND') {
      return NextResponse.json({ error: 'Meeting not found.' }, { status: 404 });
    }
    if (error.message === 'CAPACITY_FULL') {
      return NextResponse.json(
        { error: 'Session is full! Participant limit has been reached.' },
        { status: 409 }
      );
    }

    console.error('Meeting registration error:', error);
    return NextResponse.json(
      { error: 'Server error processing registration.' },
      { status: 500 }
    );
  }
}
