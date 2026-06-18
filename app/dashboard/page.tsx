'use client';

import { useEffect, useState, useCallback } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { LeadsTable } from '@/components/leads-table';
import { LeadCard } from '@/components/lead-card';
import { LeadDetailPanel } from '@/components/lead-detail-panel';
import { Input } from '@/components/ui/input';
import { Lead, LeadStatus, LEAD_STATUSES } from '@/lib/types';
import {
  Users,
  UserPlus,
  BadgeCheck,
  Star,
  Search,
  SlidersHorizontal,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── KPI config ────────────────────────────────────────────────────────────────
function buildKpis(leads: Lead[]) {
  return [
    {
      label: 'Total Leads',
      value: leads.length,
      icon: Users,
      color: 'bg-violet-50 text-violet-600',
    },
    {
      label: 'New',
      value: leads.filter((l) => l.status === 'New').length,
      icon: UserPlus,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Qualified',
      value: leads.filter((l) => l.status === 'Qualified').length,
      icon: BadgeCheck,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'Customers',
      value: leads.filter((l) => l.status === 'Customer').length,
      icon: Star,
      color: 'bg-green-50 text-green-600',
    },
  ];
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [updating, setUpdating] = useState<Set<string>>(new Set());
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ─── Fetch ──────────────────────────────────────────────────────────────────
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/leads?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch leads');

      const data = await response.json();
      setLeads(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(fetchLeads, 300);
    return () => clearTimeout(timer);
  }, [search, statusFilter, fetchLeads]);

  // ─── Status update ──────────────────────────────────────────────────────────
  const handleStatusChange = useCallback(
    async (leadId: string, newStatus: LeadStatus) => {
      setUpdating((prev) => new Set(prev).add(leadId));
      try {
        const response = await fetch(`/api/leads/${leadId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        });

        if (!response.ok) throw new Error('Failed to update lead');

        const data = await response.json();
        const updated: Lead = data.data;

        setLeads((prev) =>
          prev.map((lead) => (lead.id === leadId ? updated : lead))
        );
        // Keep panel in sync
        setSelectedLead((prev) => (prev?.id === leadId ? updated : prev));
      } catch (err) {
        console.error('Error updating lead:', err);
      } finally {
        setUpdating((prev) => {
          const next = new Set(prev);
          next.delete(leadId);
          return next;
        });
      }
    },
    []
  );

  const kpis = buildKpis(leads);
  const hasActiveFilter = search || statusFilter;

  return (
    <DashboardLayout>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4"
          >
            <div className={cn('size-10 rounded-lg flex items-center justify-center shrink-0', color)}>
              <Icon className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-gray-900 leading-none">{loading ? '—' : value}</p>
              <p className="text-xs text-gray-500 mt-1 truncate">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 border-b border-gray-100">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
            <Input
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm bg-gray-50 border-gray-200 focus-visible:bg-white w-full"
            />
          </div>

          {/* Status filter pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-gray-400 flex items-center gap-1 mr-1">
              <SlidersHorizontal className="size-3" />
            </span>
            <FilterPill
              label="All"
              active={statusFilter === ''}
              onClick={() => setStatusFilter('')}
            />
            {LEAD_STATUSES.map((s) => (
              <FilterPill
                key={s}
                label={s}
                active={statusFilter === s}
                onClick={() => setStatusFilter(statusFilter === s ? '' : s)}
              />
            ))}
            {hasActiveFilter && (
              <button
                onClick={() => { setSearch(''); setStatusFilter(''); }}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors ml-1"
              >
                <XCircle className="size-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        {error ? (
          <div className="px-4 py-12 text-center">
            <p className="text-sm text-red-600 font-medium">{error}</p>
            <button
              onClick={fetchLeads}
              className="mt-2 text-xs text-gray-500 hover:text-gray-700 underline underline-offset-2"
            >
              Try again
            </button>
          </div>
        ) : loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden sm:block">
              <LeadsTable
                leads={leads}
                onRowClick={setSelectedLead}
                isUpdating={(id) => updating.has(id)}
              />
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden p-3 space-y-2">
              {leads.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-sm text-gray-500">No leads found.</p>
                </div>
              ) : (
                leads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} onClick={setSelectedLead} />
                ))
              )}
            </div>
          </>
        )}

        {/* Footer count */}
        {!loading && !error && (
          <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-400">
              {leads.length} {leads.length === 1 ? 'lead' : 'leads'}
              {hasActiveFilter ? ' matching filters' : ' total'}
            </p>
          </div>
        )}
      </div>

      {/* Slide-over panel */}
      <LeadDetailPanel
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onStatusChange={handleStatusChange}
        isUpdating={selectedLead ? updating.has(selectedLead.id) : false}
      />
    </DashboardLayout>
  );
}

// ─── Filter pill ───────────────────────────────────────────────────────────────
function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-2.5 py-1 rounded-full text-xs font-medium transition-colors border',
        active
          ? 'bg-violet-600 text-white border-violet-600'
          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
      )}
    >
      {label}
    </button>
  );
}

// ─── Loading skeleton ──────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="divide-y divide-gray-100">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-3 animate-pulse">
          <div className="size-8 rounded-full bg-gray-100 shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 bg-gray-100 rounded w-32" />
            <div className="h-2.5 bg-gray-100 rounded w-24" />
          </div>
          <div className="h-5 bg-gray-100 rounded-full w-16" />
        </div>
      ))}
    </div>
  );
}
