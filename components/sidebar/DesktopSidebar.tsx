'use client'

import DesktopItem from './DesktopItem'
import useRoutes from '@/hooks/useRoutes'
import SettingsModal from './SettingsModal'
import { useState } from 'react'
import Avatar from '@/app/users/components/Avatar'
import { User } from '@prisma/client'
import useRoutesetting from '@/hooks/useRoutesetting'

interface DesktopSidebarProps {
  currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutesetting()
  const [isOpen, setIsOpen] = useState(false)

  console.log({ currentUser }, 'TEST')

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div
        className="
          top-1
        fixed 
        inset-y-auto
        lg:left-0
        lg:z-40 
        w-20 
        xl:px-6
        lg:overflow-y-auto 
        lg:bg-default-50
        lg:border-r-[1px]
        lg:border-r-default-200

        lg:pb-4
        lg:pt-12 
        flex
        flex-col
        justify-center
        items-center
      "
      >
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  )
}

export default DesktopSidebar
