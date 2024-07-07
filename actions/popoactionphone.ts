'use server'

import { revalidatePath } from 'next/cache'
import { getCurrentUser } from './userdata'
import { db } from '@/lib/db'

// Function to get the current user

interface UpdateProfileParams {
  name: string
  //height: string
  phonenumber: string
  //income: string
}

export async function updateUserProfile({
  name,
  // height,
  phonenumber
}: // income
UpdateProfileParams) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return { success: false, message: 'User not authenticated' }
  }

  try {
    // Update the User model
    await db.user.update({
      where: { id: currentUser.id },
      data: { name }
    })

    // Update the UserProfile model
    await db.userProfile.upsert({
      where: { userId: currentUser.id },
      update: {
        // height,
        phonenumber
        //income
      },
      create: {
        userId: currentUser.id,
        // height,
        phonenumber
        // income
      }
    })

    // Revalidate the profile page to reflect the changes
    revalidatePath('/settings')

    return { success: true, message: 'Profile updated successfully' }
  } catch (error) {
    console.error('Failed to update profile:', error)
    return { success: false, message: 'Failed to update profile' }
  }
}
