import { NextResponse } from 'next/server';
import { sendWhatsAppMessage, formatLeadNotification } from '@/lib/whatsapp';

/**
 * GET /api/notify/test
 *
 * Fires a test WhatsApp notification to WHATSAPP_NOTIFY_TO.
 * Only available outside production — remove or protect this route after testing.
 */
export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  const notifyTo = process.env.WHATSAPP_NOTIFY_TO;
  if (!notifyTo) {
    return NextResponse.json({ error: 'WHATSAPP_NOTIFY_TO is not set' }, { status: 500 });
  }

  const message = formatLeadNotification({
    name: 'Test Lead',
    phone: '08012345678',
    email: 'test@example.com',
    interest: "I have followers but they don't buy",
  });

  const result = await sendWhatsAppMessage({ to: notifyTo, message });

  if (!result.success) {
    return NextResponse.json(
      { error: result.error, detail: result.data },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, message: 'Test notification sent to ' + notifyTo });
}
