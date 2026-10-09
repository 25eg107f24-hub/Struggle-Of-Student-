import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { title, content, badgeText, linkUrl } = await req.json();

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        badgeText: badgeText || 'ANNOUNCEMENT',
        linkUrl: linkUrl || null,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, announcement });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id, isActive } = await req.json();
    const updated = await prisma.announcement.update({
      where: { id },
      data: { isActive: Boolean(isActive) },
    });
    return NextResponse.json({ success: true, announcement: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
