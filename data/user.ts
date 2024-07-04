'use server'

import { db } from '@/lib/db'
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } })
    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  const user = await db.user.findFirst({ where: { id } })
  return user
}

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({ where: { username } })

    return user
  } catch {
    return null
  }
}

export const getUserProfileByUserId = async (userId: string) => {
  try {
    const userProfile = await db.userProfile.findUnique({ where: { userId } })
    return userProfile
  } catch {
    return null
  }
}
export const getUserProfileById = async (id: string) => {
  try {
    const userProfile = await db.userProfile.findFirst({
      where: { userId: id }
    })
    return userProfile
  } catch {
    return null
  }
}

export const getUserStepsByUserId = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } })
    return user?.stepCompletion!
  } catch {
    return null
  }
}

/* export const getUsers = async () => {
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
 */
