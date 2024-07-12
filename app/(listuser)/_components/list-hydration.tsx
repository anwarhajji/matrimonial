'use client'
import { cn } from '@/lib/utils'
import PlaceListItem from './place-list-itemClick'
import { iUserProps2 } from '@/components/usersfiltr/UserCard'
import {
  getUsersWithLikedAndMatchStatus,
  getUserslist,
  iUserPropstatus
} from '@/actions/userdata'
import LoadingList from './loadingList'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function Listusers({ className }: { className?: string }) {
  //const user = useCurrentUser()
  let listusers: iUserPropstatus[] = []
  const session = useSession()

  //listusers = await getDataUser()
  const { data, isLoading, error } = useQuery({
    queryKey: ['hydrate-users'],
    queryFn: () => getUsersWithLikedAndMatchStatus(),
    staleTime: 10 * 1000
  })

  if (error) {
    console.log('HADI=======>', error)
    return <div>error.message</div>
  }
  if (isLoading) {
    return <div className="text-3xl text-black">Loading::::::::::::::::</div> // <Suspense fallback={<LoadingList />>
  }

  if (!error && !isLoading) {
    listusers = data!

    console.log('hadi list hysratation data', listusers)
  }
  return (
    <div className="my-auto pt-8 flex h-full w-full   flex-col gap-3 p-6">
      <div
        className={cn(
          'grid w-full flex-auto items-center grid-cols-1  gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5',
          className
        )}
      >
        {listusers.map((list) => (
          <PlaceListItem key={list.userId} isLoading={isLoading} {...list} />
        ))}
      </div>
    </div>
  )

  // setIsLoading(isLoading!)
  // listusers = await getUsersINotLiked(session?.user?.id!)
}
