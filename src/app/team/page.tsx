import React from 'react';
import prisma from '@/lib/prisma';
import TeamClientView from '@/components/team/TeamClientView';

export const revalidate = 0;

export default async function TeamPage() {
  const [leadershipMembers, allMembers, activeCount] = await Promise.all([
    prisma.teamMember.findMany({
      where: { isLeadership: true, isActive: true },
      orderBy: { orderIndex: 'asc' },
    }),
    prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { orderIndex: 'asc' },
    }),
    // Dynamically calculate the number of active team members
    prisma.teamMember.count({
      where: { isActive: true },
    }),
  ]);

  return (
    <TeamClientView
      leadershipMembers={leadershipMembers}
      allMembers={allMembers}
      activeCount={activeCount}
    />
  );
}
