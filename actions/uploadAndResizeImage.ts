'use server'
import { createClient } from '@supabase/supabase-js'
import sharp from 'sharp'
import { updateUserImage } from './images-actions'
import { getUserById } from '@/data/user'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function uploadAndResizeImage(image: File, userId: string) {
  // Resize the image using sharp
  const buffer = await image.arrayBuffer()
  const resizedBuffer = await sharp(Buffer.from(buffer))
    .resize(200, 200) // Change the size as needed
    .toBuffer()

  // Convert resized buffer back to File
  const resizedFile = new File([resizedBuffer], image.name, {
    type: image.type
  })

  // Upload the resized image to Supabase storage
  const { data, error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(`${userId}_${Date.now()}`, resizedFile)

  if (uploadError) {
    throw new Error(`Failed to upload image: ${uploadError.message}`)
  }

  // Get the public URL of the uploaded image
  const { data: urlData } = await supabase.storage
    .from('avatars')
    .getPublicUrl(data.path)

  if (!urlData.publicUrl) {
    throw new Error(`Failed to get public URL`)
  }

  const publicUrl = urlData.publicUrl

  // Delete the old image if it exists
  await deletOldImage(userId)

  // Update the user profile with the new image URL
  await updateUserImage(publicUrl, userId)

  return publicUrl
}

export async function deletOldImage(userId: string) {
  const user = await getUserById(userId)
  const oldImageUrl = user?.image

  if (!oldImageUrl || oldImageUrl.trim() === '') {
    console.log('No old image URL found')
    return null
  }

  const fileName = oldImageUrl.split('/').pop()
  if (!fileName) {
    console.log('Invalid old image URL')
    return null
  }

  const { error } = await supabase.storage.from('avatars').remove([fileName])

  if (error) {
    console.error('Error deleting old image:', error.message)
    return null
  }

  console.log('Old image deleted successfully')
  return fileName
}
