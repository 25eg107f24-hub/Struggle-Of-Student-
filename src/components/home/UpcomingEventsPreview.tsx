'use client';

import React from 'react';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  category: string;
  bannerUrl: string | null;
  eventDate: string | Date;
  time: string;
  venue: string;
  mode: string;
  volunteerCapacity: number;
  volunteerSlotsFilled: number;
}

interface Props {
  events: EventItem[];
}

export const UpcomingEventsPreview: React.FC<Props> = ({ events }) => {
  return (
    <section className="py-20 relative bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-3">
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              <span>COMMUNITY GATHERINGS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Upcoming Events &{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Volunteering
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              From high-voltage hackathons to acoustic music jams. Step up as an attendee or lead on the ground as a student volunteer.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:border-indigo-400 hover:text-indigo-600 transition-all self-start md:self-auto shadow-sm"
          >
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event) => {
            const isFull = event.volunteerSlotsFilled >= event.volunteerCapacity;
            const spotsLeft = Math.max(0, event.volunteerCapacity - event.volunteerSlotsFilled);
            const dateStr = new Date(event.eventDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <div
                key={event.id}
                className="group rounded-2xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-indigo-400 hover:shadow-lg transition-all duration-300 shadow-sm"
              >
                {/* Banner / Category Header */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  {event.bannerUrl ? (
                    <img
                      src={event.bannerUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-100 via-slate-100 to-blue-100 flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-indigo-500" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Badges on Banner */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-white/95 text-cyan-800 border border-slate-200 shadow-sm">
                      {event.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/95 text-indigo-800 border border-slate-200 shadow-sm">
                      {event.mode}
                    </span>
                  </div>

                  {/* Volunteer Capacity Indicator Overlay */}
                  <div className="absolute bottom-3 right-3">
                    {isFull ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white shadow-md">
                        <AlertCircle className="w-3.5 h-3.5 text-white" />
                        Volunteer Slots Full
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md">
                        <Users className="w-3.5 h-3.5 text-white" />
                        {spotsLeft} Volunteer {spotsLeft === 1 ? 'Slot' : 'Slots'} Open
                      </span>
                    )}
                  </div>
                </div>

                {/* Event Body */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Date & Venue meta */}
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                        {dateStr}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-600" />
                        {event.time}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                      {event.shortDescription}
                    </p>

                    <div className="flex items-center gap-1 text-xs text-slate-500 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                    <Link
                      href={`/events#event-${event.slug}`}
                      className="text-xs font-bold text-slate-700 hover:text-indigo-600 flex items-center gap-1"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/events?applyVolunteer=${event.id}`}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        isFull
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20'
                      }`}
                    >
                      {isFull ? 'Volunteering Closed' : 'Apply as Volunteer'}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsPreview;
