import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/actions/userdata'
import { db } from '@/lib/db'
import { pusherServer } from '@/lib/pusher'
//import { getPusherInstance } from '@/actions/pusherActions'

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    const { message, conversationId } = body

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const newMessage = await db.message.create({
      include: {
        seen: true,
        sender: true
      },
      data: {
        body: message,

        conversation: {
          connect: { id: conversationId }
        },
        sender: {
          connect: { id: currentUser.id }
        },
        seen: {
          connect: [
            {
              id: currentUser.id
            }
          ]
        }
      }
    })

    const updatedConversation = await db.conversation.update({
      where: {
        id: conversationId
      },

      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id
          }
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true
          }
        }
      }
    })
    // const supabase = supabaseServer()
    console.log('new message+++>', newMessage.body)
    await pusherServer
      .trigger(conversationId, 'messages:new', newMessage)
      .catch((err) => console.log('neww message error', err))

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1]

    updatedConversation.users.map((user) => {
      pusherServer
        .trigger(user.email!, 'conversation:update', {
          id: conversationId,
          messages: [lastMessage]
        })
        .catch((err) => console.log('update message error', err))
    })

    return NextResponse.json(newMessage)
  } catch (error) {
    console.log(error, 'ERROR_MESSAGES')
    return new NextResponse('Error', { status: 500 })
  }
}
