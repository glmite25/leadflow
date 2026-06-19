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
                  <TableCell className="py-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5 group/phone">
                      <span>{lead.phone}</span>
                      {(() => {
                        let cleanedPhone = lead.phone.replace(/[^\d]/g, '');
                        if (cleanedPhone.startsWith('0') && cleanedPhone.length === 11) {
                          cleanedPhone = '234' + cleanedPhone.substring(1);
                        }
                        const waUrl = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(
                          `Hello ${lead.name}, I am reaching out from Ojide regarding your interest in "${lead.interest || 'our services'}".`
                        )}`;
                        return (
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 rounded-md text-emerald-600 hover:bg-emerald-50 transition-colors opacity-0 group-hover/phone:opacity-100 focus:opacity-100 flex items-center justify-center shrink-0"
                            title="Chat on WhatsApp"
                          >
                            <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.33 4.982L2 22l5.209-1.362a9.943 9.943 0 004.8 1.226h.004c5.507 0 9.99-4.477 9.99-9.984a9.96 9.96 0 00-2.925-7.064 9.954 9.954 0 00-7.066-2.87zm5.79 14.214c-.25.707-1.42 1.3-1.95 1.385-.49.076-1.07.133-3.2-.727-2.73-1.1-4.49-3.87-4.63-4.055-.13-.18-1.12-1.492-1.12-2.846s.7-2.02.95-2.294c.25-.275.55-.34.74-.34.19 0 .38 0 .54.007.17.007.39-.065.61.464.23.57.77 1.88.84 2.015.07.136.12.294.03.476-.09.18-.13.3-.27.464-.13.16-.29.363-.41.488-.13.136-.28.284-.12.56.16.27.7 1.156 1.5 1.87.16.14.3.26.4.34.8.71 1.48.92 1.76 1.01.27.09.43.08.59-.1.16-.18.7-1.15.89-1.42.19-.27.38-.22.64-.13.27.09 1.69.8 1.98.94.3.14.49.22.56.34.07.12.07.7-.18 1.408z"/>
                            </svg>
                          </a>
                        );
                      })()}
                    </div>
                  </TableCell>
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
