'use client'

import type { CardProps } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Listbox,
  ListboxItem,
  Progress,
  useDisclosure
} from '@nextui-org/react'
import { Icon } from '@iconify/react'
import ModalReview2 from './modal-pop'

import LocationForm from '../_forms/Step1LocationForm'
import Step2 from '../_forms/step2Education-form'
import Step3 from '../_forms/step3Habits-form'
import Step4 from '../_forms/step4Family-form'
import useStepStore from '@/store/useStepStore'
import { getUserSteps } from '@/actions/userdata'
import Popup1 from '../_forms/Popup1Username'
export default function ProfilsForm(props: CardProps) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const { setStep, step } = useStepStore()
  const [currentState, setCurrentState] = useState(step)

  useEffect(() => {
    getUserSteps().then((completed) => {
      console.log('step', step)
      console.log(completed)
      if (completed !== null && completed !== undefined) {
        setCurrentState(completed)
        console.log('current', currentState)

        if (completed > step) setStep(completed)
      }
    })
  }, [getUserSteps])

  const items = [
    {
      key: 'personal-details',
      icon: 'solar:user-bold',
      title: 'Personal Details',
      description: 'creat your profile',
      isCompleted: step > 1,
      formContent: <Popup1 onOpenChange={onOpenChange} />
      // <LocationForm onOpenChange={onOpenChange} />
    },

    {
      key: 'personal-infos',
      icon: 'solar:user-bold',
      title: 'Personal infos',
      description: 'Tell us about yourself',
      isCompleted: step >= 2,
      formContent: <LocationForm onOpenChange={onOpenChange} />
    },
    {
      key: 'Education and Career Information',
      icon: 'solar:user-plus-linear',
      title: 'Academic & Lifestyle ',
      description:
        'Tell Us About Your Education, Occupation, Income, and Lifestyle Choices',
      isCompleted: step >= 3,
      formContent: <Step2 onOpenChange={onOpenChange} />
    },
    {
      key: 'Personal Preferences & Beliefs ',
      icon: 'solar:users-group-rounded-linear',
      title: 'Personal Preferences  ',
      description: 'Share Your Travel Habits,  and Marital Status..',
      isCompleted: step >= 4,
      formContent: <Step3 onOpenChange={onOpenChange} />
    },
    {
      key: 'Family Information',
      icon: 'solar:graph-up-linear',
      title: 'Family Information',
      description:
        'Complete the Form with Additional Information and Contact Details',
      isCompleted: step >= 5,
      formContent: <Step4 onOpenChange={onOpenChange} />
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
                base: `w-full px-2 md:px-4 min-h-[70px] gap-3 ${
                  items.indexOf(item) + 1 > step
                    ? 'opacity-30 cursor-not-allowed pointer-events-none'
                    : ''
                }`,
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
                      className="text-White-200"
                      icon="solar:round-alt-arrow-right-bold"
                      width={30}
                    />
                  )}
                </div>
              }
              startContent={
                <div className="item-center flex rounded-medium border border-divider p-2">
                  <Icon
                    className="text-white/60 hover:text-primary-400 "
                    icon={item.icon}
                    width={24}
                  />
                </div>
              }
              title={item.title}
              //isDisabled={items.indexOf(item) + 1 > step}
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
