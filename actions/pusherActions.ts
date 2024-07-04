/* export const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: 'eu',
    useTLS: true
  })

 */
'use server' /* 
import PusherServer from 'pusher'

let pusherInstance: PusherServer | null = null

export const getPusherInstance = () => {
  if (!pusherInstance) {
    pusherInstance = new PusherServer({
      appId: process.env.PUSHER_APP_ID as string,
      key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
      secret: process.env.PUSHER_SECRET as string,
      cluster: 'eu',
      useTLS: true
    })
  }
  return pusherInstance
}
 */
//import * as Pusher from "pusher"

//const Pusher = require("pusher")
import Pusher from 'pusher'

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID as string,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
  secret: process.env.PUSHER_SECRET as string,
  cluster: 'eu',
  useTLS: true
})
