'use client'

import { User } from '@prisma/client'

import UserBox from './UserBox'

interface UserListProps {
  items: User[]
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <aside
      className="
      
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        top-20
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200
        block w-full left-0
      "
    >
      <div className="px-5">
        <div className="flex-col items-center py-6 pt-16">
          <h1 className="text-xl font-bold  bg-rose-200 rounded-md py-4   px-4">
            Mutual Interests
          </h1>
        </div>
        {items.map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  )
}

export default UserList
