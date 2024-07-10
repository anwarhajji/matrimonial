'use server'

import { db } from '@/lib/db'
import { getUserByEmail, getUserById } from '@/data/user'

import * as z from 'zod'
import { Step1Schema } from '@/schemas'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const actionStep1 = async (values: z.infer<typeof Step1Schema>) => {
  const validatedFields = Step1Schema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const {
    phonenumber,
    occupation,

    city,
    country
  } = validatedFields.data

  //const existingUser = await getUserByEmail(email);

  // if (existingUser) {
  //  return { error: "Email already in use!" };
  //  }
  const user = await currentUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const dbUser = await getUserById(user.id!)
  if (!dbUser) {
    return { error: 'Unauthorized' }
  }

  const userid = dbUser?.id

  await db.$transaction([
    db.userProfile.upsert({
      where: {
        userId: userid
      },
      update: {
        phonenumber,
        occupation,
        city,
        country
      },
      create: {
        userId: userid,
        phonenumber,
        occupation,
        city,
        country
      }
    }),
    db.user.update({
      where: {
        id: userid
      },
      data: {
        stepCompletion: 3
      }
    })
  ])
}
