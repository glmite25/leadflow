'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LeadsTable } from '@/components/leads-table';
import { Lead, LeadStatus, LEAD_STATUSES } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [updating, setUpdating] = useState<Set<string>>(new Set());

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/leads?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch leads');

      const data = await response.json();
      setLeads(data.data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(fetchLeads, 300);
    return () => clearTimeout(timer);
  }, [search, statusFilter, fetchLeads]);

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
        setLeads((prev) =>
          prev.map((lead) => (lead.id === leadId ? data.data : lead))
        );
      } catch (error) {
        console.error('Error updating lead:', error);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">LeadFlow</h1>
            <p className="text-xs text-muted-foreground">Dashboard</p>
          </div>
          <Link href="/">
            <Button variant="outline">Home</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Leads', value: leads.length },
            { label: 'New', value: leads.filter((l) => l.status === 'New').length },
            { label: 'Contacted', value: leads.filter((l) => l.status === 'Contacted').length },
            { label: 'Qualified', value: leads.filter((l) => l.status === 'Qualified').length },
            { label: 'Customers', value: leads.filter((l) => l.status === 'Customer').length },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-primary mt-2">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Search Leads
              </label>
              <Input
                placeholder="Search by name, email, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Filter by Status
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  {LEAD_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg">
          {loading ? (
            <div className="p-12 text-center">
              <p className="text-muted-foreground">Loading leads...</p>
            </div>
          ) : (
            <LeadsTable
              leads={leads}
              onStatusChange={handleStatusChange}
              isUpdating={(id) => updating.has(id)}
            />
          )}
        </div>
      </main>
    </div>
  );
}
