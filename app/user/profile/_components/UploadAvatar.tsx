'use client'

import { prepareAndUploadAvatar } from '@/actions/clientAvatarActions'
import { deletOldImage } from '@/data/upload'
import { updateUserImage } from '@/actions/images-actions'
import FileInput from './fileUpload'
import { Icon } from '@iconify/react'
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const UploadAvatar = ({ userId }: { userId: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [image, setImage] = useState<File>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleUpload = async () => {
    if (!image) return

    setIsSubmitting(true)
    try {
      const newAvatarUrl = await prepareAndUploadAvatar(image, userId)
      await deletOldImage(userId)
      await updateUserImage(newAvatarUrl, userId)
      router.refresh()
    } catch (error) {
      console.error('Error uploading avatar:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <button onClick={onOpen}>
        <Icon className="h-[9px] w-[9px]" icon="solar:pen-linear" />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload your profile picture
              </ModalHeader>
              <ModalBody>
                <FileInput
                  onChange={(e) => setImage((e as any).target.files[0])}
                />
                {image && <Image src={URL.createObjectURL(image)} />}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  isLoading={isSubmitting}
                  color="primary"
                  onPress={async () => {
                    await handleUpload()
                    onClose()
                  }}
                >
                  Change Avatar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default UploadAvatar
