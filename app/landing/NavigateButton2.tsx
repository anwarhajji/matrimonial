// components/NavigateButton.jsx
'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'

const NavigateButton2 = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/journey')
  }

  return (
    <Button
      className="bg-gray-200 dark:bg-gray-800 text-fuchsia-600 dark:text-fuchsia-400 font-bold py-3 px-8 rounded-full hover:bg-fuchsia-100 dark:hover:bg-gray-700 transition duration-300"
      onClick={handleClick}
    >
      Start Your Journey
    </Button>
  )
}

export default NavigateButton2
