// GET /api/chains - Fetch chain heat outputs
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    snapshot_id: 'mock-snapshot-001',
    chains: [
      { chain: 'solana', chain_heat_score: 72.5, dominant_driver: 'attention', total_eligible_tokens: 45, capital_share: 35.2 },
      { chain: 'base', chain_heat_score: 68.3, dominant_driver: 'capital', total_eligible_tokens: 32, capital_share: 28.1 },
      { chain: 'ethereum', chain_heat_score: 55.8, dominant_driver: 'capital', total_eligible_tokens: 28, capital_share: 25.4 },
      { chain: 'bnb', chain_heat_score: 48.2, dominant_driver: 'attention', total_eligible_tokens: 18, capital_share: 11.3 },
    ],
  });
}
