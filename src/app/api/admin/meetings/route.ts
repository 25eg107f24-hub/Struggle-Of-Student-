import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';
import { createZoomMeeting } from '@/lib/zoom';

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const {
      title,
      topic,
      speakerName,
      speakerBio,
      speakerPhotoUrl,
      scheduledAt,
      durationMinutes,
      maxParticipants,
      manualMeetingUrl,
      platform,
    } = body;

    const duration = parseInt(durationMinutes, 10) || 60;
    const capacity = parseInt(maxParticipants, 10) || 100;

    let finalMeetingUrl = manualMeetingUrl;
    let zoomMeetingId = null;
    let zoomPassword = null;

    // If platform is ZOOM, invoke Zoom helper
    if (platform === 'ZOOM') {
      const zoomResult = await createZoomMeeting(
        {
          topic: title,
          startTime: new Date(scheduledAt).toISOString(),
          durationMinutes: duration,
          agenda: topic,
        },
        manualMeetingUrl
      );

      finalMeetingUrl = zoomResult.meetingUrl || manualMeetingUrl;
      zoomMeetingId = zoomResult.meetingId || null;
      zoomPassword = zoomResult.password || null;
    } else {
      finalMeetingUrl = manualMeetingUrl || 'https://meet.google.com/ss-live';
    }

    const meeting = await prisma.onlineMeeting.create({
      data: {
        title,
        topic,
        speakerName,
        speakerBio: speakerBio || null,
        speakerPhotoUrl: speakerPhotoUrl || null,
        scheduledAt: new Date(scheduledAt),
        durationMinutes: duration,
        maxParticipants: capacity,
        meetingUrl: finalMeetingUrl,
        platform: platform || 'ZOOM',
        zoomMeetingId,
        zoomPassword,
        isPublished: true,
        status: 'UPCOMING',
      },
    });

    return NextResponse.json({ success: true, meeting });
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

    await prisma.onlineMeeting.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
