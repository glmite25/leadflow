'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Leads', href: '/dashboard', icon: Users },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <div className="flex h-screen bg-[#F8F9FB] overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:relative z-50 flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-200 ease-in-out',
          // Mobile: slide in/out
          'lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          // Desktop: collapsed or expanded
          collapsed ? 'w-[60px]' : 'w-[220px]'
        )}
      >
        {/* Logo */}
        <div className={cn(
          'flex items-center h-14 border-b border-gray-100 shrink-0 px-4',
          collapsed ? 'justify-center' : 'justify-between'
        )}>
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-violet-600 flex items-center justify-center">
                <Zap className="size-4 text-white" />
              </div>
              <span className="font-semibold text-sm text-gray-900">LeadFlow</span>
            </div>
          )}
          {collapsed && (
            <div className="size-7 rounded-lg bg-violet-600 flex items-center justify-center">
              <Zap className="size-4 text-white" />
            </div>
          )}
          {/* Mobile close */}
          <button
            className="lg:hidden p-1 rounded text-gray-400 hover:text-gray-600"
            onClick={() => setMobileOpen(false)}
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className={cn(
                  'flex items-center gap-3 mx-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  active
                    ? 'bg-violet-50 text-violet-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  collapsed && 'justify-center px-2'
                )}
                title={collapsed ? label : undefined}
              >
                <Icon className="size-4 shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle — desktop only */}
        <div className="hidden lg:flex border-t border-gray-100 p-2 justify-end">
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center h-14 px-4 sm:px-6 bg-white border-b border-gray-200 shrink-0 gap-4">
          {/* Hamburger — mobile only */}
          <button
            className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </button>

          <div className="flex-1">
            <h1 className="text-sm font-semibold text-gray-900">Leads</h1>
            <p className="text-xs text-gray-400 leading-none mt-0.5">Manage and track your prospects</p>
          </div>

          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-gray-800 transition-colors hidden sm:block"
          >
            ← Back to home
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
