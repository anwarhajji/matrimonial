// components/UserStatus.tsx
'use client'
import { Console } from 'console'
import { useEffect, useState } from 'react'

interface UserStatusProps {
  userId: string
}

interface UserStatusResponse {
  lastActivity: string
  status: string
}

const UserStatus: React.FC<UserStatusProps> = ({ userId }) => {
  const [status, setStatus] = useState<string>('offline')

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await fetch(`/api/user/${userId}/status`)
        if (!response.ok) {
          throw new Error('Failed to fetch user status')
        }
        const dat: UserStatusResponse = await response.json()
        console.log('responsee status', dat.status)
        const str = dat.status
        setStatus(str)
        console.log(' after status', status)
        /* 
        const lastActivityDate = new Date(data.lastActivity)
        const currentTime = new Date()
        const diffInMinutes =
          (currentTime.getTime() - lastActivityDate.getTime()) / 1000 / 60
        console.log(' avant status', status)
        console.log('diffInMinutes', diffInMinutes)
        console.log(' time', data.lastActivity)
        if (diffInMinutes < 5) {
          setStatus('online')
        } else {
          setStatus('offline')
        } */
      } catch (error) {
        console.error('Error fetching user status:', error)
      }
    }
    console.log(' end status', status)

    fetchUserStatus()
  }, [userId])

  return (
    <div>
      <p> is : {status}</p>
    </div>
  )
}

export default UserStatus
