import { ClassValue, clsx } from 'clsx'
//import { twMerge } from 'tailwind-merge'

import { extendTailwindMerge } from 'tailwind-merge'
const COMMON_UNITS = ['small', 'medium', 'large']

/* export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
 */
// utils/dateDifference.ts
export function getHoursDifference(date1: Date, date2: Date): number {
  const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime())
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60)
  return diffInHours
}
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      opacity: ['disabled'],
      spacing: ['divider'],
      borderWidth: COMMON_UNITS,
      borderRadius: COMMON_UNITS
    },
    classGroups: {
      shadow: [{ shadow: COMMON_UNITS }],
      'font-size': [{ text: ['tiny', ...COMMON_UNITS] }],
      'bg-image': ['bg-stripe-gradient']
    }
  }
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
