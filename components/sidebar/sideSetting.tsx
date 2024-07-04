//import getCurrentUser from '@/app/actions/getCurrentUser';

import { auth } from '@/auth'
import DesktopSidebar from './DesktopSidebar'
import MobileFooter from './MobileFooter'

async function SidebarSetting({ children }: { children: React.ReactNode }) {
  const session = await auth()

  const currentUser = session?.user!
  if (!currentUser) return null

  console.log({ currentUser }, 'TEST')

  return (
    <div className="h-full ">
      <DesktopSidebar currentUser={currentUser! as any} />

      <main className="lg:pl-20 	 h-full">{children}</main>
    </div>
  )
}

export default SidebarSetting
