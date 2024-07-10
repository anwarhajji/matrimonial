'use server'

import { db } from '@/lib/db'
import { User, UserProfile } from '@prisma/client'

type UserWithProfile = User & { userProfil: UserProfile[] }

export async function calculateMatchPercentage(
  user1Id: string,
  user2Id: string
): Promise<number> {
  const user1 = await db.user.findUnique({
    where: { id: user1Id },
    include: { userProfil: true }
  })

  const user2 = await db.user.findUnique({
    where: { id: user2Id },
    include: { userProfil: true }
  })

  if (!user1 || !user2) {
    throw new Error('One or both users not found')
  }

  const profile1 = user1.userProfil[0]
  const profile2 = user2.userProfil[0]

  if (!profile1 || !profile2) {
    throw new Error('One or both user profiles not found')
  }

  let totalScore = 0

  // Age matching (up to 15 points)
  if (user1.age && user2.age) {
    const ageDifference = Math.abs(user1.age - user2.age)
    if (ageDifference <= 2) totalScore += 15
    else if (ageDifference <= 5) totalScore += 12
    else if (ageDifference <= 10) totalScore += 8
    else totalScore += 5
  }

  // Country matching (10 points)
  if (profile1.country === profile2.country) totalScore += 10

  // Religion matching (10 points)
  if (profile1.religion === profile2.religion) totalScore += 10

  // Education matching (10 points)
  if (profile1.education === profile2.education) totalScore += 10

  // Occupation matching (5 points)
  if (profile1.occupation === profile2.occupation) totalScore += 5

  // Income range matching (5 points)
  if (profile1.income === profile2.income) totalScore += 5

  // Smoking habits matching (5 points)
  if (profile1.smokinghabits === profile2.smokinghabits) totalScore += 5

  // Drinking habits matching (5 points)
  if (profile1.drinkinghabits === profile2.drinkinghabits) totalScore += 5

  // Travel preferences matching (5 points)
  if (profile1.travelpreferences === profile2.travelpreferences) totalScore += 5

  // Marital status matching (10 points)
  if (profile1.maritalstatus === profile2.maritalstatus) totalScore += 10

  // Kids preference matching (10 points)
  if (profile1.kids === profile2.kids) totalScore += 10

  // City matching (5 points)
  if (profile1.city === profile2.city) totalScore += 5

  // Pets preference matching (5 points)
  if (profile1.pets === profile2.pets) totalScore += 5

  return totalScore
}
