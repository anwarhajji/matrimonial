import React from 'react'
import SharedPageNav from '@/components/SharedPageNav'
import {
  UserGroupIcon,
  StarIcon,
  HandThumbUpIcon,
  EyeSlashIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import UserCard, { iUserProps } from '@/components/usersfiltr/UserCard'
import { db } from '@/lib/db'

const sharednavLinks = [
  { title: 'My matches', icon: <HeartIcon className="h-5 w-5" /> },
  { title: 'Favorites', icon: <StarIcon className="h-5 w-5" /> },
  { title: 'Visitors', icon: <UserGroupIcon className="h-5 w-5" /> },
  { title: 'Likes', icon: <HandThumbUpIcon className="h-5 w-5" /> },
  { title: 'Hidden matches', icon: <EyeSlashIcon className="h-5 w-5" /> }
]

async function getDataUser(): Promise<iUserProps[]> {
  const users = await db.user.findMany({
    select: {
      fullname: true,
      age: true,
      id: true,
      gender: true,
      image: true,

      userProfil: {
        select: {
          occupation: true,
          country: true
          //profilpicture: true
        }
      }
    }
  })
  return users.map((user) => ({
    userId: user.id ?? '',
    fullname: user.fullname ?? '',
    imagePath: user.image ?? '',
    age: user.age ?? 0,
    country: user.userProfil[0]?.country ?? '',
    gender: user.gender ?? '',
    occupation: user.userProfil[0]?.occupation ?? ''
  }))
}

const Listusers = async () => {
  const listusers = await getDataUser()
  return (
    <div className="pt-32 pb-16 md:pt-52 md:pb-32  min-h-screen px-4 mx-auto sm:px-6 space-y-80">
      <section className="px-2 sm:px-8 lg:px-32 pt-12 min-h-screen flex flex-col items-center">
        <SharedPageNav sharednavLinks={sharednavLinks} />
        {/* 
        <main className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 py-8">
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
        </main> */}

        <main className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 py-8">
          {listusers.map((user) => (
            <UserCard key={user.userId} {...user} />
          ))}
        </main>
        <button className="mx-auto border border-gray-300 text-secondary tracking-wide my-4 px-4 py-2 rounded-md cursor-pointer">
          Load More
        </button>
      </section>
    </div>
  )
}
export default Listusers
