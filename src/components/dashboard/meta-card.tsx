'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { LifecycleBadge, IntegrityBadge, ChainBadge } from '@/components/ui/badge'
import { ScoreRing } from '@/components/ui/score-ring'
import { Meta } from '@/types'
import { formatNumber, getChangeColor } from '@/lib/utils'
import { TrendingUp, TrendingDown, Users, Zap } from 'lucide-react'

interface MetaCardProps {
  meta: Meta
  rank?: number
}

export function MetaCard({ meta, rank }: MetaCardProps) {
  const isPositive = meta.momentum >= 0
  
  return (
    <Link href={`/metas/${meta.id}`}>
      <Card variant="interactive" className="p-4 h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {rank && (
              <span className="text-2xl font-bold text-gray-600">#{rank}</span>
            )}
            <div>
              <h3 className="font-semibold text-white">{meta.name}</h3>
              <p className="text-xs text-gray-500">{meta.tokenCount} tokens</p>
            </div>
          </div>
          <ScoreRing score={meta.avgCompositeScore} size="sm" />
        </div>
        
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
          {meta.description}
        </p>
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-sm">
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-red-400" />
            )}
            <span className={getChangeColor(meta.momentum)}>
              {meta.momentum > 0 ? '+' : ''}{meta.momentum}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <Zap className="w-3.5 h-3.5" />
            <span>${formatNumber(Math.abs(meta.capitalFlow))}</span>
          </div>
        </div>
        
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <LifecycleBadge lifecycle={meta.lifecycle} />
          <IntegrityBadge integrity={meta.integrity} />
        </div>
        
        {/* Chain Pills */}
        <div className="flex flex-wrap gap-1">
          {meta.chains.map(chain => (
            <ChainBadge key={chain} chain={chain} />
          ))}
          {meta.isCrossChain && (
            <span className="text-xs text-purple-400 flex items-center gap-1">
              <Users className="w-3 h-3" />
              Cross-chain
            </span>
          )}
        </div>
      </Card>
    </Link>
  )
}
