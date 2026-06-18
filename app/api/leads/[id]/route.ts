import { NextRequest, NextResponse } from 'next/server';
import { updateLeadStatus } from '@/lib/api';
import { LeadStatus } from '@/lib/types';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    const lead = await updateLeadStatus(id, status as LeadStatus);
    return NextResponse.json({ data: lead });
  } catch (error) {
    console.error('PATCH /api/leads/[id] error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update lead' },
      { status: 500 }
    );
  }
}
