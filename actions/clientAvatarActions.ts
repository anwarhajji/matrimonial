// actions/clientAvatarActions.ts

import { resizeImage, fileToBase64 } from '@/utils/clientUtils'
import { uploadAvatar2 } from './upload-avatar'

export async function prepareAndUploadAvatar(file: File, userId: string) {
  const resizedFile = await resizeImage(file)
  const base64 = await fileToBase64(resizedFile)
  return await uploadAvatar2(base64, userId, file.name)
}
