import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const {
      title,
      organization,
      category,
      location,
      type,
      stipendOrPerks,
      deadline,
      eligibility,
      description,
      responsibilities,
      skillsRequired,
    } = body;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + `-${Date.now().toString(36)}`;

    const opp = await prisma.opportunity.create({
      data: {
        title,
        slug,
        organization,
        category,
        location,
        type: type || 'REMOTE',
        stipendOrPerks,
        deadline: new Date(deadline),
        eligibility,
        description,
        responsibilities,
        skillsRequired,
        isOpen: true,
      },
    });

    return NextResponse.json({ success: true, opportunity: opp });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id, isOpen } = await req.json();
    const updated = await prisma.opportunity.update({
      where: { id },
      data: { isOpen: Boolean(isOpen) },
    });
    return NextResponse.json({ success: true, opportunity: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.opportunity.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
