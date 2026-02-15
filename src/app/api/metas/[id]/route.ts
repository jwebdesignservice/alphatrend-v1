import { NextResponse } from 'next/server'
import { getMetaById, getAllTokens } from '@/lib/mock-data'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const meta = getMetaById(params.id)
    
    if (!meta) {
      return NextResponse.json(
        { error: 'Meta not found' },
        { status: 404 }
      )
    }
    
    // Get tokens in this meta
    const allTokens = getAllTokens()
    const tokens = allTokens.filter(t => meta.tokenIds.includes(t.id))
    
    return NextResponse.json({ meta, tokens })
  } catch (error) {
    console.error('Meta API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch meta' },
      { status: 500 }
    )
  }
}
