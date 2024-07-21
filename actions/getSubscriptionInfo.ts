'use server'

import { db } from '@/lib/db'
import { getCurrentUser } from './userdata'
//import { revalidatePath } from 'next/cache';

export async function getSubscriptionInfo() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('User not found')
  }

  const userId = user.id

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: { Subscription: true }
    })

    if (!user) {
      throw new Error('User not found')
    }

    const now = new Date()
    let daysLeft = 0

    if (user.plan === 'premium' && user.Subscription) {
      const endDate = new Date(user.Subscription.endDate)
      daysLeft = Math.ceil(
        (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      )
    } else if (user.plan === 'free') {
      daysLeft = Infinity // Free plan never expires
    }

    //revalidatePath('/dashboard'); // Adjust this path as needed

    return {
      plan: user.plan,
      daysLeft
    }
  } catch (error) {
    console.error('Error fetching subscription info:', error)
    throw error
  }
}
