import { LeadForm } from '@/components/lead-form';
import Link from 'next/link';
import {
  Clock,
  Filter,
  Shield,
  Zap,
  Heart,
  Users,
  ArrowRight,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#EEF2FF] flex flex-col">

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="size-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <Users className="size-5 text-white" />
            </div>
            <div className="leading-none">
              <p className="text-base font-bold text-gray-900">LeadFlow</p>
              <p className="text-[10px] text-gray-400 mt-0.5">CRM for Small Businesses</p>
            </div>
          </div>

          {/* Center nav — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-7">
            {['Features', 'How It Works', 'Benefits', 'Pricing', 'About'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA — icon only */}
          <Link
            href="/login"
            className="flex items-center justify-center size-9 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors shrink-0"
            title="Go to Dashboard"
          >
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left — copy */}
            <div className="space-y-6 pt-2">

              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-600">
                <span className="size-1.5 rounded-full bg-blue-500 inline-block" />
                Built for Small Businesses
              </span>

              {/* Headline */}
              <div>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-900">
                  Capture Every Lead.
                </h1>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-900 mt-1">
                  Grow Your{' '}
                  <span className="text-blue-600">Business.</span>
                </h1>
              </div>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-gray-500 max-w-md leading-relaxed">
                LeadFlow helps you capture, organize, and manage leads in one
                place — so you can focus on what matters most: closing deals.
              </p>

              {/* Checklist */}
              <ul className="space-y-3">
                {[
                  'Quick lead capture in seconds',
                  'Organize leads by status',
                  'Never lose a prospect again',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="size-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                      <svg className="size-3 text-white" fill="none" viewBox="0 0 12 12">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-sm sm:text-base text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Trust note */}
              <div className="flex items-start gap-2.5 pt-1">
                <Shield className="size-4 text-gray-400 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-400 leading-relaxed">
                  No complicated setup. No learning curve.<br />
                  Just leads, organized and ready to close.
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div className="w-full lg:max-w-[480px] lg:ml-auto">
              <LeadForm />
            </div>
          </div>
        </section>

        {/* ── Feature Cards ─────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Leads Captured */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
              <div className="size-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <Clock className="size-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Leads Captured</p>
                <p className="text-xs text-gray-400 mt-1 leading-snug">
                  Unlimited leads, captured<br className="hidden sm:block" /> and stored securely
                </p>
              </div>
            </div>

            {/* Status Levels */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
              <div className="size-12 rounded-xl bg-violet-500 flex items-center justify-center shrink-0">
                <span className="text-xl font-bold text-white">5</span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Status Levels</p>
                <p className="text-xs text-gray-400 mt-1 leading-snug">
                  Track leads from New to Customer<br className="hidden sm:block" /> with our simple pipeline
                </p>
              </div>
            </div>

            {/* Search & Filter */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
              <div className="size-12 rounded-xl bg-emerald-400 flex items-center justify-center shrink-0">
                <Filter className="size-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Search &amp; Filter</p>
                <p className="text-xs text-gray-400 mt-1 leading-snug">
                  Find any lead instantly with<br className="hidden sm:block" /> powerful search and filters
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust Bar ─────────────────────────────────────────────────── */}
        <section className="border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <p className="text-center text-sm font-medium text-gray-500 mb-8">
              Trusted by small businesses and entrepreneurs
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[
                {
                  icon: Shield,
                  label: 'Secure & Reliable',
                  sub: 'Your data is encrypted and safe',
                },
                {
                  icon: Zap,
                  label: 'Fast & Simple',
                  sub: 'Get started in under 60 seconds',
                },
                {
                  icon: Heart,
                  label: 'Made for You',
                  sub: 'Built specifically for small businesses',
                },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <Icon className="size-5 text-gray-400" />
                  <p className="text-sm font-semibold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
