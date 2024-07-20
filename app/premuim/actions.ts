'use server'

import { getCurrentUser } from '@/actions/userdata'
import { db } from '@/lib/db'

export async function isUserSubscribed() {
  const user = await getCurrentUser()

  if (!user) return { success: false }

  const existingUser = await db.user.findUnique({ where: { id: user.id } })

  if (!existingUser) return { success: false }

  return { success: true, subscribed: existingUser.plan === 'premium' }
}
