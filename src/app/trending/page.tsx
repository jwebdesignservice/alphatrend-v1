import { getAllTokens, getDashboardData } from '@/lib/mock-data'
import { Navbar } from '@/components/layout/navbar'
import { TokenRow } from '@/components/dashboard/token-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { IntegrityBadge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Sparkles, Shield, AlertTriangle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function TrendingPage() {
  const { regime, lastUpdated } = getDashboardData()
  const tokens = getAllTokens()
  
  // Segment by integrity
  const organic = tokens.filter(t => t.integrity === 'organic')
  const mixed = tokens.filter(t => t.integrity === 'mixed')
  const engineered = tokens.filter(t => t.integrity === 'engineered')
  
  // Sort each by composite score
  organic.sort((a, b) => b.compositeScore - a.compositeScore)
  mixed.sort((a, b) => b.compositeScore - a.compositeScore)
  engineered.sort((a, b) => b.compositeScore - a.compositeScore)
  
  // Top gainers and losers
  const sortedByChange = [...tokens].sort((a, b) => b.priceChange24h - a.priceChange24h)
  const topGainers = sortedByChange.slice(0, 5)
  const topLosers = sortedByChange.slice(-5).reverse()
  
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar regime={regime} lastUpdated={lastUpdated} />
      
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Trending</h1>
            <p className="text-gray-400">
              Tokens segmented by integrity grade. Higher integrity = more organic market dynamics.
            </p>
          </div>
          
          {/* Top Movers Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <TrendingUp className="w-5 h-5" />
                  Top Gainers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {topGainers.map(token => (
                  <TokenRow key={token.id} token={token} />
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <TrendingDown className="w-5 h-5" />
                  Top Losers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {topLosers.map(token => (
                  <TokenRow key={token.id} token={token} />
                ))}
              </CardContent>
            </Card>
          </div>
          
          {/* Integrity Segments */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Organic */}
            <Card className="border-green-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    Organic
                  </CardTitle>
                  <IntegrityBadge integrity="organic" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Natural market dynamics, minimal manipulation signals
                </p>
              </CardHeader>
              <CardContent className="space-y-1">
                {organic.slice(0, 8).map(token => (
                  <TokenRow key={token.id} token={token} />
                ))}
                {organic.length === 0 && (
                  <p className="text-sm text-gray-500 py-4 text-center">
                    No organic tokens in current snapshot
                  </p>
                )}
              </CardContent>
            </Card>
            
            {/* Mixed */}
            <Card className="border-yellow-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    Mixed
                  </CardTitle>
                  <IntegrityBadge integrity="mixed" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Some artificial signals detected, use caution
                </p>
              </CardHeader>
              <CardContent className="space-y-1">
                {mixed.slice(0, 8).map(token => (
                  <TokenRow key={token.id} token={token} />
                ))}
                {mixed.length === 0 && (
                  <p className="text-sm text-gray-500 py-4 text-center">
                    No mixed tokens in current snapshot
                  </p>
                )}
              </CardContent>
            </Card>
            
            {/* Engineered */}
            <Card className="border-red-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    Engineered
                  </CardTitle>
                  <IntegrityBadge integrity="engineered" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Significant manipulation signals, high risk
                </p>
              </CardHeader>
              <CardContent className="space-y-1">
                {engineered.slice(0, 8).map(token => (
                  <TokenRow key={token.id} token={token} />
                ))}
                {engineered.length === 0 && (
                  <p className="text-sm text-gray-500 py-4 text-center">
                    No engineered tokens detected
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          
        </div>
      </main>
    </div>
  )
}
