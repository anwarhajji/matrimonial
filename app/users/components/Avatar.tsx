'use client'

import { User } from '@prisma/client'

import Image from 'next/image'
import { useEffect } from 'react'

interface AvatarProps {
  user?: User
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const isActive = false

  //console.log('isActive users: ', isActive)
  //console.log('LAST SEEN: ', user?.updatedAt)

  return (
    <div className="relative">
      <div
        className="
        relative 
        inline-block 
        rounded-full 
        overflow-hidden
        h-9 
        w-9 
        md:h-11 
        md:w-11
      "
      >
        <Image fill src={user?.image || '/images/user.png'} alt="Avatar" />
      </div>
      {isActive && (
        <span
          className="
            absolute 
            block 
            rounded-full 
            bg-green-500 
            ring-2 
            ring-white 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          "
        />
      )}
    </div>
  )
}

export default Avatar
