import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatNumber(num: number, decimals = 2): string {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(decimals)}B`
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(decimals)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(decimals)}K`
  return num.toFixed(decimals)
}

export function formatPercent(num: number): string {
  const sign = num >= 0 ? '+' : ''
  return `${sign}${num.toFixed(2)}%`
}

export function formatPrice(num: number): string {
  if (num < 0.0001) return `$${num.toExponential(2)}`
  if (num < 1) return `$${num.toFixed(6)}`
  return `$${num.toFixed(2)}`
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-400'
  if (score >= 60) return 'text-blue-400'
  if (score >= 40) return 'text-yellow-400'
  return 'text-red-400'
}

export function getScoreBgColor(score: number): string {
  if (score >= 80) return 'bg-green-500/20'
  if (score >= 60) return 'bg-blue-500/20'
  if (score >= 40) return 'bg-yellow-500/20'
  return 'bg-red-500/20'
}

export function getChangeColor(change: number): string {
  if (change > 0) return 'text-green-400'
  if (change < 0) return 'text-red-400'
  return 'text-gray-400'
}

export function timeAgo(date: string | Date): string {
  const now = new Date()
  const then = new Date(date)
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000)
  
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}
