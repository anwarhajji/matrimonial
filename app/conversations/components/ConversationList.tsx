'use client'

import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import { MdOutlineGroupAdd } from 'react-icons/md'
import clsx from 'clsx'
import { find, uniq } from 'lodash'

import { pusherClient, pusherEvents } from '@/lib/pusher'
//import GroupChatModal from '@/app/components/modals/GroupChatModal'
import { FullConversationType } from '@/types'
import useConversation from '@/hooks/useConversation'
import ConversationBox from './ConversationBox'

interface ConversationListProps {
  initialItems: FullConversationType[]
  title?: string
}
const ConversationList: React.FC<ConversationListProps> = ({
  initialItems
}) => {
  const [items, setItems] = useState(initialItems)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const router = useRouter()
  const session = useSession()

  const { conversationId, isOpen } = useConversation()

  const pusherKey = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  useEffect(() => {
    if (!pusherKey) {
      return
    }

    pusherClient.subscribe(pusherKey)

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages
            }
          }

          return currentConversation
        })
      )
    }

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        // skip if the conversation already exists
        if (find(current, { id: conversation.id })) {
          return current
        }

        return [conversation, ...current]
      })
    }

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)]
      })

      if (conversationId == conversation.id) {
        router.push('/conversations')
      }
    }

    pusherClient.bind(pusherEvents.UPDATE_CONVERSATION, updateHandler)
    pusherClient.bind(pusherEvents.NEW_CONVERSATION, newHandler)
    pusherClient.bind(pusherEvents.DELETE_CONVERSATION, removeHandler)
  }, [conversationId, pusherKey, router])

  return (
    <>
      {/* <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> 
      
      border-r 
          border-gray-200 
      */}
      <aside
        className={clsx(
          `
          fixed 
          inset-y-0 
          pb-20
          lg:pb-0
          lg:w-80 
          lg:block
          overflow-y-auto 
          dark:border-lightgray
        `,
          isOpen ? 'hidden' : 'block w-full left-0'
        )}
      >
        <div className="px-5 ">
          <div className="flex  pt-20	justify-between mb-4 ">
            <div className="text-2xl font-bold text-neutral-600">Messages</div>
            {/* <div
              onClick={() => setIsModalOpen(true)}
              className="
                rounded-full 
                p-2 
                bg-gray-100 
                text-gray-600 
                cursor-pointer 
                hover:opacity-75 
                transition
                dark:bg-lightgray
                dark:text-gray-200
              "
            >
              <MdOutlineGroupAdd size={20} />
            </div> */}
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  )
}

export default ConversationList
