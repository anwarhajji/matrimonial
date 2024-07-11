// matchService.ts

import { db } from '@/lib/db'
import { PrismaClient, User, Like, Match } from '@prisma/client'

const prisma = new PrismaClient()

export const listUserMatches = async (userId: string): Promise<User[]> => {
  const userMatches = await prisma.match.findMany({
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
}

export const createMatch = async (
  user1Id: string,
  user2Id: string
): Promise<void> => {
  await prisma.match.create({
    data: {
      user1Id,
      user2Id
    }
  })
}

export const removeMatch = async (matchId: string): Promise<void> => {
  await prisma.match.delete({
    where: {
      id: matchId
    }
  })
}

export const likeUser = async (
  senderId: string,
  receiverId: string
): Promise<void> => {
  await prisma.like.create({
    data: {
      senderId,
      receiverId
    }
  })

  // Check if there's a reciprocal like
  const reciprocalLike = await db.like.findUnique({
    where: {
      senderId_receiverId: {
        senderId: receiverId,
        receiverId: senderId
      }
    }
  })

  if (reciprocalLike) {
    // Create a match if there's a reciprocal like
    await createMatch(senderId, receiverId)
  }
}

export const unlikeUser = async (
  senderId: string,
  receiverId: string
): Promise<void> => {
  await prisma.like.deleteMany({
    where: {
      senderId,
      receiverId
    }
  })

  // Check if the match exists and delete it
  const match = await prisma.match.findFirst({
    where: {
      OR: [
        { user1Id: senderId, user2Id: receiverId },
        { user1Id: receiverId, user2Id: senderId }
      ]
    }
  })

  if (match) {
    await removeMatch(match.id)
  }
}
