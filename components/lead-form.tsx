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
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
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
            placeholder="+1 (555) 000-0000"
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

        {/* Success */}
        {success && (
          <div className="rounded-lg bg-green-50 border border-green-100 px-3.5 py-2.5 text-sm text-green-700">
            Your lead has been saved successfully.
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
  );
}
