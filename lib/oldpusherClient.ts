// pusherClient.ts
import Pusher from 'pusher-js'
import { authenticate } from '@/actions/pusherAuth'
import { useCurrentUser } from '@/hooks/user-current-user'
const pusherClient2 = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
  cluster: 'eu',
  auth: {
    params: async (socket_id: string, channel_name: string) => {
      const user = useCurrentUser()

      const userId = user?.id!
      const userInfo = { name: user?.name! }
      const authResponse = await authenticate({
        socket_id,
        channel_name,
        user_id: userId,
        user_info: userInfo
      })
      return authResponse
    }
  }
})

export default pusherClient2
