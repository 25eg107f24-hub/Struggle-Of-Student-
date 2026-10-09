import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      serviceId,
      serviceName,
      clientName,
      organizationOrCollege,
      email,
      phone,
      eventOrProjectDate,
      budget,
      description,
    } = body;

    if (!clientName || typeof clientName !== 'string' || clientName.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
      return NextResponse.json({ error: 'Please enter a valid contact phone number.' }, { status: 400 });
    }

    if (!description || typeof description !== 'string') {
      return NextResponse.json({ error: 'Please provide requirements or project details.' }, { status: 400 });
    }

    const enquiry = await prisma.serviceEnquiry.create({
      data: {
        serviceId: serviceId || null,
        serviceName: serviceName || 'General Service Enquiry',
        clientName: clientName.trim(),
        organizationOrCollege: organizationOrCollege ? organizationOrCollege.trim() : null,
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        eventOrProjectDate: eventOrProjectDate ? new Date(eventOrProjectDate) : null,
        budget: budget ? budget.trim() : null,
        description: description.trim(),
        status: 'NEW',
      },
    });

    return NextResponse.json({
      success: true,
      message: `Your enquiry for ${serviceName || 'SS Services'} has been submitted! Our lead coordinator will contact you within 24 hours.`,
      enquiry,
    });
  } catch (error: any) {
    console.error('Service Enquiry Error:', error);
    return NextResponse.json(
      { error: 'Server error processing enquiry. Please try again.' },
      { status: 500 }
    );
  }
}
