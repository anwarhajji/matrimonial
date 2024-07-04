'use server'

import { ProfileACCOUNTSchema } from '@/schemas'
import { getCurrentUser } from './userdata'
import { z } from 'zod'
import { db } from '@/lib/db'

export const ActionAccoutUser = async (
  values: z.infer<typeof ProfileACCOUNTSchema>
) => {
  const validatedFields = ProfileACCOUNTSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const {
    height,
    weight,
    religion,
    education,
    income,
    kids,
    smokinghabits,
    drinkinghabits,
    travelpreferences,
    maritalstatus,
    city,
    country,
    occupation
  } = validatedFields.data

  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  await db.$transaction([
    db.userProfile.upsert({
      where: { userId: user.id },
      update: {
        height,
        weight,
        religion,
        education,
        income,
        kids,
        smokinghabits,
        drinkinghabits,
        travelpreferences,
        maritalstatus,
        city,
        country,
        occupation
      },
      create: {
        userId: user.id,
        height,
        weight,
        religion,
        education,
        income,
        kids,
        smokinghabits,
        drinkinghabits,
        travelpreferences,
        maritalstatus,
        city,
        country,
        occupation
      }
    })
  ])

  return { success: true }
}
