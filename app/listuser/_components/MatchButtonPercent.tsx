'use client'

import React, { useState } from 'react'
import { Chip } from '@nextui-org/react'
import { generateFixedMatchPercentage } from '@/utils/matchCalculator'
import { useCurrentUser } from '@/hooks/user-current-user'

interface MatchPercentageChipProps {
  // currentUserId: string
  otherUserId: string
}

export function MatchPercentageChip({ otherUserId }: MatchPercentageChipProps) {
  const [matchPercentage, setMatchPercentage] = useState<number | null>(null)

  const currentUser = useCurrentUser()

  const currentUserId = currentUser?.id!

  React.useEffect(() => {
    const percentage = generateFixedMatchPercentage(currentUserId, otherUserId)
    setMatchPercentage(percentage)
  }, [currentUserId, otherUserId])

  if (matchPercentage === null) {
    return null
  }

  let color: 'success' | 'warning' | 'danger'
  if (matchPercentage >= 80) {
    color = 'success'
  } else if (matchPercentage >= 70) {
    color = 'warning'
  } else {
    color = 'danger'
  }

  return (
    <Chip color={color} variant="faded">
      {matchPercentage}%
    </Chip>
  )
}
