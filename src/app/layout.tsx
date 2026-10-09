import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Struggle of Students (SS) | A Platform Built by Students, for Students',
  description:
    'Struggle of Students (SS) is a youthful, vibrant student-led community connecting 5,000+ students across 45+ colleges in tech, music, fests, verified placements, peer guidance, and opportunities.',
  keywords: [
    'Struggle of Students',
    'SS Community',
    'Student Community India',
    'Campus Placements',
    'SS Band',
    'SS Event Management',
    'College Fests',
    'Tech Internships',
  ],
  authors: [{ name: 'Struggle of Students Team' }],
  openGraph: {
    title: 'Struggle of Students (SS) | Student-Led Movement',
    description: 'A platform built by students, for students. Tech, music, fests, mentorship & careers.',
    url: 'https://struggleofstudents.org',
    siteName: 'Struggle of Students (SS)',
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/ss-logo.jpg',
    apple: '/ss-logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-indigo-600 selection:text-white">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
