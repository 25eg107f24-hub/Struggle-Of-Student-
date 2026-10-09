import React from 'react';
import Link from 'next/link';
import {
  Music,
  Calendar,
  Code2,
  HeartHandshake,
  Briefcase,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Check,
} from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  features: string;
  iconName: string;
  contactEmail: string | null;
  contactPhone: string | null;
  leadPerson: string | null;
}

interface Props {
  services: ServiceItem[];
}

const iconMap: Record<string, any> = {
  Music: Music,
  Calendar: Calendar,
  Code: Code2,
  HeartHandshake: HeartHandshake,
  Briefcase: Briefcase,
  Sparkles: Sparkles,
};

export const ServicesPreview: React.FC<Props> = ({ services }) => {
  return (
    <section className="py-20 relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>OFFICIAL DIVISIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Our Ecosystem &{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Student Services
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            From stage performances and mega-fest production to custom web development and 1-on-1 student counseling.
            Run entirely by talented student creators.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = iconMap[svc.iconName] || Sparkles;
            let featuresList: string[] = [];
            try {
              featuresList = JSON.parse(svc.features);
            } catch {
              featuresList = [];
            }

            return (
              <div
                key={svc.id}
                className="group rounded-2xl bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between hover:border-indigo-400 hover:bg-white transition-all duration-300 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    {svc.leadPerson && (
                      <span className="text-[11px] font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
                        {svc.leadPerson.split('(')[0]}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    {svc.name}
                  </h3>
                  <p className="text-xs font-bold text-indigo-600 mb-3">
                    {svc.tagline}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {svc.description}
                  </p>

                  {/* Bullet features */}
                  <ul className="space-y-1.5 mb-6 text-xs text-slate-600">
                    {featuresList.slice(0, 3).map((item, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <Link
                    href={`/services#${svc.slug}`}
                    className="text-xs font-bold text-slate-700 hover:text-indigo-600 flex items-center gap-1"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/services?enquire=${svc.id}`}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-600 hover:text-white border border-indigo-200 transition-all shadow-2xs"
                  >
                    Enquire / Book
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
