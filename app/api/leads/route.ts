import { NextRequest, NextResponse } from 'next/server';
import { createLead, getLeads } from '@/lib/api';

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

    if (!name || !phone || !email || !interest) {
      return NextResponse.json(
        { error: 'Name, email, phone, and interest are all required' },
        { status: 400 }
      );
    }

    const lead = await createLead(name, phone, email, interest);

    // WhatsApp notification is handled exclusively by the Supabase DB webhook
    // → POST /api/notify fires automatically on every INSERT into the leads table.
    // Do NOT call sendNewLeadNotification here — that would send a double message.

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
