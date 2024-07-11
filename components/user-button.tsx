// User Button Avatar
'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import { Avatar } from '@mui/material'
import Link from 'next/link'
import { useCurrentUser } from '@/hooks/user-current-user'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { LogoutButton } from './auth/logout-button'

const UserButton = () => {
  const session = useCurrentUser()
  const router = useRouter()
  const onClick = () => {
    router.push('/auth/register')
  }
  return (
    <>
      {!session ? (
        <Button
          type="submit"
          onClick={onClick}
          className="p-[2px] font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 h-full"
        >
          <div className="flex items-center px-5 lg:px-7 h-full bg-zinc-800 rounded-md transition duration-300 text-white hover:bg-transparent text-base lg:text-lg">
            Sign Up
          </div>
        </Button>
      ) : (
        //  <Link href="/settings">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar
              src={session.image ? session.image : ''}
              alt="logo"
              className="shadow-md shadow-black hover:scale-110 transition-transform duration-300  bg-gradient-to-r from-pink-500 to-purple-500"
              sx={{ width: 40, height: 40 }}
            ></Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Link href="/settings">
                <span>My Account</span>
              </Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>
              <LogoutButton>
                <>
                  <LogOut className="mr-2 h-4 w-4" /> out
                </>
              </LogoutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}

export default UserButton
