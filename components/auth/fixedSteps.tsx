// components/FixedHeader.js

import { CircularProgress } from '@nextui-org/react'
import { boolean } from 'zod'

interface FixedHeaderProps {
  label: 'profil'
  size: 'sm'
  value: number
  color: 'warning'
  showValueLabel: true
}

const FixedSteps = (step: FixedHeaderProps) => {
  return (
    <div
      className=" grid justify-items-center fixed top-20 left-0 w-full text-white p-4 shadow-lg z-1
    0"
    >
      <CircularProgress
        label="profil"
        size="sm"
        value={step.value}
        color="warning"
        showValueLabel={true}
      />
    </div>
  )
}

export default FixedSteps
