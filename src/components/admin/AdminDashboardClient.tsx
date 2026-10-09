'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Briefcase,
  Users,
  Award,
  Layers,
  Video,
  Megaphone,
  LogOut,
  Plus,
  Trash2,
  Check,
  X,
  ExternalLink,
  Search,
  ShieldCheck,
  Clock,
  Sparkles,
  RefreshCw,
  Sliders,
  Mail,
  Phone,
} from 'lucide-react';
import SSLogo from '@/components/common/SSLogo';

interface Props {
  admin: { id: string; email: string; name: string; role: string };
  initialData: {
    counts: {
      members: number;
      events: number;
      volunteers: number;
      opportunities: number;
      applications: number;
      placements: number;
      team: number;
      activeTeam: number;
      meetings: number;
      enquiries: number;
    };
    events: any[];
    volunteerApplications: any[];
    opportunities: any[];
    opportunityApplications: any[];
    communityMembers: any[];
    placements: any[];
    teamMembers: any[];
    services: any[];
    serviceEnquiries: any[];
    meetings: any[];
    announcements: any[];
    zoomApiConfigured: boolean;
  };
}

export const AdminDashboardClient: React.FC<Props> = ({ admin, initialData }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'events'
    | 'opportunities'
    | 'members'
    | 'placements'
    | 'team'
    | 'enquiries'
    | 'meetings'
    | 'announcements'
  >('overview');

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);

  // Modal / Form States
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    category: 'TECH',
    eventDate: '',
    time: '10:00 AM',
    venue: '',
    mode: 'OFFLINE',
    volunteerCapacity: 10,
    description: '',
  });

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  // Event actions
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });
      if (res.ok) {
        setShowEventModal(false);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEventCapacity = async (id: string, newCapacity: number) => {
    await fetch('/api/admin/events', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, volunteerCapacity: newCapacity }),
    });
    router.refresh();
  };

  const handleVolunteerStatus = async (id: string, status: string) => {
    await fetch('/api/admin/volunteers', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    router.refresh();
  };

  const handleAppStatus = async (id: string, status: string) => {
    await fetch('/api/admin/opportunity-applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    router.refresh();
  };

  const handleToggleTeamActive = async (id: string, currentStatus: boolean) => {
    await fetch('/api/admin/team', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isActive: !currentStatus }),
    });
    router.refresh();
  };

  const handleEnquiryStatus = async (id: string, status: string) => {
    await fetch('/api/admin/enquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <SSLogo size="sm" showSubtitle={false} clickable={false} />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
            Control Center
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-slate-900">{admin.name}</div>
            <div className="text-[11px] text-slate-500">{admin.email} ({admin.role})</div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 transition-colors flex items-center gap-1.5 text-xs font-bold border border-slate-200"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 space-y-1">
          {[
            { key: 'overview', label: 'Overview & KPIs', icon: LayoutDashboard },
            { key: 'events', label: 'Events & Volunteering', icon: Calendar, badge: data.events.length },
            { key: 'opportunities', label: 'Opportunities Hub', icon: Briefcase, badge: data.opportunityApplications.length },
            { key: 'members', label: 'Community Members', icon: Users, badge: data.counts.members },
            { key: 'placements', label: 'Verified Placements', icon: Award, badge: data.counts.placements },
            { key: 'team', label: 'SS Team & Active Count', icon: ShieldCheck, badge: `${data.counts.activeTeam} Active` },
            { key: 'enquiries', label: 'Service Inquiries', icon: Layers, badge: data.counts.enquiries },
            { key: 'meetings', label: 'Online Meetings', icon: Video, badge: data.counts.meetings },
            { key: 'announcements', label: 'Announcements', icon: Megaphone },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                      isActive
                        ? 'bg-indigo-700 text-white'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Pane */}
        <main className="flex-grow p-6 sm:p-8 max-w-7xl overflow-y-auto bg-slate-50">
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Ecosystem Overview</h2>
                <p className="text-xs text-slate-500">Live community metrics and operational health</p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500">Registered Members</span>
                  <div className="text-3xl font-black text-slate-900 mt-1">{data.counts.members}</div>
                  <span className="text-[11px] text-cyan-700 font-bold">100% Free Verified</span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500">Published Events</span>
                  <div className="text-3xl font-black text-slate-900 mt-1">{data.counts.events}</div>
                  <span className="text-[11px] text-indigo-700 font-bold">{data.counts.volunteers} Volunteers</span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500">Active Core Team</span>
                  <div className="text-3xl font-black text-emerald-600 mt-1">{data.counts.activeTeam}</div>
                  <span className="text-[11px] text-slate-500">Dynamically counted</span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500">Service Inquiries</span>
                  <div className="text-3xl font-black text-amber-600 mt-1">{data.counts.enquiries}</div>
                  <span className="text-[11px] text-slate-500">Band & Event Bookings</span>
                </div>
              </div>

              {/* Quick Status Box */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900">System Integrations & Health</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block mb-1">Persistent Database</span>
                    <strong className="text-emerald-700 flex items-center gap-1 font-bold">
                      <Check className="w-3.5 h-3.5" /> SQLite / Prisma Connected
                    </strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block mb-1">Zoom Meeting API</span>
                    {data.zoomApiConfigured ? (
                      <strong className="text-emerald-700 flex items-center gap-1 font-bold">
                        <Check className="w-3.5 h-3.5" /> Server-to-Server Active
                      </strong>
                    ) : (
                      <strong className="text-amber-700 flex items-center gap-1 font-bold">
                        Manual Meeting Link Fallback Active
                      </strong>
                    )}
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block mb-1">Volunteer Quota Limiter</span>
                    <strong className="text-emerald-700 flex items-center gap-1 font-bold">
                      <Check className="w-3.5 h-3.5" /> Transactional Lock Active
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: EVENTS & VOLUNTEERING */}
          {activeTab === 'events' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Events & Volunteer Capacity</h2>
                  <p className="text-xs text-slate-500">
                    Adjust volunteer quotas in real time. Applications automatically close when filled.
                  </p>
                </div>
                <button
                  onClick={() => setShowEventModal(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Event</span>
                </button>
              </div>

              {/* Events List */}
              <div className="space-y-4">
                {data.events.map((ev) => {
                  const isFull = ev.volunteerSlotsFilled >= ev.volunteerCapacity;
                  const relevantApplicants = data.volunteerApplications.filter((a) => a.eventId === ev.id);

                  return (
                    <div key={ev.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h3 className="text-base font-bold text-slate-900">{ev.title}</h3>
                          <span className="text-xs text-slate-500">
                            {ev.venue} • {new Date(ev.eventDate).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Capacity Controls */}
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full ${
                              isFull
                                ? 'bg-rose-50 text-rose-700 border border-rose-300'
                                : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                            }`}
                          >
                            {isFull ? 'Volunteer Slots Full' : `${ev.volunteerSlotsFilled} / ${ev.volunteerCapacity} Slots Filled`}
                          </span>

                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-slate-600">Adjust Capacity:</span>
                            <button
                              onClick={() => handleUpdateEventCapacity(ev.id, Math.max(ev.volunteerSlotsFilled, ev.volunteerCapacity - 1))}
                              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold border border-slate-200"
                            >
                              -
                            </button>
                            <span className="px-2 font-mono font-bold text-slate-900">{ev.volunteerCapacity}</span>
                            <button
                              onClick={() => handleUpdateEventCapacity(ev.id, ev.volunteerCapacity + 1)}
                              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold border border-slate-200"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Volunteer Applicants Sub-table */}
                      <div className="pt-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                          Volunteer Applications ({relevantApplicants.length})
                        </span>

                        {relevantApplicants.length === 0 ? (
                          <div className="text-xs text-slate-400 italic">No volunteer applications yet.</div>
                        ) : (
                          <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 overflow-hidden text-xs">
                            {relevantApplicants.map((app) => (
                              <div key={app.id} className="p-3 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3">
                                <div>
                                  <strong className="text-slate-900">{app.fullName}</strong> ({app.college})
                                  <span className="text-slate-500 block text-[11px]">
                                    Skills: {app.skills} | Phone: {app.phone}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                      app.status === 'APPROVED'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : app.status === 'REJECTED'
                                        ? 'bg-rose-100 text-rose-800'
                                        : 'bg-slate-200 text-slate-700'
                                    }`}
                                  >
                                    {app.status}
                                  </span>

                                  {app.status !== 'APPROVED' && (
                                    <button
                                      onClick={() => handleVolunteerStatus(app.id, 'APPROVED')}
                                      className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold shadow-2xs"
                                    >
                                      Approve
                                    </button>
                                  )}
                                  {app.status !== 'REJECTED' && (
                                    <button
                                      onClick={() => handleVolunteerStatus(app.id, 'REJECTED')}
                                      className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold shadow-2xs"
                                    >
                                      Reject
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: OPPORTUNITIES */}
          {activeTab === 'opportunities' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Opportunities & Applicants Hub</h2>
                  <p className="text-xs text-slate-500">Review student applicants, check resumes, and update statuses</p>
                </div>
              </div>

              {/* Applicant Review Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Submitted Student Applications ({data.opportunityApplications.length})
                </h3>

                <div className="space-y-3">
                  {data.opportunityApplications.map((app) => (
                    <div key={app.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-cyan-800 font-bold bg-cyan-100 px-2 py-0.5 rounded border border-cyan-200">
                            {app.referenceId}
                          </span>
                          <strong className="text-slate-900 text-sm">{app.fullName}</strong>
                          <span className="text-slate-500">({app.college})</span>
                        </div>

                        {/* Status Dropdown */}
                        <select
                          value={app.status}
                          onChange={(e) => handleAppStatus(app.id, e.target.value)}
                          className="px-2.5 py-1 rounded bg-slate-50 border border-slate-300 text-xs text-slate-800 font-bold"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="UNDER_REVIEW">UNDER REVIEW</option>
                          <option value="SHORTLISTED">SHORTLISTED</option>
                          <option value="ACCEPTED">ACCEPTED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </div>

                      <div className="text-slate-700">
                        Target Role: <strong className="text-slate-900">{app.opportunity?.title}</strong>
                      </div>

                      {app.coverNote && (
                        <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-slate-700 text-[11px] italic">
                          “{app.coverNote}”
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
                        <span>Email: {app.email}</span>
                        <span>Phone: {app.phone}</span>
                        {app.resumeUrl && (
                          <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline flex items-center gap-1 font-bold">
                            Resume Link <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: COMMUNITY MEMBERS */}
          {activeTab === 'members' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Registered Community Members</h2>
                <p className="text-xs text-slate-500">Total registered students: {data.counts.members}</p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 uppercase font-bold text-slate-500 border-b border-slate-200 text-[10px]">
                    <tr>
                      <th className="p-3.5">Member ID</th>
                      <th className="p-3.5">Full Name</th>
                      <th className="p-3.5">Email & Phone</th>
                      <th className="p-3.5">College & Degree</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.communityMembers.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50/80">
                        <td className="p-3.5 font-mono text-indigo-700 font-bold">{m.membershipNumber}</td>
                        <td className="p-3.5 font-bold text-slate-900">{m.fullName}</td>
                        <td className="p-3.5">
                          <div>{m.email}</div>
                          <div className="text-[11px] text-slate-500">{m.phone}</div>
                        </td>
                        <td className="p-3.5">
                          <div>{m.college}</div>
                          <div className="text-[11px] text-slate-500">{m.degree} ({m.graduationYear})</div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            {m.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: SS TEAM & DYNAMIC ACTIVE COUNT */}
          {activeTab === 'team' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">SS Team Members</h2>
                  <p className="text-xs text-slate-500">
                    Toggle active status below to dynamically update active member counts across the website.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.teamMembers.map((member) => (
                  <div key={member.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{member.name}</h4>
                      <span className="text-xs text-indigo-600 font-semibold">{member.designation}</span>
                      <span className="text-[11px] text-slate-500 block mt-0.5">{member.college}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleTeamActive(member.id, member.isActive)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          member.isActive
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        {member.isActive ? 'Active Leader' : 'Inactive'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: VERIFIED PLACEMENTS */}
          {activeTab === 'placements' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Verified Placement Records</h2>
                  <p className="text-xs text-slate-500">Verified student achievements and offers</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.placements.map((p) => (
                  <div key={p.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm font-bold text-slate-900">{p.company}</strong>
                      <span className="px-2 py-0.5 rounded font-black text-emerald-800 bg-emerald-100 border border-emerald-200">
                        {p.packageLpa}
                      </span>
                    </div>
                    <div className="text-slate-800 font-semibold">{p.studentName}</div>
                    <div className="text-slate-500 text-[11px]">{p.college} ({p.role})</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SERVICE ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Client Service Inquiries</h2>
                <p className="text-xs text-slate-500">Incoming booking requests for SS Band, Event Production, IT solutions</p>
              </div>

              <div className="space-y-3">
                {data.serviceEnquiries.map((enq) => (
                  <div key={enq.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold text-[10px]">
                          {enq.serviceName}
                        </span>
                        <strong className="text-slate-900 text-sm">{enq.clientName}</strong>
                        {enq.organizationOrCollege && (
                          <span className="text-slate-500">({enq.organizationOrCollege})</span>
                        )}
                      </div>

                      <select
                        value={enq.status}
                        onChange={(e) => handleEnquiryStatus(enq.id, e.target.value)}
                        className="px-2.5 py-1 rounded bg-slate-50 border border-slate-300 text-xs text-slate-800 font-bold"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
                    </div>

                    <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                      {enq.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-slate-500 text-[11px]">
                      <span>Email: {enq.email}</span>
                      <span>Phone: {enq.phone}</span>
                      {enq.budget && <span>Budget: {enq.budget}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ONLINE MEETINGS */}
          {activeTab === 'meetings' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Online Meetings & Scheduling</h2>
                  <p className="text-xs text-slate-500">Manage virtual sessions and participant quotas</p>
                </div>
              </div>

              <div className="space-y-4">
                {data.meetings.map((m) => (
                  <div key={m.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="text-base font-bold text-slate-900">{m.title}</h4>
                        <span className="text-slate-500">Speaker: {m.speakerName}</span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 font-bold">
                        {m.registeredCount} / {m.maxParticipants} Registered
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Private Meeting URL</span>
                      <code className="text-indigo-700 font-mono break-all">{m.meetingUrl}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ANNOUNCEMENTS */}
          {activeTab === 'announcements' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Community Announcements</h2>
                <p className="text-xs text-slate-500">Manage alerts displayed across the top banner</p>
              </div>

              <div className="space-y-3">
                {data.announcements.map((ann) => (
                  <div key={ann.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 mr-2">
                        {ann.badgeText}
                      </span>
                      <strong className="text-slate-900">{ann.title}</strong>
                      <p className="text-slate-600 text-[11px] mt-0.5">{ann.content}</p>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Create Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl relative my-8 animate-fade-in text-slate-900">
            <button
              onClick={() => setShowEventModal(false)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Create New Event</h3>
            <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold uppercase mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Category</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900"
                  >
                    <option value="TECH">TECH</option>
                    <option value="CULTURAL">CULTURAL</option>
                    <option value="WORKSHOP">WORKSHOP</option>
                    <option value="SOCIAL">SOCIAL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Volunteer Capacity *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newEvent.volunteerCapacity}
                    onChange={(e) => setNewEvent({ ...newEvent, volunteerCapacity: parseInt(e.target.value, 10) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={newEvent.eventDate}
                    onChange={(e) => setNewEvent({ ...newEvent, eventDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Venue *</label>
                  <input
                    type="text"
                    required
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold uppercase mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
              >
                Publish Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardClient;
