import { LeadForm } from '@/components/lead-form';
import { CountdownTimer } from '@/components/countdown-timer';
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
                Free Class — Limited Spots
              </span>

              {/* Headline */}
              <div>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-900">
                  How to Get Your First
                </h1>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-900 mt-1">
                  <span className="text-blue-600">10 Paying Customers</span>
                </h1>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-900 mt-1">
                  Without Paid Ads.
                </h1>
              </div>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-gray-500 max-w-md leading-relaxed">
                A free, practical class for Nigerian business owners and freelancers who want more paying customers — without spending on ads or guessing what to do next.
              </p>

              {/* Checklist */}
              <ul className="space-y-3">
                {[
                  'Learn how to position yourself so customers come to you',
                  'Discover where your best customers are hiding',
                  'Get a simple follow-up system that closes deals',
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
                {/* AI bullet — styled separately */}
                <li className="flex items-center gap-3">
                  <span className="size-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <svg className="size-3 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm sm:text-base text-gray-700">
                    See the{' '}
                    <span className="font-bold text-base sm:text-lg text-gray-900">AI tools</span>
                    {' '}that make follow-up effortless — even if you're not techy
                  </span>
                </li>
              </ul>

              {/* Countdown */}
              <CountdownTimer />

              {/* Trust note */}
              <div className="flex items-start gap-2.5 pt-1">
                <Shield className="size-4 text-gray-400 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-400 leading-relaxed">
                  100% free. No catch. No credit card.<br />
                  Just show up ready to learn and take action.
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
                <p className="text-sm font-bold text-gray-900">Leads Captured</p>
                <p className="text-xs text-gray-400 mt-1 leading-snug">
                  Unlimited leads, captured<br className="hidden sm:block" /> and stored securely
                </p>
              </div>
            </div>

            {/* CRM Pipeline */}
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

            {/* AI Content Funnels */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
              <div className="size-12 rounded-xl bg-blue-500 flex items-center justify-center shrink-0">
                <Zap className="size-5 text-white" />
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
                  label: 'Service Businesses',
                  sub: 'Freelancers, consultants, coaches, and agency owners',
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
