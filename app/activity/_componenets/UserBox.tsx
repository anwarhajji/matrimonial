import { User } from '@prisma/client'

import { Avatar } from '@nextui-org/react'
import { iUserProps } from '@/actions/userdata'

const UserBox = ({ user }: { user: iUserProps }) => {
  return (
    <>
      <div
        className="
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          bg-neutral-800
          p-3 
          hover:bg-neutral-700
          rounded-lg
         
        "
      >
        <Avatar src={user.imagePath!} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-200">{user.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserBox
