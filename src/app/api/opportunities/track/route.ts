import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query')?.trim();

    if (!query) {
      return NextResponse.json({ error: 'Please enter a Reference ID or registered Email.' }, { status: 400 });
    }

    let applications = [];

    if (query.includes('@')) {
      // Search by email
      applications = await prisma.opportunityApplication.findMany({
        where: { email: query.toLowerCase() },
        include: {
          opportunity: {
            select: {
              title: true,
              organization: true,
              category: true,
              location: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      // Search by Reference ID
      applications = await prisma.opportunityApplication.findMany({
        where: { referenceId: query.toUpperCase() },
        include: {
          opportunity: {
            select: {
              title: true,
              organization: true,
              category: true,
              location: true,
            },
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      applications,
    });
  } catch (error: any) {
    console.error('Tracking Lookup Error:', error);
    return NextResponse.json(
      { error: 'Server error looking up application status.' },
      { status: 500 }
    );
  }
}
