import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// MVP submission endpoint. Phase 2 will write to a real DB / send via Resend.
// For now we log to the server console (visible in Vercel logs) so the operator
// can see incoming submissions and follow up by email or WhatsApp.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const required = ['businessName', 'category', 'description', 'location', 'contactName', 'phone'];
    for (const k of required) {
      if (!body?.[k] || typeof body[k] !== 'string') {
        return NextResponse.json({ ok: false, error: `Missing field: ${k}` }, { status: 400 });
      }
    }

    const submission = {
      id: `sub_${Date.now().toString(36)}`,
      receivedAt: new Date().toISOString(),
      ...body
    };

    // eslint-disable-next-line no-console
    console.log('[wonder-travel] new place submission', JSON.stringify(submission));

    return NextResponse.json({ ok: true, id: submission.id });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }
}
