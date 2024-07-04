'use server'

import { db } from '@/lib/db'
import { auth } from '@/auth' //auth from '@/lib/auth'
import { user } from '@nextui-org/react'
//import { Like, Match, User } from '@prisma/client'
export interface iUserProps {
  imagePath: string
  country: string
  fullname: string
  age: number
  gender: string
  occupation: string
  userId: string | undefined
  name: string
  maritalstatus: string
  //isInFavoriteList: boolean;
  //favoriteId: string;
  //homeId: string;
  //pathName: string;
}
export interface iUserPropstatus {
  imagePath: string
  country: string
  fullname: string
  age: number
  gender: string
  occupation: string
  userName: string

  userId: string
  name: string
  maritalstatus: string
  isLiked: boolean
  isMatched: boolean
  //isInFavoriteList: boolean;
  //favoriteId: string;
  //homeId: string;
  //pathName: string;
}
export interface iUserProps2 {
  imagePath: string
  country: string
  fullname: string
  age: number
  gender: string
  occupation: string
  userId: string | undefined
  name: string
  maritalstatus: string
  userName: string
  //isInFavoriteList: boolean;
  //favoriteId: string;
  //homeId: string;
  //pathName: string;
}
export const getUsers = async () => {
  const session = await auth()

  if (!session?.user?.email) return []

  try {
    const users = await db.user.findMany({
      where: {
        NOT: {
          email: session.user.email
        }
      }
    })

    return users
  } catch (error: unknown) {
    return []
  }
}

export const getUserById2 = async (id: string) => {
  const user = await db.user.findFirst({ where: { id } })
  return user
}

export async function getUserslist(): Promise<iUserProps2[]> {
  const session = await auth()

  if (!session?.user?.email) return []

  const users = await db.user.findMany({
    select: {
      id: true,
      fullname: true,
      age: true,
      gender: true,
      name: true,
      image: true,
      username: true,
      userProfil: {
        select: {
          occupation: true,
          country: true,
          maritalstatus: true
        }
      }
    },

    where: {
      NOT: {
        email: session.user.email
      }
    }
  })
  const usersList = users.map((user) => ({
    userId: user.id,
    userName: user.username ?? '',
    fullname: user.fullname ?? '',
    imagePath: user.image ?? '',
    age: user.age ?? 0,
    country: user.userProfil[0]?.country ?? '',
    gender: user.gender ?? '',
    occupation: user.userProfil[0]?.occupation ?? '',
    name: user.name ?? '',
    maritalstatus: user.userProfil[0]?.maritalstatus ?? ''
  }))
  return usersList
}

export const getCurrentUser = async () => {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return null
    }

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string
      }
    })

    if (!currentUser) {
      return null
    }

    return currentUser
  } catch (error: any) {
    return null
  }
}

export const listUserMatches = async () => {
  try {
    const session = await auth()
    if (!session?.user?.email) return []

    const userId = session?.user?.id

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
export async function listMatches(): Promise<iUserProps[]> {
  try {
    const session = await auth()
    if (!session?.user?.email) return []

    const userId = session?.user?.id

    const userMatches = await db.match.findMany({
      select: {
        user1: {
          select: {
            id: true,
            fullname: true,
            age: true,
            gender: true,
            name: true,
            image: true,
            userProfil: {
              select: {
                occupation: true,
                country: true,
                maritalstatus: true
              }
            }
          }
        },
        user2: {
          select: {
            id: true,
            fullname: true,
            age: true,
            gender: true,
            name: true,
            image: true,
            userProfil: {
              select: {
                occupation: true,
                country: true,
                maritalstatus: true
              }
            }
          }
        }
      },
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }]
      }
    })

    const matchedUsers = userMatches.flatMap((match) =>
      match.user1.id !== userId ? [match.user1] : [match.user2]
    )

    return matchedUsers.map((user) => ({
      userId: user.id ?? '',
      fullname: user.fullname ?? '',
      imagePath: user.image ?? '',
      age: user.age ?? 0,
      country: user.userProfil[0]?.country ?? '',
      gender: user.gender ?? '',
      occupation: user.userProfil[0]?.occupation ?? '',
      name: user.name ?? '',
      maritalstatus: user.userProfil[0]?.maritalstatus ?? ''
    }))
  } catch (error) {
    console.error('Error listing user matches:', error)
    throw error
  }
}

export async function getUserStatus(userId: string): Promise<string> {
  const user = await db.user.findUnique({
    where: { id: userId }
  })

  if (!user) return 'offline'

  const lastActivity = new Date(user.lastActivity)
  const currentTime = new Date()
  const diffMinutes =
    (currentTime.getTime() - lastActivity.getTime()) / (1000 * 60)
  console.log('diff minutes', diffMinutes)

  // Consider a user offline if their last activity was more than 5 minutes ago
  return diffMinutes <= 6 ? 'online' : 'offline'
}
export const getUserSteps = async () => {
  const session = await auth()
  console.log('session', session)

  if (!session?.user?.email) return null

  try {
    const user = await db.user.findUnique({
      where: { email: session.user.email }
    })
    return user?.stepCompletion
  } catch {
    return null
  }
}

export async function getDataUser(): Promise<iUserProps[]> {
  const users = await db.user.findMany({
    select: {
      fullname: true,
      age: true,
      id: true,
      gender: true,
      name: true,

      image: true,

      userProfil: {
        select: {
          occupation: true,
          country: true,
          maritalstatus: true

          // profilpicture: true
        }
      }
    }
  })
  return users.map((user) => ({
    userId: user.id ?? '',
    fullname: user.fullname ?? '',
    imagePath: user.image ?? '',
    age: user.age ?? 0,
    country: user.userProfil[0]?.country ?? '',
    gender: user.gender ?? '',
    occupation: user.userProfil[0]?.occupation ?? '',
    name: user.name ?? '',
    maritalstatus: user.userProfil[0]?.maritalstatus ?? ''
  }))
}

export async function getLikedUsers(userId: string): Promise<iUserProps[]> {
  const likes = await db.like.findMany({
    where: {
      senderId: userId
    },
    select: {
      receiver: {
        select: {
          id: true,
          fullname: true,
          age: true,
          gender: true,
          name: true,
          image: true,
          userProfil: {
            select: {
              occupation: true,
              country: true,

              maritalstatus: true
            }
          }
        }
      }
    }
  })

  return likes.map((like) => ({
    userId: like.receiver.id ?? '',
    fullname: like.receiver.fullname ?? '',
    imagePath: like.receiver.image ?? '',
    age: like.receiver.age ?? 0,
    country: like.receiver.userProfil[0]?.country ?? '',
    gender: like.receiver.gender ?? '',
    occupation: like.receiver.userProfil[0]?.occupation ?? '',
    name: like.receiver.name ?? '',
    maritalstatus: like.receiver.userProfil[0]?.maritalstatus ?? ''
  }))
}

export async function getUsersILike(
  currentUserId: string
): Promise<iUserProps[]> {
  const likes = await db.like.findMany({
    where: {
      senderId: currentUserId
    },
    select: {
      receiver: {
        select: {
          id: true,
          fullname: true,
          age: true,
          gender: true,
          name: true,
          image: true,
          userProfil: {
            select: {
              occupation: true,
              country: true,
              maritalstatus: true
            }
          }
        }
      }
    }
  })
  return likes.map((like) => ({
    userId: like.receiver.id ?? '',
    fullname: like.receiver.fullname ?? '',
    imagePath: like.receiver.image ?? '',
    age: like.receiver.age ?? 0,
    country: like.receiver.userProfil[0]?.country ?? '',
    gender: like.receiver.gender ?? '',
    occupation: like.receiver.userProfil[0]?.occupation ?? '',
    name: like.receiver.name ?? '',
    maritalstatus: like.receiver.userProfil[0]?.maritalstatus ?? ''
  }))
}

export async function getUsersINotLiked(
  currentUserId: string
): Promise<iUserProps[]> {
  const likedUserIds = await db.like
    .findMany({
      where: {
        senderId: currentUserId
      },
      select: {
        receiverId: true
      }
    })
    .then((likes) => likes.map((like) => like.receiverId))

  const unlikes = await db.user.findMany({
    where: {
      id: {
        notIn: likedUserIds
      }
    },
    select: {
      id: true,
      name: true,
      image: true,
      fullname: true,
      age: true,
      gender: true,
      userProfil: {
        select: {
          country: true,
          occupation: true,
          maritalstatus: true
        }
      }
    }
  })

  return unlikes.map((unlike) => ({
    userId: unlike.id ?? '',
    fullname: unlike.fullname ?? '',
    imagePath: unlike.image ?? '',
    age: unlike.age ?? 0,
    country: unlike.userProfil[0]?.country ?? '',
    gender: unlike.gender ?? '',
    occupation: unlike.userProfil[0]?.occupation ?? '',
    name: unlike.name ?? '',
    maritalstatus: unlike.userProfil[0]?.maritalstatus ?? ''
  }))
}

export async function getUsersWhoLikedMe(
  currentUserId: string
): Promise<iUserProps[]> {
  const likes = await db.like.findMany({
    where: {
      receiverId: currentUserId
    },
    select: {
      sender: {
        select: {
          id: true,
          name: true,
          image: true,
          fullname: true,
          age: true,
          gender: true,
          userProfil: {
            select: {
              country: true,
              occupation: true,
              maritalstatus: true
            }
          }
        }
      }
    }
  })

  return likes.map((like) => ({
    userId: like.sender.id ?? '',
    fullname: like.sender.fullname ?? '',
    imagePath: like.sender.image ?? '',
    age: like.sender.age ?? 0,
    country: like.sender.userProfil[0]?.country ?? '',
    gender: like.sender.gender ?? '',
    occupation: like.sender.userProfil[0]?.occupation ?? '',
    name: like.sender.name ?? '',
    maritalstatus: like.sender.userProfil[0]?.maritalstatus ?? ''
  }))
}

export const unlikeUser = async (senderId: string, receiverId: string) => {
  try {
    await db.like.delete({
      where: {
        senderId_receiverId: {
          senderId,
          receiverId
        }
      }
    })
  } catch (error) {
    console.error('Error unliking user:', error)
    throw error
  }
}

export async function getUsersILikenomatch(): Promise<iUserProps[]> {
  const session = await auth()
  if (!session?.user?.email) return []

  const currentUserId = session?.user?.id

  const likes = await db.like.findMany({
    where: {
      senderId: currentUserId,
      receiverId: {
        notIn: (
          await db.like.findMany({
            where: {
              receiverId: currentUserId
            },
            select: {
              senderId: true
            }
          })
        ).map((like) => like.senderId)
      }
    },
    select: {
      receiver: {
        select: {
          id: true,
          fullname: true,
          age: true,
          gender: true,
          name: true,
          image: true,
          userProfil: {
            select: {
              occupation: true,
              country: true,
              maritalstatus: true
            }
          }
        }
      }
    }
  })

  return likes.map((like) => ({
    userId: like.receiver.id ?? '',
    fullname: like.receiver.fullname ?? '',
    imagePath: like.receiver.image ?? '',
    age: like.receiver.age ?? 0,
    country: like.receiver.userProfil[0]?.country ?? '',
    gender: like.receiver.gender ?? '',
    occupation: like.receiver.userProfil[0]?.occupation ?? '',
    name: like.receiver.name ?? '',
    maritalstatus: like.receiver.userProfil[0]?.maritalstatus ?? ''
  }))
}

export async function getUsersWhoLikedMeButNoMatch(): Promise<iUserProps[]> {
  const session = await auth()
  if (!session?.user?.email) return []

  const currentUserId = session?.user?.id

  const likes = await db.like.findMany({
    where: {
      receiverId: currentUserId,
      senderId: {
        notIn: (
          await db.like.findMany({
            where: {
              senderId: currentUserId
            },
            select: {
              receiverId: true
            }
          })
        ).map((like) => like.receiverId)
      }
    },
    select: {
      sender: {
        select: {
          id: true,
          name: true,
          image: true,
          fullname: true,
          age: true,
          gender: true,
          userProfil: {
            select: {
              country: true,
              occupation: true,
              maritalstatus: true
            }
          }
        }
      }
    }
  })

  return likes.map((like) => ({
    userId: like.sender.id ?? '',
    fullname: like.sender.fullname ?? '',
    imagePath: like.sender.image ?? '',
    age: like.sender.age ?? 0,
    country: like.sender.userProfil[0]?.country ?? '',
    gender: like.sender.gender ?? '',
    occupation: like.sender.userProfil[0]?.occupation ?? '',
    name: like.sender.name ?? '',
    maritalstatus: like.sender.userProfil[0]?.maritalstatus ?? ''
  }))
}

export async function getUsersWithLikedAndMatchStatus(): Promise<
  iUserPropstatus[]
> {
  const currentUser = await getCurrentUser()
  const currentUserId = currentUser?.id!
  try {
    // Fetch all users along with their likes and matches
    const users = await db.user.findMany({
      where: {
        NOT: {
          id: currentUserId
        }
      },

      select: {
        id: true,
        fullname: true,
        image: true,
        age: true,
        gender: true,
        name: true,
        username: true,
        userProfil: {
          select: {
            occupation: true,
            country: true,
            maritalstatus: true
          }
        },
        receivedLikes: {
          where: {
            senderId: currentUserId
          }
        },
        matches1: true,
        matches2: true
      }
    })

    // Fetch matches1 and matches2 for the current user
    const currentUser = await db.user.findUnique({
      where: {
        id: currentUserId
      },
      include: {
        matches1: true,
        matches2: true
      }
    })

    // Extract user IDs from matches1 and matches2
    const matchedUserIds = new Set<string>()
    currentUser!.matches1.forEach((match) => matchedUserIds.add(match.user2Id))
    currentUser!.matches2.forEach((match) => matchedUserIds.add(match.user1Id))

    // Map through the list of users and check if current user is a match
    const usersWithStatus: iUserPropstatus[] = users.map((user) => ({
      userId: user.id,
      fullname: user.fullname ?? '',
      imagePath: user.image ?? '',
      userName: user.username ?? '',
      age: user.age ?? 0,
      country: user.userProfil[0]?.country ?? '',
      gender: user.gender ?? '',
      occupation: user.userProfil[0]?.occupation ?? '',
      name: user.name ?? '',
      maritalstatus: user.userProfil[0]?.maritalstatus ?? '',
      isLiked: user.receivedLikes.length > 0,
      isMatched: matchedUserIds.has(user.id)
    }))

    return usersWithStatus
  } catch (error) {
    console.error('Error fetching users with liked and match status:', error)
    throw error
  }
}
