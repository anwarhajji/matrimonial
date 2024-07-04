'use client'
import { format } from 'date-fns'

import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Conversation, User } from '@prisma/client'

import useOtherUser from '@/hooks/useOtherUser'

import Avatar from '@/app/users/components/Avatar'
//import AvatarGroup from "@/app/components/AvatarGroup";
import ProfileDrawer from './ProfileDrawer'
import AvatarGroup from '@/app/users/components/AvatarGroup'
import UserStatus from '@/components/chat/userstatus'

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [updatedAt, setUpdatedAt] = useState(otherUser?.updatedAt)

  //const isActive = members.indexOf(otherUser?.email!) !== -1
  const isActive = false
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`
    }
    console.log('otherUser', otherUser.name)
    console.log('otherUser', updatedAt)
    //return isActive ? 'Active' : 'Offline'
    return (
      <div className=" text-xs text-gray-900 font-light ">
        <UserStatus userId={otherUser.id} />
      </div>
    )
  }, [conversation, isActive])

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div
        className="
       
        bg-white 
        w-full 
        flex 
        border-b-[1px] 
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
      "
      >
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="
            block 
            text-sky-500 
            hover:text-sky-600 
            transition 
            cursor-pointer
          "
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="
          text-sky-500
          cursor-pointer
          hover:text-sky-600
          transition
        "
        />
      </div>
    </>
  )
}

export default Header
