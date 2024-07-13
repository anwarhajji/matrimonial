import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { UserRole } from '@prisma/client'
import { getUserById } from '@/data/user'
import { db } from '@/lib/db'
import authConfig from '@/auth.config'

// auth
export const {
  handlers: { GET, POST },

  auth, // This auth thing helps us get user info such as for display certain content for them and specific data
  signIn,
  signOut
} = NextAuth({
  // if there is an error, redirect to this page
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  // events to get emailverfiied if the user used Oauth
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  // Callbacks allow us to customuzie the uth process such as who has access to what, get ID, and block users.
  callbacks: {
    // sign in
    async signIn({ user, account }) {
      // Allow OAuth without verification
      if (account?.provider !== 'credentials') return true

      // get exisiting user & restrict signin if they have not verified their email
      /* const exisitingUser = await getUserById(user.id ?? '')

      if (!exisitingUser?.emailVerified) return false */

      return true
    },

    async jwt({ token }) {
      // fetch user
      if (!token.sub) return token

      const exisitingUser = await getUserById(token.sub)

      if (!exisitingUser) return token

      token.lasactivity = exisitingUser.lastActivity
      token.email = exisitingUser.email
      token.fullname = exisitingUser.fullname!
      token.role = exisitingUser.role
      token.username = exisitingUser.username!
      token.gender = exisitingUser.gender!
      token.profilcomplete = exisitingUser.profilcomplete
      token.age = exisitingUser.age
      token.profilcomplete = exisitingUser.profilcomplete
      token.stepCompletion = exisitingUser.stepCompletion
      token.role = exisitingUser.role
      token.lasactivity = exisitingUser.lastActivity
      token.Image = exisitingUser.image
      // token.userProfil=exisitingUser.userProfil[0]

      return token
    },

    // token & session
    async session({ session, token }) {
      // if they have an id (sub) and user has been created, return it
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      // if they have a role and user has been created, return it
      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }
      if (session.user) {
        session.user.email = token.email!
        session.user.gender = (token.gender! as 'WOMEN') || 'MEN'
        session.user.username = token.username! as string
        session.user.profilcomplete = token.profilcomplete as boolean
        session.user.age = token.age! as number
        session.user.fullname = token.fullname! as string
        session.user.stepCompletion = token.stepCompletion! as number
        session.user.lastActivity = token.lasactivity as Date
        session.user.image = token.Image as string
      }
      console.log('session1', session)
      // you can add whatever you want. it is very powerful. if lost go to callbacks lesson at the 2:50:00 mark in the course

      return session
    }

    // jwt
    /* async jwt({ token }) {
      // fetch user
      if (!token.sub) return token

      const exisitingUser = await getUserById(token.sub)

      if (!exisitingUser) return token
      token.email = exisitingUser.email
      token.fullname = exisitingUser.fullname
      token.role = exisitingUser.role
      token.username = exisitingUser.username
      token.gender = exisitingUser.gender
      token.profilcomplete = exisitingUser.profilcomplete
      token.age = exisitingUser.age
      token.profilcomplete = exisitingUser.profilcomplete
      token.stepCompletion = exisitingUser.stepCompletion
      token.role = exisitingUser.role
      return token
    } */
    // session userId
  },

  adapter: PrismaAdapter(db),

  session: { strategy: 'jwt' },
  ...authConfig
})
