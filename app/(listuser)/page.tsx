import { dehydrate } from '@tanstack/query-core'
import { HydrationBoundary, QueryClient } from '@tanstack/react-query'
import Listusers from './_components/list-hydration'
import {
  getCurrentUser,
  getUsersWithLikedAndMatchStatus
} from '@/actions/userdata'
import Card from '@/components/matches/Card'
import BannerRegister from '@/components/bannerRegister'
import { redirect } from 'next/navigation'
import PREMIUMBanner from '@/components/bannerPremium'
import { PremiumProvider } from '@/components/providers/PremiumProvider'
export default async function Hydation() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['hydrate-users'],
    queryFn: getUsersWithLikedAndMatchStatus
  })

  const user = await getCurrentUser()
  if (!user?.email) {
    redirect('/landing')
  }
  if (user?.email && user?.stepCompletion! < 5) {
    redirect('/formprofil')
  }

  return (
    <>
      {user?.plan === 'free' && (
        <div className=" pb-16 md:pt-4 md:pb-32  min-h-screen px-4 mx-auto sm:px-6 space-y-80">
          {/*           {!user?.email ? <BannerRegister /> : } <PremiumProvider />
           */}{' '}
          <PREMIUMBanner />
          <section className="px-2 sm:px-8 lg:px-32 pt-4 min-h-screen flex flex-col items-center">
            <main className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-2 ">
              <Card id={338} />
              <Card id={103} />
              <Card id={640} />
              <Card id={134} />
              <Card id={211} />
              <Card id={499} />
              <Card id={397} />
              <Card id={351} />
              <Card id={344} />
              <Card id={377} />
              <Card id={330} />
              <Card id={443} />
            </main>
          </section>
        </div>
      )}
      {user?.id !== null && user?.id !== undefined && user?.plan !== 'free' && (
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Listusers />
        </HydrationBoundary>
      )}
    </>
  )
}
