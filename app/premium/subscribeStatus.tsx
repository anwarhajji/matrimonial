'use client'

import Link from 'next/link'
import { buttonVariants } from '@/app/subscription/_components/buttonvar'
import { useQuery } from '@tanstack/react-query'
import { IsUserSubscribed } from '@/actions/isUserSubscribed'
const SubscribeStatus = () => {
  const { data } = useQuery({
    queryKey: ['isUserSubscribed'],
    queryFn: async () => IsUserSubscribed()
  })

  const isSubscribed = data?.subscribed

  return (
    <div className="flex items-center justify-between gap-2 px-4 py-3">
      {isSubscribed && (
        <>
          {' '}
          <div> STRIPE PORTAL : </div>
          <Link
            rel="noreferrer noopener"
            href={process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL! || ''}
            target="_blank"
            className={`border bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white ${buttonVariants(
              {
                variant: 'secondary'
              }
            )}`}
          >
            Billing Portal
          </Link>
        </>
      )}
    </div>
  )
}

export default SubscribeStatus
