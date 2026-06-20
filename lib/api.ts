import { supabase } from './supabase';
import { Lead, LeadStatus } from './types';

export async function getLeads(
  search?: string,
  status?: string,
  limit: number = 50,
  offset: number = 0
): Promise<Lead[]> {
  let query = supabase.from('leads').select('*').order('created_at', { ascending: false });

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
  }

  if (status) {
    query = query.eq('status', status);
  }

  query = query.range(offset, offset + limit - 1);

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch leads: ${error.message}`);
  }

  return data as Lead[];
}

export function normalizePhoneNumber(phone: string): string {
  // Strip all non-numeric characters
  const digits = phone.replace(/\D/g, '');
  
  // Handle standard Nigerian numbers (e.g. 08031234567 -> 2348031234567)
  if (digits.length === 11 && digits.startsWith('0')) {
    return '234' + digits.slice(1);
  }
  
  return digits;
}

export async function createLead(
  name: string,
  phone: string,
  email?: string,
  interest?: string
): Promise<Lead> {
  const normalizedPhone = normalizePhoneNumber(phone);

  // Check if lead already exists with this phone number (checking both normalized and raw)
  const { data: existingLead, error: checkError } = await supabase
    .from('leads')
    .select('id')
    .or(`phone.eq.${normalizedPhone},phone.eq.${phone}`)
    .limit(1)
    .maybeSingle();

  if (checkError) {
    throw new Error(`Failed to check existing leads: ${checkError.message}`);
  }

  if (existingLead) {
    throw new Error('This phone number is already registered.');
  }

  const { data, error } = await supabase
    .from('leads')
    .insert({
      name,
      phone: normalizedPhone, // Store normalized phone for consistency
      email: email || null,
      interest: interest || null,
      status: 'New',
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create lead: ${error.message}`);
  }

  return data as Lead;
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<Lead> {
  const { data, error } = await supabase
    .from('leads')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update lead: ${error.message}`);
  }

  return data as Lead;
}

export async function getLead(id: string): Promise<Lead> {
  const { data, error } = await supabase.from('leads').select('*').eq('id', id).single();

  if (error) {
    throw new Error(`Failed to fetch lead: ${error.message}`);
  }

  return data as Lead;
}
