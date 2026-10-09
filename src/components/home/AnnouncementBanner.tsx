import React from 'react';
import Link from 'next/link';
import { Megaphone, ArrowRight } from 'lucide-react';

interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  badgeText: string;
  linkUrl: string | null;
}

interface Props {
  announcements: AnnouncementItem[];
}

export const AnnouncementBanner: React.FC<Props> = ({ announcements }) => {
  if (!announcements || announcements.length === 0) return null;

  const current = announcements[0];

  return (
    <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-indigo-100 py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 truncate">
          <span className="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-black tracking-wide uppercase bg-indigo-600 text-white shadow-2xs">
            {current.badgeText}
          </span>
          <span className="font-bold text-slate-900 truncate">{current.title}:</span>
          <span className="text-slate-600 truncate hidden md:inline">{current.content}</span>
        </div>

        {current.linkUrl && (
          <Link
            href={current.linkUrl}
            className="flex-shrink-0 inline-flex items-center gap-1 font-bold text-indigo-700 hover:text-indigo-900 transition-colors"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default AnnouncementBanner;
