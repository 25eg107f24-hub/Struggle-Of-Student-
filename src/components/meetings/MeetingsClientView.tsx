'use client';

import React, { useState } from 'react';
import {
  Video,
  Calendar,
  Clock,
  Users,
  Lock,
  Unlock,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  ShieldCheck,
  Key,
} from 'lucide-react';

interface MeetingItem {
  id: string;
  title: string;
  topic: string;
  speakerName: string;
  speakerBio: string | null;
  speakerPhotoUrl: string | null;
  scheduledAt: string | Date;
  durationMinutes: number;
  maxParticipants: number;
  registeredCount: number;
  platform: string;
  isPublished: boolean;
  status: string;
}

interface Props {
  meetings: MeetingItem[];
  zoomApiConfigured: boolean;
}

export const MeetingsClientView: React.FC<Props> = ({
  meetings,
  zoomApiConfigured,
}) => {
  // Registration Modal
  const [selectedMeetingForReg, setSelectedMeetingForReg] = useState<MeetingItem | null>(null);
  const [regForm, setRegForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
  });
  const [regSubmitting, setRegSubmitting] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);
  const [regSuccessData, setRegSuccessData] = useState<{
    accessCode: string;
    meetingUrl: string;
    message: string;
  } | null>(null);

  // Access Link Retrieval Modal
  const [selectedMeetingForAccess, setSelectedMeetingForAccess] = useState<MeetingItem | null>(null);
  const [accessQuery, setAccessQuery] = useState({ accessCode: '', email: '' });
  const [accessLoading, setAccessLoading] = useState(false);
  const [accessError, setAccessError] = useState<string | null>(null);
  const [unlockedMeetingUrl, setUnlockedMeetingUrl] = useState<string | null>(null);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMeetingForReg) return;
    setRegError(null);
    setRegSubmitting(true);

    try {
      const res = await fetch('/api/meetings/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingId: selectedMeetingForReg.id,
          ...regForm,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed.');
      }

      setRegSuccessData({
        accessCode: data.accessCode,
        meetingUrl: data.meetingUrl,
        message: data.message,
      });

      // Update count locally
      selectedMeetingForReg.registeredCount = data.registeredCount;
    } catch (err: any) {
      setRegError(err.message);
    } finally {
      setRegSubmitting(false);
    }
  };

  const handleAccessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMeetingForAccess) return;
    setAccessError(null);
    setAccessLoading(true);

    try {
      const res = await fetch('/api/meetings/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingId: selectedMeetingForAccess.id,
          accessCode: accessQuery.accessCode,
          email: accessQuery.email,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Verification failed.');
      }

      setUnlockedMeetingUrl(data.meetingUrl);
    } catch (err: any) {
      setAccessError(err.message);
    } finally {
      setAccessLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
          <Video className="w-3.5 h-3.5 text-indigo-600" />
          <span>VIRTUAL WORKSHOPS & AMAS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Online Meetings &{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            Masterclasses
          </span>
        </h1>

        <p className="text-slate-600 text-sm sm:text-base">
          Interactive masterclasses, AMA sessions with FAANG engineers, and student mental wellness circles.
          All sessions have strict participant caps to maintain quality interaction.
        </p>

        {/* Integration Status Badge */}
        <div className="pt-2">
          {zoomApiConfigured ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Zoom API Server-to-Server Connected
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-slate-600 border border-slate-300 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              Secure Private Meeting Rooms Active (Manual Fallback Mode)
            </span>
          )}
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {meetings.map((meeting) => {
          const isFull = meeting.registeredCount >= meeting.maxParticipants;
          const slotsLeft = Math.max(0, meeting.maxParticipants - meeting.registeredCount);
          const scheduledDate = new Date(meeting.scheduledAt).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });
          const scheduledTime = new Date(meeting.scheduledAt).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div
              key={meeting.id}
              className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-col justify-between hover:border-indigo-400 hover:shadow-xl transition-all shadow-sm"
            >
              <div>
                {/* Platform & Status Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-800 border border-indigo-200">
                    {meeting.platform}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                      isFull
                        ? 'bg-rose-50 text-rose-700 border border-rose-300'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    <Users className="w-3 h-3" />
                    {isFull ? 'Session Full' : `${slotsLeft} Seats Open (${meeting.registeredCount}/${meeting.maxParticipants})`}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{meeting.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">{meeting.topic}</p>

                {/* Speaker Info Card */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                    {meeting.speakerPhotoUrl ? (
                      <img
                        src={meeting.speakerPhotoUrl}
                        alt={meeting.speakerName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-indigo-700 bg-indigo-50">
                        {meeting.speakerName.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{meeting.speakerName}</h4>
                    <span className="text-xs text-slate-500">{meeting.speakerBio || 'SS Keynote Host'}</span>
                  </div>
                </div>

                {/* Schedule details */}
                <div className="space-y-2 text-xs text-slate-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    <span>{scheduledDate} at {scheduledTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-600" />
                    <span>Duration: {meeting.durationMinutes} Minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-700">
                    <Lock className="w-4 h-4 text-amber-600" />
                    <span>Meeting link is private & shared only with registered participants</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setSelectedMeetingForAccess(meeting);
                    setAccessError(null);
                    setUnlockedMeetingUrl(null);
                  }}
                  className="text-xs font-bold text-slate-600 hover:text-indigo-600 flex items-center gap-1"
                >
                  <Key className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Already Registered? Get Link</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedMeetingForReg(meeting);
                    setRegError(null);
                    setRegSuccessData(null);
                  }}
                  disabled={isFull}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isFull
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                  }`}
                >
                  {isFull ? 'Registration Closed' : 'Register for Free'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Registration Modal */}
      {selectedMeetingForReg && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl relative my-8 animate-fade-in text-slate-900">
            <button
              onClick={() => setSelectedMeetingForReg(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                Session Registration
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">{selectedMeetingForReg.title}</h2>
              <p className="text-xs text-slate-500 mt-1">Speaker: {selectedMeetingForReg.speakerName}</p>
            </div>

            {regSuccessData ? (
              <div className="space-y-6 text-center py-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Registration Confirmed!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto mb-4">{regSuccessData.message}</p>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-indigo-200 max-w-xs mx-auto mb-4 text-center">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Your Personal Access Code</span>
                    <strong className="text-lg font-mono text-indigo-700">{regSuccessData.accessCode}</strong>
                  </div>

                  <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-left space-y-2">
                    <span className="text-xs font-bold text-indigo-900 block flex items-center gap-1.5">
                      <Unlock className="w-4 h-4 text-emerald-600" />
                      Authorized Meeting Link:
                    </span>
                    <a
                      href={regSuccessData.meetingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-indigo-700 hover:underline break-all block"
                    >
                      {regSuccessData.meetingUrl}
                    </a>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <a
                    href={regSuccessData.meetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Open Meeting Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setSelectedMeetingForReg(null)}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                {regError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    <span>{regError}</span>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={regForm.fullName}
                    onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@college.edu"
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={regForm.phone}
                      onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                      College *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="College Name"
                      value={regForm.college}
                      onChange={(e) => setRegForm({ ...regForm, college: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={regSubmitting}
                    className="w-full py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    {regSubmitting ? 'Reserving Seat...' : 'Confirm Registration & Reveal Link'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Access Code Retrieval Modal */}
      {selectedMeetingForAccess && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl relative my-8 animate-fade-in text-slate-900">
            <button
              onClick={() => setSelectedMeetingForAccess(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                Unlock Meeting Link
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">Retrieve Private Link</h2>
              <p className="text-xs text-slate-500 mt-1">{selectedMeetingForAccess.title}</p>
            </div>

            {unlockedMeetingUrl ? (
              <div className="space-y-4 py-2 animate-fade-in">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2">
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Authorized Access Verified!
                  </span>
                  <a
                    href={unlockedMeetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-indigo-700 hover:underline break-all block"
                  >
                    {unlockedMeetingUrl}
                  </a>
                </div>
                <div className="flex justify-center gap-3 pt-2">
                  <a
                    href={unlockedMeetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Join Session</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setSelectedMeetingForAccess(null)}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAccessSubmit} className="space-y-4">
                {accessError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    <span>{accessError}</span>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    Your Access Code (e.g. SS-MEET-8204)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={accessQuery.accessCode}
                    onChange={(e) =>
                      setAccessQuery({ ...accessQuery, accessCode: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div className="text-center text-[11px] text-slate-400">OR</div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    Registered Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="student@college.edu"
                    value={accessQuery.email}
                    onChange={(e) =>
                      setAccessQuery({ ...accessQuery, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={accessLoading}
                    className="w-full py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-sm"
                  >
                    {accessLoading ? 'Verifying...' : 'Unlock Meeting Link'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingsClientView;
