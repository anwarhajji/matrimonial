'use server'

import * as z from 'zod'
import { redirect } from 'next/navigation'

//import { unstable_update } from "@/auth";
import { db } from '@/lib/db'
import { GoogleSchema } from '@/schemas'
import { getUserById, getUserByUsername } from '@/data/user'
import { currentUser } from '@/lib/auth'

export const registeractionstep1 = async (
  values: z.infer<typeof GoogleSchema>
) => {
  const user = await currentUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const dbUser = await getUserById(user.id!)

  if (!dbUser) {
    return { error: 'Unauthorized' }
  }

  /* if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }
 */

  const existingUsername = await getUserByUsername(values.username)
  console.log('ussserrr nammme is  : ', existingUsername)

  if (existingUsername) {
    return { error: 'Username already in use!' }
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser?.id! },
    data: {
      ...values,
      profilcomplete: true
    }
  })

  /*  unstable_update({
    user: {
      username: updatedUser.username,
      age: updatedUser.age,
      // isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      gender: updatedUser.gender,
      fullname: updatedUser.fullname,
    },
  }); */
  //redirect('/settings')

  return { success: 'registeration success Updated!' }
}
