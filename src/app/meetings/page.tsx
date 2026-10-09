import React from 'react';
import prisma from '@/lib/prisma';
import MeetingsClientView from '@/components/meetings/MeetingsClientView';
import { isZoomApiConfigured } from '@/lib/zoom';

export const revalidate = 0;

export default async function MeetingsPage() {
  const meetings = await prisma.onlineMeeting.findMany({
    where: { isPublished: true },
    orderBy: { scheduledAt: 'asc' },
  });

  const zoomConfigured = isZoomApiConfigured();

  return (
    <MeetingsClientView
      meetings={meetings}
      zoomApiConfigured={zoomConfigured}
    />
  );
}
