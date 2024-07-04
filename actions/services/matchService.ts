// services/matchService.ts
'use server'
import { db } from '@/lib/db'
import { Like, Match, User } from '@prisma/client'

export const likeUser = async (
  senderId: string,
  receiverId: string
): Promise<{ match?: Match; isMatch: boolean }> => {
  return await db.$transaction(async (db) => {
    // Check if the sender already liked the receiver
    const existingLike = await db.like.findUnique({
      where: {
        senderId_receiverId: {
          senderId,
          receiverId
        }
      }
    })

    if (existingLike) {
      throw new Error('You already liked this user')
    }

    // Create a like
    /*  const likeData: Like = {
      senderId :senderId,
      receiverId:receiverId
    } */
    await db.like.create({
      data: {
        senderId,
        receiverId
      }
    })

    // Check if the receiver has already liked the sender
    const reciprocalLike = await db.like.findUnique({
      where: {
        senderId_receiverId: {
          senderId: receiverId,
          receiverId: senderId
        }
      }
    })

    if (reciprocalLike) {
      // Create a match if a reciprocal like exists
      const matchData = {
        user1Id:
          receiverId.localeCompare(senderId, undefined, {
            sensitivity: 'base'
          }) === -1
            ? receiverId
            : senderId,
        user2Id:
          receiverId.localeCompare(senderId, undefined, {
            sensitivity: 'base'
          }) === -1
            ? senderId
            : receiverId

        /* user1Id: Math.min(senderId, receiverId),
        user2Id: Math.max(senderId, receiverId) */
      }
      const match = await db.match.create({ data: matchData })
      return { match, isMatch: true }
    }

    return { isMatch: false }
  })
}
export const checkIfLiked = async (senderId: string, receiverId: string) => {
  try {
    const like = await db.like.findUnique({
      where: {
        senderId_receiverId: {
          senderId,
          receiverId
        }
      }
    })
    return !!like
  } catch (error) {
    console.error('Error checking if liked:', error)
    throw error
  }
}

export const checkIfMatched = async (senderId: string, receiverId: string) => {
  try {
    const match = await db.match.findUnique({
      where: {
        user1Id_user2Id: {
          user1Id: senderId,
          user2Id: receiverId
        }
      }
    })
    return !!match
  } catch (error) {
    console.error('Error checking if matched:', error)
    throw error
  }
}

export const listUserMatcheswithId = async (
  userId: string
): Promise<User[]> => {
  try {
    const userMatches = await db.match.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }]
      },
      include: {
        user1: true,
        user2: true
      }
    })

    // Extract matched users from userMatches excluding the current user
    const matchedUsers = userMatches.flatMap((match) =>
      match.user1.id !== userId ? [match.user1] : [match.user2]
    )

    return matchedUsers
  } catch (error) {
    console.error('Error listing user matches:', error)
    throw error
  }
}

export const cancelLikeUser = async (
  senderId: string,
  receiverId: string
): Promise<{ isCanceled: boolean }> => {
  return await db.$transaction(async (db) => {
    // Check if the like exists
    const existingLike = await db.like.findUnique({
      where: {
        senderId_receiverId: {
          senderId,
          receiverId
        }
      }
    })

    if (!existingLike) {
      throw new Error('No like exists between these users')
    }

    // Delete the like
    await db.like.delete({
      where: {
        senderId_receiverId: {
          senderId,
          receiverId
        }
      }
    })

    // Check if there was a match and handle any cleanup if necessary
    // (optional based on your application logic)
    const reciprocalLike = await db.like.findUnique({
      where: {
        senderId_receiverId: {
          senderId: receiverId,
          receiverId: senderId
        }
      }
    })

    // If reciprocalLike exists, it means there was a match, you might want to handle match cancellation
    if (reciprocalLike) {
      const user1Id =
        receiverId.localeCompare(senderId, undefined, {
          sensitivity: 'base'
        }) === -1
          ? receiverId
          : senderId
      const user2Id =
        receiverId.localeCompare(senderId, undefined, {
          sensitivity: 'base'
        }) === -1
          ? senderId
          : receiverId

      await db.match.deleteMany({
        where: {
          OR: [
            {
              user1Id,
              user2Id
            },
            {
              user1Id: user2Id,
              user2Id: user1Id
            }
          ]
        }
      })
    }

    return { isCanceled: true }
  })
}
