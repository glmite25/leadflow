'use client';

import { Lead, LEAD_STATUSES, LeadStatus, STATUS_COLORS } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Users } from 'lucide-react';

interface LeadsTableProps {
  leads: Lead[];
  onRowClick: (lead: Lead) => void;
  isUpdating?: (leadId: string) => boolean;
}

export function LeadsTable({ leads, onRowClick, isUpdating }: LeadsTableProps) {
  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Users className="size-5 text-gray-400" />
        </div>
        <p className="text-sm font-medium text-gray-700">No leads found</p>
        <p className="text-xs text-gray-400 mt-1">
          Add your first lead using the form on the home page.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide pl-4">
                Name
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Phone
              </TableHead>
              <TableHead className="hidden sm:table-cell text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Email
              </TableHead>
              <TableHead className="hidden md:table-cell text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Interest
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Status
              </TableHead>
              <TableHead className="hidden sm:table-cell text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Created
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => {
              const updating = isUpdating?.(lead.id);
              return (
                <TableRow
                  key={lead.id}
                  onClick={() => onRowClick(lead)}
                  className={cn(
                    'cursor-pointer border-b border-gray-100 transition-colors',
                    'hover:bg-violet-50/40',
                    updating && 'opacity-60'
                  )}
                >
                  <TableCell className="pl-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                        <span className="text-xs font-semibold text-violet-700">
                          {lead.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{lead.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-sm text-gray-600">{lead.phone}</TableCell>
                  <TableCell className="hidden sm:table-cell py-3 text-sm text-gray-500">
                    {lead.email || <span className="text-gray-300">—</span>}
                  </TableCell>
                  <TableCell className="hidden md:table-cell py-3 text-sm text-gray-500 max-w-[180px]">
                    <span className="truncate block">
                      {lead.interest || <span className="text-gray-300">—</span>}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span
                      className={cn(
                        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                        STATUS_COLORS[lead.status]
                      )}
                    >
                      {lead.status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell py-3 text-xs text-gray-400">
                    {format(new Date(lead.created_at), 'MMM dd, yyyy')}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
