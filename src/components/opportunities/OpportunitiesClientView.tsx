'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  X,
  FileText,
  Building,
  UserCheck,
  Send,
} from 'lucide-react';

interface OpportunityItem {
  id: string;
  title: string;
  slug: string;
  organization: string;
  category: string;
  location: string;
  type: string;
  stipendOrPerks: string;
  deadline: string | Date;
  eligibility: string;
  description: string;
  responsibilities: string | null;
  skillsRequired: string | null;
  isOpen: boolean;
}

interface Props {
  initialOpportunities: OpportunityItem[];
  defaultApplyId?: string;
  defaultTab?: string;
}

const CATEGORIES = [
  'ALL',
  'INTERNSHIP',
  'JOB',
  'CAMPUS_AMBASSADOR',
  'PROJECT',
  'TALENT_SHOWCASE',
  'LEADERSHIP',
  'WORKSHOP',
  'VOLUNTEERING',
  'COLLABORATION',
];

export const OpportunitiesClientView: React.FC<Props> = ({
  initialOpportunities,
  defaultApplyId,
  defaultTab = 'explore',
}) => {
  const [activeTab, setActiveTab] = useState<'explore' | 'track'>(
    defaultTab === 'track' ? 'track' : 'explore'
  );
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Application Modal
  const [activeOppForModal, setActiveOppForModal] = useState<OpportunityItem | null>(() => {
    if (defaultApplyId) {
      return initialOpportunities.find((o) => o.id === defaultApplyId) || null;
    }
    return null;
  });

  const [applyForm, setApplyForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    resumeUrl: '',
    portfolioUrl: '',
    coverNote: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [generatedRefId, setGeneratedRefId] = useState<string | null>(null);

  // Status Tracking Tab State
  const [trackQuery, setTrackQuery] = useState('');
  const [trackingResults, setTrackingResults] = useState<any[] | null>(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState<string | null>(null);

  // Filter
  const filteredOpportunities = initialOpportunities.filter((opp) => {
    const matchesCategory =
      selectedCategory === 'ALL' || opp.category.toUpperCase() === selectedCategory;
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.eligibility.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOppForModal) return;
    setSubmitError(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/opportunities/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opportunityId: activeOppForModal.id,
          ...applyForm,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application.');
      }

      setGeneratedRefId(data.referenceId);
      setApplyForm({
        fullName: '',
        email: '',
        phone: '',
        college: '',
        resumeUrl: '',
        portfolioUrl: '',
        coverNote: '',
      });
    } catch (err: any) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;
    setTrackingError(null);
    setTrackingLoading(true);

    try {
      const res = await fetch(`/api/opportunities/track?query=${encodeURIComponent(trackQuery.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to track application.');
      }

      setTrackingResults(data.applications || []);
      if (!data.applications || data.applications.length === 0) {
        setTrackingError('No applications found matching your reference ID or email.');
      }
    } catch (err: any) {
      setTrackingError(err.message);
    } finally {
      setTrackingLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACCEPTED':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            ACCEPTED / OFFER EXTENDED
          </span>
        );
      case 'SHORTLISTED':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">
            SHORTLISTED FOR INTERVIEW
          </span>
        );
      case 'UNDER_REVIEW':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            UNDER REVIEW
          </span>
        );
      case 'REJECTED':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            NOT SHORTLISTED
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
            APPLICATION RECEIVED (PENDING)
          </span>
        );
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold">
          <Briefcase className="w-3.5 h-3.5 text-cyan-600" />
          <span>STUDENT OPPORTUNITIES PORTAL</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Opportunities &{' '}
          <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Campus Roles
          </span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Apply directly to internships, campus ambassador leadership roles, developer projects, band auditions, and community workshops.
        </p>

        {/* Top Segment Control */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'explore'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-300 shadow-2xs'
            }`}
          >
            Explore Openings ({initialOpportunities.length})
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'track'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-300 shadow-2xs'
            }`}
          >
            Track Application Status
          </button>
        </div>
      </div>

      {activeTab === 'track' ? (
        /* Status Tracking Hub */
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Check Your Application Status</h3>
            <p className="text-xs text-slate-500 mb-6">
              Enter your unique Reference ID (e.g. SS-APP-8349) or your registered Email address to view live review decisions.
            </p>

            <form onSubmit={handleTrackSubmit} className="flex gap-2">
              <input
                type="text"
                required
                placeholder="Enter Reference ID or your Email"
                value={trackQuery}
                onChange={(e) => setTrackQuery(e.target.value)}
                className="flex-grow px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:bg-white"
              />
              <button
                type="submit"
                disabled={trackingLoading}
                className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-sm"
              >
                {trackingLoading ? 'Checking...' : 'Track'}
              </button>
            </form>

            {trackingError && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{trackingError}</span>
              </div>
            )}
          </div>

          {trackingResults && trackingResults.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Matching Applications ({trackingResults.length})
              </h4>
              {trackingResults.map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-800 bg-cyan-100 px-2.5 py-1 rounded border border-cyan-200">
                      {app.referenceId}
                    </span>
                    {getStatusBadge(app.status)}
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      {app.opportunity?.title || 'Opportunity'}
                    </h4>
                    <span className="text-xs text-slate-500">
                      {app.opportunity?.organization} • Applied on{' '}
                      {new Date(app.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="text-xs text-slate-700 pt-1">
                    Applicant: <strong className="text-slate-900">{app.fullName}</strong> ({app.college})
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Explore Openings */
        <>
          {/* Filter & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.replace('_', ' ')}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search openings, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-cyan-600 focus:bg-white"
              />
            </div>
          </div>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opp) => {
              const deadlineDate = new Date(opp.deadline).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div
                  key={opp.id}
                  className="group rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between hover:border-cyan-400 hover:shadow-xl transition-all duration-300 shadow-sm"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-cyan-100 text-cyan-800 border border-cyan-200">
                        {opp.category.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        Deadline: {deadlineDate}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-cyan-700 transition-colors">
                      {opp.title}
                    </h3>

                    <div className="text-xs font-medium text-slate-600 mb-4 flex items-center gap-2">
                      <span className="font-semibold text-slate-800">{opp.organization}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {opp.location}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 mb-4 text-xs">
                      <div>
                        <span className="text-slate-500">Stipend / Perks: </span>
                        <strong className="text-emerald-700">{opp.stipendOrPerks}</strong>
                      </div>
                      <div className="line-clamp-2">
                        <span className="text-slate-500">Eligibility: </span>
                        <span className="text-slate-800">{opp.eligibility}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                      {opp.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Actively Hiring
                    </span>

                    <button
                      onClick={() => {
                        setActiveOppForModal(opp);
                        setSubmitError(null);
                        setGeneratedRefId(null);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all flex items-center gap-1"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Application Modal */}
      {activeOppForModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl relative my-8 animate-fade-in text-slate-900">
            <button
              onClick={() => setActiveOppForModal(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700">
                Application Form
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {activeOppForModal.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {activeOppForModal.organization} • {activeOppForModal.location}
              </p>
            </div>

            {generatedRefId ? (
              <div className="space-y-6 text-center py-6 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Application Submitted!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto mb-4">
                    Your application has been received and forwarded to the evaluation committee.
                  </p>
                  <div className="p-3 rounded-xl bg-slate-50 border border-indigo-200 max-w-xs mx-auto">
                    <span className="text-[10px] uppercase text-slate-500 block">Your Tracking Reference ID</span>
                    <strong className="text-base font-mono text-indigo-700">{generatedRefId}</strong>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setActiveOppForModal(null);
                      setActiveTab('track');
                      setTrackQuery(generatedRefId);
                    }}
                    className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                  >
                    Track Status Now
                  </button>
                  <button
                    onClick={() => setActiveOppForModal(null)}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                {submitError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={applyForm.fullName}
                      onChange={(e) => setApplyForm({ ...applyForm, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-cyan-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={applyForm.email}
                      onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-cyan-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={applyForm.phone}
                      onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-cyan-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                      College / University *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="College Name"
                      value={applyForm.college}
                      onChange={(e) => setApplyForm({ ...applyForm, college: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-cyan-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                      Resume Link (Google Drive / Notion)
                    </label>
                    <input
                      type="url"
                      placeholder="https://drive.google.com/..."
                      value={applyForm.resumeUrl}
                      onChange={(e) => setApplyForm({ ...applyForm, resumeUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-cyan-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                      GitHub / Portfolio / Social Link
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/..."
                      value={applyForm.portfolioUrl}
                      onChange={(e) => setApplyForm({ ...applyForm, portfolioUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-cyan-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    Why are you the right fit? (Brief Cover Note)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your relevant projects, experience or passion for this role..."
                    value={applyForm.coverNote}
                    onChange={(e) => setApplyForm({ ...applyForm, coverNote: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-cyan-600 focus:bg-white"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
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

export default OpportunitiesClientView;
