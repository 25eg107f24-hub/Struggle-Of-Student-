'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SSLogo from '@/components/common/SSLogo';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  IdCard,
  Briefcase,
  Video,
  HeartHandshake,
  LogOut,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface MemberData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  graduationYear: string;
  interests: string[];
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  reason: string | null;
  membershipNumber: string;
  status: string;
  createdAt: string;
}

interface VolunteerApp {
  id: string;
  fullName: string;
  status: string;
  createdAt: string;
  skills: string;
  event: {
    id: string;
    title: string;
    eventDate: string;
    time: string;
    venue: string;
    category: string;
    mode: string;
  };
}

interface OppApp {
  id: string;
  fullName: string;
  status: string;
  referenceId: string;
  createdAt: string;
  opportunity: {
    id: string;
    title: string;
    organization: string;
    type: string;
    deadline: string;
    location: string;
  };
}

interface MeetingReg {
  id: string;
  fullName: string;
  accessCode: string;
  createdAt: string;
  meeting: {
    id: string;
    title: string;
    speakerName: string;
    speakerBio: string | null;
    scheduledAt: string;
    durationMinutes: number;
    platform: string;
    meetingUrl: string;
    zoomPassword: string | null;
    status: string;
  };
}

interface Props {
  member: MemberData;
  volunteerApplications: VolunteerApp[];
  opportunityApplications: OppApp[];
  meetingRegistrations: MeetingReg[];
}

export default function StudentProfileClientView({
  member,
  volunteerApplications,
  opportunityApplications,
  meetingRegistrations,
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'idcard' | 'opportunities' | 'volunteering' | 'meetings'>('idcard');
  const [copiedId, setCopiedId] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(member.membershipNumber);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/student/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  };

  const initials = member.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      {/* Top Banner / Hero Profile Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-indigo-500/30 flex-shrink-0">
                {initials}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {member.fullName}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified SS Member
                  </span>
                </div>
                <p className="text-sm text-slate-600 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                  <span>
                    {member.degree} • {member.college} (Class of {member.graduationYear})
                  </span>
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {member.email}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                    ID: {member.membershipNumber}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={handleCopyId}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors"
                title="Copy Membership ID"
              >
                {copiedId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                <span>{copiedId ? 'Copied ID!' : 'Copy SS ID'}</span>
              </button>

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors disabled:opacity-50"
              >
                <LogOut className="w-4 h-4" />
                <span>{loggingOut ? 'Signing out...' : 'Sign Out'}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Membership</span>
              <span className="text-lg font-black text-slate-900 mt-1 block">Active</span>
              <span className="text-[11px] text-slate-500">Since {new Date(member.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Opportunities</span>
              <span className="text-lg font-black text-indigo-600 mt-1 block">{opportunityApplications.length} Applied</span>
              <span className="text-[11px] text-slate-500">Track application status</span>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Volunteering</span>
              <span className="text-lg font-black text-blue-600 mt-1 block">{volunteerApplications.length} Registered</span>
              <span className="text-[11px] text-slate-500">Events & community tasks</span>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Live Sessions</span>
              <span className="text-lg font-black text-cyan-600 mt-1 block">{meetingRegistrations.length} Meetings</span>
              <span className="text-[11px] text-slate-500">Direct access codes</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 mb-8 space-x-2 sm:space-x-4 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('idcard')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'idcard'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <IdCard className="w-4 h-4" />
            <span>Digital Student ID</span>
          </button>

          <button
            onClick={() => setActiveTab('opportunities')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'opportunities'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>My Applications ({opportunityApplications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('volunteering')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'volunteering'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Volunteer Slots ({volunteerApplications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('meetings')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'meetings'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>My Meetings ({meetingRegistrations.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'idcard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* The Digital Card itself */}
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-950 text-white p-8 shadow-2xl border border-indigo-500/30">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  {/* Top Header of Card */}
                  <div className="flex items-center justify-between border-b border-white/15 pb-6 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-black border border-white/20 flex-shrink-0 shadow-md">
                        <img
                          src="/ss-logo.jpg"
                          alt="SS Official Logo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-extrabold text-lg tracking-wider">STRUGGLE OF STUDENTS</div>
                        <div className="text-xs text-cyan-300 font-semibold tracking-wide">
                          Official Student Membership Card
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        VERIFIED 2026
                      </span>
                    </div>
                  </div>

                  {/* Body of Card */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Student Name
                        </div>
                        <div className="text-2xl font-black text-white">{member.fullName}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            College / University
                          </div>
                          <div className="text-sm font-bold text-slate-200 truncate">{member.college}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Degree & Batch
                          </div>
                          <div className="text-sm font-bold text-slate-200">
                            {member.degree} ({member.graduationYear})
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Registered Email
                          </div>
                          <div className="text-sm font-medium text-slate-300 truncate">{member.email}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Contact Phone
                          </div>
                          <div className="text-sm font-medium text-slate-300">{member.phone}</div>
                        </div>
                      </div>
                    </div>

                    {/* Member ID Barcode Mock */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 text-center flex flex-col items-center justify-center">
                      <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                        Unique Membership ID
                      </span>
                      <span className="font-mono text-xl font-extrabold text-cyan-300 tracking-wider my-2">
                        {member.membershipNumber}
                      </span>
                      {/* Barcode representation */}
                      <div className="flex items-center justify-center gap-1 h-8 opacity-80 my-1">
                        <div className="w-1 bg-white h-full" />
                        <div className="w-0.5 bg-white h-full" />
                        <div className="w-1.5 bg-white h-full" />
                        <div className="w-0.5 bg-white h-full" />
                        <div className="w-2 bg-white h-full" />
                        <div className="w-0.5 bg-white h-full" />
                        <div className="w-1 bg-white h-full" />
                        <div className="w-1.5 bg-white h-full" />
                        <div className="w-0.5 bg-white h-full" />
                        <div className="w-1 bg-white h-full" />
                      </div>
                      <span className="text-[9px] text-slate-400">Non-Transferable • Struggle of Students</span>
                    </div>
                  </div>

                  {/* Footer note */}
                  <div className="mt-8 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between text-xs text-slate-400">
                    <div>Issued to active member for SS workshops, events, and community privileges.</div>
                    <div className="font-semibold text-cyan-400">struggleofstudents.org</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Card: Member Interests & Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>My Student Interests</span>
                </h3>

                <div className="flex flex-wrap gap-2 mb-6">
                  {member.interests && member.interests.length > 0 ? (
                    member.interests.map((interest, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200"
                      >
                        {interest}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500">No specific interests recorded.</span>
                  )}
                </div>

                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Why I Joined Struggle of Students
                </h4>
                <p className="text-xs text-slate-600 italic bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  &ldquo;{member.reason || 'To learn, collaborate, and grow with peer students across India.'}&rdquo;
                </p>
              </div>

              {/* Quick Navigation Cards */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-3">Community Hub</h3>
                <div className="space-y-2.5">
                  <Link
                    href="/opportunities"
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors group"
                  >
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-indigo-600">
                      Explore Open Internships & Roles
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    href="/events"
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors group"
                  >
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-indigo-600">
                      Volunteer for Upcoming Events
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    href="/meetings"
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors group"
                  >
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-indigo-600">
                      Register for Next Mentorship Call
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Opportunities Applications */}
        {activeTab === 'opportunities' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">My Opportunity Applications</h2>
                <p className="text-sm text-slate-500">
                  Track the real-time review status of your internship, project, and campus ambassador applications.
                </p>
              </div>
              <Link
                href="/opportunities"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors"
              >
                <span>Browse More Roles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {opportunityApplications.length === 0 ? (
              <div className="text-center py-12 px-4">
                <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No applications submitted yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
                  You haven&apos;t applied to any internships, projects, or campus roles under this email address yet.
                </p>
                <Link
                  href="/opportunities"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Discover Open Opportunities</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {opportunityApplications.map((app) => (
                  <div
                    key={app.id}
                    className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-slate-900">
                          {app.opportunity.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-200 text-slate-700">
                          {app.opportunity.type}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-600">
                          {app.opportunity.organization}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span className="font-mono text-indigo-600 font-semibold">
                          Reference: {app.referenceId}
                        </span>
                        <span>Location: {app.opportunity.location}</span>
                        <span>Submitted on {new Date(app.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                          app.status === 'SELECTED' || app.status === 'APPROVED'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : app.status === 'REJECTED'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Volunteering Registrations */}
        {activeTab === 'volunteering' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">My Volunteer Slots & Events</h2>
                <p className="text-sm text-slate-500">
                  Review your volunteer assignments, stage responsibilities, and event passes.
                </p>
              </div>
              <Link
                href="/events"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors"
              >
                <span>View All Events</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {volunteerApplications.length === 0 ? (
              <div className="text-center py-12 px-4">
                <HeartHandshake className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No volunteer applications yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
                  Ready to gain hands-on event management experience? Join as a volunteer for our upcoming hackathons, fests, and workshops!
                </p>
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Browse Volunteer Openings</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {volunteerApplications.map((v) => (
                  <div
                    key={v.id}
                    className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-slate-900">{v.event.title}</h3>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {v.event.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                          {v.event.mode}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {new Date(v.event.eventDate).toLocaleDateString()} at {v.event.time}
                        </span>
                        <span>Venue: {v.event.venue}</span>
                        <span>Roles/Skills: {v.skills}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                          v.status === 'APPROVED'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : v.status === 'REJECTED'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {v.status === 'APPROVED' ? 'Slot Confirmed' : v.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Meeting Registrations */}
        {activeTab === 'meetings' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">My Registered Online Sessions</h2>
                <p className="text-sm text-slate-500">
                  Your registered webinars and mentorship sessions with private meeting links and passcodes.
                </p>
              </div>
              <Link
                href="/meetings"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors"
              >
                <span>Find More Sessions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {meetingRegistrations.length === 0 ? (
              <div className="text-center py-12 px-4">
                <Video className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No meeting registrations found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
                  Struggle of Students hosts regular webinars and career roadmaps with industry mentors. Register to unlock your seat!
                </p>
                <Link
                  href="/meetings"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Explore Online Meetings</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {meetingRegistrations.map((m) => (
                  <div
                    key={m.id}
                    className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-slate-900">{m.meeting.title}</h3>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200">
                          {m.meeting.platform}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {new Date(m.meeting.scheduledAt).toLocaleString()} ({m.meeting.durationMinutes} mins)
                        </span>
                        <span>Speaker: {m.meeting.speakerName}</span>
                        {m.accessCode && (
                          <span className="font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                            Access Code: {m.accessCode}
                          </span>
                        )}
                        {m.meeting.zoomPassword && (
                          <span className="font-mono bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200">
                            Passcode: {m.meeting.zoomPassword}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {m.meeting.meetingUrl ? (
                        <a
                          href={m.meeting.meetingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-colors"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Join Live Session</span>
                          <ExternalLink className="w-3 h-3 ml-0.5" />
                        </a>
                      ) : (
                        <span className="text-xs font-semibold text-slate-400">Link releases before session</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
