'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Instagram,
  Linkedin,
  Youtube,
  HelpCircle,
  ChevronDown,
  ShieldAlert,
} from 'lucide-react';

const TOPICS = [
  { key: 'GENERAL', label: 'General Student Enquiry' },
  { key: 'GUIDANCE_SUPPORT', label: 'Student Problem / Academic Guidance' },
  { key: 'BAND_BOOKING', label: 'SS Band Booking / Performance' },
  { key: 'SPONSORSHIP', label: 'College Fest / Sponsorship Tie-up' },
  { key: 'PARTNERSHIP', label: 'College Chapter Partnership' },
  { key: 'FEEDBACK', label: 'Platform Feedback & Bug Report' },
];

const FAQS = [
  {
    q: 'Is Struggle of Students (SS) membership really 100% free?',
    a: 'Yes, absolutely. SS was founded by students with a strict non-profit ethos. Community membership, access to placement referral channels, coding bootcamps, and peer guidance support are completely free of cost for enrolled college students.',
  },
  {
    q: 'How can I invite the SS Band to perform at our college fest?',
    a: 'You can select "SS Band Booking" in the contact form or use our dedicated Services page. Kabir Verma and our band management team will connect with your fest cultural committee to finalize dates, tech rider, and stage setlists.',
  },
  {
    q: 'How does the volunteer capacity limit work for events?',
    a: 'Every SS event has a strictly defined volunteer quota set by event operations directors to ensure meaningful roles and high quality mentoring for every volunteer. Once filled, applications close automatically and show "Volunteer Slots Full".',
  },
  {
    q: 'How are placements verified on the platform?',
    a: 'All placement records in our Hall of Fame are verified by the SS Verification Cell with legitimate offer letters, official company email verifications, or LinkedIn credentials before publication.',
  },
  {
    q: 'I am struggling with academic backlogs or campus harassment. Can SS help?',
    a: 'Yes. Our Student Problems & Guidance Cell is staffed by trained student peers and faculty advisors. You can reach out confidentially using our guidance form, and a peer will support you with complete privacy.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    topic: 'GENERAL',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setSubmitSuccess(data.message);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        topic: 'GENERAL',
        subject: '',
        message: '',
      });
    } catch (err: any) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
          <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
          <span>DIRECT HELPLINE & INQUIRIES</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Get in Touch with{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            SS Central
          </span>
        </h1>

        <p className="text-slate-600 text-sm sm:text-base">
          Have questions, want to book SS Band, need campus chapter support, or seeking confidential guidance?
          We are here for you 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Information & Channels */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Official Communications</h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold">General Email</div>
                  <a href="mailto:contact@struggleofstudents.org" className="text-slate-900 hover:text-indigo-600 font-bold">
                    contact@struggleofstudents.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold">Student Helpline & WhatsApp</div>
                  <a href="tel:+919811122334" className="text-slate-900 hover:text-emerald-700 font-bold">
                    +91 98111 22334
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-600 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-semibold">Headquarters</div>
                  <div className="text-slate-700 font-medium">
                    Delhi / NCR, India (Coordinating across 45+ universities)
                  </div>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-4 border-t border-slate-200">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Official Social Media
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-pink-600 hover:border-pink-300 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-red-600 hover:border-red-300 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://chat.whatsapp.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Urgent Guidance & Anti-Ragging Alert */}
          <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 flex items-start gap-3.5 shadow-sm">
            <ShieldAlert className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-rose-900">Student Urgent Support & Grievances</h4>
              <p className="text-xs text-rose-800 leading-relaxed">
                Facing severe academic victimization, hostel issues, or harassment? Select "Student Problem"
                in the contact form. Our emergency student response cell treats all cases with 100% strict anonymity.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 shadow-xl">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Send a Direct Message</h3>
            <p className="text-xs text-slate-500 mb-6">
              All messages are routed immediately to the appropriate student department head.
            </p>

            {submitSuccess ? (
              <div className="space-y-6 text-center py-8 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Message Dispatched!</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">{submitSuccess}</p>
                </div>
                <button
                  onClick={() => setSubmitSuccess(null)}
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitError && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
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
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                      Enquiry Category *
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                    >
                      {TOPICS.map((t) => (
                        <option key={t.key} value={t.key}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Brief summary of your inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    Your Message / Detailed Request *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can Struggle of Students assist you or collaborate with your campus?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:shadow-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Official Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <section className="pt-12 border-t border-slate-200 space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>COMMONLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
