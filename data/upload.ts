import { createClient } from '@supabase/supabase-js'
import { getUserById, getUserProfileByUserId } from './user'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function uploadImages(images: File[]) {
  const data = await Promise.all(
    images.map((file) =>
      supabase.storage.from('images').upload(`${file.name}_${Date.now()}`, file)
    )
  )

  const urls = data.map(
    (item) =>
      supabase.storage.from('images').getPublicUrl(item.data?.path ?? '').data
        .publicUrl
  )

  return urls
}

export async function uploadAvatar(image: File, userId: string) {
  const data = await supabase.storage
    .from('images')
    // .upload(`${image.name}_${Date.now()}`, image);
    .upload(`${userId}_${Date.now()}`, image)

  console.log({ data })

  const urlData = await supabase.storage
    .from('images')
    .getPublicUrl(data.data?.path!)

  return urlData.data.publicUrl
}

export async function deletOldImage(userid: string) {
  //const dbprofiluserid = await getUserProfileByUserId(userid)
  const dbuserImage = await getUserById(userid)
  const oldImageUrl = dbuserImage?.image!
  console.log('oldImageUrl     :', oldImageUrl)
  //const chekilinkExistence = await checkLinkExistence(oldImageUrl);

  if (!oldImageUrl || oldImageUrl.trim() === '') {
    console.log('url is empty')
    return false
  } else {
    console.log('url is not empty')
    const fileName = oldImageUrl.split('/').pop()
    console.log('fileName     :', fileName)

    // Delete the file from the Bucket
    const { error } = await supabase.storage.from('images').remove([fileName!])

    // Delete the old image from the database

    if (error) {
      console.error('Error deleting old image:', error.message)
    } else {
      console.log('Old image deleted successfully')
      return fileName
    }
  }
}
