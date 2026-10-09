'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Users,
  ShieldCheck,
  Send,
  ArrowRight,
  GraduationCap,
  Mail,
  Phone,
  Building,
  Share2,
  Download,
} from 'lucide-react';
import SSLogo from '@/components/common/SSLogo';

const INTEREST_OPTIONS = [
  'Tech & Software Development',
  'SS Band & Live Music',
  'Campus Event Management',
  'Off-Campus Placements & Referrals',
  'Student Advocacy & Peer Counseling',
  'Creative Design & Video Editing',
  'Public Relations & Campus Outreach',
  'Hackathons & Competitions',
];

export default function JoinCommunityPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    degree: '',
    graduationYear: '2026',
    interests: ['Tech & Software Development', 'Off-Campus Placements & Referrals'],
    linkedinUrl: '',
    portfolioUrl: '',
    reason: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registeredMember, setRegisteredMember] = useState<any | null>(null);

  const toggleInterest = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return { ...prev, interests: prev.interests.filter((i) => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Frontend validation
    if (!formData.fullName.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Please provide your phone number.');
      return;
    }
    if (!formData.college.trim()) {
      setError('Please provide your college/university name.');
      return;
    }
    if (!formData.degree.trim()) {
      setError('Please provide your degree and branch.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/members/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit registration.');
      }

      setRegisteredMember(data.member);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
          <span>OFFICIAL STUDENT REGISTRATION</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Join the{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            SS Community
          </span>
        </h1>

        <p className="text-slate-600 text-sm sm:text-base">
          100% Free Membership. Unlock direct tech referrals, audition for SS Band, get 24/7 peer support,
          and participate in India’s largest student-driven movement.
        </p>
      </div>

      {registeredMember ? (
        /* Success State: Digital Membership Card */
        <div className="max-w-xl mx-auto space-y-8 animate-fade-in">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-center flex items-center justify-center gap-2 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-sm">
              Registration Successful! You are officially an active SS Member.
            </span>
          </div>

          {/* Realistic Gen-Z Student ID Card */}
          <div className="rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white border-2 border-indigo-400/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Glowing accents */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg overflow-hidden bg-black border border-white/20 flex-shrink-0 shadow-md">
                  <img
                    src="/ss-logo.jpg"
                    alt="SS Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-extrabold text-sm text-white">Struggle of Students</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 block">
                  Official Member Card
                </span>
                <span className="text-xs font-mono font-bold text-white">
                  {registeredMember.membershipNumber}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">
                  Member Name
                </span>
                <div className="text-2xl font-black text-white">{registeredMember.fullName}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">
                    College / Campus
                  </span>
                  <div className="text-sm font-semibold text-white truncate">
                    {registeredMember.college}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">
                    Degree & Batch
                  </span>
                  <div className="text-sm font-semibold text-white">
                    {registeredMember.degree} ({registeredMember.graduationYear})
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                  Selected Tracks
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {JSON.parse(registeredMember.interests || '[]').map((interest: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/15 text-cyan-200 border border-white/20"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Active Student</span>
              </div>
              <span className="font-mono text-[11px]">
                Issued: {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all text-center"
            >
              Log In to Student Portal
            </Link>
            <Link
              href="/events"
              className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 text-center shadow-sm"
            >
              Browse Upcoming Events
            </Link>
            <button
              onClick={() => {
                setRegisteredMember(null);
                setFormData({
                  fullName: '',
                  email: '',
                  phone: '',
                  college: '',
                  degree: '',
                  graduationYear: '2026',
                  interests: ['Tech & Software Development'],
                  linkedinUrl: '',
                  portfolioUrl: '',
                  reason: '',
                });
              }}
              className="text-xs text-slate-500 hover:text-slate-800 underline pt-2 sm:pt-0"
            >
              Register Another Member
            </button>
          </div>
        </div>
      ) : (
        /* Registration Form */
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-600" />
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. student@college.edu or gmail"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Phone / WhatsApp <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              {/* College / University */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  College / University <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Delhi Technological University"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              {/* Degree & Branch */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Degree & Branch <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B.Tech Computer Engineering"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              {/* Graduation Year */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Graduation Year <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                >
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="Alumni">Already Graduated / Alumni</option>
                </select>
              </div>

              {/* LinkedIn URL */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  LinkedIn Profile (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              {/* GitHub / Portfolio */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  GitHub / Portfolio / Social Link (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username or instagram"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
            </div>

            {/* Interests Multi-Select Pills */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Areas of Interest (Select all that excite you)
              </label>
              <div className="flex flex-wrap gap-2.5">
                {INTEREST_OPTIONS.map((item) => {
                  const isSelected = formData.interests.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleInterest(item)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                          : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Why do you want to join? */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                What brings you to SS? / How can we help? (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Share your goals, struggles, or projects you want to work on with fellow students..."
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:shadow-xl hover:shadow-indigo-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Registering Membership...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Community Registration</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
