//import getCurrentUser from '@/app/actions/getCurrentUser';

import { auth } from '@/auth'
import MobileFooter from './MobileFooter'

async function Sidebar({ children }: { children: React.ReactNode }) {
  const session = await auth()

  const currentUser = session?.user!
  if (!currentUser) return <div className="h-full ">{children}</div>

  console.log({ currentUser }, 'TEST')

  return (
    <div className="h-full ">
      {/*       <DesktopSidebar currentUser={currentUser! as any} />


       */}{' '}
      <MobileFooter />
      <main className=" 	 h-full">{children}</main>
    </div>
  )
}

export default Sidebar
