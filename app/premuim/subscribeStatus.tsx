'use client'

import Link from 'next/link'
import { buttonVariants } from '../subscription/_components/buttonvar'
import { useQuery } from '@tanstack/react-query'
import { isUserSubscribed } from './actions'

const SubscribeStatus = () => {
  const { data } = useQuery({
    queryKey: ['isUserSubscribed'],
    queryFn: async () => isUserSubscribed()
  })

  const isSubscribed = data?.subscribed

  return (
    <>
      <div>SubscribeStatus</div>
      {isSubscribed && (
        <Link
          rel="noreferrer noopener"
          href={process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL! || ''}
          target="_blank"
          className={`text-[17px] ${buttonVariants({
            variant: 'ghost'
          })}`}
        >
          Billing Portal
        </Link>
      )}
    </>
  )
}

export default SubscribeStatus
