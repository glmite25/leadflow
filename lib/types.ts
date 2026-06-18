export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Customer' | 'Lost';

export interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  interest: string | null;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
}

export const LEAD_STATUSES: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Customer', 'Lost'];

export const STATUS_COLORS: Record<LeadStatus, string> = {
  'New': 'bg-blue-100 text-blue-800',
  'Contacted': 'bg-purple-100 text-purple-800',
  'Qualified': 'bg-amber-100 text-amber-800',
  'Customer': 'bg-green-100 text-green-800',
  'Lost': 'bg-red-100 text-red-800',
};
