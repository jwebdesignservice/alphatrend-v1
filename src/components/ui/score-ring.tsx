'use client'

import { cn } from '@/lib/utils'

interface ScoreRingProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function ScoreRing({ score, size = 'md', showLabel = true, className }: ScoreRingProps) {
  const sizes = {
    sm: { ring: 40, stroke: 3, text: 'text-xs' },
    md: { ring: 60, stroke: 4, text: 'text-sm' },
    lg: { ring: 80, stroke: 5, text: 'text-lg' },
  }
  
  const { ring, stroke, text } = sizes[size]
  const radius = (ring - stroke) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (score / 100) * circumference
  
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#3b82f6' : score >= 40 ? '#eab308' : '#ef4444'
  
  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={ring} height={ring} className="-rotate-90">
        {/* Background ring */}
        <circle
          cx={ring / 2}
          cy={ring / 2}
          r={radius}
          fill="none"
          stroke="#222230"
          strokeWidth={stroke}
        />
        {/* Score ring */}
        <circle
          cx={ring / 2}
          cy={ring / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500"
        />
      </svg>
      {showLabel && (
        <span 
          className={cn('absolute font-semibold', text)}
          style={{ color }}
        >
          {score}
        </span>
      )}
    </div>
  )
}
