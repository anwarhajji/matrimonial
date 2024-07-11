'use client'

import React, { useEffect } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Progress,
  Spacer
} from '@nextui-org/react'
import { GrFormNextLink } from 'react-icons/gr'

import VerticalCollapsibleSteps from './vertical-collapsible-steps'
import SupportCard from './support-card'
import { useCurrentUser } from '@/hooks/user-current-user'

import { getUserSteps } from '@/actions/userdata'
import { useRouter } from 'next/navigation'

const steps = [
  {
    title: 'Create an account',
    description:
      'Create an account and verify your email to begin your journey with us.',
    details: [
      'Create a new account to get started with the registration process.',
      'Set up your account with a unique username and password.',
      'Verify your email address to complete the registration process.',
      ' Start connecting with potential matches and building meaningful relationships'
    ],
    link: '/auth/register'
  },
  {
    title: 'Create a Profile',
    description:
      'Building a detailed profile increases your chances of finding a compatible match. ',
    details: [
      'Fill in your personal details such as name, age, education, occupation, etc.',
      'Add information about your interests, hobbies, and what you are looking for in a partner..',
      'Upload your profile picture and cover photo.'
    ]
  },

  {
    title: 'Payment',
    description:
      'Complete the registration process to finalize your account setup.',
    details: [
      'Review your order and confirm that all details are correct.',
      'Once your payment is processed, your account will be activated.'
    ]
  }
]

export default function Component() {
  const user = useCurrentUser()
  const router = useRouter()

  let defaultStep = 0
  if (user) defaultStep = 1
  if (user === undefined) {
    console.log('User is undefined')
  }
  const [currentStep, setCurrentStep] = React.useState(defaultStep)

  useEffect(() => {
    getUserSteps().then((completed) => {
      if (completed !== null && completed !== undefined) {
        if (completed > 4) setCurrentStep(2)
      }
    })
  }, [])

  return (
    <div
      className="flex  justify-center items-center  sticky top-0 bottom-[60px] md:top-auto overflow-y-auto  md:max-h-none


    scrollbar-default "
    >
      <section className="max-w-sm p-4 bg-content1 rounded-large">
        <h1
          className="mb-2 text-xl text-slate-300 font-medium"
          id="getting-started"
        >
          Getting started
        </h1>
        <p className="mb-5 text-small text-default-500">
          Follow the steps to configure your account.
        </p>
        <Progress
          classNames={{
            base: 'px-0.5 mb-5',
            label: 'text-small',
            value: 'text-small text-gray-400'
          }}
          label="Steps"
          maxValue={steps.length - 1}
          minValue={0}
          showValueLabel={true}
          size="md"
          value={currentStep}
          valueLabel={`${currentStep + 1} of ${steps.length}`}
        />
        <VerticalCollapsibleSteps
          currentStep={currentStep}
          steps={steps}
          onStepChange={setCurrentStep}
        />
        <Spacer y={4} />
        <SupportCard className="!m-0 border border-default-200 !bg-default-50 px-2 shadow-none dark:border-default-100 dark:!bg-default-50/50" />
        <Spacer y={2} />
        {currentStep === 1 && (
          <>
            <Button
              className="w-full"
              color="success"
              variant="shadow"
              size="lg"
              startContent={<GrFormNextLink />}
              onClick={() => router.push('/auth/steps')}
            >
              COMPLETE NEXT STEP
            </Button>
          </>
        )}
        {currentStep === 2 && (
          <>
            {/* 
            <Button
              className="w-full"
              color="success"
              variant="shadow"
              size="lg"
              startContent={<GrFormNextLink />}
              onClick={() => router.push('/user/subscription')}
            >
              COMPLETE NEXT STEP
            </Button> */}
            <Card className="mx-2 overflow-visible" shadow="sm">
              <CardBody className="items-center py-5 text-center">
                <h3 className="text-medium font-medium text-default-700">
                  Upgrade to Pro
                  <span aria-label="rocket-emoji" className="ml-2" role="img">
                    🚀
                  </span>
                </h3>
                <p className="p-4 text-small text-default-500">
                  Get 1 month free and unlock all the features of the pro plan.
                </p>
              </CardBody>
              <CardFooter className="absolute -bottom-7 justify-center">
                <Button
                  className="px-10 shadow-md"
                  color="success"
                  radius="full"
                  variant="shadow"
                  onClick={() => router.push('/user/subscription')}
                >
                  Upgrade
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
        {/*         <ProfileCompletionStatus />
         */}{' '}
      </section>
    </div>
  )
}
