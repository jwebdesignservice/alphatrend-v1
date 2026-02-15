'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { LifecycleBadge, IntegrityBadge, ChainBadge, ScoreBadge } from '@/components/ui/badge'
import { Token } from '@/types'
import { formatNumber, formatPrice, formatPercent, getChangeColor } from '@/lib/utils'
import { TrendingUp, TrendingDown, Droplets, Users } from 'lucide-react'

interface TokenCardProps {
  token: Token
  showDetails?: boolean
}

export function TokenCard({ token, showDetails = false }: TokenCardProps) {
  const isPositive = token.priceChange24h >= 0
  
  return (
    <Link href={`/tokens/${token.id}`}>
      <Card variant="interactive" className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            {/* Token Avatar */}
            <div 
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center text-lg font-bold"
            >
              {token.symbol.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{token.symbol}</h3>
                <ChainBadge chain={token.chain} />
              </div>
              <p className="text-xs text-gray-500">{token.name}</p>
            </div>
          </div>
          
          {/* Score */}
          <ScoreBadge score={token.compositeScore} />
        </div>
        
        {/* Price Row */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-semibold">{formatPrice(token.price)}</span>
          <span className={`flex items-center gap-1 text-sm ${getChangeColor(token.priceChange24h)}`}>
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {formatPercent(token.priceChange24h)}
          </span>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Droplets className="w-3 h-3" />
            ${formatNumber(token.liquidity)}
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            ${formatNumber(token.volume24h)}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {formatNumber(token.holders, 0)}
          </div>
        </div>
        
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          <LifecycleBadge lifecycle={token.lifecycle} />
          <IntegrityBadge integrity={token.integrity} />
        </div>
        
        {/* Feature Scores (optional detail view) */}
        {showDetails && (
          <div className="mt-3 pt-3 border-t border-[#222230]">
            <div className="grid grid-cols-5 gap-1 text-xs">
              <div className="text-center">
                <div className="text-gray-500 mb-1">ATT</div>
                <div className="font-medium">{token.scores.attention}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 mb-1">LIQ</div>
                <div className="font-medium">{token.scores.liquidity}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 mb-1">WHL</div>
                <div className="font-medium">{token.scores.whale}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 mb-1">ENG</div>
                <div className="font-medium">{token.scores.engineering}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 mb-1">COH</div>
                <div className="font-medium">{token.scores.coherence}</div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </Link>
  )
}

// Compact row version for lists
export function TokenRow({ token }: { token: Token }) {
  const isPositive = token.priceChange24h >= 0
  
  return (
    <Link href={`/tokens/${token.id}`}>
      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-[#16161f] transition-colors">
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center text-sm font-bold"
          >
            {token.symbol.slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{token.symbol}</span>
              <ChainBadge chain={token.chain} />
            </div>
            <span className="text-xs text-gray-500">{formatPrice(token.price)}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className={`text-sm ${getChangeColor(token.priceChange24h)}`}>
            {formatPercent(token.priceChange24h)}
          </span>
          <ScoreBadge score={token.compositeScore} />
          <LifecycleBadge lifecycle={token.lifecycle} />
        </div>
      </div>
    </Link>
  )
}
