'use client';

import React, { useState } from 'react';
import {
  Music,
  Calendar,
  Code2,
  HeartHandshake,
  Briefcase,
  Sparkles,
  Phone,
  Mail,
  User,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  X,
  MessageSquare,
} from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  features: string;
  iconName: string;
  bannerUrl: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  leadPerson: string | null;
}

interface Props {
  services: ServiceItem[];
  defaultEnquireId?: string;
}

const iconMap: Record<string, any> = {
  Music: Music,
  Calendar: Calendar,
  Code: Code2,
  HeartHandshake: HeartHandshake,
  Briefcase: Briefcase,
  Sparkles: Sparkles,
};

export const ServicesClientView: React.FC<Props> = ({
  services,
  defaultEnquireId,
}) => {
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(() => {
    if (defaultEnquireId) {
      return services.find((s) => s.id === defaultEnquireId) || null;
    }
    return null;
  });

  const [enquiryForm, setEnquiryForm] = useState({
    clientName: '',
    organizationOrCollege: '',
    email: '',
    phone: '',
    eventOrProjectDate: '',
    budget: '',
    description: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedServiceForModal) return;
    setSubmitError(null);
    setSubmitSuccess(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/services/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: selectedServiceForModal.id,
          serviceName: selectedServiceForModal.name,
          ...enquiryForm,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      setSubmitSuccess(data.message);
      setEnquiryForm({
        clientName: '',
        organizationOrCollege: '',
        email: '',
        phone: '',
        eventOrProjectDate: '',
        budget: '',
        description: '',
      });
    } catch (err: any) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>STUDENT-POWERED SERVICES</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Services, Productions &{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            Student Support
          </span>
        </h1>

        <p className="text-slate-600 text-sm sm:text-base">
          Professional creative, technical, and counseling solutions run by passionate student leaders.
          Explore individual divisions below and submit a direct booking enquiry.
        </p>
      </div>

      {/* Individual Service Deep Dive Sections */}
      <div className="space-y-16">
        {services.map((svc, index) => {
          const Icon = iconMap[svc.iconName] || Sparkles;
          let featuresList: string[] = [];
          try {
            featuresList = JSON.parse(svc.features);
          } catch {
            featuresList = [];
          }

          const isEven = index % 2 === 0;

          return (
            <div
              id={svc.slug}
              key={svc.id}
              className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 hover:border-indigo-400 transition-all duration-300 shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Visual / Banner Side */}
                <div className={`lg:col-span-5 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                  <div className="relative rounded-2xl overflow-hidden h-72 sm:h-80 bg-slate-100 shadow-md border border-slate-200">
                    {svc.bannerUrl ? (
                      <img
                        src={svc.bannerUrl}
                        alt={svc.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-slate-100 flex items-center justify-center">
                        <Icon className="w-16 h-16 text-indigo-600" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-700 shadow-sm">
                        <User className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Lead: <strong className="text-slate-900">{svc.leadPerson || 'SS Core'}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Side */}
                <div className={`lg:col-span-7 space-y-6 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-indigo-700">
                        Official Division
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{svc.name}</h2>
                    <p className="text-sm font-bold text-indigo-600 mt-1">{svc.tagline}</p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">{svc.description}</p>

                  {/* Feature Highlights */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                      Core Offerings & Deliverables:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {featuresList.map((f, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct Contact & Action Bar */}
                  <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                      {svc.contactEmail && (
                        <span className="flex items-center gap-1.5 hover:text-indigo-600">
                          <Mail className="w-3.5 h-3.5 text-indigo-600" />
                          {svc.contactEmail}
                        </span>
                      )}
                      {svc.contactPhone && (
                        <span className="flex items-center gap-1.5 hover:text-emerald-700">
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          {svc.contactPhone}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedServiceForModal(svc);
                        setSubmitError(null);
                        setSubmitSuccess(null);
                      }}
                      className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:shadow-md transition-all flex items-center gap-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Book / Submit Enquiry</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Enquiry Modal */}
      {selectedServiceForModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl relative my-8 animate-fade-in text-slate-900">
            <button
              onClick={() => setSelectedServiceForModal(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                Direct Service Booking & Enquiry
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {selectedServiceForModal.name}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Lead Coordinator: {selectedServiceForModal.leadPerson || 'SS Core Team'}
              </p>
            </div>

            {submitSuccess ? (
              <div className="space-y-6 text-center py-6 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Enquiry Logged!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">{submitSuccess}</p>
                </div>
                <button
                  onClick={() => setSelectedServiceForModal(null)}
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                {submitError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Name / Point of Contact"
                      value={enquiryForm.clientName}
                      onChange={(e) =>
                        setEnquiryForm({ ...enquiryForm, clientName: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                      Organization / College / Society
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. DTU Fest Committee / Startup"
                      value={enquiryForm.organizationOrCollege}
                      onChange={(e) =>
                        setEnquiryForm({
                          ...enquiryForm,
                          organizationOrCollege: e.target.value,
                        })
                      }
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
                      placeholder="contact@college.edu or gmail"
                      value={enquiryForm.email}
                      onChange={(e) =>
                        setEnquiryForm({ ...enquiryForm, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
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
                      value={enquiryForm.phone}
                      onChange={(e) =>
                        setEnquiryForm({ ...enquiryForm, phone: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                      Target Date / Timeline (Optional)
                    </label>
                    <input
                      type="date"
                      value={enquiryForm.eventOrProjectDate}
                      onChange={(e) =>
                        setEnquiryForm({
                          ...enquiryForm,
                          eventOrProjectDate: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                      Estimated Budget (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹25,000 / Student Non-profit"
                      value={enquiryForm.budget}
                      onChange={(e) =>
                        setEnquiryForm({ ...enquiryForm, budget: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    Requirements & Scope Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Details about your concert, website project, event setup, or student guidance case..."
                    value={enquiryForm.description}
                    onChange={(e) =>
                      setEnquiryForm({ ...enquiryForm, description: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Booking Enquiry</span>
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

export default ServicesClientView;
