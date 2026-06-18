'use client';

import { useState, useCallback } from 'react';
import { Lead, LEAD_STATUSES, LeadStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface LeadsTableProps {
  leads: Lead[];
  onStatusChange?: (leadId: string, newStatus: LeadStatus) => Promise<void>;
  isUpdating?: (leadId: string) => boolean;
}

const STATUS_COLORS: Record<LeadStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  'New': 'default',
  'Contacted': 'secondary',
  'Qualified': 'outline',
  'Customer': 'default',
  'Lost': 'destructive',
};

export function LeadsTable({ leads, onStatusChange, isUpdating }: LeadsTableProps) {
  const handleStatusChange = useCallback(
    async (leadId: string, newStatus: LeadStatus) => {
      if (onStatusChange) {
        await onStatusChange(leadId, newStatus);
      }
    },
    [onStatusChange]
  );

  if (leads.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <p className="text-sm text-muted-foreground">
          No leads found. Create your first lead to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="hidden sm:table-cell">Email</TableHead>
            <TableHead className="hidden md:table-cell">Interest</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden sm:table-cell">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell className="text-sm">{lead.phone}</TableCell>
              <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                {lead.email || '—'}
              </TableCell>
              <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                {lead.interest || '—'}
              </TableCell>
              <TableCell>
                <Select
                  defaultValue={lead.status}
                  onValueChange={(value) =>
                    handleStatusChange(lead.id, value as LeadStatus)
                  }
                  disabled={isUpdating?.(lead.id)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LEAD_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                {format(new Date(lead.created_at), 'MMM dd, yyyy')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
