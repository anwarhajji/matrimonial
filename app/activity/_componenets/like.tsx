// components/Photos.tsx
import React from 'react'
import { Chip } from '@nextui-org/react'
import { VideoIcon } from 'lucide-react'
import { auth } from '@/auth'
import { getUsersWhoLikedMeButNoMatch } from '@/actions/userdata'
import UserBox from './UserBox'

const Likes = async () => {
  const session = await auth()

  if (!session?.user) return <div>Not authenticated</div>

  const items = await getUsersWhoLikedMeButNoMatch(session?.user?.id!)

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex items-center space-x-2">
        <VideoIcon />
        <span>Photos</span>
        <Chip size="sm" variant="faded">
          9
        </Chip>
      </div>
      <div>
        <div className=" w-full">
          <div className="flex-col items-center py-6 pt-16"></div>
          {items.map((item) => (
            <UserBox key={item.userId} user={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Likes
