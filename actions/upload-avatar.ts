// actions/upload-avatar.ts

'use server'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

export async function uploadAvatar2(
  base64Image: string,
  userId: string,
  originalFileName: string
) {
  const buffer = Buffer.from(base64Image.split(',')[1], 'base64')

  const fileName = `${userId}_${Date.now()}.webp`

  const { data, error } = await supabase.storage
    .from('images')
    .upload(fileName, buffer, {
      contentType: 'image/webp'
    })

  if (error) {
    throw error
  }

  console.log({ data })

  const { data: urlData } = await supabase.storage
    .from('images')
    .getPublicUrl(data.path)

  return urlData.publicUrl
}
