// Actions must be use server
'use server'
import * as z from 'zod'
import { RegisterSchema } from '@/schemas'
import bcrypt from 'bcrypt'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // Validate fields
  const validatedFields = RegisterSchema.safeParse(values)

  // If fields are not valid
  if (!validatedFields.success) {
    return { error: 'Invalid fields 😞' }
  }

  // extract validated fields
  const { email, password, name } = validatedFields.data

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // confirm email is not taken
  const exisitingUser = await getUserByEmail(email)

  // display text if email is taken
  if (exisitingUser) {
    return { error: 'Email already taken 😞' }
  }
  // succes code
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })
  // generate verification token
  const verificationToken = await generateVerificationToken(email)

  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  // If fields are valid
  //return ({ success: "Confirmation email sent!"},3000)

  // Display success message
  //res({ success: 'Confirmation email sent!' })
  // Redirect after 3 seconds
  /* setTimeout(() => {
    redirect(`/auth/login`) // Redirect to the main page
  }, 3000) */
  //
  //redirect(`/auth/login`)
  return {
    success:
      ' REGISTRATRATION SUCCESSFUL. Confirmation email sent! CONFIRM YOUR EMAIL AND LOGIN'
  }
}
