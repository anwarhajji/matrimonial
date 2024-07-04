'use server'

import { deletOldImage } from '@/data/upload'
import { db } from '@/lib/db'

export async function updateUserImage(imageUrl: string, userId: string) {
  const imagedelet = await deletOldImage(userId)
  console.log('oldimagedelet', imagedelet)

  return await db.user.update({
    where: {
      id: userId
    },
    data: {
      image: imageUrl
    }
  })
}
