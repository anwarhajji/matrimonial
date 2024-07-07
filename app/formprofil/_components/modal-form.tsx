'use client'

import React from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  type ModalProps
} from '@nextui-org/react'
import { FormProvider } from 'react-hook-form'

interface ModalReviewProps extends Omit<ModalProps, 'children'> {
  title: string
  description: string
  children: React.ReactNode
}

const ModalReview = React.forwardRef<HTMLDivElement, ModalReviewProps>(
  (
    { isOpen, onClose, onOpenChange, title, description, children, ...props },
    ref
  ) => (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} {...props} ref={ref}>
      <ModalContent>
        <ModalHeader className="flex-col pt-8">
          <h1 className="text-large font-semibold">{title}</h1>
          <p className="text-small font-normal text-default-400">
            {description}
          </p>
        </ModalHeader>
        <ModalBody className="pb-8">{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
)

ModalReview.displayName = 'ModalReview'

export default ModalReview
