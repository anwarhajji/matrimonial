'use client'

import { useState, useEffect } from 'react'
import { getUserSteps } from '@/actions/userdata'
import { useRouter } from 'next/navigation'
import { Bs1CircleFill, Bs2CircleFill } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'

interface ProfileCardProps {
  id: string
}
const ProfileCompletionStatus = () => {
  const router = useRouter()
  const [hasCompleted, setHasCompleted] = useState(0)
  const [completionPercentage, setCompletionPercentage] = useState(0)
  useEffect(() => {
    getUserSteps().then((completed) => {
      console.log('completed', completed)
      if (completed !== null && completed !== undefined) {
        const totalSteps = 5
        const percentage = (completed / totalSteps) * 100

        setHasCompleted(completed)
        setCompletionPercentage(percentage)
      }
    })
  }, [])

  return (
    <div className="align-center my-2 flex shrink-0 items-center justify-center gap-3 self-stretch rounded-large bg-content1 px-3 py-3 shadow-small">
      {hasCompleted === 0 ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : hasCompleted === 5 ? (
        <div className="flex items-center">
          <Bs2CircleFill size={30} className="p-1" />
          {'  '}
          <p className="text-lg text-gray-500 font-medium">
            Profile is complete!
          </p>
          <FaCheck size={30} className="text-rose-200 mr-4 p-1" />
        </div>
      ) : (
        <div className="flex items-center">
          <p className="text-lg text-gray-500 font-medium">
            Profile is {completionPercentage.toFixed(0)}% complete. Please
            complete your profile steps.
          </p>
          <button
            className="bg-rose-300 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded"
            onClick={() => router.push('/auth/steps')}
          >
            Complete Profile
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfileCompletionStatus
