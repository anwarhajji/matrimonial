// utils/authenticatePusher.ts

import { authenticate } from '@/actions/pusherAuth'
import { getCurrentUser } from '@/actions/userdata'

export async function authenticatePusher(
  socket_id: string,
  channel_name: string
) {
  const user_id = await getCurrentUser().then((user) => user?.id!)
  // Replace with your user ID logic
  const mynam = await getCurrentUser().then((user) => user?.name!)
  const user_info = { name: mynam } // Replace with your user info logic

  const authResponse = await authenticate({
    socket_id,
    channel_name,
    user_id,
    user_info
  })

  return authResponse
}
