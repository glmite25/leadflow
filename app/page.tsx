import { LeadForm } from '@/components/lead-form';
import {
  Filter,
  Shield,
  Zap,
  Heart,
  Users,
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
              <p className="text-[10px] text-gray-400 mt-0.5">CRM for Businesses</p>
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
                Helping Nigerian Businesses Grow
              </span>

              {/* Headline */}
              <div>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-900">
                  I Help Nigerian Businesses
                </h1>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-900 mt-1">
                  Get More{' '}
                  <span className="text-blue-600">Paying Customers.</span>
                </h1>
              </div>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-gray-500 max-w-md leading-relaxed">
                Most businesses don&apos;t have a lead system. I build systems that turn
                attention into paying customers — using WhatsApp automation, CRM
                pipelines, and AI-powered content funnels.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                {[
                  { value: '20+', label: 'Lead Systems Built' },
                  { value: '15+', label: 'Automations Deployed' },
                  { value: '10+', label: 'Funnels Created' },
                  { value: '30+', label: 'Businesses Supported' },
                ].map(({ value, label }) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-2xl font-extrabold text-blue-600 leading-none">{value}</span>
                    <span className="text-xs text-gray-500 mt-1 leading-snug">{label}</span>
                  </div>
                ))}
              </div>

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

            {/* WhatsApp Automation */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
              <div className="size-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <svg className="size-5 fill-green-500" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">WhatsApp Automation</p>
                <p className="text-xs text-gray-400 mt-1 leading-snug">
                  Follow up with leads<br className="hidden sm:block" /> automatically on WhatsApp
                </p>
              </div>
            </div>

            {/* CRM Pipeline */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
              <div className="size-12 rounded-xl bg-violet-500 flex items-center justify-center shrink-0">
                <Filter className="size-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">CRM Pipeline</p>
                <p className="text-xs text-gray-400 mt-1 leading-snug">
                  Track leads from New to Customer<br className="hidden sm:block" /> with a simple pipeline
                </p>
              </div>
            </div>

            {/* AI Content Funnels */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
              <div className="size-12 rounded-xl bg-blue-500 flex items-center justify-center shrink-0">
                <Zap className="size-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">AI Content Funnels</p>
                <p className="text-xs text-gray-400 mt-1 leading-snug">
                  Turn attention into customers<br className="hidden sm:block" /> with AI-powered funnels
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust Bar ─────────────────────────────────────────────────── */}
        <section className="border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <p className="text-center text-sm font-medium text-gray-500 mb-8">
              Trusted by Nigerian businesses and entrepreneurs
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
                  label: 'AI-Powered Systems',
                  sub: 'Built with the latest automation tools',
                },
                {
                  icon: Heart,
                  label: 'Made for Nigeria',
                  sub: 'Built specifically for Nigerian businesses',
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
