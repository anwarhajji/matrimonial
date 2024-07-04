'use client'

import FileInput from './fileUpload'
import { deletOldImage, uploadAvatar } from '@/data/upload'
import { PencilIcon } from '@heroicons/react/16/solid'
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
import { updateUserImage } from '@/actions/images-actions'

import { Icon } from '@iconify/react'
interface UploadAvatarProps {
  userId: string
  onUploadComplete: () => void
}

const UploadAvatar = ({ userId }: { userId: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [image, setImage] = useState<File>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

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
                Upload Avatar
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
                    setIsSubmitting(true)
                    if (!image) {
                      onClose()
                      return
                    }
                    // const session = await auth();
                    // const uId = session?.user?.id!;
                    console.log('uId', userId)

                    // const deleturl = await deletOldImage(urlold);
                    //console.log("deleturl after delet", deleturl);

                    const newAvatarUrl = await uploadAvatar(image, userId!)
                    const imagedelet = await deletOldImage(userId!)
                    console.log('oldimagedelet', imagedelet)
                    const result = await updateUserImage(newAvatarUrl, userId)
                    console.log('result', result)
                    //

                    console.log('router refressh')
                    setIsSubmitting(false)
                    onClose()
                    router.refresh()
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
