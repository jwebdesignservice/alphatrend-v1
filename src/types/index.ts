// Chain Types
export type Chain = 'solana' | 'base' | 'ethereum' | 'bnb'

export const CHAIN_CONFIG: Record<Chain, { name: string; color: string; minLiquidity: number; minHolders: number }> = {
  solana: { name: 'Solana', color: '#9945FF', minLiquidity: 250000, minHolders: 500 },
  base: { name: 'Base', color: '#0052FF', minLiquidity: 200000, minHolders: 400 },
  ethereum: { name: 'Ethereum', color: '#627EEA', minLiquidity: 500000, minHolders: 1000 },
  bnb: { name: 'BNB', color: '#F3BA2F', minLiquidity: 300000, minHolders: 600 },
}

// Market Regime
export type MarketRegime = 'rotation' | 'expansion' | 'fragmented' | 'contraction'

export const REGIME_CONFIG: Record<MarketRegime, { label: string; color: string; description: string }> = {
  rotation: { label: 'Rotation', color: '#3B82F6', description: 'Capital rotating between sectors' },
  expansion: { label: 'Expansion', color: '#22C55E', description: 'Broad capital inflow, rising tide' },
  fragmented: { label: 'Fragmented', color: '#EAB308', description: 'Mixed signals, no clear direction' },
  contraction: { label: 'Contraction', color: '#EF4444', description: 'Capital outflow, risk-off' },
}

// Token Lifecycle
export type TokenLifecycle = 'ignition' | 'expansion' | 'crowding' | 'distribution' | 'decay'

export const LIFECYCLE_CONFIG: Record<TokenLifecycle, { label: string; color: string; description: string }> = {
  ignition: { label: 'Ignition', color: '#F97316', description: 'Early attention surge' },
  expansion: { label: 'Expansion', color: '#22C55E', description: 'Growing adoption and liquidity' },
  crowding: { label: 'Crowding', color: '#EAB308', description: 'Peak attention, potential top' },
  distribution: { label: 'Distribution', color: '#F59E0B', description: 'Smart money exiting' },
  decay: { label: 'Decay', color: '#6B7280', description: 'Declining interest' },
}

// Integrity Grade
export type IntegrityGrade = 'organic' | 'mixed' | 'engineered'

export const INTEGRITY_CONFIG: Record<IntegrityGrade, { label: string; color: string; description: string }> = {
  organic: { label: 'Organic', color: '#22C55E', description: 'Natural market dynamics' },
  mixed: { label: 'Mixed', color: '#EAB308', description: 'Some artificial signals detected' },
  engineered: { label: 'Engineered', color: '#EF4444', description: 'Significant manipulation signals' },
}

// Feature Scores (0-100)
export interface FeatureScores {
  attention: number      // Social mentions, velocity, author diversity
  liquidity: number      // Volume, depth, slippage quality
  whale: number          // Concentration, smart wallet overlap
  engineering: number    // Manipulation signals (higher = more suspicious)
  coherence: number      // Multi-window alignment
}

// Token
export interface Token {
  id: string
  address: string
  symbol: string
  name: string
  chain: Chain
  
  // Market Data
  price: number
  priceChange24h: number
  marketCap: number
  liquidity: number
  volume24h: number
  holders: number
  
  // Feature Scores
  scores: FeatureScores
  
  // Inference Results
  compositeScore: number  // 0-100 overall strength
  lifecycle: TokenLifecycle
  integrity: IntegrityGrade
  
  // Metadata
  imageUrl?: string
  website?: string
  twitter?: string
  telegram?: string
  
  // Timestamps
  snapshotTimestamp: string
  createdAt: string
}

// Meta (Narrative Cluster)
export interface Meta {
  id: string
  name: string
  description: string
  
  // Tokens in this meta
  tokenIds: string[]
  tokenCount: number
  
  // Aggregate scores
  avgCompositeScore: number
  avgAttention: number
  avgLiquidity: number
  
  // Meta-level metrics
  capitalFlow: number        // Net capital in/out
  momentum: number           // -100 to 100
  coherenceScore: number     // How aligned are member tokens
  
  // Lifecycle & Integrity
  lifecycle: TokenLifecycle
  integrity: IntegrityGrade
  
  // Chains present
  chains: Chain[]
  isCrossChain: boolean
  
  // Timestamps
  snapshotTimestamp: string
  createdAt: string
  persistenceSnapshots: number  // How many snapshots this meta has existed
}

// Snapshot
export interface Snapshot {
  id: string
  timestamp: string
  
  // Market Overview
  regime: MarketRegime
  totalTokens: number
  totalMetas: number
  
  // Chain Heat Scores
  chainHeat: Record<Chain, number>
  
  // Top movers
  topGainers: string[]     // Token IDs
  topLosers: string[]
  newEntrants: string[]
  
  // Meta movements
  risingMetas: string[]    // Meta IDs
  fallingMetas: string[]
  
  // System status
  isComplete: boolean
  computeTimeMs: number
}

// Driver Cards (UI explanations)
export interface DriverCard {
  layer: keyof FeatureScores
  title: string
  description: string
  value: number
  trend: 'up' | 'down' | 'stable'
  signals: string[]
}

// API Response Types
export interface DashboardData {
  snapshot: Snapshot
  metas: Meta[]
  featuredTokens: Token[]
  regime: MarketRegime
  lastUpdated: string
}

export interface TokenDetailData {
  token: Token
  drivers: DriverCard[]
  relatedMetas: Meta[]
  priceHistory: { timestamp: string; price: number }[]
  scoreHistory: { timestamp: string; scores: FeatureScores }[]
}

export interface MetaDetailData {
  meta: Meta
  tokens: Token[]
  capitalFlowHistory: { timestamp: string; flow: number }[]
  momentumHistory: { timestamp: string; momentum: number }[]
}
