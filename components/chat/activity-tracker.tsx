// components/ActivityTracker.js
'use client'
import { useEffect } from 'react'
import throttle from 'lodash/throttle'
import { updateLastActivity } from '@/actions/update-lastActivity'

// Throttle to once every 60 seconds

const ActivityTracker = () => {
  useEffect(() => {
    const handleActivity = throttle(async () => {
      await updateLastActivity()
    }, 60000)

    // Call the function initially to set the first activity timestamp
    handleActivity()

    // Add event listeners for user activity on both desktop and mobile
    const events = ['mousemove', 'keydown', 'touchstart', 'touchmove']

    events.forEach((event) => window.addEventListener(event, handleActivity))

    // Clean up event listeners on component unmount
    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      )
    }
  }, [])

  return null // This component does not render anything
}

export default ActivityTracker
