import type { Metadata } from 'next'

import './globals.css'
import { Toaster } from 'sonner'

import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvder } from '@/components/providers/confetti-provider'
import Scroll from '@/components/Scroll'
import { GeistSans } from 'geist/font/sans'

import { Providers } from './providers'

import Sidebar from '@/components/sidebar/Sidebar'
import ReactQueryProvider from './providers/reactQueryProvider'
const geist = GeistSans

/* export const metadata: Metadata = {
  metadataBase: new URL('https://nizzyabi.com'),
  title: {
    default: 'Nizzyabi',
    template: `%s | Nizzyabi`
  },
  openGraph: {
    description: 'Learn to code && have fun doing it.'
  }
} */

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  //update lasst seen user or activity
  return (
    <SessionProvider session={session}>
      <html lang="en" className="dark">
        <body className={geist.className}>
          <Scroll />
          <ToastProvider />
          <ConfettiProvder />
          <Providers>
            {/*<GoogleAnalytics gaId={`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />*/}

            <Toaster position="top-center" richColors closeButton />
            <div /* className="absolute inset-0 overflow-y-auto" */>
              <Sidebar>
                <div className="h-full">
                  <ReactQueryProvider>{children}</ReactQueryProvider>
                </div>
              </Sidebar>
            </div>
          </Providers>
        </body>
      </html>
    </SessionProvider>
  )
}
