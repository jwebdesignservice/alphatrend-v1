// POST /api/cron/snapshot - Cron endpoint for 15-minute snapshot computation
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function POST(request: Request) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Import dynamically to avoid build issues
    const { computeSnapshot } = await import('@/lib/engine/compute-snapshot');
    
    console.log('[Cron] Starting snapshot computation...');
    const result = await computeSnapshot();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        snapshot_id: result.snapshot_id,
        stats: result.stats,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error,
      }, { status: 500 });
    }
  } catch (error) {
    console.error('[Cron] Failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/cron/snapshot',
    method: 'POST',
  });
}
