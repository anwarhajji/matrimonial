'use client'

import { useRouter } from 'next/navigation'
import { Hero } from './_components/Hero'
import { Pricing } from './_components/Pricing'
import { useCurrentUser } from '@/hooks/user-current-user'
import { useEffect } from 'react'

export default function Home() {
  return (
    <main>
      <Pricing />
    </main>
  )
}
