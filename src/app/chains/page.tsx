import { getAllTokens, getDashboardData } from '@/lib/mock-data'
import { Navbar } from '@/components/layout/navbar'
import { TokenRow } from '@/components/dashboard/token-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Chain, CHAIN_CONFIG } from '@/types'
import { Link2, Droplets, Users, TrendingUp } from 'lucide-react'
import { formatNumber } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default function ChainsPage() {
  const { regime, lastUpdated, snapshot } = getDashboardData()
  const tokens = getAllTokens()
  
  // Group tokens by chain
  const chainGroups: Record<Chain, typeof tokens> = {
    solana: tokens.filter(t => t.chain === 'solana'),
    base: tokens.filter(t => t.chain === 'base'),
    ethereum: tokens.filter(t => t.chain === 'ethereum'),
    bnb: tokens.filter(t => t.chain === 'bnb'),
  }
  
  // Calculate chain stats
  const chainStats = Object.entries(chainGroups).map(([chain, chainTokens]) => {
    const c = chain as Chain
    const config = CHAIN_CONFIG[c]
    return {
      chain: c,
      config,
      heat: snapshot.chainHeat[c],
      tokenCount: chainTokens.length,
      totalLiquidity: chainTokens.reduce((a, t) => a + t.liquidity, 0),
      totalVolume: chainTokens.reduce((a, t) => a + t.volume24h, 0),
      avgScore: chainTokens.length > 0 
        ? Math.round(chainTokens.reduce((a, t) => a + t.compositeScore, 0) / chainTokens.length)
        : 0,
      tokens: chainTokens.sort((a, b) => b.compositeScore - a.compositeScore),
    }
  }).sort((a, b) => b.heat - a.heat)
  
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar regime={regime} lastUpdated={lastUpdated} />
      
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Link2 className="w-6 h-6 text-purple-400" />
              Chain Analysis
            </h1>
            <p className="text-gray-400">
              Cross-chain comparison of activity, liquidity, and token performance.
            </p>
          </div>
          
          {/* Chain Heat Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {chainStats.map(({ chain, config, heat, tokenCount, totalLiquidity, avgScore }) => (
              <Card 
                key={chain}
                className="p-4 relative overflow-hidden"
                style={{ borderColor: `${config.color}30` }}
              >
                {/* Background glow */}
                <div 
                  className="absolute inset-0 opacity-5"
                  style={{ background: `radial-gradient(circle at top right, ${config.color}, transparent 70%)` }}
                />
                
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <span 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: config.color }}
                    />
                    <span className="font-semibold text-white">{config.name}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Heat</p>
                      <p 
                        className="text-xl font-bold"
                        style={{ color: heat >= 70 ? '#22c55e' : heat >= 50 ? '#eab308' : '#71717a' }}
                      >
                        {heat}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Tokens</p>
                      <p className="text-xl font-bold text-white">{tokenCount}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Liquidity</p>
                      <p className="font-medium text-gray-300">${formatNumber(totalLiquidity)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Avg Score</p>
                      <p className="font-medium text-gray-300">{avgScore}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Chain Token Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {chainStats.map(({ chain, config, tokens: chainTokens }) => (
              <Card key={chain}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: config.color }}
                    />
                    {config.name} Tokens
                    <span className="text-sm font-normal text-gray-500">
                      ({chainTokens.length})
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {chainTokens.slice(0, 5).map(token => (
                    <TokenRow key={token.id} token={token} />
                  ))}
                  {chainTokens.length === 0 && (
                    <p className="text-sm text-gray-500 py-4 text-center">
                      No eligible tokens on {config.name}
                    </p>
                  )}
                  {chainTokens.length > 5 && (
                    <p className="text-xs text-gray-500 text-center pt-2">
                      +{chainTokens.length - 5} more tokens
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
        </div>
      </main>
    </div>
  )
}
