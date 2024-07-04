'use server'

import { db } from '@/lib/db'
import { number } from 'zod'

export const saveSubscription = async ({
  paymentId,
  planId,
  userId
}: {
  paymentId: string
  planId: string
  userId: string
}) => {
  try {
    await db.subscription.create({
      data: {
        paymentId: paymentId,
        user: {
          connect: {
            id: userId
          }
        },
        plan: {
          connect: {
            id: planId
          }
        }
      }
    })

    return {
      message: 'Subscription Saved Successfully'
    }
  } catch (e: any) {
    return {
      message: e.message
    }
  }
}

export const getSubscription = async ({
  userId,
  planId
}: {
  userId: string
  planId: string
}) => {
  const subscription = await db.subscription.findFirst({
    where: {
      user: {
        id: userId
      },
      plan: {
        id: planId
      }
    }
  })
  return subscription
}
export const getLastSubscription = async ({ userId }: { userId: string }) => {
  const subscription = await db.subscription.findFirst({
    where: {
      user: {
        id: userId
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return subscription
}

export const getSubscriptions = async ({ userId }: { userId: string }) => {
  try {
    const subscriptions = await db.subscription.findMany({
      where: {
        user: {
          id: userId
        }
      }
    })
    return subscriptions
  } catch (e: any) {
    return {
      message: e.message
    }
  }
}
