import { 
  Token, Meta, Snapshot, DashboardData, 
  Chain, MarketRegime, TokenLifecycle, IntegrityGrade,
  FeatureScores
} from '@/types'

// Generate random score 0-100
const rs = (min = 30, max = 95) => Math.floor(Math.random() * (max - min + 1)) + min

// Generate feature scores
const genScores = (): FeatureScores => ({
  attention: rs(),
  liquidity: rs(),
  whale: rs(20, 80),
  engineering: rs(5, 40),
  coherence: rs(40, 90),
})

// Determine lifecycle from scores
const getLifecycle = (scores: FeatureScores): TokenLifecycle => {
  const { attention, liquidity, whale } = scores
  if (attention > 80 && liquidity < 50) return 'ignition'
  if (attention > 60 && liquidity > 60 && whale < 60) return 'expansion'
  if (attention > 75 && whale > 70) return 'crowding'
  if (attention < 50 && whale > 60) return 'distribution'
  return 'decay'
}

// Determine integrity from engineering score
const getIntegrity = (engineering: number): IntegrityGrade => {
  if (engineering < 25) return 'organic'
  if (engineering < 50) return 'mixed'
  return 'engineered'
}

// Mock Tokens
const TOKEN_TEMPLATES = [
  { symbol: 'BONK', name: 'Bonk', chain: 'solana' as Chain },
  { symbol: 'WIF', name: 'dogwifhat', chain: 'solana' as Chain },
  { symbol: 'POPCAT', name: 'Popcat', chain: 'solana' as Chain },
  { symbol: 'MYRO', name: 'Myro', chain: 'solana' as Chain },
  { symbol: 'BOME', name: 'Book of Meme', chain: 'solana' as Chain },
  { symbol: 'SLERF', name: 'Slerf', chain: 'solana' as Chain },
  { symbol: 'BRETT', name: 'Brett', chain: 'base' as Chain },
  { symbol: 'DEGEN', name: 'Degen', chain: 'base' as Chain },
  { symbol: 'TOSHI', name: 'Toshi', chain: 'base' as Chain },
  { symbol: 'AERO', name: 'Aerodrome', chain: 'base' as Chain },
  { symbol: 'PEPE', name: 'Pepe', chain: 'ethereum' as Chain },
  { symbol: 'SHIB', name: 'Shiba Inu', chain: 'ethereum' as Chain },
  { symbol: 'FLOKI', name: 'Floki', chain: 'ethereum' as Chain },
  { symbol: 'MOG', name: 'Mog Coin', chain: 'ethereum' as Chain },
  { symbol: 'CAKE', name: 'PancakeSwap', chain: 'bnb' as Chain },
  { symbol: 'BAKE', name: 'BakerySwap', chain: 'bnb' as Chain },
]

export function generateMockTokens(): Token[] {
  const now = new Date().toISOString()
  
  return TOKEN_TEMPLATES.map((t, i) => {
    const scores = genScores()
    const compositeScore = Math.round(
      (scores.attention * 0.25 + scores.liquidity * 0.25 + 
       scores.whale * 0.2 + (100 - scores.engineering) * 0.15 + 
       scores.coherence * 0.15)
    )
    
    return {
      id: `token-${i}`,
      address: `0x${Math.random().toString(16).slice(2, 42)}`,
      symbol: t.symbol,
      name: t.name,
      chain: t.chain,
      price: Math.random() * 10,
      priceChange24h: (Math.random() - 0.5) * 40,
      marketCap: rs(1, 500) * 1000000,
      liquidity: rs(200, 2000) * 1000,
      volume24h: rs(100, 5000) * 1000,
      holders: rs(500, 50000),
      scores,
      compositeScore,
      lifecycle: getLifecycle(scores),
      integrity: getIntegrity(scores.engineering),
      snapshotTimestamp: now,
      createdAt: now,
    }
  })
}

// Meta Templates
const META_TEMPLATES = [
  { name: 'Dog Coins', description: 'Canine-themed meme tokens across chains' },
  { name: 'Base Summer', description: 'Emerging Base ecosystem plays' },
  { name: 'AI Narrative', description: 'AI and ML focused projects' },
  { name: 'DeFi 2.0', description: 'Next-gen DeFi protocols' },
  { name: 'Gaming', description: 'GameFi and metaverse tokens' },
  { name: 'RWA', description: 'Real World Asset tokenization' },
]

export function generateMockMetas(tokens: Token[]): Meta[] {
  const now = new Date().toISOString()
  
  return META_TEMPLATES.slice(0, 6).map((m, i) => {
    // Assign 2-5 random tokens to each meta
    const metaTokens = tokens
      .sort(() => Math.random() - 0.5)
      .slice(0, rs(2, 5))
    
    const avgScores = {
      attention: Math.round(metaTokens.reduce((a, t) => a + t.scores.attention, 0) / metaTokens.length),
      liquidity: Math.round(metaTokens.reduce((a, t) => a + t.scores.liquidity, 0) / metaTokens.length),
    }
    
    const avgComposite = Math.round(
      metaTokens.reduce((a, t) => a + t.compositeScore, 0) / metaTokens.length
    )
    
    const chains = [...new Set(metaTokens.map(t => t.chain))]
    
    return {
      id: `meta-${i}`,
      name: m.name,
      description: m.description,
      tokenIds: metaTokens.map(t => t.id),
      tokenCount: metaTokens.length,
      avgCompositeScore: avgComposite,
      avgAttention: avgScores.attention,
      avgLiquidity: avgScores.liquidity,
      capitalFlow: (Math.random() - 0.4) * 2000000,
      momentum: Math.round((Math.random() - 0.5) * 200),
      coherenceScore: rs(50, 90),
      lifecycle: (['expansion', 'crowding', 'ignition'] as TokenLifecycle[])[i % 3],
      integrity: (['organic', 'mixed', 'organic'] as IntegrityGrade[])[i % 3],
      chains,
      isCrossChain: chains.length > 1,
      snapshotTimestamp: now,
      createdAt: now,
      persistenceSnapshots: rs(4, 48),
    }
  })
}

export function generateMockSnapshot(tokens: Token[], metas: Meta[]): Snapshot {
  const now = new Date().toISOString()
  
  // Calculate chain heat based on token scores
  const chainHeat: Record<Chain, number> = {
    solana: 0,
    base: 0,
    ethereum: 0,
    bnb: 0,
  }
  
  const chainCounts: Record<Chain, number> = { solana: 0, base: 0, ethereum: 0, bnb: 0 }
  
  tokens.forEach(t => {
    chainHeat[t.chain] += t.compositeScore
    chainCounts[t.chain]++
  })
  
  Object.keys(chainHeat).forEach(chain => {
    const c = chain as Chain
    chainHeat[c] = chainCounts[c] > 0 ? Math.round(chainHeat[c] / chainCounts[c]) : 50
  })
  
  // Determine regime
  const avgScore = tokens.reduce((a, t) => a + t.compositeScore, 0) / tokens.length
  const avgMomentum = metas.reduce((a, m) => a + m.momentum, 0) / metas.length
  
  let regime: MarketRegime = 'fragmented'
  if (avgScore > 70 && avgMomentum > 20) regime = 'expansion'
  else if (avgMomentum < -20) regime = 'contraction'
  else if (Math.abs(avgMomentum) < 10 && avgScore > 50) regime = 'rotation'
  
  return {
    id: `snapshot-${Date.now()}`,
    timestamp: now,
    regime,
    totalTokens: tokens.length,
    totalMetas: metas.length,
    chainHeat,
    topGainers: tokens.sort((a, b) => b.priceChange24h - a.priceChange24h).slice(0, 3).map(t => t.id),
    topLosers: tokens.sort((a, b) => a.priceChange24h - b.priceChange24h).slice(0, 3).map(t => t.id),
    newEntrants: tokens.slice(0, 2).map(t => t.id),
    risingMetas: metas.filter(m => m.momentum > 0).slice(0, 3).map(m => m.id),
    fallingMetas: metas.filter(m => m.momentum < 0).slice(0, 2).map(m => m.id),
    isComplete: true,
    computeTimeMs: rs(1200, 3500),
  }
}

export function generateDashboardData(): DashboardData {
  const tokens = generateMockTokens()
  const metas = generateMockMetas(tokens)
  const snapshot = generateMockSnapshot(tokens, metas)
  
  return {
    snapshot,
    metas: metas.sort((a, b) => b.avgCompositeScore - a.avgCompositeScore).slice(0, 6),
    featuredTokens: tokens.sort((a, b) => b.compositeScore - a.compositeScore).slice(0, 8),
    regime: snapshot.regime,
    lastUpdated: snapshot.timestamp,
  }
}

// Cache the data for consistent state within a session
let cachedData: { data: DashboardData; tokens: Token[]; timestamp: number } | null = null

export function getDashboardData(): DashboardData {
  const now = Date.now()
  // Refresh every 15 minutes
  if (!cachedData || now - cachedData.timestamp > 15 * 60 * 1000) {
    const tokens = generateMockTokens()
    const metas = generateMockMetas(tokens)
    const snapshot = generateMockSnapshot(tokens, metas)
    cachedData = {
      data: {
        snapshot,
        metas: metas.sort((a, b) => b.avgCompositeScore - a.avgCompositeScore).slice(0, 6),
        featuredTokens: tokens.sort((a, b) => b.compositeScore - a.compositeScore).slice(0, 8),
        regime: snapshot.regime,
        lastUpdated: snapshot.timestamp,
      },
      tokens,
      timestamp: now,
    }
  }
  return cachedData.data
}

export function getAllTokens(): Token[] {
  getDashboardData() // Ensure cache is populated
  return cachedData!.tokens
}

export function getTokenById(id: string): Token | undefined {
  return getAllTokens().find(t => t.id === id)
}

export function getMetaById(id: string): Meta | undefined {
  return getDashboardData().metas.find(m => m.id === id)
}
