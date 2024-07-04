import { NextResponse } from 'next/server'

//import { pusherServer } from '@/lib/pusher'
///import { pusher } from '@/actions/pusherActions'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/actions/userdata'
import { auth } from '@/auth'

interface IParams {
  conversationId?: string
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    //const pusherServer = getPusherInstance()
    const session = await auth()
    const currentUser = session?.user
    //const currentUser = await getCurrentUser()
    const { conversationId } = params
    //console.log('userhhhh', currentUser?.id)

    if (!currentUser?.id || !currentUser?.email) {
      console.log('userhhhh', currentUser?.id)
      console.log('email', currentUser?.email)
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Find existing conversation
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
      return new NextResponse('Invalid ID', { status: 400 })
    }

    // Find last message
    const lastMessage = conversation.messages[conversation.messages.length - 1]

    if (!lastMessage) {
      return NextResponse.json(conversation)
    }

    // Update seen of last message
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
    //const pusherServer = getPusherInstance()

    // Update all connections with new seen
    /* await pusherServer.trigger(currentUser.email, 'conversation:update', {
      id: conversationId,
      messages: [updatedMessage]
    }) */

    // If user has already seen the message, no need to go further
    /* if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation)
    } */

    // Update last message seen
    /*  await pusherServer.trigger(
      conversationId!,
      'message:update',
      updatedMessage
    ) */

    return new NextResponse('Success')
  } catch (error) {
    console.log(error, 'ERROR_MESSAGES_SEEN')
    return new NextResponse('Error', { status: 500 })
  }
}
