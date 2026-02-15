// GET /api/regime - Fetch market regime
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const snapshotId = searchParams.get('snapshot_id');
    
    const supabase = await createClient();
    
    // Get snapshot ID
    let targetSnapshotId = snapshotId;
    if (!targetSnapshotId) {
      const { data: pointer } = await supabase
        .from('latest_snapshot_pointer')
        .select('snapshot_id')
        .single();
      targetSnapshotId = pointer?.snapshot_id;
    }
    
    if (!targetSnapshotId) {
      return NextResponse.json({ error: 'No snapshot available' }, { status: 404 });
    }
    
    // Fetch regime output
    const { data: regimeOutput, error } = await supabase
      .from('regime_outputs')
      .select('*')
      .eq('snapshot_id', targetSnapshotId)
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({
      snapshot_id: targetSnapshotId,
      regime: regimeOutput?.regime_label || 'rotation',
      confidence: regimeOutput?.regime_confidence || 1,
    });
  } catch (error) {
    console.error('Error fetching regime:', error);
    return NextResponse.json({ error: 'Failed to fetch regime' }, { status: 500 });
  }
}
