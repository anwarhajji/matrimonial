// app/api/user/[userId]/status/route.js

import { getUserStatus } from '@/actions/userdata'
//import { headers } from 'next/headers'

// app/api/user/[userId]/status/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {
  try {
    // const headersList = headers()
    const status = await getUserStatus(params.userId)
    return new NextResponse(JSON.stringify({ status }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to get user status' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
