'use client';

import { useState } from 'react';
import { Lock, Send, Users, ExternalLink } from 'lucide-react';

// WhatsApp group link — set NEXT_PUBLIC_WHATSAPP_GROUP_URL in your .env.local
const WHATSAPP_GROUP_URL = process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL || '';

interface LeadFormProps {
  onSuccess?: () => void;
}

export function LeadForm({ onSuccess }: LeadFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.phone.trim()) return 'Phone number is required';
    if (formData.phone.trim().length < 10) return 'Phone must be at least 10 characters';
    if (formData.email && !formData.email.includes('@')) return 'Please enter a valid email';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit form');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', interest: '' });
      onSuccess?.();
      // Don't auto-hide — user needs to see and click the WhatsApp group link
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Success Modal ─────────────────────────────────────────────── */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSuccess(false)}
          />
          {/* Modal card */}
          <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center text-center gap-4">
            {/* Checkmark */}
            <div className="size-14 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="size-7 text-green-600" fill="none" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">You're in! 🎉</h3>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                Your spot is reserved. Join the WhatsApp group to get the class link, date reminder, and all updates.
              </p>
            </div>

            {/* WhatsApp group button */}
            {WHATSAPP_GROUP_URL ? (
              <a
                href={WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors"
              >
                <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Join the WhatsApp Group
                <ExternalLink className="size-3.5 opacity-70" />
              </a>
            ) : (
              <p className="text-sm text-gray-500">
                We'll send the WhatsApp group link to your number shortly.
              </p>
            )}

            <button
              onClick={() => setSuccess(false)}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors mt-1"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="px-6 pt-6 pb-5 flex items-center gap-3 border-b border-gray-100">
        <div className="size-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
          <Users className="size-5 text-white" />
        </div>
        <div>
          <p className="text-base font-bold text-gray-900 leading-tight">Reserve Your Free Spot</p>
          <p className="text-sm text-gray-400 leading-tight mt-0.5">Limited slots — sign up now</p>
        </div>
      </div>

      {/* Form body */}
      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name <span className="text-gray-900">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full name"
            disabled={loading}
            className="w-full h-11 px-3.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            disabled={loading}
            className="w-full h-11 px-3.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number <span className="text-gray-900">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="07030000000"
            disabled={loading}
            className="w-full h-11 px-3.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          />
        </div>

        {/* Interest */}
        <div className="space-y-1.5">
          <label htmlFor="interest" className="text-sm font-medium text-gray-700">
            What's your biggest challenge right now?
          </label>
          <select
            id="interest"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            disabled={loading}
            className="w-full h-11 px-3.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors appearance-none"
          >
            <option value="">-- Select one --</option>
            <option value="I don't know how to get customers">I don't know how to get customers</option>
            <option value="People show interest but never buy">People show interest but never buy</option>
            <option value="I don't know how to price my services">I don't know how to price my services</option>
            <option value="I have no online presence">I have no online presence</option>
            <option value="I struggle with follow-up">I struggle with follow-up</option>
            <option value="I don't know how to market myself">I don't know how to market myself</option>
            <option value="I'm just starting out">I'm just starting out</option>
            <option value="Something else">Something else</option>
          </select>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-100 px-3.5 py-2.5 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="size-4" />
              Reserve My Free Spot
            </>
          )}
        </button>

        {/* Privacy note */}
        <div className="flex items-center justify-center gap-1.5 pt-0.5">
          <Lock className="size-3 text-gray-400 shrink-0" />
          <p className="text-xs text-gray-400">
            100% free. No spam. We'll only contact you about the class.
          </p>
        </div>
      </form>
    </div>
    </>
  );
}
