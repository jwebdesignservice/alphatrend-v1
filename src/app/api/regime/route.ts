// GET /api/regime - Fetch market regime
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    snapshot_id: 'mock-snapshot-001',
    regime: 'rotation',
    confidence: 0.85,
  });
}
