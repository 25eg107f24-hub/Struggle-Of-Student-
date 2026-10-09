import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      college,
      degree,
      graduationYear,
      interests,
      linkedinUrl,
      portfolioUrl,
      reason,
    } = body;

    // Backend Validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter a valid full name.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
      return NextResponse.json({ error: 'Please enter a valid contact number.' }, { status: 400 });
    }

    if (!college || typeof college !== 'string') {
      return NextResponse.json({ error: 'Please specify your college or university.' }, { status: 400 });
    }

    if (!degree || typeof degree !== 'string') {
      return NextResponse.json({ error: 'Please specify your degree / branch.' }, { status: 400 });
    }

    if (!graduationYear || typeof graduationYear !== 'string') {
      return NextResponse.json({ error: 'Please specify your graduation year.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check for existing registration
    const existing = await prisma.communityMember.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return NextResponse.json(
        {
          error: 'This email is already registered with Struggle of Students! Your Membership ID is: ' + existing.membershipNumber,
          isDuplicate: true,
          existingMember: existing,
        },
        { status: 409 }
      );
    }

    // Generate unique membership number e.g. SS-2026-8491
    const totalCount = await prisma.communityMember.count();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const membershipNumber = `SS-2026-${(totalCount + 1).toString().padStart(4, '0')}-${randomSuffix}`;

    const member = await prisma.communityMember.create({
      data: {
        fullName: fullName.trim(),
        email: cleanEmail,
        phone: phone.trim(),
        college: college.trim(),
        degree: degree.trim(),
        graduationYear: graduationYear.trim(),
        interests: JSON.stringify(Array.isArray(interests) ? interests : []),
        linkedinUrl: linkedinUrl ? linkedinUrl.trim() : null,
        portfolioUrl: portfolioUrl ? portfolioUrl.trim() : null,
        reason: reason ? reason.trim() : null,
        membershipNumber: membershipNumber,
        status: 'ACTIVE',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Welcome to Struggle of Students! Your membership is active.',
      member,
    });
  } catch (error: any) {
    console.error('Member Registration Error:', error);
    return NextResponse.json(
      { error: 'An unexpected server error occurred while processing registration.' },
      { status: 500 }
    );
  }
}
