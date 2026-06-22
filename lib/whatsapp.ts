/**
 * WhatsApp Cloud API helper
 * Sends a text message to a number via the Meta WhatsApp Business Cloud API.
 */

const WHATSAPP_API_URL = 'https://graph.facebook.com/v19.0';

export interface SendWhatsAppMessageOptions {
  to: string;       // E.164 format without +, e.g. "2347031098097"
  message: string;
}

export async function sendWhatsAppMessage({
  to,
  message,
}: SendWhatsAppMessageOptions): Promise<{ success: boolean; error?: string; data?: unknown }> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!phoneNumberId || !accessToken) {
    return { success: false, error: 'Missing WHATSAPP_PHONE_NUMBER_ID or WHATSAPP_ACCESS_TOKEN' };
  }

  try {
    const res = await fetch(`${WHATSAPP_API_URL}/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'text',
        text: { body: message },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      const errMsg = data?.error?.message ?? `HTTP ${res.status}`;
      return { success: false, error: errMsg, data };
    }

    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Formats a new lead notification message.
 */
export function formatLeadNotification(lead: {
  name: string;
  phone: string;
  email?: string | null;
  interest?: string | null;
}): string {
  const lines = [
    '🔔 *New Lead — Ojidé*',
    '',
    `👤 *Name:* ${lead.name}`,
    `📱 *Phone:* ${lead.phone}`,
  ];

  if (lead.email) lines.push(`📧 *Email:* ${lead.email}`);
  if (lead.interest) lines.push(`💬 *Challenge:* ${lead.interest}`);

  lines.push('');
  lines.push('👉 View in dashboard → https://ojide.vercel.app/dashboard');

  return lines.join('\n');
}

/**
 * Convenience wrapper — sends a new lead notification to the owner.
 * Used directly in the leads API route (fire-and-forget).
 */
export async function sendNewLeadNotification(lead: {
  name: string;
  phone: string;
  email?: string | null;
  interest?: string | null;
}): Promise<void> {
  const notifyTo = process.env.WHATSAPP_NOTIFY_TO;
  if (!notifyTo) {
    console.warn('WHATSAPP_NOTIFY_TO not set — skipping notification');
    return;
  }

  const message = formatLeadNotification(lead);
  const result = await sendWhatsAppMessage({ to: notifyTo, message });

  if (!result.success) {
    console.error('Lead notification failed:', result.error, result.data);
  }
}
