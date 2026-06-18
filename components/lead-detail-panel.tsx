'use client';

import { useEffect, useRef, useState } from 'react';
import { X, User, Phone, Mail, Tag, Calendar, Loader2, MessageCircle } from 'lucide-react';
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
  const [waType, setWaType] = useState<'whatsapp' | 'business'>('whatsapp');

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
                  {(() => {
                    let cleanedPhone = lead.phone.replace(/[^\d]/g, '');
                    if (cleanedPhone.startsWith('0') && cleanedPhone.length === 11) {
                      cleanedPhone = '234' + cleanedPhone.substring(1);
                    }
                    const waUrl = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(
                      `Hello ${lead.name}, I am reaching out from LeadFlow regarding your interest in "${lead.interest || 'our services'}".`
                    )}`;
                    return (
                      <>
                        <DetailRow
                          icon={Phone}
                          label="Phone"
                          value={lead.phone}
                          action={
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded-md text-emerald-600 hover:bg-emerald-50 transition-colors flex items-center justify-center shrink-0"
                              title="Chat on WhatsApp"
                            >
                              <svg className="size-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.33 4.982L2 22l5.209-1.362a9.943 9.943 0 004.8 1.226h.004c5.507 0 9.99-4.477 9.99-9.984a9.96 9.96 0 00-2.925-7.064 9.954 9.954 0 00-7.066-2.87zm5.79 14.214c-.25.707-1.42 1.3-1.95 1.385-.49.076-1.07.133-3.2-.727-2.73-1.1-4.49-3.87-4.63-4.055-.13-.18-1.12-1.492-1.12-2.846s.7-2.02.95-2.294c.25-.275.55-.34.74-.34.19 0 .38 0 .54.007.17.007.39-.065.61.464.23.57.77 1.88.84 2.015.07.136.12.294.03.476-.09.18-.13.3-.27.464-.13.16-.29.363-.41.488-.13.136-.28.284-.12.56.16.27.7 1.156 1.5 1.87.16.14.3.26.4.34.8.71 1.48.92 1.76 1.01.27.09.43.08.59-.1.16-.18.7-1.15.89-1.42.19-.27.38-.22.64-.13.27.09 1.69.8 1.98.94.3.14.49.22.56.34.07.12.07.7-.18 1.408z"/>
                              </svg>
                            </a>
                          }
                        />
                        <DetailRow icon={Mail} label="Email" value={lead.email ?? '—'} />
                        <DetailRow icon={Tag} label="Interest" value={lead.interest ?? '—'} />
                        <DetailRow
                          icon={Calendar}
                          label="Created"
                          value={format(new Date(lead.created_at), 'MMM dd, yyyy · h:mm a')}
                        />
                        <div className="pt-2">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                          >
                            <svg className="size-4 fill-current" viewBox="0 0 24 24">
                              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.33 4.982L2 22l5.209-1.362a9.943 9.943 0 004.8 1.226h.004c5.507 0 9.99-4.477 9.99-9.984a9.96 9.96 0 00-2.925-7.064 9.954 9.954 0 00-7.066-2.87zm5.79 14.214c-.25.707-1.42 1.3-1.95 1.385-.49.076-1.07.133-3.2-.727-2.73-1.1-4.49-3.87-4.63-4.055-.13-.18-1.12-1.492-1.12-2.846s.7-2.02.95-2.294c.25-.275.55-.34.74-.34.19 0 .38 0 .54.007.17.007.39-.065.61.464.23.57.77 1.88.84 2.015.07.136.12.294.03.476-.09.18-.13.3-.27.464-.13.16-.29.363-.41.488-.13.136-.28.284-.12.56.16.27.7 1.156 1.5 1.87.16.14.3.26.4.34.8.71 1.48.92 1.76 1.01.27.09.43.08.59-.1.16-.18.7-1.15.89-1.42.19-.27.38-.22.64-.13.27.09 1.69.8 1.98.94.3.14.49.22.56.34.07.12.07.7-.18 1.408z"/>
                            </svg>
                            Chat on WhatsApp
                          </a>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* WhatsApp */}
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Message on WhatsApp</p>
                {/* Type toggle */}
                <div className="flex rounded-lg border border-gray-200 overflow-hidden mb-3 text-xs font-medium">
                  <button
                    onClick={() => setWaType('whatsapp')}
                    className={cn(
                      'flex-1 py-2 transition-colors',
                      waType === 'whatsapp'
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    )}
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={() => setWaType('business')}
                    className={cn(
                      'flex-1 py-2 transition-colors border-l border-gray-200',
                      waType === 'business'
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    )}
                  >
                    WhatsApp Business
                  </button>
                </div>
                {/* Message button */}
                <a
                  href={`https://${waType === 'business' ? 'api' : 'wa'}.whatsapp.com/send?phone=${lead.phone.replace(/\D/g, '')}&text=Hi ${encodeURIComponent(lead.name)}, thanks for signing up!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full h-10 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="size-4 shrink-0" />
                  Message {lead.name.split(' ')[0]}
                </a>
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
  action,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-start gap-3 min-w-0">
        <div className="mt-0.5 size-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
          <Icon className="size-3.5 text-gray-500" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-gray-400">{label}</p>
          <p className="text-sm text-gray-800 font-medium truncate">{value}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

