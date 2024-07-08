'use client'

import type { CardProps } from '@nextui-org/react'
import React, { useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Listbox,
  ListboxItem,
  Progress,
  useDisclosure,
  Input,
  Textarea,
  Button,
  Spacer
} from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserFormValidation } from '@/schemas'
import { z } from 'zod'
import ModalReview2 from './modal-pop'
import Popup1 from '../_forms/Popup1Username'
import { PatientForm } from '../_forms/POPUP2'
import Step2 from '../_forms/step2-form'
import Step1 from '../_forms/step1-form'
import Step3 from '../_forms/step3-form'

import Step4 from '../_forms/step4-form'
import LocationForm from '../_forms/LocationForm'
import ModalReview from './modal-form'
export default function ProfilsForm(props: CardProps) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  const items = [
    {
      key: 'personal-details',
      icon: 'solar:user-bold',
      title: 'Personal Details',
      description: 'Tell us about yourself',
      isCompleted: false,
      formContent: (
        <LocationForm onOpenChange={onOpenChange} />
        /*         <Step1 onOpenChange={onOpenChange} />
         */
        /*  <>
          <Input
            label="Name"
            placeholder="Enter your name"
            startContent={<Icon icon="solar:user-bold" />}
          />
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            startContent={<Icon icon="solar:user-bold" />}
          />
        </> */
      )
    },
    {
      key: 'add-your-team',
      icon: 'solar:user-plus-linear',
      title: 'Add your team',
      description: 'Invite your team members to your organization.',
      isCompleted: false,
      formContent: <Step2 onOpenChange={onOpenChange} />
    },
    {
      key: 'add-share-holders',
      icon: 'solar:users-group-rounded-linear',
      title: 'Add shareholders',
      description:
        'Add your shareholders to your organization and captable so they can view their holdings.',
      isCompleted: false,
      formContent: (
        <>
          <Step3 onOpenChange={onOpenChange} />

          {/* <Input
            label="Title"
            placeholder="Enter the title"
            startContent={<Icon icon="solar:pen-bold" />}
          />
          <Textarea
            disableAutosize
            classNames={{
              input: 'h-32 resize-y !transition-none'
            }}
            label="Description"
            placeholder="Enter the description"
          /> */}
        </>
      )
    },
    {
      key: 'add-valuations',
      icon: 'solar:graph-up-linear',
      title: 'Add valuations',
      description:
        'Add your company valuations to your captable to help track your progress.',
      isCompleted: false,
      formContent: (
        <Step4 onOpenChange={onOpenChange} />
        /* <>
          <Input
            label="Valuation"
            placeholder="Enter the valuation"
            startContent={<Icon icon="solar:graph-up-bold" />}
          />
          <Textarea
            disableAutosize
            classNames={{
              input: 'h-32 resize-y !transition-none'
            }}
            label="Valuation Description"
            placeholder="Enter the valuation description"
          />
        </> */
      )
    }
  ]

  const [openModalKey, setOpenModalKey] = useState<string | null>(null)

  const handleAction = (selectedKey: string) => {
    const selectedItem = items.find((item) => item.key === selectedKey)
    if (selectedItem && !selectedItem.isCompleted) {
      setOpenModalKey(selectedKey)
      onOpen()
    }
  }

  const completedItemsCount = items.filter((item) => item.isCompleted).length
  const progress = (completedItemsCount / items.length) * 100

  return (
    <Card {...props} className="max-w-[520px] py-1 md:py-4">
      <CardHeader className="flex items-center gap-3 px-4 pb-0 pt-3 md:px-10 md:pt-5">
        <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-gradient-to-br from-secondary-300 to-primary-500">
          <Icon
            className="text-white"
            icon="solar:skateboarding-line-duotone"
            width={30}
          />
        </div>
        <Progress
          showValueLabel
          classNames={{
            label: 'font-medium',
            indicator: 'bg-gradient-to-r from-primary-400 to-secondary-500',
            value: 'text-foreground/60'
          }}
          label="Onboarding"
          value={progress}
        />
      </CardHeader>

      <CardBody className="px-1 pt-3 sm:px-2 md:px-6">
        <Listbox
          hideSelectedIcon
          aria-label="Onboarding checklist"
          items={items}
          variant="flat"
          onAction={handleAction}
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              classNames={{
                base: 'w-full px-2 md:px-4 min-h-[70px] gap-3',
                title: 'text-medium font-medium',
                description: 'text-small',
                selected: item.isCompleted ? 'pointer-events-none' : ''
              }}
              description={item.description}
              endContent={
                <div className="flex flex-none">
                  {item.isCompleted ? (
                    <Icon
                      className="text-violet-500"
                      icon="solar:check-circle-bold"
                      width={30}
                    />
                  ) : (
                    <Icon
                      className="text-default-400"
                      icon="solar:round-alt-arrow-right-bold"
                      width={30}
                    />
                  )}
                </div>
              }
              startContent={
                <div className="item-center flex rounded-medium border border-divider p-2">
                  <Icon
                    className="text-secondary"
                    icon={item.icon}
                    width={24}
                  />
                </div>
              }
              title={item.title}
            />
          )}
        </Listbox>
        {/*  {items.map((item) => (
          <ModalReview2
            key={item.key}
            isOpen={isOpen && openModalKey === item.key}
            //onClose={onClose}
            onOpenChange={onOpenChange}
            title={item.title}
            description={item.description}
          >
            {item.formContent}
          </ModalReview2>
        ))} */}
        {items.map((item) => (
          <ModalReview2
            key={item.key}
            isOpen={isOpen && openModalKey === item.key}
            onOpenChange={onOpenChange}
            title={item.title}
            description={item.description}
          >
            {item.formContent}
          </ModalReview2>
        ))}
      </CardBody>
    </Card>
  )
}
