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
      description,
      shortDescription,
      category,
      bannerUrl,
      eventDate,
      time,
      venue,
      mode,
      volunteerCapacity,
      registrationLink,
      requirements,
    } = body;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + `-${Date.now().toString(36)}`;

    const event = await prisma.event.create({
      data: {
        title,
        slug,
        description,
        shortDescription: shortDescription || description.slice(0, 140),
        category: category || 'TECH',
        bannerUrl: bannerUrl || null,
        eventDate: new Date(eventDate),
        time: time || '10:00 AM',
        venue: venue || 'Campus Auditorium',
        mode: mode || 'OFFLINE',
        volunteerCapacity: parseInt(volunteerCapacity, 10) || 10,
        registrationLink: registrationLink || null,
        requirements: requirements || null,
        isPublished: true,
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (error: any) {
    console.error('Create Event Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id, volunteerCapacity, isPublished } = await req.json();
    if (!id) return NextResponse.json({ error: 'Event ID required' }, { status: 400 });

    const dataToUpdate: any = {};
    if (volunteerCapacity !== undefined) {
      dataToUpdate.volunteerCapacity = parseInt(volunteerCapacity, 10);
    }
    if (isPublished !== undefined) {
      dataToUpdate.isPublished = Boolean(isPublished);
    }

    const updated = await prisma.event.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json({ success: true, event: updated });
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
    if (!id) return NextResponse.json({ error: 'Event ID required' }, { status: 400 });

    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
