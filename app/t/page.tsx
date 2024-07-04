import { getCurrentUser } from '@/actions/userdata'
import AuthCard from '@/components/firstpage/AuthCard'
import ProfileCompletionStatus from '@/components/firstpage/ProfileCard'
import UserButton from '@/components/user-button'

const Home = async () => {
  const user = await getCurrentUser()

  if (!user) return <UserButton />

  return (
    <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8">
      <div className="rounded shadow-md border-gray-300 bg-white dark:border-pink-100 border-dashed border-2 h-auto">
        <AuthCard userId={user?.id!} />
      </div>
      <div className="rounded border-gray-300 shadow-md bg-white dark:border-pink-100 border-dashed border-2 h-auto">
        <ProfileCompletionStatus />
      </div>
      <div className="rounded border-pink-300 shadow-md bg-white dark:border-pink-100 border-dashed border-2 h-auto">
        <AuthCard userId={user?.id!} />
      </div>
    </div>
  )
}

export default Home
