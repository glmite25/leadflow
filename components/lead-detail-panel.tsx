'use client';

import { useEffect, useRef } from 'react';
import { X, User, Phone, Mail, Tag, Calendar, Loader2 } from 'lucide-react';
import { Lead, LeadStatus, LEAD_STATUSES, STATUS_COLORS } from '@/lib/types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface LeadDetailPanelProps {
  lead: Lead | null;
  onClose: () => void;
  onStatusChange: (leadId: string, newStatus: LeadStatus) => Promise<void>;
  isUpdating: boolean;
}

export function LeadDetailPanel({
  lead,
  onClose,
  onStatusChange,
  isUpdating,
}: LeadDetailPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Trap focus and lock body scroll when open
  useEffect(() => {
    if (lead) {
      document.body.style.overflow = 'hidden';
      panelRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lead]);

  const open = !!lead;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/30 transition-opacity duration-200',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-white shadow-2xl flex flex-col',
          'transform transition-transform duration-200 ease-in-out outline-none',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label={lead ? `Lead details for ${lead.name}` : 'Lead details'}
      >
        {lead && (
          <>
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-semibold text-gray-900">{lead.name}</h2>
                <p className="text-xs text-gray-400 mt-0.5">Lead details</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Close panel"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Panel body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

              {/* Status */}
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Status</p>
                <div className="flex flex-wrap gap-2">
                  {LEAD_STATUSES.map((status) => {
                    const active = lead.status === status;
                    return (
                      <button
                        key={status}
                        disabled={isUpdating}
                        onClick={() => onStatusChange(lead.id, status)}
                        className={cn(
                          'px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                          active
                            ? STATUS_COLORS[status] + ' border-transparent'
                            : 'bg-white border-gray-200 text-gray-500 hover:border-gray-400',
                          isUpdating && 'opacity-50 cursor-not-allowed'
                        )}
                      >
                        {isUpdating && active ? (
                          <span className="flex items-center gap-1">
                            <Loader2 className="size-3 animate-spin" />
                            {status}
                          </span>
                        ) : status}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Details */}
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Contact</p>
                <div className="space-y-3">
                  <DetailRow icon={User} label="Name" value={lead.name} />
                  <DetailRow icon={Phone} label="Phone" value={lead.phone} />
                  <DetailRow icon={Mail} label="Email" value={lead.email ?? '—'} />
                  <DetailRow icon={Tag} label="Interest" value={lead.interest ?? '—'} />
                  <DetailRow
                    icon={Calendar}
                    label="Created"
                    value={format(new Date(lead.created_at), 'MMM dd, yyyy · h:mm a')}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 size-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
        <Icon className="size-3.5 text-gray-500" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm text-gray-800 font-medium truncate">{value}</p>
      </div>
    </div>
  );
}
