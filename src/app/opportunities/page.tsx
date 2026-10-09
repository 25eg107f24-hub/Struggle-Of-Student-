import React from 'react';
import prisma from '@/lib/prisma';
import OpportunitiesClientView from '@/components/opportunities/OpportunitiesClientView';

export const revalidate = 0;

interface PageProps {
  searchParams?: {
    apply?: string;
    tab?: string;
  };
}

export default async function OpportunitiesPage({ searchParams }: PageProps) {
  const opportunities = await prisma.opportunity.findMany({
    where: { isOpen: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <OpportunitiesClientView
      initialOpportunities={opportunities}
      defaultApplyId={searchParams?.apply}
      defaultTab={searchParams?.tab}
    />
  );
}
