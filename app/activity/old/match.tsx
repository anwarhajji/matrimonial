import { listUserMatches } from '@/actions/userdata'
import UserList from '@/app/usersmatches/components/UserList'
import Sidebar from '@/components/sidebar/Sidebar'

export default async function MATCHED() {
  //const users = await getUsers()
  const matchusers = await listUserMatches()

  return (
    <div>
      <UserList items={matchusers} />
    </div>
  )
}
