'use client'

import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Chain, CHAIN_CONFIG } from '@/types'
import { cn } from '@/lib/utils'

interface ChainHeatProps {
  chainHeat: Record<Chain, number>
}

export function ChainHeat({ chainHeat }: ChainHeatProps) {
  const chains = Object.entries(chainHeat).sort((a, b) => b[1] - a[1]) as [Chain, number][]
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Chain Heat</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {chains.map(([chain, heat]) => {
          const config = CHAIN_CONFIG[chain]
          const heatLevel = heat >= 75 ? 'hot' : heat >= 50 ? 'warm' : 'cool'
          
          return (
            <Link 
              key={chain}
              href={`/chains?focus=${chain}`}
              className="block group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                  <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                    {config.name}
                  </span>
                </div>
                <span 
                  className={cn(
                    'text-sm font-semibold',
                    heatLevel === 'hot' && 'text-green-400',
                    heatLevel === 'warm' && 'text-yellow-400',
                    heatLevel === 'cool' && 'text-gray-400',
                  )}
                >
                  {heat}
                </span>
              </div>
              <div className="h-2 bg-[#222230] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${heat}%`,
                    backgroundColor: config.color,
                    opacity: 0.8
                  }}
                />
              </div>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}
