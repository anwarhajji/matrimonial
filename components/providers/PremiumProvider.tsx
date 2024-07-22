'use client'

import { useCurrentUser } from '@/hooks/user-current-user'
import BannerRegister from '../bannerRegister'
import PREMIUMBanner from '../bannerPremium'

export const PremiumProvider = () => {
  const user = useCurrentUser()
  return !user?.email ? (
    <BannerRegister />
  ) : (
    user?.plan === 'free' && user?.stepCompletion >= 6 && <PREMIUMBanner />
  )
}
