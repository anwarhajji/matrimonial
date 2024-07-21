'use client'

import { useRouter } from 'next/navigation'
import { Hero } from './_components/Hero'
import { Pricing } from './_components/Pricing'
import { useCurrentUser } from '@/hooks/user-current-user'
import { useEffect } from 'react'
import ComponentSUBSCRIPTION from './_components/App'

export default function Home() {
  return (
    <main>
      {/*       <Pricing />
       */}{' '}
      <ComponentSUBSCRIPTION />
      {/*       <MatrimonialPricingComponent />
       */}{' '}
    </main>
  )
}
