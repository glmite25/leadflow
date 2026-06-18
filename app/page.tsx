import { LeadForm } from '@/components/lead-form';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">LeadFlow</h1>
            <p className="text-xs text-muted-foreground">CRM for Small Businesses</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                Capture Every Lead
              </h2>
              <p className="text-lg text-muted-foreground">
                Simple, fast lead management designed for small businesses. Start tracking your prospects today.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              {[
                'Quick lead capture in seconds',
                'Organize leads by status',
                'Never lose a prospect again',
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="flex-shrink-0 size-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg className="size-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground italic">
              Built with Next.js, Supabase, and Tailwind CSS for reliability and speed.
            </p>
          </div>

          {/* Form */}
          <div className="flex justify-center md:justify-end">
            <LeadForm />
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-3 gap-4 sm:gap-8">
          {[
            { label: 'Leads Captured', value: '∞' },
            { label: 'Status Levels', value: '5' },
            { label: 'Search & Filter', value: '✓' },
          ].map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="pt-6">
                <p className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
