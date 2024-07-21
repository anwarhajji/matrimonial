import { User, UserRole } from '@prisma/client'
import NextAuth, { type DefaultSession } from 'next-auth'

// write extended user

// It is a bit messy, so in the future, checkout the docs for a better way to do this (authjs.dev/getting-started/typescript)

/* export type ExtendedUser = {
  role: UserRole
}
 */
export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole
  lastActivity: Date
  gender: string
  age: number
  username: string
  profilePhoto: string
  fullname: string
  name: string
  stepCompletion: number
  profilcomplete: boolean
  plan: string
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
    // userId: string
    //lastactivity: Date
  }
}
