import { Button, Link } from '@nextui-org/react'
import React from 'react'
import UserProfilePanel from './UserProfilePanel'
import { db } from '@/lib/db'
import { auth } from '@/auth'
import { IconSquareF5 } from '@tabler/icons-react'

const SignInPanel = async () => {
  const session = await auth()

  const user = session?.user!

  if (user) {
    const dbUser = await db.user.findUnique({
      where: {
        id: user?.id
      }
    })

    return <>{dbUser!! && <UserProfilePanel user={dbUser} />}</>
  }

  return (
    <div className="flex gap-3">
      <Button className="p-[2px] font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 h-full">
        <Link
          href="/auth/login"
          className="flex items-center px-5 lg:px-7 h-full rounded-md transition duration-300 text-white hover:bg-transparent text-base lg:text-lg"
        >
          Sign In
        </Link>
      </Button>
    </div>
  )
}

export default SignInPanel
