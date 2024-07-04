// app/api/pusher/auth/route.ts
import { auth } from '@/auth'
import { pusherServer } from '@/lib/pusher'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await request.text()
  const [socketId, channelName] = data.split('&').map((str) => str.split('='))
  const socketIdd = socketId.join(',')
  const channel = channelName.join(',')

  const authResponse = pusherServer.authorizeChannel(socketIdd, channel, {
    user_id: session.user.email
  })

  return NextResponse.json(authResponse)
}
