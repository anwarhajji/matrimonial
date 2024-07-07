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
}

const SendInvitation: React.FC<UserBlockProps> = ({
  receiverId,
  islike,
  ismatch
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
  }, [likeMutation])

  const handleCancelLike = useCallback(() => {
    setError(null)
    cancelLikeMutation.mutate()
  }, [cancelLikeMutation])

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Button
        radius="full"
        className="bg-gradient-to-tr from-green-500 to-yellow-500 text-white shadow-lg"
        onPress={handleLike}
        disabled={likeMutation.isPending || cancelLikeMutation.isPending}
      >
        {likeMutation.isPending ? (
          'Liking...'
        ) : isMatched ? (
          <>
            <div className="text-pink-600">Matched</div>
            <CheckIcon className="w-9 h-9 fill-green-600" />
          </>
        ) : isLiked ? (
          <Button
            radius="full"
            className="bg-gradient-to-tr from-red-500 to-yellow-500 text-white shadow-lg"
            onPress={handleCancelLike}
            disabled={likeMutation.isPending || cancelLikeMutation.isPending}
          >
            {cancelLikeMutation.isPending
              ? 'Canceling...'
              : 'Cancel Invitation'}
          </Button>
        ) : (
          <div className="text-pink-600">Send Invitation</div>
        )}
      </Button>
      {isLiked && !isMatched && (
        <Button
          radius="full"
          className="bg-gradient-to-tr from-red-500 to-yellow-500 text-white shadow-lg"
          onPress={handleCancelLike}
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
