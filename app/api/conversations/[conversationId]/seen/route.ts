'use server'

import { NextResponse } from 'next/server'

import { pusherServer } from '@/lib/pusher'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/actions/userdata'

type IParams = {
  conversationId: string
}

export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser()
    const { conversationId } = params
    console.log('conversation 1id', conversationId)

    if (!currentUser?.id || !currentUser?.email) {
      console.log('conversation 2 id', conversationId)

      return new NextResponse('Unauthorized.', { status: 401 })
    }

    // find the existing conversation
    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        messages: {
          include: {
            seen: true
          }
        },
        users: true
      }
    })

    if (!conversation) {
      return new NextResponse('Invalid Id.', { status: 400 })
    }

    // find the last message
    const lastMessage = conversation.messages[conversation.messages.length - 1]

    if (!lastMessage) return NextResponse.json(conversation)

    // update seen of last message
    const updatedMessage = await db.message.update({
      where: {
        id: lastMessage.id
      },
      include: {
        sender: true,
        seen: true
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      }
    })

    await pusherServer.trigger(currentUser.email, 'conversation:update', {
      id: conversationId,
      messages: [updatedMessage]
    })

    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1)
      return NextResponse.json(conversation)

    await pusherServer.trigger(
      conversationId!,
      'message:update',
      updatedMessage
    )

    return NextResponse.json(updatedMessage)
  } catch (error: unknown) {
    console.log('ERROR_MESSAGES_SEEN:', error)
    return new NextResponse('Internal Server Error.', { status: 500 })
  }
}
