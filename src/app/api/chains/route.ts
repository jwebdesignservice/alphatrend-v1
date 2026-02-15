// GET /api/chains - Fetch chain heat outputs
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
    
    // Fetch chain outputs
    const { data: chainOutputs, error } = await supabase
      .from('chain_outputs')
      .select('*')
      .eq('snapshot_id', targetSnapshotId)
      .order('chain_heat_score', { ascending: false });
    
    if (error) throw error;
    
    return NextResponse.json({
      snapshot_id: targetSnapshotId,
      chains: chainOutputs || [],
    });
  } catch (error) {
    console.error('Error fetching chains:', error);
    return NextResponse.json({ error: 'Failed to fetch chains' }, { status: 500 });
  }
}
