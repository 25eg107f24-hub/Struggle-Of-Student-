import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, topic, subject, message } = body;

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
      return NextResponse.json({ error: 'Please enter a subject.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json({ error: 'Please enter your message.' }, { status: 400 });
    }

    const contactMsg = await prisma.contactMessage.create({
      data: {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        topic: topic || 'GENERAL',
        subject: subject.trim(),
        message: message.trim(),
        status: 'UNREAD',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been routed to our core student team. We respond within 24 hours.',
      messageId: contactMsg.id,
    });
  } catch (error: any) {
    console.error('Contact Form Error:', error);
    return NextResponse.json(
      { error: 'Server error saving contact message. Please try again.' },
      { status: 500 }
    );
  }
}
