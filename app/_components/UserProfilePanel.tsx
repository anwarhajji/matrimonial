'use client'
import { LogoutButton } from '@/components/auth/logout-button'
import {
  Dropdown,
  DropdownTrigger,
  User,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'
import { User as PrismaUser } from '@prisma/client'
import { ExitIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'
import { CircularProgress } from '@nextui-org/react'

interface Props {
  user: PrismaUser
}
{
  /*  {' '}
      {user.stepCompletion! <= 4 && (
        <CircularProgress
          label="profil"
          size="sm"
          value={user.stepCompletion! * 20}
          color="success"
          showValueLabel={true}
        />
      )} */
}
const UserProfilePanel = ({ user }: Props) => {
  return (
    <>
      {user.stepCompletion! <= 4 && (
        <CircularProgress
          label="profil"
          size="sm"
          value={user.stepCompletion! * 20}
          color="warning"
          showValueLabel={true}
        />
      )}
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: user.image ?? '/profile.png'
            }}
            className="transition-transform"
            //name={`${user.fullname} `}
            name=""
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="User Actions"
          variant="flat"
          className="text-neutral-200 "
        >
          <DropdownItem>
            <Link href="/user/profile">Profile</Link>
          </DropdownItem>
          <DropdownItem>
            <Link href="/user/properties">Settings</Link>
          </DropdownItem>
          <DropdownItem key="logout" color="danger">
            <LogoutButton>
              <ExitIcon className="h-4 w-4 mr-2" />
              Logout
            </LogoutButton>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

export default UserProfilePanel
