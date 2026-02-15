import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTokenById, getDashboardData } from '@/lib/mock-data'
import { Navbar } from '@/components/layout/navbar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { LifecycleBadge, IntegrityBadge, ChainBadge, ScoreBadge } from '@/components/ui/badge'
import { ScoreRing } from '@/components/ui/score-ring'
import { FeatureRadar } from '@/components/dashboard/feature-radar'
import { formatNumber, formatPrice, formatPercent, getChangeColor } from '@/lib/utils'
import { LIFECYCLE_CONFIG, INTEGRITY_CONFIG } from '@/types'
import { 
  ArrowLeft, TrendingUp, TrendingDown, Droplets,
  Eye, Activity, Wallet, AlertTriangle, Zap
} from 'lucide-react'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: { id: string }
}

export default function TokenDetailPage({ params }: PageProps) {
  const token = getTokenById(params.id)
  const { regime, lastUpdated } = getDashboardData()
  
  if (!token) {
    notFound()
  }
  
  const isPositive = token.priceChange24h >= 0
  const lifecycleConfig = LIFECYCLE_CONFIG[token.lifecycle]
  const integrityConfig = INTEGRITY_CONFIG[token.integrity]
  
  // Driver cards explain what's driving the scores
  const drivers = [
    {
      layer: 'attention',
      icon: Eye,
      title: 'Attention Layer',
      value: token.scores.attention,
      signals: [
        `Social velocity ${token.scores.attention > 70 ? 'elevated' : 'moderate'}`,
        'Author diversity detected',
        token.scores.attention > 80 ? 'Trending mentions' : 'Steady mention rate',
      ]
    },
    {
      layer: 'liquidity',
      icon: Droplets,
      title: 'Liquidity Layer',
      value: token.scores.liquidity,
      signals: [
        `$${formatNumber(token.liquidity)} total liquidity`,
        `$${formatNumber(token.volume24h)} 24h volume`,
        token.scores.liquidity > 70 ? 'Deep order books' : 'Standard depth',
      ]
    },
    {
      layer: 'whale',
      icon: Wallet,
      title: 'Whale Layer',
      value: token.scores.whale,
      signals: [
        `${formatNumber(token.holders, 0)} holders`,
        token.scores.whale > 70 ? 'Smart wallet accumulation' : 'Normal holder distribution',
        'Concentration within range',
      ]
    },
    {
      layer: 'engineering',
      icon: AlertTriangle,
      title: 'Engineering Layer',
      value: token.scores.engineering,
      signals: [
        token.scores.engineering < 30 ? 'No manipulation flags' : 'Some coordination detected',
        token.scores.engineering < 50 ? 'Natural patterns' : 'Boosting signals present',
        `Integrity: ${integrityConfig.label}`,
      ]
    },
    {
      layer: 'coherence',
      icon: Zap,
      title: 'Coherence Layer',
      value: token.scores.coherence,
      signals: [
        token.scores.coherence > 70 ? 'Multi-window alignment strong' : 'Mixed timeframe signals',
        'Layer agreement measured',
        token.scores.coherence > 60 ? 'Consistent momentum' : 'Conflicting indicators',
      ]
    },
  ]
  
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar regime={regime} lastUpdated={lastUpdated} />
      
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Back Link */}
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          
          {/* Token Header */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex items-start gap-4">
                {/* Token Avatar */}
                <div 
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center text-2xl font-bold"
                >
                  {token.symbol.slice(0, 2)}
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-white">{token.symbol}</h1>
                    <ChainBadge chain={token.chain} />
                  </div>
                  <p className="text-gray-400 mb-3">{token.name}</p>
                  
                  {/* Price */}
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold">{formatPrice(token.price)}</span>
                    <span className={`flex items-center gap-1 text-lg ${getChangeColor(token.priceChange24h)}`}>
                      {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                      {formatPercent(token.priceChange24h)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Score Ring */}
              <div className="flex flex-col items-center">
                <ScoreRing score={token.compositeScore} size="lg" />
                <span className="text-sm text-gray-400 mt-2">Composite Score</span>
              </div>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#222230]">
              <div>
                <p className="text-sm text-gray-500 mb-1">Market Cap</p>
                <p className="text-lg font-semibold">${formatNumber(token.marketCap)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Liquidity</p>
                <p className="text-lg font-semibold">${formatNumber(token.liquidity)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">24h Volume</p>
                <p className="text-lg font-semibold">${formatNumber(token.volume24h)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Holders</p>
                <p className="text-lg font-semibold">{formatNumber(token.holders, 0)}</p>
              </div>
            </div>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              <LifecycleBadge lifecycle={token.lifecycle} />
              <IntegrityBadge integrity={token.integrity} />
            </div>
          </Card>
          
          {/* Feature Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Radar Chart */}
            <Card className="p-6 flex flex-col items-center justify-center">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Feature Profile</h3>
              <FeatureRadar scores={token.scores} size={220} />
            </Card>
            
            {/* Lifecycle & Integrity */}
            <Card className="p-6 lg:col-span-2">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Classification</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lifecycle */}
                <div 
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: `${lifecycleConfig.color}10` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5" style={{ color: lifecycleConfig.color }} />
                    <span className="font-semibold" style={{ color: lifecycleConfig.color }}>
                      {lifecycleConfig.label} Phase
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{lifecycleConfig.description}</p>
                </div>
                
                {/* Integrity */}
                <div 
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: `${integrityConfig.color}10` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5" style={{ color: integrityConfig.color }} />
                    <span className="font-semibold" style={{ color: integrityConfig.color }}>
                      {integrityConfig.label} Integrity
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{integrityConfig.description}</p>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Driver Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Score Drivers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {drivers.map(driver => {
                  const Icon = driver.icon
                  
                  return (
                    <div 
                      key={driver.layer}
                      className="p-4 rounded-lg border border-[#222230] bg-[#111118]"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-sm">{driver.title}</span>
                        </div>
                        <ScoreBadge score={driver.value} />
                      </div>
                      <ul className="space-y-1">
                        {driver.signals.map((signal, i) => (
                          <li key={i} className="text-xs text-gray-500 flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-gray-600 mt-1.5 flex-shrink-0" />
                            {signal}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
          
        </div>
      </main>
    </div>
  )
}
