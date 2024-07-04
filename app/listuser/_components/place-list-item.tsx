'use client'

import React from 'react'
import { Button, Image, Skeleton } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { iUserProps } from '@/components/usersfiltr/UserCard'

import { cn } from '@/lib/utils'
import Link from 'next/link'
export type PlaceListItemColor = {
  name: string
  hex: string
}

export type PlaceItem = {
  id: string
  name: string
  href: string
  price: number
  isNew?: boolean
  rating?: number
  ratingCount?: number
  description?: string
  imageSrc: string
}

export type PlaceListItemProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'id'
> & {
  isPopular?: boolean
  isLoading?: boolean
  removeWrapper?: boolean
} & iUserProps

const PlaceListItem = React.forwardRef<HTMLDivElement, PlaceListItemProps>(
  (
    {
      name,
      age,
      userId,
      country,
      isLoading,
      gender,
      imagePath,
      removeWrapper,
      className,
      ...props
    },
    ref
  ) => {
    const [isLiked, setIsLiked] = React.useState(false)

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex w-full flex-none flex-col gap-3',
          {
            'rounded-none bg-background shadow-none': removeWrapper
          },
          className
        )}
        {...props}
      >
        <Button
          isIconOnly
          className="absolute right-3 top-3 z-20 bg-background/60 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
          radius="full"
          size="sm"
          variant="flat"
          onPress={() => setIsLiked(!isLiked)}
        >
          <Icon
            className={cn('text-default-900/50', {
              'text-danger-400': isLiked
            })}
            icon="solar:heart-bold"
            width={16}
          />
        </Button>
        <Button
          isIconOnly
          className="absolute Left-3 top-3 z-20 bg-background/60 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
          radius="sm"
          size="md"
          variant="solid"
        >
          <Icon
            className={cn('text-default-900/50', {
              'text-danger-400': isLiked
            })}
            icon="mdi:sparkles"
            width={32}
          />
        </Button>
        <Link href={`/user/${userId}`}>
          <Image
            isBlurred
            isZoomed
            alt={name!}
            className="aspect-square w-full hover:scale-110"
            isLoading={isLoading}
            src={imagePath!}
          />
        </Link>
        <div className="mt-1 flex flex-col gap-2 px-1">
          {isLoading ? (
            <div className="my-1 flex flex-col gap-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="mt-3 w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="mt-4 w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300" />
              </Skeleton>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-1">
                <h3 className="text-Medium font-medium text-rose-600">
                  {name}
                </h3>
                {age !== undefined ? (
                  <div className="flex items-center gap-1">
                    <Icon
                      className="text-default-500"
                      icon="mdi:cake-variant-outline"
                      width={16}
                    />
                    <span className="text-small text-default-500">
                      AGE :{age}
                    </span>
                  </div>
                ) : null}
              </div>
              {country ? (
                <div className="flex items-center gap-1">
                  <Icon
                    className="text-default-500"
                    icon="mdi:city"
                    width={16}
                  />{' '}
                  <p className="text-small text-default-500"> {country!}</p>{' '}
                </div>
              ) : null}
              {/* <p className="text-medium font-medium text-default-500">
                :{age!}
              </p> */}
            </>
          )}
        </div>
      </div>
    )
  }
)

PlaceListItem.displayName = 'PlaceListItem'

export default PlaceListItem
