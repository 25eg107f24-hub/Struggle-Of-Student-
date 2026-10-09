import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      eventId,
      fullName,
      email,
      phone,
      college,
      branchYear,
      skills,
      motivation,
      priorExperience,
    } = body;

    if (!eventId || typeof eventId !== 'string') {
      return NextResponse.json({ error: 'Event ID is required.' }, { status: 400 });
    }

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
      return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
    }

    if (!college || typeof college !== 'string') {
      return NextResponse.json({ error: 'Please specify your college or university.' }, { status: 400 });
    }

    if (!skills || typeof skills !== 'string') {
      return NextResponse.json({ error: 'Please list your skills or support domain.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Concurrency-safe interactive transaction
    const transactionResult = await prisma.$transaction(async (tx) => {
      // 1. Fetch current event state inside transaction
      const event = await tx.event.findUnique({
        where: { id: eventId },
        select: {
          id: true,
          title: true,
          volunteerCapacity: true,
          volunteerSlotsFilled: true,
          isPublished: true,
        },
      });

      if (!event) {
        throw new Error('EVENT_NOT_FOUND');
      }

      // 2. Strict capacity check to prevent overbooking
      if (event.volunteerSlotsFilled >= event.volunteerCapacity) {
        throw new Error('VOLUNTEER_SLOTS_FULL');
      }

      // 3. Prevent duplicate applications
      const existing = await tx.volunteerApplication.findUnique({
        where: {
          eventId_email: {
            eventId: event.id,
            email: cleanEmail,
          },
        },
      });

      if (existing) {
        throw new Error('ALREADY_APPLIED');
      }

      // 4. Create volunteer application
      const application = await tx.volunteerApplication.create({
        data: {
          eventId: event.id,
          fullName: fullName.trim(),
          email: cleanEmail,
          phone: phone.trim(),
          college: college.trim(),
          branchYear: branchYear ? branchYear.trim() : 'Undergraduate',
          skills: skills.trim(),
          priorExperience: priorExperience ? priorExperience.trim() : null,
          motivation: motivation ? motivation.trim() : 'Excited to volunteer with SS.',
          status: 'PENDING',
        },
      });

      // 5. Safely increment volunteerSlotsFilled
      const updatedEvent = await tx.event.update({
        where: { id: event.id },
        data: {
          volunteerSlotsFilled: { increment: 1 },
        },
      });

      return { application, updatedEvent };
    });

    const isNowFull =
      transactionResult.updatedEvent.volunteerSlotsFilled >=
      transactionResult.updatedEvent.volunteerCapacity;

    return NextResponse.json({
      success: true,
      message: isNowFull
        ? 'Application accepted! You have secured the final available volunteer slot.'
        : 'Application submitted successfully! Our event operations team will contact you.',
      application: transactionResult.application,
      slotsFilled: transactionResult.updatedEvent.volunteerSlotsFilled,
      capacity: transactionResult.updatedEvent.volunteerCapacity,
      isNowFull,
    });
  } catch (error: any) {
    if (error.message === 'EVENT_NOT_FOUND') {
      return NextResponse.json({ error: 'Event could not be found.' }, { status: 404 });
    }
    if (error.message === 'VOLUNTEER_SLOTS_FULL') {
      return NextResponse.json(
        {
          error: 'Volunteer Slots Full! Applications for this event are now closed to prevent overbooking.',
          isFull: true,
        },
        { status: 409 }
      );
    }
    if (error.message === 'ALREADY_APPLIED') {
      return NextResponse.json(
        { error: 'You have already submitted a volunteer application for this event.' },
        { status: 409 }
      );
    }

    console.error('Volunteer application error:', error);
    return NextResponse.json(
      { error: 'Server error processing volunteer application. Please try again.' },
      { status: 500 }
    );
  }
}
