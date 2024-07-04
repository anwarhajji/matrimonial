// components/AuthCard.tsx
'use client'
import { FaCheck, FaCircle } from 'react-icons/fa'
import UserButton from '../user-button'
import SignInButton from '../sign-In-Button'
import { Bs1CircleFill } from 'react-icons/bs'

export default function AuthCard({ userId }: { userId: string }) {
  return (
    <div className=" object-fill bg-white  rounded-lg p-6">
      {!userId ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Join our community</h2>
          <SignInButton />
          <UserButton />
        </div>
      ) : (
        <div className="flex items-center">
          <Bs1CircleFill size={30} className="p-1" />
          {'  '}

          <p className="text-lg text-gray-500 font-medium">You are connected</p>
          <FaCheck size={30} className="text-green-300 mr-4 p-1 " />
        </div>
      )}
    </div>
  )
}
