// app/actions/pusherAuth.ts
'use server'

import { pusherServer } from '@/lib/pusher'

interface AuthParams {
  socket_id: string
  channel_name: string
  user_id: string
  user_info: { name: string }
}

export async function authenticate({
  socket_id,
  channel_name,
  user_id,
  user_info
}: AuthParams) {
  const auth = pusherServer.authorizeChannel(socket_id, channel_name, {
    user_id,
    user_info
  })

  return auth
}
