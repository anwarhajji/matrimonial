// utils/clientUtils.ts

// utils/clientUtils.ts

// utils/clientUtils.ts

type FitOption = 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
// utils/clientUtils.ts

// utils/clientUtils.ts

import imageCompression from 'browser-image-compression'

type OutputFormat = 'auto' | 'jpeg' | 'png'

interface CompressionOptions {
  maxSizeMB: number
  maxWidthOrHeight: number
  useWebWorker: boolean
  maxIteration?: number
  fileType?: string
  initialQuality?: number
  alwaysKeepResolution?: boolean
  onProgress?: (progress: number) => void
}

export async function resizeImage(
  file: File,
  fit: FitOption = 'inside',
  outputFormat: OutputFormat = 'auto'
): Promise<File> {
  const originalFormat = file.type.split('/')[1]
  const fileType = outputFormat === 'auto' ? file.type : `image/${outputFormat}`

  const options: CompressionOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 300,
    useWebWorker: true,
    maxIteration: 10,
    fileType: fileType,
    initialQuality: 0.9,
    alwaysKeepResolution: false
  }

  try {
    let compressedFile = await imageCompression(file, options)

    if (fit === 'cover') {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      const img = new Image()

      await new Promise((resolve) => {
        img.onload = resolve
        img.src = URL.createObjectURL(compressedFile)
      })

      const aspectRatio = img.width / img.height
      let newWidth = 300
      let newHeight = 300

      if (aspectRatio > 1) {
        newWidth = 300 * aspectRatio
      } else {
        newHeight = 300 / aspectRatio
      }

      canvas.width = 300
      canvas.height = 300

      ctx.drawImage(
        img,
        (300 - newWidth) / 2,
        (300 - newHeight) / 2,
        newWidth,
        newHeight
      )

      const mimeType =
        outputFormat === 'auto' ? file.type : `image/${outputFormat}`
      const quality = mimeType === 'image/png' ? undefined : 0.7

      /* const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob(resolve, mimeType, quality)
      ) */
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Failed to create blob.'))
            }
          },
          mimeType,
          quality
        )
      })

      compressedFile = new File([blob], compressedFile.name, { type: mimeType })
    }

    return compressedFile
  } catch (error) {
    console.error('Error compressing image:', error)
    throw error
  }
}

/* export async function resizeImage(
  file: File,
  fit: FitOption = 'cover'
): Promise<File> {
  const options: imageCompression.Options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 300,
    useWebWorker: true,
    maxIteration: 10,
    exifOrientation: 1, // Changed from boolean to number
    fileType: 'image/jpeg',
    initialQuality: 0.7,
    alwaysKeepResolution: false,
    resize: {
      width: 300,
      height: 300,
      fit: fit
    }
  }

  try {
    const compressedFile = await imageCompression(file, options)
    return compressedFile
  } catch (error) {
    console.error('Error compressing image:', error)
    throw error
  }
} */

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}
