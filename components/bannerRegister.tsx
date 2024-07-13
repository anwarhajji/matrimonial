import React from 'react'
import { Button } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import NextLink from 'next/link'

export default function StickyBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 flex w-full items-center gap-x-3 border-b-1 border-divider bg-gradient-to-r from-default-100 via-danger-100 to-secondary-100 px-6 py-2 sm:px-3.5 sm:before:flex-1">
      <p className="text-small text-foreground">
        Find your perfect match: Register now and get started!&nbsp;
      </p>
      <div className="flex gap-x-2">
        <NextLink href="/auth/register" passHref>
          <Button
            className="group relative h-9 overflow-hidden bg-transparent text-small font-normal"
            color="default"
            endContent={
              <Icon
                className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
                icon="solar:arrow-right-linear"
                width={16}
              />
            }
            style={{
              border: 'solid 2px transparent',
              backgroundImage: `linear-gradient(hsl(var(--nextui-danger-50)), hsl(var(--nextui-danger-50))), linear-gradient(to right, #F871A0, #9353D3)`,
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
            variant="bordered"
          >
            Register
          </Button>
        </NextLink>
        <NextLink href="/auth/login" passHref>
          <Button
            className="group relative h-9 overflow-hidden bg-transparent text-small font-normal"
            color="default"
            endContent={
              <Icon
                className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
                icon="solar:arrow-right-linear"
                width={16}
              />
            }
            style={{
              border: 'solid 2px transparent',
              backgroundImage: `linear-gradient(hsl(var(--nextui-danger-50)), hsl(var(--nextui-danger-50))), linear-gradient(to right, #F871A0, #9353D3)`,
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
            variant="bordered"
          >
            Sign In
          </Button>
        </NextLink>
      </div>
      <div className="flex flex-1 justify-end">
        <Button
          isIconOnly
          aria-label="Close Banner"
          className="-m-1"
          size="sm"
          variant="light"
        >
          <Icon
            aria-hidden="true"
            className="text-default-500"
            icon="lucide:x"
            width={20}
          />
        </Button>
      </div>
    </div>
  )
}
