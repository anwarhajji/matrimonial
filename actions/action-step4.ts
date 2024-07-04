'use server'

import { db } from '@/lib/db'
import { getUserByEmail, getUserById } from '@/data/user'

import * as z from 'zod'
import { Step4Schema } from '@/schemas'
import { currentUser } from '@/lib/auth'
import { permanentRedirect, redirect } from 'next/navigation'

export const actionStep4 = async (values: z.infer<typeof Step4Schema>) => {
  const validatedFields = Step4Schema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { kids, pets, phonenumber } = validatedFields.data

  //const existingUser = await getUserByEmail(email);

  // if (existingUser) {
  //  return { error: "Email already in use!" };
  //  }
  try {
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
        data: { phonenumber, pets, kids }
      }),
      db.user.update({
        where: { id: userid },
        data: { stepCompletion: 5 }
      })
    ])

    //permanentRedirect(`/matches`) // Navigate to the new user profile
    redirect(`/matches`)
    return { success: true }
  } catch (error) {
    console.log(error)
  }
}
