'use server'

import { SettingSchema } from '@/schemas'
import { getCurrentUser } from './userdata'
import { z } from 'zod'
import { db } from '@/lib/db'

export const actionSaveUser = async (values: z.infer<typeof SettingSchema>) => {
  const validatedFields = SettingSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { name, age, fullname, phonenumber } = validatedFields.data

  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  await db.$transaction([
    db.user.upsert({
      where: { id: user.id },
      update: {
        name,
        age,
        fullname
      },
      create: {
        // id: user.id,
        name,
        age,
        fullname
      }
    }),
    db.userProfile.upsert({
      where: { userId: user.id },
      update: {
        phonenumber
      },
      create: {
        userId: user.id,
        phonenumber
      }
    })
  ])

  return { success: true }
}
