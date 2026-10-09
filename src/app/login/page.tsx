'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SSLogo from '@/components/common/SSLogo';
import {
  LogIn,
  Mail,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Users,
  IdCard,
} from 'lucide-react';

export default function StudentLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  React.useEffect(() => {
    fetch('/api/student/me')
      .then((res) => {
        if (res.ok) {
          router.replace('/profile');
        }
      })
      .catch(() => {});
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!identifier.trim()) {
      setError('Please enter your Registered Email or SS Membership ID.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/student/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: identifier.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed. Please check your details.');
      }

      setSuccess(`Welcome back, ${data.member.fullName}! Redirecting to your dashboard...`);
      setTimeout(() => {
        router.push('/profile');
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (val: string) => {
    setIdentifier(val);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50/40 py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <SSLogo size="lg" />
        </div>
        <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Student Community Sign-In
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 max-w-sm mx-auto">
          Access your official digital SS Membership Card, track opportunity applications, and view your registered meetings.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/60 rounded-2xl border border-slate-200/80 sm:px-10">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-semibold text-slate-700 mb-1"
              >
                Registered Email or SS Membership ID
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <IdCard className="w-5 h-5" />
                </div>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. vikram.roy@dtu.ac.in or SS-2026-0001"
                  className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm font-medium"
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-500">
                You can enter the email you used when joining or your generated SS-2026-XXXX ID.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-500/25 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:via-indigo-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Enter Student Portal</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Pre-fills for Instant Testing */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Quick Test Sign-In Accounts:
            </p>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('vikram.roy@dtu.ac.in')}
                className="text-left px-3 py-2 text-xs bg-slate-50 hover:bg-indigo-50/70 border border-slate-200 hover:border-indigo-200 rounded-lg text-slate-700 transition-colors flex items-center justify-between group"
              >
                <div>
                  <span className="font-semibold text-indigo-600 block">Vikramaditya Roy (DTU)</span>
                  <span className="text-slate-500">vikram.roy@dtu.ac.in • SS-2026-0001</span>
                </div>
                <span className="text-[11px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Use &rarr;
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('meera.nambiar@vit.ac.in')}
                className="text-left px-3 py-2 text-xs bg-slate-50 hover:bg-indigo-50/70 border border-slate-200 hover:border-indigo-200 rounded-lg text-slate-700 transition-colors flex items-center justify-between group"
              >
                <div>
                  <span className="font-semibold text-indigo-600 block">Meera Nambiar (VIT)</span>
                  <span className="text-slate-500">meera.nambiar@vit.ac.in • SS-2026-0002</span>
                </div>
                <span className="text-[11px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Use &rarr;
                </span>
              </button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center space-y-3">
            <p className="text-xs text-slate-600">
              Not a member yet?{' '}
              <Link
                href="/join"
                className="font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
              >
                Join Struggle of Students today
              </Link>
            </p>

            <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
              <Link
                href="/admin/login"
                className="hover:text-slate-600 flex items-center gap-1 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Login Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
