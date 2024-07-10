'use server'

import { db } from '@/lib/db'
import { UserWithMatchPercentage } from '@/types'
import { User, UserProfile } from '@prisma/client'
import { getCurrentUser } from './userdata'

export async function calculateMatchPercentages(): Promise<
  UserWithMatchPercentage[]
> {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    throw new Error('Current user not found')
  }

  const currentUserProfile = await db.userProfile.findFirst({
    where: { userId: currentUser.id }
  })

  if (!currentUserProfile) {
    throw new Error('Current user profile not found')
  }

  const allUsers = await db.user.findMany({
    where: {
      id: { not: currentUser.id },
      profilcomplete: true
    },
    include: { userProfil: true }
  })

  const usersWithMatchPercentage: UserWithMatchPercentage[] = allUsers.map(
    (user) => {
      const userProfile = user.userProfil[0] // Assuming there's only one profile per user

      if (!userProfile) {
        return { ...user, matchPercentage: 0 }
      }

      let totalScore = 0

      // Age matching (up to 15 points)
      if (currentUser.age && user.age) {
        const ageDifference = Math.abs(currentUser.age - user.age)
        if (ageDifference <= 2) totalScore += 15
        else if (ageDifference <= 5) totalScore += 12
        else if (ageDifference <= 10) totalScore += 8
        else totalScore += 5
      }

      // Country matching (10 points)
      if (currentUserProfile.country === userProfile.country) totalScore += 10

      // Religion matching (10 points)
      if (currentUserProfile.religion === userProfile.religion) totalScore += 10

      // Education matching (10 points)
      if (currentUserProfile.education === userProfile.education)
        totalScore += 10

      // Occupation matching (5 points)
      if (currentUserProfile.occupation === userProfile.occupation)
        totalScore += 5

      // Income range matching (5 points)
      if (currentUserProfile.income === userProfile.income) totalScore += 5

      // Smoking habits matching (5 points)
      if (currentUserProfile.smokinghabits === userProfile.smokinghabits)
        totalScore += 5

      // Drinking habits matching (5 points)
      if (currentUserProfile.drinkinghabits === userProfile.drinkinghabits)
        totalScore += 5

      // Travel preferences matching (5 points)
      if (
        currentUserProfile.travelpreferences === userProfile.travelpreferences
      )
        totalScore += 5

      // Marital status matching (10 points)
      if (currentUserProfile.maritalstatus === userProfile.maritalstatus)
        totalScore += 10

      // Kids preference matching (10 points)
      if (currentUserProfile.kids === userProfile.kids) totalScore += 10

      // City matching (5 points)
      if (currentUserProfile.city === userProfile.city) totalScore += 5

      // Pets preference matching (5 points)
      if (currentUserProfile.pets === userProfile.pets) totalScore += 5

      // Calculate percentage (total possible score is 100)
      const matchPercentage = totalScore

      return { ...user, matchPercentage }
    }
  )

  return usersWithMatchPercentage.sort(
    (a, b) => b.matchPercentage - a.matchPercentage
  )
}
