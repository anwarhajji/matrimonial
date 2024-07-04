// app/users/[id]/page.tsx
//import { useRouter } from 'next/navigation'
import { getUserById2 } from '@/actions/userdata'
import { Profiluser } from './_components/profilcomponent'

type UserProps = {
  params: { id: string }
}

export default async function UserProfilePage({ params }: UserProps) {
  const { id } = params
  const user = await getUserById2(id)
  if (!user) return <div>User not found</div>

  return <Profiluser user={user} />
}
