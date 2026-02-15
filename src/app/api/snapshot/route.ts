// GET /api/snapshot - Fetch latest snapshot data
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // MVP: Return mock data
  return NextResponse.json(getMockSnapshot());
}

function getMockSnapshot() {
  return {
    snapshot_id: 'mock-snapshot-001',
    recalculated_at: new Date().toISOString(),
    snapshot_quality_score: 0.95,
    tokens: generateMockTokens(),
    metas: generateMockMetas(),
    chains: [
      { chain: 'solana', chain_heat_score: 72.5, dominant_driver: 'attention', total_eligible_tokens: 45, capital_share: 35.2 },
      { chain: 'base', chain_heat_score: 68.3, dominant_driver: 'capital', total_eligible_tokens: 32, capital_share: 28.1 },
      { chain: 'ethereum', chain_heat_score: 55.8, dominant_driver: 'capital', total_eligible_tokens: 28, capital_share: 25.4 },
      { chain: 'bnb', chain_heat_score: 48.2, dominant_driver: 'attention', total_eligible_tokens: 18, capital_share: 11.3 },
    ],
    regime: 'rotation',
  };
}

function generateMockTokens() {
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
  
  return tokens.map((t, i) => ({
    token_id: `mock-token-${i}`,
    ...t,
    address: `0x${i.toString(16).padStart(40, '0')}`,
    attention_score: 50 + (i * 5),
    liquidity_score: 40 + (i * 6),
    whale_score: 45 + (i * 4),
    engineering_score: 10 + (i * 3),
    integrity_label: i < 3 ? 'organic' : i < 6 ? 'mixed' : 'engineered',
    lifecycle_phase: ['ignition', 'expansion', 'crowding', 'expansion', 'ignition', 'expansion', 'crowding', 'distribution'][i],
    driver_cards: [
      { label: 'Attention Acceleration', value: 'High', impact: 'positive' },
      { label: 'Whale Activity', value: 'Accumulating', impact: 'positive' },
    ],
    confidence_score: 0.85,
  }));
}

function generateMockMetas() {
  const metas = [
    { name: 'AI Agents', score: 78.5, lifecycle: 'expansion', capital_share: 28.4, shift: 2.3 },
    { name: 'Memecoins', score: 65.2, lifecycle: 'crowding', capital_share: 22.1, shift: -1.2 },
    { name: 'DeFi', score: 58.8, lifecycle: 'expansion', capital_share: 18.5, shift: 0.8 },
    { name: 'SocialFi', score: 52.4, lifecycle: 'ignition', capital_share: 12.3, shift: 4.1 },
    { name: 'GameFi', score: 45.1, lifecycle: 'distribution', capital_share: 8.7, shift: -2.5 },
  ];
  
  return metas.map((m, i) => ({
    meta_id: `mock-meta-${i}`,
    meta_name: m.name,
    meta_score: m.score,
    lifecycle_phase: m.lifecycle,
    capital_share: m.capital_share,
    share_shift: m.shift,
    integrity_mix: {
      organic: 60 - i * 10,
      mixed: 25 + i * 3,
      engineered: 15 + i * 7,
    },
    whale_overlap_score: 60 + i * 5,
    driver_cards: [
      { label: 'Capital Flow', value: m.shift > 0 ? 'Inflow' : 'Outflow', impact: m.shift > 0 ? 'positive' : 'negative' },
    ],
    token_count: 5 + i,
  }));
}
