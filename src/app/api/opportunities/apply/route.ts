import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      opportunityId,
      fullName,
      email,
      phone,
      college,
      resumeUrl,
      portfolioUrl,
      coverNote,
    } = body;

    if (!opportunityId || typeof opportunityId !== 'string') {
      return NextResponse.json({ error: 'Opportunity ID is required.' }, { status: 400 });
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

    // Verify opportunity exists & isOpen
    const opp = await prisma.opportunity.findUnique({
      where: { id: opportunityId },
    });

    if (!opp) {
      return NextResponse.json({ error: 'Opportunity not found.' }, { status: 404 });
    }

    if (!opp.isOpen) {
      return NextResponse.json(
        { error: 'Applications for this opening are currently closed.' },
        { status: 400 }
      );
    }

    // Generate unique human-readable tracking Reference ID e.g. SS-APP-8349
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `SS-APP-${randomSuffix}`;

    const application = await prisma.opportunityApplication.create({
      data: {
        opportunityId: opp.id,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        college: college.trim(),
        resumeUrl: resumeUrl ? resumeUrl.trim() : null,
        portfolioUrl: portfolioUrl ? portfolioUrl.trim() : null,
        coverNote: coverNote ? coverNote.trim() : null,
        referenceId: referenceId,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully!',
      referenceId: application.referenceId,
      application,
    });
  } catch (error: any) {
    console.error('Opportunity Application Error:', error);
    return NextResponse.json(
      { error: 'Server error processing application. Please try again.' },
      { status: 500 }
    );
  }
}
