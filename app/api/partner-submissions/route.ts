import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// MVP partner-onboarding endpoint. Phase 2 will write to a real DB / send via Resend.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body?.fullName || !body?.phone || !body?.email || !body?.vehicle?.make) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }
    const submission = {
      id: `partner_${Date.now().toString(36)}`,
      receivedAt: new Date().toISOString(),
      ...body
    };
    // eslint-disable-next-line no-console
    console.log('[wonder-travel] new partner-vehicle submission', JSON.stringify(submission));
    return NextResponse.json({ ok: true, id: submission.id });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }
}
