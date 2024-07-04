'use client'

import { unlikeUser } from '@/actions/userdata'
import { useCurrentUser } from '@/hooks/user-current-user'
import { HandThumbDownIcon, HeartIcon } from '@heroicons/react/16/solid'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
interface UserBlockProps {
  //senderId: string
  receiverId: string
}

export const UnlikeButton: React.FC<UserBlockProps> = ({ receiverId }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState<boolean>(false)

  const senderId = useCurrentUser()?.id!
  const router = useRouter()

  const handleUnlike = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Call the unlikeUser function here
      await unlikeUser(senderId, receiverId)
      //setIsLiked(false)

      //refreshComponent()
    } catch (error) {
      setError((error as Error).message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }, [senderId, receiverId])
  const refreshComponent = () => {
    router.refresh()
    // Perform any necessary actions to refresh the component
    // For example, you can call a function to fetch updated data
    // You can also use state variables to trigger a re-render
  }

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button
        className="flex items-center justify-center rounded-full w-12 h-12 hover:bg-secondary bg-secondary text-white cursor-pointer"
        onClick={handleUnlike}
        disabled={loading}
      >
        {loading ? (
          <div className="w-6 h-6 text-red-900 fill-red-500">Unliking...'</div>
        ) : (
          <>
            <HeartIcon className="w-7 h-7 text-red-900 fill-red-500" />
          </>
        )}
      </button>
    </div>
  )
}
