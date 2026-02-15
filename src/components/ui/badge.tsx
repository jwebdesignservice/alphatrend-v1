'use client'

import { cn } from '@/lib/utils'
import { 
  TokenLifecycle, IntegrityGrade, Chain,
  LIFECYCLE_CONFIG, INTEGRITY_CONFIG, CHAIN_CONFIG 
} from '@/types'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
        variant === 'default' && 'bg-[#222230] text-white',
        variant === 'outline' && 'border border-[#333340] text-gray-300',
        className
      )}
      {...props}
    />
  )
}

export function LifecycleBadge({ lifecycle }: { lifecycle: TokenLifecycle }) {
  const config = LIFECYCLE_CONFIG[lifecycle]
  return (
    <Badge 
      className="gap-1"
      style={{ 
        backgroundColor: `${config.color}20`,
        color: config.color,
        borderColor: `${config.color}40`
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.color }} />
      {config.label}
    </Badge>
  )
}

export function IntegrityBadge({ integrity }: { integrity: IntegrityGrade }) {
  const config = INTEGRITY_CONFIG[integrity]
  return (
    <Badge 
      style={{ 
        backgroundColor: `${config.color}20`,
        color: config.color 
      }}
    >
      {config.label}
    </Badge>
  )
}

export function ChainBadge({ chain }: { chain: Chain }) {
  const config = CHAIN_CONFIG[chain]
  return (
    <Badge 
      className="gap-1"
      style={{ 
        backgroundColor: `${config.color}20`,
        color: config.color 
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.color }} />
      {config.name}
    </Badge>
  )
}

export function ScoreBadge({ score, label }: { score: number; label?: string }) {
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#3b82f6' : score >= 40 ? '#eab308' : '#ef4444'
  return (
    <Badge style={{ backgroundColor: `${color}20`, color }}>
      {label && <span className="mr-1 opacity-70">{label}</span>}
      {score}
    </Badge>
  )
}
