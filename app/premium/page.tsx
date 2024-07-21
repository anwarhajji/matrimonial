import { getCurrentUser } from '@/actions/userdata'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import SubscribeStatus from './subscribeStatus'
import SubscriptionInfo from './subscriptionInfo'

const Page = async () => {
  const user = await getCurrentUser()
  if (!user) return redirect('/')

  //	const userProfile = await db.user.findUnique({ where: { id: user.id } });
  //if (userProfile?.plan === "free") return redirect("/");
  if (user?.plan === 'free') return redirect('/')

  return (
    <div className="max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto">
        You are on the premium plan so you can see this page
      </div>
      <SubscribeStatus />
      <SubscriptionInfo />
    </div>
  )
}
export default Page
