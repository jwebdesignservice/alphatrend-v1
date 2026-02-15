// GET /api/tokens - Fetch token outputs (trending view)
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const snapshotId = searchParams.get('snapshot_id');
    const chain = searchParams.get('chain');
    const integrity = searchParams.get('integrity');
    const limit = parseInt(searchParams.get('limit') || '50');
    
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
    
    // Build query
    let query = supabase
      .from('token_outputs')
      .select(`
        *,
        tokens (
          token_id,
          chain,
          canonical_address,
          symbol,
          name
        )
      `)
      .eq('snapshot_id', targetSnapshotId)
      .order('structural_score', { ascending: false })
      .limit(limit);
    
    // Apply filters
    if (chain) {
      query = query.eq('tokens.chain', chain);
    }
    if (integrity) {
      query = query.eq('integrity_label', integrity);
    }
    
    const { data: tokenOutputs, error } = await query;
    
    if (error) throw error;
    
    return NextResponse.json({
      snapshot_id: targetSnapshotId,
      tokens: tokenOutputs || [],
    });
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return NextResponse.json({ error: 'Failed to fetch tokens' }, { status: 500 });
  }
}
