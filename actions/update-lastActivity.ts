// app/actions/updateLastActivity.ts
'use server'
import { auth } from '@/auth'
import { db } from '@/lib/db'

export async function updateLastActivity() {
  const session = await auth()
  if (session && session.user) {
    await db.user.update({
      where: { id: session.user.id },
      data: { lastActivity: new Date() }
    })
    console.log(
      session.user.name,
      'user last activity updated caled',
      new Date()
    )
  }
  return 'Activity Updated'
}
