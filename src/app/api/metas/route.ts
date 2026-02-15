// GET /api/metas - Fetch meta outputs
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const metas = [
    { name: 'AI Agents', score: 78.5, lifecycle: 'expansion', capital_share: 28.4, shift: 2.3 },
    { name: 'Memecoins', score: 65.2, lifecycle: 'crowding', capital_share: 22.1, shift: -1.2 },
    { name: 'DeFi', score: 58.8, lifecycle: 'expansion', capital_share: 18.5, shift: 0.8 },
    { name: 'SocialFi', score: 52.4, lifecycle: 'ignition', capital_share: 12.3, shift: 4.1 },
    { name: 'GameFi', score: 45.1, lifecycle: 'distribution', capital_share: 8.7, shift: -2.5 },
  ];
  
  return NextResponse.json({
    snapshot_id: 'mock-snapshot-001',
    metas: metas.map((m, i) => ({
      meta_id: `mock-meta-${i}`,
      meta_name: m.name,
      meta_score: m.score,
      lifecycle_phase: m.lifecycle,
      capital_share: m.capital_share,
      share_shift: m.shift,
      integrity_mix: { organic: 60 - i * 10, mixed: 25 + i * 3, engineered: 15 + i * 7 },
      whale_overlap_score: 60 + i * 5,
      driver_cards: [{ label: 'Capital Flow', value: m.shift > 0 ? 'Inflow' : 'Outflow', impact: m.shift > 0 ? 'positive' : 'negative' }],
      token_count: 5 + i,
    })),
  });
}
