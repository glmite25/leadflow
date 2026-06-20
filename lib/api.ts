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

const DISPOSABLE_EMAIL_DOMAINS = [
  'mailinator.com',
  'yopmail.com',
  'tempmail.com',
  'temp-mail.org',
  'guerrillamail.com',
  '10minutemail.com',
  'trashmail.com',
  'getairmail.com',
  'sharklasers.com',
  'dispostable.com',
  'dropmail.me',
  'maildrop.cc'
];

export function validateEmail(email: string): { isValid: boolean; reason?: string } {
  // Simple regex check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, reason: 'Invalid email address format' };
  }

  // Domain check
  const domain = email.split('@')[1]?.toLowerCase();
  if (domain && DISPOSABLE_EMAIL_DOMAINS.includes(domain)) {
    return { isValid: false, reason: 'Temporary/disposable emails are not allowed' };
  }

  return { isValid: true };
}

export function validatePhone(normalizedPhone: string): { isValid: boolean; reason?: string } {
  // Check that the normalized phone number is digits-only
  if (!/^\d+$/.test(normalizedPhone)) {
    return { isValid: false, reason: 'Phone number must contain only digits' };
  }

  // Nigerian phone number validation
  if (!normalizedPhone.startsWith('234')) {
    return { isValid: false, reason: 'Please use a valid phone number (Nigerian number starting with 0 or +234)' };
  }

  if (normalizedPhone.length !== 13) {
    return { isValid: false, reason: 'Phone number must be a valid 11-digit mobile number' };
  }

  const prefix = normalizedPhone.slice(3, 5); // get the two digits after 234
  const validPrefixes = ['70', '80', '81', '90', '91'];
  if (!validPrefixes.includes(prefix)) {
    return { isValid: false, reason: 'Please use a valid mobile number starting with a recognized prefix (e.g. 080, 070, 081, 090, 091)' };
  }

  return { isValid: true };
}

export async function createLead(
  name: string,
  phone: string,
  email?: string,
  interest?: string
): Promise<Lead> {
  const normalizedPhone = normalizePhoneNumber(phone);

  // Validate phone number structure
  const phoneValidation = validatePhone(normalizedPhone);
  if (!phoneValidation.isValid) {
    throw new Error(phoneValidation.reason);
  }

  // Validate email if provided
  if (email && email.trim() !== '') {
    const emailValidation = validateEmail(email.trim());
    if (!emailValidation.isValid) {
      throw new Error(emailValidation.reason);
    }
  }

  // Check if lead already exists with this phone number (checking both normalized and raw)
  const { data: existingPhoneLead, error: phoneCheckError } = await supabase
    .from('leads')
    .select('id')
    .or(`phone.eq.${normalizedPhone},phone.eq.${phone}`)
    .limit(1)
    .maybeSingle();

  if (phoneCheckError) {
    throw new Error(`Failed to check existing leads: ${phoneCheckError.message}`);
  }

  if (existingPhoneLead) {
    throw new Error('This phone number is already registered.');
  }

  // Check if lead already exists with this email (if email is provided)
  if (email && email.trim() !== '') {
    const cleanEmail = email.trim().toLowerCase();
    const { data: existingEmailLead, error: emailCheckError } = await supabase
      .from('leads')
      .select('id')
      .eq('email', cleanEmail)
      .limit(1)
      .maybeSingle();

    if (emailCheckError) {
      throw new Error(`Failed to check existing emails: ${emailCheckError.message}`);
    }

    if (existingEmailLead) {
      throw new Error('This email address is already registered.');
    }
  }

  const { data, error } = await supabase
    .from('leads')
    .insert({
      name,
      phone: normalizedPhone, // Store normalized phone for consistency
      email: email ? email.trim().toLowerCase() : null,
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
