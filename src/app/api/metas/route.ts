// GET /api/metas - Fetch meta outputs for latest snapshot
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const snapshotId = searchParams.get('snapshot_id');
    
    const supabase = await createClient();
    
    // Get snapshot ID (use provided or get latest)
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
    
    // Fetch meta outputs with meta details
    const { data: metaOutputs, error } = await supabase
      .from('meta_outputs')
      .select(`
        *,
        metas (
          meta_id,
          meta_name,
          first_detected_at
        )
      `)
      .eq('snapshot_id', targetSnapshotId)
      .order('meta_score', { ascending: false })
      .limit(8);
    
    if (error) throw error;
    
    return NextResponse.json({
      snapshot_id: targetSnapshotId,
      metas: metaOutputs || [],
    });
  } catch (error) {
    console.error('Error fetching metas:', error);
    return NextResponse.json({ error: 'Failed to fetch metas' }, { status: 500 });
  }
}
