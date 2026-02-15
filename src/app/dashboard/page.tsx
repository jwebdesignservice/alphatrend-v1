import { getDashboardData } from '@/lib/mock-data'
import { Navbar } from '@/components/layout/navbar'
import { MetaCard } from '@/components/dashboard/meta-card'
import { TokenCard } from '@/components/dashboard/token-card'
import { ChainHeat } from '@/components/dashboard/chain-heat'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { REGIME_CONFIG } from '@/types'
import { 
  TrendingUp, Clock, Layers, Coins, 
  AlertTriangle, Zap
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const data = getDashboardData()
  const regimeConfig = REGIME_CONFIG[data.regime]
  
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar regime={data.regime} lastUpdated={data.lastUpdated} />
      
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Layers className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Active Metas</p>
                  <p className="text-2xl font-bold">{data.metas.length}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Coins className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Tracked Tokens</p>
                  <p className="text-2xl font-bold">{data.snapshot.totalTokens}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${regimeConfig.color}20` }}
                >
                  <Zap className="w-5 h-5" style={{ color: regimeConfig.color }} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Market Regime</p>
                  <p className="text-xl font-bold" style={{ color: regimeConfig.color }}>
                    {regimeConfig.label}
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Clock className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Next Snapshot</p>
                  <p className="text-2xl font-bold">~15m</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Meta Board - Takes 2 columns */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="w-5 h-5 text-blue-400" />
                      Meta Board
                    </CardTitle>
                    <span className="text-xs text-gray-500">
                      Emergent narrative clusters
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.metas.slice(0, 6).map((meta, i) => (
                      <MetaCard key={meta.id} meta={meta} rank={i + 1} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Chain Heat */}
              <ChainHeat chainHeat={data.snapshot.chainHeat} />
              
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    System Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-400 space-y-2">
                  <p>• Snapshot computed in {data.snapshot.computeTimeMs}ms</p>
                  <p>• {data.snapshot.newEntrants.length} new tokens this cycle</p>
                  <p>• {data.metas.filter(m => m.isCrossChain).length} cross-chain metas active</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Featured Tokens */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Featured Tokens
                </CardTitle>
                <span className="text-xs text-gray-500">
                  Highest composite scores
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.featuredTokens.slice(0, 8).map(token => (
                  <TokenCard key={token.id} token={token} />
                ))}
              </div>
            </CardContent>
          </Card>
          
        </div>
      </main>
    </div>
  )
}
