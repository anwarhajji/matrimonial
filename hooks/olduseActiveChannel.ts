'use client'

import { useEffect, useState } from 'react'
import { Channel, Members, PresenceChannel } from 'pusher-js'
import useActiveList from '@/store/useActiveList'
import pusherClient2 from '@/lib/pusherClient'
import { authenticatePusher } from '@/utils/authenticatePusher'

const useActiveChannel = () => {
  const { set, add, remove } = useActiveList()
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null)

  useEffect(() => {
    let channel = activeChannel

    if (!channel) {
      channel = pusherClient2.subscribe('presence-messenger')
      setActiveChannel(channel)
    }

    /*  const handleAuthentication = async () => {
      const socketId = presenceChannel.pusher.connection.socket_id
      const auth = await authenticatePusher(socketId, 'presence-messenger')

      presenceChannel.authorize(socketId, auth.auth)
    } */

    const handleAuthentication = async () => {
      try {
        const socketId = pusherClient2.connection.socket_id
        const authResponse = await authenticatePusher(
          socketId,
          'presence-my-channel'
        )
        console.log('authresponse', authResponse)
        channel.authorize(socketId, (error: Error | null, authData: any) => {
          if (error) {
            console.error('Authentication error:', error)
            return
          }
          return authResponse
        })
      } catch (error) {
        console.error('Authentication error:', error)
      }
    }

    pusherClient2.connection.bind('connected', handleAuthentication)

    channel.bind('pusher:subscription_succeeded', (members: Members) => {
      const initialMembers: string[] = []

      members.each((member: Record<string, any>) =>
        initialMembers.push(member.id)
      )
      set(initialMembers)
    })

    channel.bind('pusher:member_added', (member: Record<string, any>) => {
      add(member.id)
    })

    channel.bind('pusher:member_removed', (member: Record<string, any>) => {
      remove(member.id)
    })

    return () => {
      if (activeChannel) {
        pusherClient2.unsubscribe('presence-messenger')
        setActiveChannel(null)
      }
    }
  }, [activeChannel, set, add, remove])
}

export default useActiveChannel
