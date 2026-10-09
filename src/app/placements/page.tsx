import React from 'react';
import prisma from '@/lib/prisma';
import PlacementsClientView from '@/components/placements/PlacementsClientView';

export const revalidate = 0;

export default async function PlacementsPage() {
  const placements = await prisma.placement.findMany({
    where: { verified: true },
    orderBy: { createdAt: 'desc' },
  });

  return <PlacementsClientView initialPlacements={placements} />;
}
