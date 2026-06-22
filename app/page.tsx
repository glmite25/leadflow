import { LeadForm } from '@/components/lead-form';
import { CountdownTimer } from '@/components/countdown-timer';
import { HeroAnimated } from '@/components/hero-animated';
import Link from 'next/link';
import {
  Filter,
  Shield,
  Zap,
  Heart,
  Users,
  Download,
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
              <p className="text-base font-bold text-gray-900">Ojidé</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Lead Capture & Customer Acquisition System</p>
            </div>
          </div>

        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left — copy */}
            <HeroAnimated>
            <div className="space-y-6 pt-2">

              {/* Badge */}
              <span data-animate className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-600">
                <span className="size-1.5 rounded-full bg-blue-500 inline-block" />
                Free Class — Limited Spots
              </span>

              {/* Headline */}
              <div data-animate>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-900">
                  Free Class: How Nigerian
                </h1>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-900 mt-1">
                  Digital Sellers Get{' '}
                  <span className="text-blue-600">Paying</span>
                </h1>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-900 mt-1">
                  <span className="text-blue-600">Customers</span> (Even With
                </h1>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-900 mt-1">
                  Zero Followers)
                </h1>
              </div>

              {/* Subtext */}
              <p data-animate className="text-base sm:text-lg text-gray-500 max-w-md leading-relaxed">
                A free, practical class for tech freelancers, digital marketers, content creators, and online entrepreneurs who want predictable customers — whether you have 0 followers or 50,000.
              </p>

              {/* Instructor credibility */}
              <div data-animate className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-white">OI</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Taught by{' '}
                  <span className="font-semibold text-gray-900">Olajide Igbalaye</span>, a Customer Acquisition Specialist who has built 20+ lead systems and supported 30+ Nigerian businesses — including realtors, schools, and clinics — get more paying customers without guesswork.
                </p>
              </div>

              {/* Checklist */}
              <ul data-animate className="space-y-3">
                {[
                  'Build a lead capture system that works even with zero followers',
                  'Set up a DM system that never misses a potential customer',
                  'Create a follow-up sequence that converts without being pushy',
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
                    Use{' '}
                    <span className="font-bold text-base sm:text-lg text-gray-900">AI tools</span>
                    {' '}to automate follow-ups — even if you're not techy
                  </span>
                </li>
              </ul>

              {/* Countdown */}
              <div data-animate>
                <CountdownTimer />
              </div>

              {/* Trust note */}
              <div data-animate className="flex items-start gap-2.5 pt-1">
                <Shield className="size-4 text-gray-400 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-400 leading-relaxed">
                  100% free. No catch. No credit card.<br />
                  Just show up ready to learn and take action.
                </p>
              </div>
            </div>
            </HeroAnimated>

            {/* Right — form */}
            <HeroAnimated>
              <div data-animate className="w-full lg:max-w-[480px] lg:ml-auto">
                <LeadForm />
              </div>
            </HeroAnimated>
          </div>
        </section>

        {/* ── Checklist Lead Hook ───────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 pb-10">
          <div className="bg-gray-900 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            {/* Icon */}
            <div className="size-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <Download className="size-7 text-white" />
            </div>

            {/* Copy */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-1">
                Can't make the class?
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                Download the FREE{' '}
                <span className="text-blue-400">"First 5 Customers"</span>{' '}
                Checklist
              </h3>
              <p className="text-sm text-gray-400 mt-2">
                Sign up above and start getting customers TODAY — even if you can't attend live.
              </p>
            </div>

            {/* CTA */}
            <div className="shrink-0 w-full sm:w-auto">
              <p className="text-xs text-gray-500 text-center sm:text-right mb-2">
                Free after sign up ↑
              </p>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-medium">
                <Download className="size-4 shrink-0 text-blue-400" />
                Download Now →
              </div>
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

            {/* AI Content Funnels 
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
            </div>*/}
          </div>
        </section>

        {/* Trust Bar ─────────────────────────────────────────────────── */}
        <section className="border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <p className="text-center text-sm font-medium text-gray-500 mb-4">
              Trusted by 30+ Nigerian Businesses
            </p>
            <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
              {['Freelancers', 'Agencies', 'Creators', 'E-commerce', 'Realtors', 'Schools', 'Clinics'].map((cat, i, arr) => (
                <span key={cat} className="text-sm text-gray-500 flex items-center gap-2">
                  {cat}{i < arr.length - 1 ? <span className="text-gray-300">·</span> : ''}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[
                {
                  icon: Shield,
                  label: 'Secure & Reliable',
                  sub: 'Your data is encrypted and safe',
                },
                {
                  icon: Zap,
                  label: 'Freelancers · Agencies · Creators',
                  sub: 'Built for Nigerian digital entrepreneurs',
                },
                {
                  icon: Heart,
                  label: 'E-commerce · Realtors · Schools · Clinics',
                  sub: 'Every type of Nigerian business',
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

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} Ojidé. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Privacy Policy
            </Link>
            <a href="mailto:gigsdev007@gmail.com" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
