import { getDashboardData } from '@/lib/mock-data'
import { Navbar } from '@/components/layout/navbar'
import { MetaCard } from '@/components/dashboard/meta-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Layers, Info } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function MetasPage() {
  const { regime, lastUpdated, metas } = getDashboardData()
  
  // Sort by composite score
  const sortedMetas = [...metas].sort((a, b) => b.avgCompositeScore - a.avgCompositeScore)
  
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar regime={regime} lastUpdated={lastUpdated} />
      
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Page Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Layers className="w-6 h-6 text-blue-400" />
                Meta Clusters
              </h1>
              <p className="text-gray-400">
                Emergent narrative groupings detected through token similarity and capital flow patterns.
              </p>
            </div>
          </div>
          
          {/* Info Banner */}
          <Card className="bg-blue-500/5 border-blue-500/20">
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-300">
                  <p className="mb-1">
                    <strong>Metas are not tags.</strong> They&apos;re emergent clusters detected through embedding similarity, 
                    capital correlation, and temporal co-movement.
                  </p>
                  <p className="text-gray-500">
                    A meta must persist for ≥2 snapshots and contain ≥3 tokens to be listed. 
                    Flash clusters are suppressed to reduce noise.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Meta Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedMetas.map((meta, i) => (
              <MetaCard key={meta.id} meta={meta} rank={i + 1} />
            ))}
          </div>
          
          {sortedMetas.length === 0 && (
            <Card className="py-12">
              <p className="text-center text-gray-500">
                No metas detected in current snapshot
              </p>
            </Card>
          )}
          
        </div>
      </main>
    </div>
  )
}
