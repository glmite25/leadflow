'use client';

import { Lead } from '@/lib/types';
import { STATUS_COLORS } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Phone, Mail, Tag } from 'lucide-react';

interface LeadCardProps {
  lead: Lead;
  onClick: (lead: Lead) => void;
}

export function LeadCard({ lead, onClick }: LeadCardProps) {
  return (
    <button
      onClick={() => onClick(lead)}
      className="w-full text-left bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-300 hover:shadow-sm transition-all active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar initial */}
          <div className="size-9 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
            <span className="text-sm font-semibold text-violet-700">
              {lead.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{lead.name}</p>
            <p className="text-xs text-gray-400">
              {format(new Date(lead.created_at), 'MMM dd, yyyy')}
            </p>
          </div>
        </div>

        <span
          className={cn(
            'shrink-0 px-2.5 py-1 rounded-full text-xs font-medium',
            STATUS_COLORS[lead.status]
          )}
        >
          {lead.status}
        </span>
      </div>

      <div className="space-y-1.5 pl-12">
        {lead.phone && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Phone className="size-3 shrink-0" />
            <span>{lead.phone}</span>
          </div>
        )}
        {lead.email && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Mail className="size-3 shrink-0" />
            <span className="truncate">{lead.email}</span>
          </div>
        )}
        {lead.interest && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Tag className="size-3 shrink-0" />
            <span className="truncate">{lead.interest}</span>
          </div>
        )}
      </div>
    </button>
  );
}
