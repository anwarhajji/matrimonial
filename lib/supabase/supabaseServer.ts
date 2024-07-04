'use server'
import { cookies } from 'next/headers'

//import createClient  from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'

import { Database } from '@/types/supabase'
import { auth } from '@/auth'
const supabaseAccessToken = auth()
export const supabaseServer = () => {
  const cookieStore = cookies()
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    /* {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken}`
        }
      }
    } */
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )
}
