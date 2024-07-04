import {
  getUsersWhoLikedMe,
  getUsersWhoLikedMeButNoMatch
} from '@/actions/userdata'
import { auth } from '@/auth'
import UserCardtolike from '@/components/like/UserCardtolike'
import UserCardtounlike from '@/components/like/UserCardtounlike'
import { SkeltonCard } from '@/components/usersfiltr/SkeletonCard'
import { Suspense } from 'react'

const Interested = async () => {
  const session = await auth()

  if (!session?.user) return <div>Not authenticated</div>

  const listusers = await getUsersWhoLikedMeButNoMatch()

  function SkeletonLoading() {
    return (
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-center mb-4">
        <h1 className="text-xl font-bold bg-rose-200 rounded-full py-2 px-4">
          Who Likes Me
        </h1>
      </div>
      {listusers.length === 0 && (
        <div className="flex justify-center items-center h-screen bg-coral-400 rounded-full">
          <h2 className="text-3xl font-bold text-black">
            This list is empty! 😊{' '}
          </h2>
        </div>
      )}
      <div className="pt-32 pb-16 md:pt-52 md:pb-32  min-h-screen px-4 mx-auto sm:px-6 space-y-80">
        <section className="px-2 sm:px-8 lg:px-32 pt-12 min-h-screen flex flex-col items-center">
          <main className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 py-8">
            <Suspense fallback={<SkeletonLoading />}>
              {listusers.map(
                (user) =>
                  user.userId !== session?.user.id && (
                    <UserCardtounlike key={user.userId} {...user} />
                  )
              )}
            </Suspense>
          </main>

          {/* <button className="mx-auto border border-gray-300 text-secondary tracking-wide my-4 px-4 py-2 rounded-md cursor-pointer">
              Load More
            </button> */}
        </section>
      </div>{' '}
    </>
  )
}
export default Interested
