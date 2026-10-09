import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const {
      studentName,
      college,
      degree,
      batchYear,
      company,
      role,
      packageLpa,
      placementType,
      testimonial,
    } = body;

    const placement = await prisma.placement.create({
      data: {
        studentName,
        college,
        degree,
        batchYear: batchYear || '2026',
        company,
        role,
        packageLpa,
        placementType: placementType || 'FULL_TIME',
        testimonial: testimonial || null,
        verified: true,
      },
    });

    return NextResponse.json({ success: true, placement });
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

    await prisma.placement.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
