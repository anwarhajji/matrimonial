'use client'

import Link from 'next/link'
import { MoreHorizontal, SquareUserRoundIcon } from 'lucide-react'
import { FullConversationType } from '@/types'

import { cn } from '@/lib/utils'
import { buttonVariants } from './button'

import { useCallback, useEffect, useState } from 'react'

interface SidebarProps {
  isCollapsed: boolean
  links: FullConversationType[]
  /* {
    name: string
    messages: Message[]
    avatar: string
    variant: 'grey' | 'ghost'
  }[] */
  onClick?: () => void
  isMobile: boolean
}

interface SidebarChatProps {
  conversations: FullConversationType[]
  //users: User[]
}

export function SidebarChat({ links, isCollapsed, isMobile }: SidebarProps) {
  //const [data, setData] = useState<FullConversationType[] | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  return (
    <>
      <div
        data-collapsed={isCollapsed}
        className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
      >
        {!isCollapsed && (
          <div className="flex justify-between p-2 items-center">
            <div className="flex gap-2 items-center text-2xl">
              <p className="font-medium">Chats</p>
              <span className="text-zinc-300">({links.length})</span>
            </div>

            <div>
              <Link
                href="#"
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'icon' }),
                  'h-9 w-9'
                )}
              >
                <MoreHorizontal size={20} />
              </Link>

              <Link
                href="#"
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'icon' }),
                  'h-9 w-9'
                )}
              >
                <SquareUserRoundIcon size={20} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
