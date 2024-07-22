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

const useRoutes = () => {
  const pathname = usePathname()
  const { conversationId } = useConversation()

  const routes = useMemo(
    () => [
      {
        label: 'settings',
        href: '/settings',
        icon: SettingsIcon,
        active: pathname === '/settings'
      },
      {
        label: 'Chat',
        href: '/conversations',
        icon: BiMessageSquareDetail,
        //active: pathname === '/conversations'

        active: pathname === '/conversations' || !!conversationId
      },

      /* {
        label: 'Logout',
        onClick: () => signOut(),
        href: '#',
        icon: MdLogout
      }, */
      {
        label: 'My Activity',
        onClick: () => void 0,
        href: '/notification',
        icon: BsPostcardHeartFill,
        active: pathname === '/notification'
      },

      {
        label: 'Home',
        href: '/',
        icon: MdHomeFilled,
        active: pathname === '/home'
      }
    ],
    [pathname, conversationId]
  )

  return routes
}

export default useRoutes
