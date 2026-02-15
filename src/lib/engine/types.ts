// AlphaTrend Engine Types
export type Chain = 'solana' | 'base' | 'ethereum' | 'bnb';
export type IntegrityLabel = 'organic' | 'mixed' | 'engineered';
export type LifecyclePhase = 'ignition' | 'expansion' | 'crowding' | 'distribution' | 'decay';
export type MarketRegime = 'rotation' | 'expansion' | 'fragmented' | 'contraction';
export type ChainDriver = 'attention' | 'capital' | 'engineering';

export interface DriverCard {
  label: string;
  value: string;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface TokenOutput {
  token_id: string;
  chain: Chain;
  symbol: string;
  name: string;
  address: string;
  structural_score: number;
  attention_score: number;
  liquidity_score: number;
  whale_score: number;
  engineering_score: number;
  integrity_label: IntegrityLabel;
  lifecycle_phase: LifecyclePhase;
  driver_cards: DriverCard[];
  confidence_score: number;
}

export interface MetaOutput {
  meta_id: string;
  meta_name: string;
  meta_score: number;
  lifecycle_phase: LifecyclePhase;
  capital_share: number;
  share_shift: number;
  integrity_mix: { organic: number; mixed: number; engineered: number };
  whale_overlap_score: number;
  driver_cards: DriverCard[];
  token_count: number;
}

export interface ChainOutput {
  chain: Chain;
  chain_heat_score: number;
  dominant_driver: ChainDriver;
  total_eligible_tokens: number;
  capital_share: number;
}
