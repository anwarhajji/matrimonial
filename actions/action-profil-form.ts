'use server'

import { db } from '@/lib/db'
import { getUserByEmail, getUserById } from '@/data/user'

import * as z from 'zod'
import { ProfilDetailsSchema } from '@/schemas'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const actionprofil = async (
  values: z.infer<typeof ProfilDetailsSchema>
) => {
  const validatedFields = ProfilDetailsSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const {
    height,
    weight,

    education,
    occupation,
    income,
    smokinghabits,
    drinkinghabits,
    phonenumber,
    city,
    country,

    religion,
    travelpreferences,
    maritalstatus,
    kids,
    pets
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

  await db.userProfile.create({
    data: {
      userId: userid,
      //userId,
      //userid,
      height,
      weight,
      education,
      occupation,
      income,
      smokinghabits,
      drinkinghabits,
      religion,
      travelpreferences,
      maritalstatus,
      kids,
      pets,
      city,
      country,
      phonenumber
    }
  })
  // redirect("/");
}
