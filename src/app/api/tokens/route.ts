// GET /api/tokens - Fetch token outputs
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const tokens = [
    { symbol: 'AIXBT', name: 'AI Agent Token', chain: 'base', structural_score: 85.2 },
    { symbol: 'VIRTUAL', name: 'Virtual Protocol', chain: 'base', structural_score: 82.1 },
    { symbol: 'AI16Z', name: 'AI16Z DAO', chain: 'solana', structural_score: 79.5 },
    { symbol: 'GOAT', name: 'Goatseus Maximus', chain: 'solana', structural_score: 76.8 },
    { symbol: 'GRIFFAIN', name: 'Griffain AI', chain: 'solana', structural_score: 74.2 },
    { symbol: 'ARC', name: 'Arc Protocol', chain: 'solana', structural_score: 71.9 },
    { symbol: 'ZEREBRO', name: 'Zerebro', chain: 'solana', structural_score: 69.4 },
    { symbol: 'FARTCOIN', name: 'Fartcoin', chain: 'solana', structural_score: 67.1 },
  ];
  
  return NextResponse.json({
    snapshot_id: 'mock-snapshot-001',
    tokens: tokens.map((t, i) => ({
      token_id: `mock-token-${i}`,
      ...t,
      address: `0x${i.toString(16).padStart(40, '0')}`,
      attention_score: 50 + (i * 5),
      liquidity_score: 40 + (i * 6),
      whale_score: 45 + (i * 4),
      engineering_score: 10 + (i * 3),
      integrity_label: i < 3 ? 'organic' : i < 6 ? 'mixed' : 'engineered',
      lifecycle_phase: ['ignition', 'expansion', 'crowding'][i % 3],
      driver_cards: [
        { label: 'Attention Acceleration', value: 'High', impact: 'positive' },
        { label: 'Whale Activity', value: 'Accumulating', impact: 'positive' },
      ],
      confidence_score: 0.85,
    })),
  });
}
