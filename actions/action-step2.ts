'use server'

import { db } from '@/lib/db'
import { getUserByEmail, getUserById } from '@/data/user'

import * as z from 'zod'
import { Step2Schema } from '@/schemas'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const actionStep2 = async (values: z.infer<typeof Step2Schema>) => {
  const validatedFields = Step2Schema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { education, height, weight, income } = validatedFields.data

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
    db.userProfile.update({
      where: { userId: userid },
      data: { education, income, height, weight }
    }),
    db.user.update({
      where: { id: userid },
      data: { stepCompletion: 3 }
    })
  ])
}
