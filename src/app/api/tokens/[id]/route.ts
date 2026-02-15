import { NextResponse } from 'next/server'
import { getTokenById } from '@/lib/mock-data'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = getTokenById(params.id)
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ token })
  } catch (error) {
    console.error('Token API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch token' },
      { status: 500 }
    )
  }
}
