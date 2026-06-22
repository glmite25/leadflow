import { NextRequest, NextResponse } from 'next/server';

const VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN!;

// Meta sends a GET request to verify the webhook endpoint
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified');
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse('Forbidden', { status: 403 });
}

// Meta sends POST requests with message/status events
export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log('WhatsApp webhook event:', JSON.stringify(body, null, 2));

  // Acknowledge receipt immediately
  return NextResponse.json({ status: 'ok' });
}
