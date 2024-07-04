'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { checkIfLiked, likeUser } from '../../actions/services/matchService'
import { useCurrentUser } from '@/hooks/user-current-user'
import HeartIcon from '@heroicons/react/16/solid/HeartIcon'
import { CheckIcon, HandThumbUpIcon } from '@heroicons/react/16/solid'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'

interface UserBlockProps {
  //senderId: string
  receiverId: string
}

const SendIvitation: React.FC<UserBlockProps> = ({ receiverId }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isMatched, setIsMatched] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>(false)

  /* () => {
    // Retrieve isLiked from session storage or default to false
    if (typeof window !== 'undefined') {
      return JSON.parse(sessionStorage.getItem('isLiked') || 'false')
    }
    return false
  } */
  const router = useRouter()

  const senderId = useCurrentUser()?.id!

  /* useEffect(() => {
    const checkLiked = async () => {
      try {
        await checkIfLiked(senderId, receiverId)
          .then((res) => {
            setLoading(true)
            setIsLiked(res)
          })
          .finally(() => {
            setLoading(false)
          })
      } catch (error) {
        console.error('Error checking liked status:', error)
      }
    }

    checkLiked()
  }, [checkIfLiked])
 */
  const refreshComponent = () => {
    router.refresh()
    // Perform any necessary actions to refresh the component
    // For example, you can call a function to fetch updated data
    // You can also use state variables to trigger a re-render
  }

  const handleLike = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { isMatch } = await likeUser(senderId, receiverId)
      if (error) {
        setError(error)
      } else {
        setIsMatched(isMatch)
        setIsLiked(true)
        refreshComponent()

        /* if (typeof window !== 'undefined') {
          // Access sessionStorage here
          const isLiked = sessionStorage.getItem('isLiked')
        } */
      }
    } catch (error) {
      setError((error as Error).message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }, [senderId, receiverId])
  console.log(' isMatched', isMatched)

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Button
        radius="full"
        className="bg-gradient-to-tr from-green-500 to-yellow-500 text-white shadow-lg"
        onPress={handleLike}
        disabled={loading}
      >
        {loading ? (
          'Liking...'
        ) : isMatched ? (
          <>
            <div className="text-pink-600">Matched</div>{' '}
            <CheckIcon className="w-9 h-9  fill-green-600" />
          </>
        ) : isLiked ? (
          <HeartIcon className="w-9 h-9  fill-rose-600" />
        ) : loading ? (
          'Loading...'
        ) : (
          <div className="text-pink-600">Send Ivitation</div>
        )}
      </Button>
      {isMatched && <div>Matched!</div>}
    </div>
  )
}

export default SendIvitation
