import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body?.name || !body?.phone || !body?.email || !body?.title || !body?.description || !body?.location || !body?.category) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }
    const { imageDataUrl, ...rest } = body;
    const submission = {
      id: `op_${Date.now().toString(36)}`,
      receivedAt: new Date().toISOString(),
      hasImage: typeof imageDataUrl === 'string' && imageDataUrl.startsWith('data:image/'),
      ...rest
    };
    // eslint-disable-next-line no-console
    console.log('[wonder-travel] new opportunity submission', JSON.stringify(submission));
    return NextResponse.json({ ok: true, id: submission.id });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }
}
