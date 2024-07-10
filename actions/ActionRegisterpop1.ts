// app/actions/registeractionstep1.ts
'use server'
import { GoogleSchema1 } from '@/schemas'
import { db } from '@/lib/db'
import { z } from 'zod'
import { getCurrentUser } from './userdata'

export const registeractionpop1 = async (
  values: z.infer<typeof GoogleSchema1>
) => {
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const validatedFields = GoogleSchema1.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { username, fullname, gender, age } = validatedFields.data

  try {
    // Check if the username already exists for a different user
    const existingUser = await db.user.findFirst({
      where: {
        username,
        NOT: { id: user.id }
      }
    })

    if (existingUser) {
      return { error: 'Username already exists' }
    }

    // Update the current user's profile
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        username,
        fullname,
        gender,
        age,
        stepCompletion: 2
      }
    })

    return {
      success: 'Profile updated successfully',
      user: updatedUser,
      snippet: {
        title: 'Profile Update Successful',
        description: `Your profile has been updated, ${fullname}!`,
        fields: [
          { label: 'Username', value: username },
          { label: 'Full Name', value: fullname },
          { label: 'Gender', value: gender },
          { label: 'Age', value: age }
        ]
      }
    }
  } catch (error) {
    console.error('Error in registeractionstep1:', error)
    return { error: 'An unexpected error occurred' }
  }
}
