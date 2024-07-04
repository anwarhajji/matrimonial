'use client'

import React, { useState, useCallback } from 'react'
import { useCurrentUser } from '@/hooks/user-current-user'
import HeartIcon from '@heroicons/react/24/solid/HeartIcon'
import { CheckIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'
import { likeUser, cancelLikeUser } from '@/actions/services/matchService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UserBlockProps {
  receiverId: string
  islike: boolean
  ismatch: boolean
  text?: string | undefined
  color?: 'primary' | 'default' | 'secondary' | 'success' | 'warning' | 'danger'
}

const SendInvitation: React.FC<UserBlockProps> = ({
  receiverId,
  islike,
  ismatch,
  text = 'Send Invitation',
  color = 'primary'
}) => {
  const [error, setError] = useState<string | null>(null)
  const [isMatched, setIsMatched] = useState<boolean>(ismatch)
  const [isLiked, setIsLiked] = useState<boolean>(islike)
  const queryClient = useQueryClient()
  const router = useRouter()

  const senderId = useCurrentUser()?.id!

  const likeMutation = useMutation<{ isMatch: boolean }, Error, void>({
    mutationFn: async () => {
      const response = await likeUser(senderId, receiverId)
      return response
    },
    onSuccess: (data) => {
      setIsMatched(data.isMatch)
      setIsLiked(true)
      queryClient.invalidateQueries({
        queryKey: ['userLikes', senderId]
      })
      router.refresh()
    },
    onError: (error: Error) => {
      setError(error.message || 'An unexpected error occurred')
    }
  })

  const cancelLikeMutation = useMutation<{ isCanceled: boolean }, Error, void>({
    mutationFn: async () => {
      const response = await cancelLikeUser(senderId, receiverId)
      return response
    },
    onSuccess: () => {
      setIsLiked(false)
      queryClient.invalidateQueries({
        queryKey: ['userLikes', senderId]
      })
      router.refresh()
    },
    onError: (error: Error) => {
      setError(error.message || 'An unexpected error occurred')
    }
  })

  const handleLike = useCallback(() => {
    setError(null)
    likeMutation.mutate()

    router.refresh()
  }, [likeMutation])

  const handleCancelLike = useCallback(() => {
    setError(null)
    cancelLikeMutation.mutate()
  }, [cancelLikeMutation])
  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!isLiked && (
        <Button
          radius="sm"
          size="sm"
          color={color}
          //className="bg-gradient-to-tr from-green-500 to-yellow-500 text-white shadow-lg"
          onPress={handleLike}
          disabled={likeMutation.isPending || cancelLikeMutation.isPending}
        >
          {(() => {
            switch (true) {
              case likeMutation.isPending:
                return 'Liking...'
              case isMatched:
                return (
                  <>
                    <div className="text-pink-600">You are Matched</div>
                    <CheckIcon className="w-9 h-9 fill-green-600" />
                  </>
                )
              default:
                return text
            }
          })()}
        </Button>
      )}
      {isLiked && !isMatched && (
        <Button
          radius="sm"
          //className="bg-gradient-to-tr from-red-500 to-yellow-500 text-white shadow-lg"
          onPress={handleCancelLike}
          color="danger"
          size="sm"
          variant="bordered"
          disabled={likeMutation.isPending || cancelLikeMutation.isPending}
        >
          {cancelLikeMutation.isPending ? 'Canceling...' : 'Cancel Invitation'}
        </Button>
      )}
      {isMatched && <div>Matched!</div>}
    </div>
  )
}

export default SendInvitation
