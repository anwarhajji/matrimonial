import { getUserSteps } from '@/actions/userdata'
import { redirect } from 'next/navigation'
import ProfilsForm from './_components/MainProfilscomp'

export default async function Home() {
  const completed = await getUserSteps()
  if (completed !== null && completed !== undefined)
    if (completed > 6) return redirect('/settings')

  return (
    <div className="w-screen h-screen p-8 flex items-start justify-center">
      <ProfilsForm />
    </div>
  )
}
