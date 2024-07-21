'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getSubscriptionInfo } from '@/actions/getSubscriptionInfo'
import { useCurrentUser } from '@/hooks/user-current-user'
import { Button } from '@nextui-org/react'
import { buttonVariants } from '../subscription/_components/buttonvar'
import ComponentSUBSCRIPTION from '../subscription/_components/App'

const SubscriptionInfo = () => {
  const user = useCurrentUser()
  const userId = user?.id
  const { data, isLoading, error } = useQuery({
    queryKey: ['subscriptionInfo', userId],
    queryFn: async () => await getSubscriptionInfo()
  })

  if (isLoading)
    return (
      <div className="text-gray-600 dark:text-gray-300">
        Loading subscription info...
      </div>
    )
  if (error)
    return (
      <div className="text-red-600 dark:text-red-400">
        Error loading subscription info
      </div>
    )

  const { plan, daysLeft } = data!

  return (
    <>
      <div className="p-4 rounded-large bg-default-100">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
          Current Plan
        </h2>
        <p className="mb-2 text-gray-600 dark:text-gray-300">
          <span className="font-medium capitalize text-gray-800 dark:text-gray-100">
            {plan === 'free' ? (
              'free'
            ) : (
              <div
                //href="/premium"
                // shining animated button with purple gradient
                className={`border bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white ${buttonVariants(
                  {
                    variant: 'secondary'
                  }
                )}`}
              >
                Premium ✨
              </div>
            )}
          </span>
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <div className="flex items-center justify-between gap-2 px-4 py-3">
            {plan === 'free'
              ? "You're on the free plan with limited access. You can upgrade to a premium plan by subscribing to our plan"
              : `Days left in your premium plan: `}
            {plan === 'free' ? (
              <Button
                className=" bg-default-foreground text-background"
                radius="md"
                size="sm"
                variant="shadow"
              >
                Update
              </Button>
            ) : (
              ''
            )}
            {plan !== 'free' && (
              <span className="font-medium text-gray-800 dark:text-gray-100">
                {daysLeft} days
              </span>
            )}
          </div>
        </p>
      </div>
      {plan === 'free' ? <ComponentSUBSCRIPTION /> : null}
    </>
  )
}

export default SubscriptionInfo
