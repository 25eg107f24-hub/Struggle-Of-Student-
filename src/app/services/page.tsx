import React from 'react';
import prisma from '@/lib/prisma';
import ServicesClientView from '@/components/services/ServicesClientView';

export const revalidate = 0;

interface PageProps {
  searchParams?: {
    enquire?: string;
  };
}

export default async function ServicesPage({ searchParams }: PageProps) {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' },
  });

  return (
    <ServicesClientView
      services={services}
      defaultEnquireId={searchParams?.enquire}
    />
  );
}
