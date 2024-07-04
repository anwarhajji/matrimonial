import { auth } from '@/auth'
import MultiStepForm from '@/components/auth/MultiStepForm'
import { getUserStepsByUserId } from '@/data/user'

async function multiformPage() {
  const session = await auth()

  console.log(' session', session)

  if (!session) {
    return null
  }
  const userid = session!.user!.id

  const step = await getUserStepsByUserId(userid!)

  if (!step) {
    return null
  }

  return <MultiStepForm stepCompletion={step!} />
}

export default multiformPage
