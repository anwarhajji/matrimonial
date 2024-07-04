import { getUsers, listUserMatches } from '@/actions/userdata'
import Sidebar from '@/components/sidebar/Sidebar'
import UserList from './components/UserList'

export default async function UsersLayout({
  children
}: {
  children: React.ReactNode
}) {
  //const users = await getUsers()
  const matchusers = await listUserMatches()
  console.log('users match', matchusers)
  console.log('users match2')

  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={matchusers} />
        {children}
      </div>
    </Sidebar>
  )
}
