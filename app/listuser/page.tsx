import { dehydrate } from '@tanstack/query-core'
import { HydrationBoundary, QueryClient } from '@tanstack/react-query'
import Listusers from './_components/list-hydration'
import { getUsersWithLikedAndMatchStatus } from '@/actions/userdata'

export default async function Hydation() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['hydrate-users'],
    queryFn: getUsersWithLikedAndMatchStatus
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Listusers />
    </HydrationBoundary>
  )
}
