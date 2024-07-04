import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { FiUsers } from 'react-icons/fi'
import { signOut } from 'next-auth/react'
import useConversation from './useConversation'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { MdLogout } from 'react-icons/md'
import { MdHomeFilled } from 'react-icons/md'
import { BsPostcardHeartFill } from 'react-icons/bs'
import { SettingsIcon } from 'lucide-react'

const useRoutesetting = () => {
  const pathname = usePathname()
  const { conversationId } = useConversation()

  const routes = useMemo(
    () => [
      /*  {
        label: 'settings',
        href: '/settings',
        icon: SettingsIcon,
        active: pathname === '/settings'
      },
      {
        label: 'Chat',
        href: '/conversations',
        icon: BiMessageSquareDetail,
        active: pathname === '/conversations' || !!conversationId
      },

      
      {
        label: 'My Activity',
        onClick: () => void 0,
        href: 'activity',
        icon: BsPostcardHeartFill,
        active: pathname === '/activity'
      },

      {
        label: 'Home',
        href: '/t',
        icon: MdHomeFilled,
        active: pathname === '/t'
      } 
      */
    ],
    [pathname, conversationId]
  )

  return routes
}

export default useRoutesetting
