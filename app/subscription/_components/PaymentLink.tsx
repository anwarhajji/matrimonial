'use client'

import Link from 'next/link'
import { buttonVariants } from './buttonvar'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useCurrentUser } from '@/hooks/user-current-user'

type PaymentLinkProps = {
  href: string
  paymentLink?: string
  text: string
}

const PaymentLink = ({ href, paymentLink, text }: PaymentLinkProps) => {
  const router = useRouter()
  const user = useCurrentUser()
  const handleLinkClick = () => {
    if (!user?.email) {
      router.push('/auth/login')
    }
    if (paymentLink) {
      localStorage.setItem('stripePaymentLink', paymentLink)

      const stripePaymentLink = localStorage.getItem('stripePaymentLink')
      if (stripePaymentLink && user?.email) {
        localStorage.removeItem('stripePaymentLink')
        router.push(stripePaymentLink + `?prefilled_email=${user.email}`)
      }
    }
  }

  return (
    <Link href={href} className={buttonVariants()} onClick={handleLinkClick}>
      {text}
    </Link>
  )
}
export default PaymentLink
