import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getMetaById, getAllTokens, getDashboardData } from '@/lib/mock-data'
import { Navbar } from '@/components/layout/navbar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { TokenRow } from '@/components/dashboard/token-card'
import { LifecycleBadge, IntegrityBadge, ChainBadge } from '@/components/ui/badge'
import { ScoreRing } from '@/components/ui/score-ring'
import { formatNumber, getChangeColor } from '@/lib/utils'
import { LIFECYCLE_CONFIG, INTEGRITY_CONFIG } from '@/types'
import { 
  ArrowLeft, TrendingUp, TrendingDown, Zap, Users,
  Activity, Layers, Clock, AlertTriangle
} from 'lucide-react'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: { id: string }
}

export default function MetaDetailPage({ params }: PageProps) {
  const meta = getMetaById(params.id)
  const { regime, lastUpdated } = getDashboardData()
  const allTokens = getAllTokens()
  
  if (!meta) {
    notFound()
  }
  
  // Get tokens in this meta
  const metaTokens = allTokens.filter(t => meta.tokenIds.includes(t.id))
    .sort((a, b) => b.compositeScore - a.compositeScore)
  
  const isPositive = meta.momentum >= 0
  const lifecycleConfig = LIFECYCLE_CONFIG[meta.lifecycle]
  const integrityConfig = INTEGRITY_CONFIG[meta.integrity]
  
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar regime={regime} lastUpdated={lastUpdated} />
      
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Back Link */}
          <Link 
            href="/metas"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Metas
          </Link>
          
          {/* Meta Header */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Layers className="w-6 h-6 text-blue-400" />
                  <h1 className="text-2xl font-bold text-white">{meta.name}</h1>
                </div>
                <p className="text-gray-400 mb-4 max-w-xl">{meta.description}</p>
                
                {/* Key Metrics */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-300">{meta.tokenCount} tokens</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                    <span className={`text-sm ${getChangeColor(meta.momentum)}`}>
                      {meta.momentum > 0 ? '+' : ''}{meta.momentum} momentum
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-300">
                      ${formatNumber(Math.abs(meta.capitalFlow))} {meta.capitalFlow >= 0 ? 'inflow' : 'outflow'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Score Ring */}
              <div className="flex flex-col items-center">
                <ScoreRing score={meta.avgCompositeScore} size="lg" />
                <span className="text-sm text-gray-400 mt-2">Avg Score</span>
              </div>
            </div>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-[#222230]">
              <LifecycleBadge lifecycle={meta.lifecycle} />
              <IntegrityBadge integrity={meta.integrity} />
              {meta.chains.map(chain => (
                <ChainBadge key={chain} chain={chain} />
              ))}
              {meta.isCrossChain && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-500/20 text-purple-400">
                  Cross-chain
                </span>
              )}
            </div>
          </Card>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-400">Avg Attention</span>
              </div>
              <p className="text-xl font-bold">{meta.avgAttention}</p>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-400">Avg Liquidity</span>
              </div>
              <p className="text-xl font-bold">{meta.avgLiquidity}</p>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-400">Coherence</span>
              </div>
              <p className="text-xl font-bold">{meta.coherenceScore}</p>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-400">Persistence</span>
              </div>
              <p className="text-xl font-bold">{meta.persistenceSnapshots} <span className="text-sm font-normal text-gray-500">snapshots</span></p>
            </Card>
          </div>
          
          {/* Classification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lifecycle */}
            <Card 
              className="p-6"
              style={{ borderColor: `${lifecycleConfig.color}30` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5" style={{ color: lifecycleConfig.color }} />
                <span className="font-semibold" style={{ color: lifecycleConfig.color }}>
                  {lifecycleConfig.label} Phase
                </span>
              </div>
              <p className="text-sm text-gray-400">{lifecycleConfig.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Meta lifecycle is computed independently from individual token lifecycles based on aggregate capital flow and momentum.
              </p>
            </Card>
            
            {/* Integrity */}
            <Card 
              className="p-6"
              style={{ borderColor: `${integrityConfig.color}30` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5" style={{ color: integrityConfig.color }} />
                <span className="font-semibold" style={{ color: integrityConfig.color }}>
                  {integrityConfig.label} Integrity
                </span>
              </div>
              <p className="text-sm text-gray-400">{integrityConfig.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Meta integrity reflects the weighted average of member token integrity grades.
              </p>
            </Card>
          </div>
          
          {/* Member Tokens */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Member Tokens
                <span className="text-sm font-normal text-gray-500">({metaTokens.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {metaTokens.map(token => (
                <TokenRow key={token.id} token={token} />
              ))}
              {metaTokens.length === 0 && (
                <p className="text-sm text-gray-500 py-4 text-center">
                  No tokens in this meta
                </p>
              )}
            </CardContent>
          </Card>
          
        </div>
      </main>
    </div>
  )
}
