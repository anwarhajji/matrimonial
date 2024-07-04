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
import { useCurrentUser } from '@/hooks/user-current-user'

export default async function Listusers({ className }: { className?: string }) {
  const user = useCurrentUser()
  let listusers: iUserPropstatus[] = []

  const { data, isLoading, error } = useQuery({
    queryKey: ['hydrate-users'],
    queryFn: () => getUsersWithLikedAndMatchStatus(),
    staleTime: 10 * 1000
  })

  useEffect(() => {
    if (!error && !isLoading) {
      listusers = data!
      console.log('hadi list hysratation data', listusers)
    }
  }, [data, isLoading, error])

  if (error) {
    console.log('HADI=======>', error)
    return <div>error.message</div>
  }
  if (isLoading) {
    return <div className="text-3xl text-black">Loading::::::::::::::::</div> // <Suspense fallback={<LoadingList />}
  }

  return (
    <div className="my-auto flex h-full w-full max-w-7xl flex-col gap-2 p-4">
      <div className="py-4">
        {/* <Switch isSelected={isLoading} onValueChange={setIsLLoading}>
          Is loading
        </Switch> */}
      </div>
      <div
        className={cn(
          'grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
          className
        )}
      >
        {listusers.map((list) => (
          <PlaceListItem key={list.userId} isLoading={isLoading} {...list} />
        ))}
      </div>
    </div>
  )
}
