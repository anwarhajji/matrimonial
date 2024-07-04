//import PusherServer from 'pusher'
//import PusherClient from 'pusher-js'

//import PusherServer from "pusher"

/* export const pusherServer = new PusherServer({
  appId: '1409397',
  key: '78a812a3d97919c88b27',
  secret: 'bd89db95a901c5598e0b',
  cluster: 'eu',
  useTLS: true
}) */
/* 
export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: 'eu',
  useTLS: true
}) */
import PusherClient from 'pusher-js'
import Pusher from 'pusher'

export const pusherEvents = {
  NEW_MESSAGE: 'messages:new',
  UPDATE_MESSAGE: 'message:update',
  NEW_CONVERSATION: 'conversation:new',
  UPDATE_CONVERSATION: 'conversation:update',
  DELETE_CONVERSATION: 'conversation:remove'
}

export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: 'eu',
  useTLS: true
})

/* export const sessiontoken = async () => {
  'use server'
  const session = await auth()
  if (!session) {
    return null
  }
  const token = session?.accessToken!
  return token
}
 */
export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  {
    cluster: 'eu' /* ,
    channelAuthorization: {
      endpoint: '/api/pusher/auth',
      transport: 'ajax'
    } */
  }
)
