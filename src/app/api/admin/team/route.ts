import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const {
      name,
      designation,
      department,
      responsibilities,
      bio,
      photoUrl,
      college,
      linkedinUrl,
      githubUrl,
      instagramUrl,
      isLeadership,
    } = body;

    const member = await prisma.teamMember.create({
      data: {
        name,
        designation,
        department: department || 'TECH_DEV',
        responsibilities,
        bio: bio || null,
        photoUrl: photoUrl || null,
        college: college || null,
        linkedinUrl: linkedinUrl || null,
        githubUrl: githubUrl || null,
        instagramUrl: instagramUrl || null,
        isLeadership: Boolean(isLeadership),
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, member });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id, isActive } = await req.json();
    const updated = await prisma.teamMember.update({
      where: { id },
      data: { isActive: Boolean(isActive) },
    });
    return NextResponse.json({ success: true, member: updated });
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

    await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
