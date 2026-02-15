'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, TrendingUp, Layers, Link2, 
  Settings, LogOut, Activity
} from 'lucide-react'
import { MarketRegime, REGIME_CONFIG } from '@/types'

interface NavbarProps {
  regime?: MarketRegime
  lastUpdated?: string
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/trending', label: 'Trending', icon: TrendingUp },
  { href: '/metas', label: 'Metas', icon: Layers },
  { href: '/chains', label: 'Chains', icon: Link2 },
]

export function Navbar({ regime = 'rotation', lastUpdated }: NavbarProps) {
  const pathname = usePathname()
  const regimeConfig = REGIME_CONFIG[regime]
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#222230] bg-[#0a0a0f]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo & Brand */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">AlphaTrend</span>
          </Link>
          
          {/* Center Nav */}
          <div className="flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive 
                      ? 'bg-[#222230] text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-[#16161f]'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
          
          {/* Right Side - Regime & Status */}
          <div className="flex items-center gap-4">
            {/* Market Regime */}
            <div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: `${regimeConfig.color}15`,
                color: regimeConfig.color 
              }}
            >
              <span 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: regimeConfig.color }}
              />
              {regimeConfig.label}
            </div>
            
            {/* Last Updated */}
            {lastUpdated && (
              <span className="text-xs text-gray-500">
                Updated {new Date(lastUpdated).toLocaleTimeString()}
              </span>
            )}
            
            {/* User Menu */}
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#16161f] transition-colors">
                <Settings className="w-4 h-4" />
              </button>
              <form action="/auth/signout" method="post">
                <button 
                  type="submit"
                  className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
