'use client'

import axios from 'axios'
import { find } from 'lodash'
import { useEffect, useRef, useState } from 'react'

import type { FullMessageType } from '@/types'
import useConversation from '@/hooks/useConversation'
import MessageBox from './MessageBox'
import { pusherClient } from '@/lib/pusher'
import { seen } from '@/actions/seenaction'

type BodyProps = {
  initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { conversationId } = useConversation()

  /* const markAsSeen = async () => {
    try {
      const response = await seen({ conversationId })
      console.log('Conversation marked as seen:', response)
    } catch (error) {
      console.error('Error marking conversation as seen:', error)
    }
  } */
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`).catch((error) => {
      console.error('Error marking conversation as seen:', error)
    })
    //seen({ conversationId })

    console.log('conversationIdTEST', conversationId)

    //markAsSeen()
  }, [conversationId])

  useEffect(() => {
    pusherClient.subscribe(conversationId)
    bottomRef?.current?.scrollIntoView()

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`).catch((error) => {
        console.error('Error marking conversation as seen:', error)
      })
      console.log('message1', message)
      setMessages((current) => {
        if (find(current, { id: message.id })) return current

        return [...current, message]
        //seen({ conversationId })

        //markAsSeen()

        //markAsSeen()
        console.log('message', message)
      })

      bottomRef?.current?.scrollIntoView()
    }

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) return newMessage

          return currentMessage
        })
      )
    }

    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler)

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  }, [conversationId])

  return (
    <div className="flex-1  p-4 min-h-[520px]  h-screen flex-grow  bg-gray-100 overflow-y-auto custom-scrollbar">
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          isLast={i === messages.length - 1}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" aria-hidden />
    </div>
  )
}

export default Body
