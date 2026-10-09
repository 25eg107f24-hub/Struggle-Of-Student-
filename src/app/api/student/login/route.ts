import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signStudentToken, STUDENT_COOKIE_NAME } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const identifier = (body.identifier || body.email || body.membershipNumber || '').trim();

    if (!identifier) {
      return NextResponse.json(
        { error: 'Please enter your registered Email address or SS Membership ID (e.g. SS-2026-0001).' },
        { status: 400 }
      );
    }

    // Lookup member by email or membershipNumber (case-insensitive where applicable)
    const member = await prisma.communityMember.findFirst({
      where: {
        OR: [
          { email: { equals: identifier } },
          { email: { equals: identifier.toLowerCase() } },
          { membershipNumber: { equals: identifier } },
          { membershipNumber: { equals: identifier.toUpperCase() } },
        ],
      },
    });

    if (!member) {
      return NextResponse.json(
        {
          error:
            'No student community membership found with this Email or Membership ID. Please register first through the "Join Community" page.',
        },
        { status: 404 }
      );
    }

    const payload = {
      id: member.id,
      email: member.email,
      membershipNumber: member.membershipNumber,
      fullName: member.fullName,
    };

    const token = signStudentToken(payload);

    const response = NextResponse.json({
      success: true,
      message: `Welcome back, ${member.fullName}!`,
      member: {
        id: member.id,
        fullName: member.fullName,
        email: member.email,
        membershipNumber: member.membershipNumber,
        college: member.college,
        degree: member.degree,
        graduationYear: member.graduationYear,
        status: member.status,
      },
    });

    // Set HTTP-only student session cookie
    response.cookies.set({
      name: STUDENT_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error) {
    console.error('Student login error:', error);
    return NextResponse.json(
      { error: 'Authentication service encountered an unexpected error.' },
      { status: 500 }
    );
  }
}
