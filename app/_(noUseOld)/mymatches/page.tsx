'use client'

import { listUserMatcheswithId } from '@/actions/services/matchService'
import { listUserMatches } from '@/actions/userdata'
import { useCurrentUser } from '@/hooks/user-current-user'
import { User } from '@prisma/client'
import { useEffect, useState } from 'react'

const UserMatchesPage = () => {
  const [userMatches, setUserMatches] = useState<User[]>([])
  const userid = useCurrentUser()?.id

  useEffect(() => {
    const fetchUserMatches = async (userid: string) => {
      const matches = await listUserMatcheswithId(userid!)
      setUserMatches(matches)
    }

    fetchUserMatches(userid!)
  }, [userid])

  return (
    <div>
      <h1>User Matches</h1>
      <ul>
        {userMatches.map((match) => (
          <li key={match.id}>
            {match.name!}
            {/*          <UserCardtolike key={match.id} {...match} />
             */}{' '}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserMatchesPage
