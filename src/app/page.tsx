import Link from 'next/link'
import { Activity, ArrowRight, Layers, TrendingUp, Link2, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-5xl mx-auto px-4 py-24 text-center">
          {/* Logo */}
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">AlphaTrend</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Cross-Chain Market<br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Intelligence
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Real-time structural analysis of crypto markets across Solana, Base, Ethereum, and BNB. 
            Understand attention, liquidity, and market integrity at a glance.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg flex items-center gap-2 transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-[#222230] hover:bg-[#333340] text-white font-medium rounded-lg transition-colors"
            >
              View Demo
            </Link>
          </div>
        </div>
      </div>
      
      {/* Features */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-white text-center mb-12">
          What AlphaTrend Provides
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-[#111118] border border-[#222230]">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
              <Layers className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Meta Clusters</h3>
            <p className="text-sm text-gray-400">
              Emergent narrative groupings detected through capital correlation and token similarity.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-[#111118] border border-[#222230]">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Lifecycle Tracking</h3>
            <p className="text-sm text-gray-400">
              Identify where tokens are in their lifecycle: Ignition, Expansion, Crowding, Distribution, or Decay.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-[#111118] border border-[#222230]">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
              <Link2 className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Cross-Chain</h3>
            <p className="text-sm text-gray-400">
              Unified view across Solana, Base, Ethereum, and BNB with chain-specific heat scores.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-[#111118] border border-[#222230]">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Integrity Grading</h3>
            <p className="text-sm text-gray-400">
              Detect manipulation with organic, mixed, and engineered integrity classifications.
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-[#222230]">
          <h2 className="text-2xl font-bold text-white mb-4">
            15-Minute Snapshot Architecture
          </h2>
          <p className="text-gray-400 mb-6">
            Every 15 minutes, AlphaTrend computes a complete market snapshot. 
            Atomic, immutable, and deterministic analysis of market structure.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Exploring
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-[#222230] py-8">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-white">AlphaTrend</span>
          </div>
          <p className="text-sm text-gray-500">
            Market intelligence, not trading signals.
          </p>
        </div>
      </footer>
    </div>
  )
}
