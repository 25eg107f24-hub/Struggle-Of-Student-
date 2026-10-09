'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SSLogo from '../common/SSLogo';
import {
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  User,
  LogIn,
} from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Opportunities', href: '/opportunities' },
  { name: 'Events', href: '/events' },
  { name: 'Services', href: '/services' },
  { name: 'Placements', href: '/placements' },
  { name: 'Our Team', href: '/team' },
  { name: 'Meetings', href: '/meetings' },
  { name: 'Contact', href: '/contact' },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <SSLogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href) && !link.href.startsWith('/#');

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50 border border-indigo-200 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/login"
              className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 border border-slate-200"
              title="Student Login Portal"
            >
              <User className="w-3.5 h-3.5 text-indigo-600" />
              <span>Student Login</span>
            </Link>

            <Link
              href="/admin/login"
              className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5"
              title="Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
              <span>Admin</span>
            </Link>

            <Link
              href="/join"
              className="relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-4 h-4 text-cyan-100" />
              <span>Join Community</span>
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200"
            >
              Login
            </Link>
            <Link
              href="/join"
              className="px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm"
            >
              Join SS
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 animate-fade-in shadow-xl">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <Link
                href="/login"
                className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-slate-800 bg-slate-100 border border-slate-200"
              >
                Student Sign In
              </Link>
              <Link
                href="/join"
                className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 shadow-md"
              >
                Join Community
              </Link>
              <Link
                href="/admin/login"
                className="flex items-center justify-center gap-2 py-2 text-xs font-medium text-slate-500 hover:text-slate-800"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
