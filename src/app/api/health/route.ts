import { NextResponse } from 'next/server'
import { LUDWITT_API_VERSION, UPDATE_INSTRUCTIONS } from '@/config/agent-api'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    apiVersion: LUDWITT_API_VERSION,
    updateInstructions: UPDATE_INSTRUCTIONS,
  })
}
