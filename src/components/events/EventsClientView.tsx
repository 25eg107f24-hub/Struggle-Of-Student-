'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  AlertCircle,
  CheckCircle2,
  Filter,
  Search,
  X,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  bannerUrl: string | null;
  eventDate: string | Date;
  time: string;
  venue: string;
  mode: string;
  registrationLink: string | null;
  volunteerCapacity: number;
  volunteerSlotsFilled: number;
  deadline: string | Date | null;
  requirements: string | null;
}

interface Props {
  initialEvents: EventItem[];
  defaultApplyEventId?: string;
}

const CATEGORIES = ['ALL', 'TECH', 'CULTURAL', 'WORKSHOP', 'SOCIAL'];

export const EventsClientView: React.FC<Props> = ({
  initialEvents,
  defaultApplyEventId,
}) => {
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Volunteering Modal State
  const [selectedEventForVolunteer, setSelectedEventForVolunteer] = useState<EventItem | null>(() => {
    if (defaultApplyEventId) {
      return initialEvents.find((e) => e.id === defaultApplyEventId) || null;
    }
    return null;
  });

  const [volunteerForm, setVolunteerForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    branchYear: '',
    skills: '',
    priorExperience: '',
    motivation: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Filter events
  const filteredEvents = events.filter((ev) => {
    const matchesCategory =
      selectedCategory === 'ALL' || ev.category.toUpperCase() === selectedCategory;
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventForVolunteer) return;
    setSubmitError(null);
    setSubmitSuccess(null);

    setSubmitting(true);
    try {
      const res = await fetch('/api/events/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: selectedEventForVolunteer.id,
          ...volunteerForm,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit volunteer application.');
      }

      setSubmitSuccess(data.message);

      // Optimistically update slots filled in state
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === selectedEventForVolunteer.id
            ? { ...ev, volunteerSlotsFilled: data.slotsFilled }
            : ev
        )
      );

      // Reset form
      setVolunteerForm({
        fullName: '',
        email: '',
        phone: '',
        college: '',
        branchYear: '',
        skills: '',
        priorExperience: '',
        motivation: '',
      });
    } catch (err: any) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title & Description */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
          <Calendar className="w-3.5 h-3.5 text-indigo-600" />
          <span>EVENTS & VOLUNTEER CORPS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Campus Events, Fests &{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            Student Volunteering
          </span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Attend national hackathons, cultural concerts, and tech workshops — or apply as a volunteer to gain certified event management leadership experience. Volunteer slots are strictly capacity-controlled.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events, venue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
          />
        </div>
      </div>

      {/* Event Cards Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => {
          const isFull = event.volunteerSlotsFilled >= event.volunteerCapacity;
          const slotsLeft = Math.max(0, event.volunteerCapacity - event.volunteerSlotsFilled);
          const percentFilled = Math.min(
            100,
            Math.round((event.volunteerSlotsFilled / event.volunteerCapacity) * 100)
          );
          const eventDate = new Date(event.eventDate).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });

          return (
            <div
              id={`event-${event.slug}`}
              key={event.id}
              className="group rounded-3xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-indigo-400 hover:shadow-xl transition-all duration-300 shadow-sm"
            >
              {/* Event Image Banner */}
              <div className="relative h-52 bg-slate-100 overflow-hidden">
                {event.bannerUrl ? (
                  <img
                    src={event.bannerUrl}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-indigo-100 to-slate-100 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-indigo-500" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/95 text-cyan-800 border border-slate-200 shadow-sm">
                    {event.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-white/95 text-indigo-800 border border-slate-200 shadow-sm">
                    {event.mode}
                  </span>
                </div>

                {/* Volunteer Slot Badge */}
                <div className="absolute bottom-3 right-3">
                  {isFull ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white shadow-md">
                      <AlertCircle className="w-3.5 h-3.5 text-white" />
                      Volunteer Slots Full
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md">
                      <Users className="w-3.5 h-3.5 text-white" />
                      {slotsLeft} Slots Left ({event.volunteerSlotsFilled}/{event.volunteerCapacity})
                    </span>
                  )}
                </div>
              </div>

              {/* Event Body */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                      {eventDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" />
                      {event.time}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span>{event.venue}</span>
                  </div>

                  {/* Volunteer Capacity Progress Meter */}
                  <div className="mb-5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                      <span className="text-slate-600 font-medium">Volunteer Quota</span>
                      <span className={`font-bold ${isFull ? 'text-rose-600' : 'text-emerald-700'}`}>
                        {event.volunteerSlotsFilled} / {event.volunteerCapacity} Slots
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isFull
                            ? 'bg-rose-500'
                            : percentFilled > 75
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${percentFilled}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Event Actions */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                  {event.registrationLink ? (
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <span>Attendee Pass</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">Free Entry</span>
                  )}

                  <button
                    onClick={() => {
                      setSelectedEventForVolunteer(event);
                      setSubmitError(null);
                      setSubmitSuccess(null);
                    }}
                    disabled={isFull}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isFull
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                    }`}
                  >
                    {isFull ? 'Volunteer Slots Full' : 'Apply as Volunteer'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Volunteer Application Modal */}
      {selectedEventForVolunteer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl relative my-8 animate-fade-in text-slate-900">
            <button
              onClick={() => setSelectedEventForVolunteer(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                Official Volunteer Application
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {selectedEventForVolunteer.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Slots Available: {selectedEventForVolunteer.volunteerCapacity - selectedEventForVolunteer.volunteerSlotsFilled} remaining
              </p>
            </div>

            {submitSuccess ? (
              <div className="space-y-6 text-center py-6 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Application Received!</h3>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto">{submitSuccess}</p>
                </div>
                <button
                  onClick={() => setSelectedEventForVolunteer(null)}
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} className="space-y-4">
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
                      value={volunteerForm.fullName}
                      onChange={(e) =>
                        setVolunteerForm({ ...volunteerForm, fullName: e.target.value })
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
                      placeholder="your@email.com"
                      value={volunteerForm.email}
                      onChange={(e) =>
                        setVolunteerForm({ ...volunteerForm, email: e.target.value })
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
                      value={volunteerForm.phone}
                      onChange={(e) =>
                        setVolunteerForm({ ...volunteerForm, phone: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
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
                      value={volunteerForm.college}
                      onChange={(e) =>
                        setVolunteerForm({ ...volunteerForm, college: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    Degree & Year of Study
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. B.Tech 3rd Year"
                    value={volunteerForm.branchYear}
                    onChange={(e) =>
                      setVolunteerForm({ ...volunteerForm, branchYear: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    Relevant Skills or Preferred Department *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stage Logistics, Sound Setup, Registration Desk, Graphic Design"
                    value={volunteerForm.skills}
                    onChange={(e) =>
                      setVolunteerForm({ ...volunteerForm, skills: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                    Why do you want to volunteer for this event?
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Your motivation..."
                    value={volunteerForm.motivation}
                    onChange={(e) =>
                      setVolunteerForm({ ...volunteerForm, motivation: e.target.value })
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
                        <span>Verifying & Reserving Slot...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Volunteer Application</span>
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

export default EventsClientView;
