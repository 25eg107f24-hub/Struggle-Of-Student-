import React from 'react';
import prisma from '@/lib/prisma';
import EventsClientView from '@/components/events/EventsClientView';

export const revalidate = 0;

interface PageProps {
  searchParams?: {
    applyVolunteer?: string;
  };
}

export default async function EventsPage({ searchParams }: PageProps) {
  const events = await prisma.event.findMany({
    where: { isPublished: true },
    orderBy: { eventDate: 'asc' },
  });

  return (
    <EventsClientView
      initialEvents={events}
      defaultApplyEventId={searchParams?.applyVolunteer}
    />
  );
}
