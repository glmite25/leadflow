import { NextRequest, NextResponse } from 'next/server';
import { createLead, getLeads } from '@/lib/api';
import { sendNewLeadNotification } from '@/lib/whatsapp';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const leads = await getLeads(search, status, limit, offset);
    return NextResponse.json({ data: leads });
  } catch (error) {
    console.error('GET /api/leads error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, interest } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    const lead = await createLead(name, phone, email, interest);

    // Await the notification — on serverless we must not fire-and-forget
    // as the function may terminate before the async call completes
    try {
      await sendNewLeadNotification(lead);
    } catch (err) {
      // Don't fail the request if notification fails — just log it
      console.error('WhatsApp notify error:', err);
    }

    return NextResponse.json({ data: lead }, { status: 201 });
  } catch (error) {
    console.error('POST /api/leads error:', error);
    const message = error instanceof Error ? error.message : 'Failed to create lead';
    const badRequestKeywords = [
      'already registered',
      'invalid email',
      'not allowed',
      'must contain only digits',
      'must be a valid',
      'please use a valid'
    ];
    const isBadRequest = badRequestKeywords.some(keyword => message.toLowerCase().includes(keyword));
    const status = isBadRequest ? 400 : 500;
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}
