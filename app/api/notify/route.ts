import { NextRequest, NextResponse } from 'next/server';
import { sendWhatsAppMessage, formatLeadNotification } from '@/lib/whatsapp';

/**
 * POST /api/notify
 *
 * Called by the Supabase Database Webhook on every INSERT into the leads table.
 * Payload shape from Supabase: { type: "INSERT", table: "leads", record: { ... } }
 *
 * Also accepts a direct JSON body for manual testing:
 * { name, phone, email?, interest? }
 */
export async function POST(request: NextRequest) {
  try {
    // Verify the request is from Supabase using the shared secret
    const authHeader = request.headers.get('authorization') ?? '';
    const webhookSecret = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN ?? '';

    // Only enforce auth check when secret is set (skip in dev if not set)
    if (webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Support both Supabase webhook shape and direct test shape
    const lead = body?.record ?? body;

    if (!lead?.name || !lead?.phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name and phone' },
        { status: 400 }
      );
    }

    const notifyTo = process.env.WHATSAPP_NOTIFY_TO;
    if (!notifyTo) {
      return NextResponse.json(
        { error: 'WHATSAPP_NOTIFY_TO is not set' },
        { status: 500 }
      );
    }

    const message = formatLeadNotification({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      interest: lead.interest,
    });

    const result = await sendWhatsAppMessage({ to: notifyTo, message });

    if (!result.success) {
      console.error('WhatsApp notification failed:', result.error, result.data);
      return NextResponse.json(
        { error: result.error, detail: result.data },
        { status: 502 }
      );
    }

    console.log('WhatsApp notification sent for lead:', lead.name);
    return NextResponse.json({ ok: true, message: 'Notification sent' });
  } catch (err) {
    console.error('POST /api/notify error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal error' },
      { status: 500 }
    );
  }
}
