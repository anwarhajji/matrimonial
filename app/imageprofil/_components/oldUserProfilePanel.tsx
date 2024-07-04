'use client'
import {
  Dropdown,
  DropdownTrigger,
  User,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'
import { User as PrismaUser } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

interface Props {
  user: PrismaUser
}
const OLDUserProfilePanel = ({ user }: Props) => {
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: user.image ?? '/profile.png'
          }}
          className="transition-transform"
          name={`${user.fullname} `}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem>
          <Link href="/user/profile">Profile</Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/user/properties">Properties</Link>
        </DropdownItem>
        <DropdownItem key="logout" color="danger">
          {/*           <LogoutLink>Log Out</LogoutLink>
           */}{' '}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default OLDUserProfilePanel
