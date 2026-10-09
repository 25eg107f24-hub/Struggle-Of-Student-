import React from 'react';
import Link from 'next/link';
import SSLogo from '../common/SSLogo';
import {
  Heart,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Shield,
  Music,
  Code,
  Calendar,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-indigo-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <SSLogo size="lg" />
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm mt-3">
              <strong className="text-slate-900">Struggle of Students (SS)</strong> is a student-led,
              non-profit community built by students, for students. Bridging the gap between
              campus struggles and real-world breakthroughs through tech, music, fests, peer
              counseling, and verified placements.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active across 45+ College Campuses & Universities
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-pink-600 hover:border-pink-300 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-red-600 hover:border-red-300 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://chat.whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
                aria-label="WhatsApp Community"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-slate-900 text-sm font-bold tracking-wider uppercase">Community</h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/join" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                  <span>Join Community</span>
                  <span className="text-[10px] bg-indigo-100 text-indigo-700 font-bold px-1.5 py-0.5 rounded">Free</span>
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-indigo-600 transition-colors">
                  Student Member Login
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-indigo-600 transition-colors">
                  Events & Volunteering
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="hover:text-indigo-600 transition-colors">
                  Opportunities & Internships
                </Link>
              </li>
              <li>
                <Link href="/placements" className="hover:text-indigo-600 transition-colors">
                  Verified Placements
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-indigo-600 transition-colors">
                  SS Team & Leadership
                </Link>
              </li>
              <li>
                <Link href="/meetings" className="hover:text-indigo-600 transition-colors">
                  Online Meetings & AMA
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-slate-900 text-sm font-bold tracking-wider uppercase">Services</h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/services#ss-band" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-indigo-600" />
                  <span>SS Band (Live Music)</span>
                </Link>
              </li>
              <li>
                <Link href="/services#ss-event-management" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>SS Event Management</span>
                </Link>
              </li>
              <li>
                <Link href="/services#ss-it-solutions" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-purple-600" />
                  <span>SS IT Solutions</span>
                </Link>
              </li>
              <li>
                <Link href="/services#student-problems-and-guidance" className="hover:text-indigo-600 transition-colors">
                  Student Guidance Cell
                </Link>
              </li>
              <li>
                <Link href="/services#career-and-internship-support" className="hover:text-indigo-600 transition-colors">
                  Career & Resume Clinics
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-4">
            <h4 className="text-slate-900 text-sm font-bold tracking-wider uppercase">Official Contact</h4>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span>contact@struggleofstudents.org</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>+91 98111 22334 (Student Helpline)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                <span>Delhi / NCR, India (Campus Network Nationwide)</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                <span>Submit Grievance or Enquiry</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Struggle of Students (SS). All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-600">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by students for students
            </span>
            <Link href="/admin/login" className="text-slate-500 hover:text-slate-800">
              Admin Gateway
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
