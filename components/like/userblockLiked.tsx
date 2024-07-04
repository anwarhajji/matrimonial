'use client'

import React, { useState, useEffect } from 'react'
import { checkIfLiked, likeUser } from '../../actions/services/matchService'

interface UserBlockProps {
  senderId: string
  receiverId: string
}

const UserBlock: React.FC<UserBlockProps> = ({ senderId, receiverId }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isMatched, setIsMatched] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>(false)

  useEffect(() => {
    const checkLiked = async () => {
      try {
        const liked = await checkIfLiked(senderId, receiverId)
        if (liked) {
          setIsLiked(true)
        } else {
          setIsLiked(false)
        }
      } catch (error) {
        console.error('Error checking liked status:', error)
      }
    }

    checkLiked()
  }, [senderId, receiverId])

  const handleLike = async () => {
    setLoading(true)
    setError(null)
    try {
      const { isMatch } = await likeUser(senderId, receiverId)
      if (error) {
        setError(error)
      } else {
        setIsMatched(isMatch)
        setIsLiked(true)
      }
    } catch (error) {
      setError((error as Error).message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h3>User Block</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleLike} disabled={loading || isLiked}>
        {loading ? 'Liking...' : isLiked ? 'Liked' : 'Like'}
      </button>
      {isMatched && <div>Matched!</div>}
    </div>
  )
}

export default UserBlock
