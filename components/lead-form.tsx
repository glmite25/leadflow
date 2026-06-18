'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Get Started</CardTitle>
        <CardDescription>Tell us about your lead</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="interest">Interest</Label>
            <Input
              id="interest"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              placeholder="What brings you here?"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">
              Success! Your lead has been saved.
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Get Started'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
