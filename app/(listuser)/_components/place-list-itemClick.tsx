'use client'
import {
  Button,
  Card,
  CardFooter,
  Chip,
  Divider,
  // Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'

import React from 'react'
import { Image, Skeleton } from '@nextui-org/react'

import { cn } from '@/lib/utils'
import { CheckIcon, XIcon } from 'lucide-react'
import SendIvitation from '@/app/notification/_components/sendIvitation'
import { iUserPropstatus } from '@/actions/userdata'
import { MatchPercentageChip } from './MatchButtonPercent'
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
  isLoading?: boolean
  removeWrapper?: boolean
} & iUserPropstatus

const PlaceListItem = React.forwardRef<HTMLDivElement, PlaceListItemProps>(
  (
    {
      name,
      age,
      userName,
      userId,
      country,
      occupation,
      isLoading,
      gender,
      maritalstatus,
      imagePath,
      isLiked,
      isMatched,
      stepScompletion,

      removeWrapper,
      className,
      ...props
    },
    ref
  ) => {
    const [isliked, setIsLiked] = React.useState<boolean>(isLiked!)
    const [ismatched, setIsMatched] = React.useState<boolean>(isMatched)
    //setIsLiked(isLiked!)
    //setIsMatched(isMatched!)
    console.log('isliked', isliked)
    console.log('isliked db', isLiked)

    const { isOpen, onOpen, onOpenChange } = useDisclosure({
      defaultOpen: false
    })

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex w-full flex-none  flex-col gap-3',
          {
            'rounded-none bg-background shadow-none': removeWrapper
          },
          className
        )}
        {...props}
      >
        <Card isFooterBlurred className="bg-transparent">
          <Image
            isBlurred
            isZoomed
            alt={name!}
            className="aspect-square min-h-[300px] h-full w-full z-10 hover:scale-110"
            isLoading={isLoading}
            src={imagePath!}
            onClick={onOpen} // For desktop
            onTouchStart={onOpen} // For mobile
            // Add the onClick event
          />
          <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
            <div>
              {age !== undefined && age > 0 ? (
                <Chip
                  radius="full"
                  className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                >
                  {age} years
                </Chip>
              ) : null}
              {country !== undefined && country.length > 0 ? (
                <Chip
                  classNames={{
                    base: 'bg-gradient-to-br from-indigo-500 to-blue-500 border-small border-white/50 shadow-pink-500/30',
                    content: 'drop-shadow shadow-black text-white'
                  }}
                >
                  {country.toLocaleUpperCase()}
                </Chip>
              ) : null}
            </div>
            <MatchPercentageChip otherUserId={userId} />
          </CardFooter>
        </Card>

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
            <></>
          )}
        </div>

        <section className="mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-20 sm:py-32 lg:px-8 lg:py-40">
          <Modal
            isOpen={isOpen}
            shouldBlockScroll={false}
            onOpenChange={onOpenChange}
            backdrop="blur"
            placement="center"
          >
            <ModalContent>
              {(onClose) => (
                <ModalBody>
                  <ModalHeader className="flex-col items-center gap-1 px-0 text-center">
                    <h2 className="text-xl">{name}</h2>
                    <p className="text-small font-normal text-default-500">
                      @{userName}
                    </p>
                  </ModalHeader>
                  <Image src={imagePath} alt={name} />

                  <form
                    className="flex w-full flex-col gap-2"
                    onSubmit={(e) => {
                      e.preventDefault()
                      onClose()
                    }}
                  >
                    {/*  <div className="flex justify-between">
                      <Chip
                        radius="full"
                        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                      >
                        {age} years
                      </Chip>
                      <Chip
                        classNames={{
                          base: 'bg-gradient-to-br from-indigo-500 to-blue-500 border-small border-white/50 shadow-pink-500/30',
                          content: 'drop-shadow shadow-black text-white'
                        }}
                      >
                        {country}
                      </Chip>
                      <Chip
                        variant="shadow"
                        classNames={{
                          base: 'bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30',
                          content: 'drop-shadow shadow-black text-white'
                        }}
                      >
                        {occupation}
                      </Chip>
                      <Chip
                        startContent={<CheckIcon size={18} />}
                        variant="faded"
                        color="success"
                      >
                        {maritalstatus}
                      </Chip>
                    </div>
 */}
                    <div className="flex justify-between">
                      {age !== 0 && (
                        <Chip
                          radius="full"
                          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                        >
                          {age} years
                        </Chip>
                      )}
                      {country.length > 0 && (
                        <Chip
                          classNames={{
                            base: 'bg-gradient-to-br from-indigo-500 to-blue-500 border-small border-white/50 shadow-pink-500/30',
                            content: 'drop-shadow shadow-black text-white'
                          }}
                        >
                          {country}
                        </Chip>
                      )}
                      {occupation.length > 0 && (
                        <Chip
                          variant="shadow"
                          classNames={{
                            base: 'bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30',
                            content: 'drop-shadow shadow-black text-white'
                          }}
                        >
                          {occupation}
                        </Chip>
                      )}
                      {maritalstatus.length > 0 && (
                        <Chip
                          startContent={<CheckIcon size={18} />}
                          variant="faded"
                          color="success"
                        >
                          {maritalstatus}
                        </Chip>
                      )}
                    </div>

                    <div className="flex w-full items-center justify-between px-1">
                      {stepScompletion < 6 ? (
                        <Chip color="warning" radius="full">
                          incomplete profile
                        </Chip>
                      ) : null}
                    </div>

                    <div className="mt-1 flex w-full items-center justify-end gap-2 px-1"></div>
                    <Divider className="my-2" />
                    <div className="flex w-full items-center justify-between pb-4">
                      <div className="flex gap-2">
                        <SendIvitation
                          receiverId={userId!}
                          islike={isLiked}
                          ismatch={isMatched}
                        />
                      </div>
                    </div>
                  </form>
                </ModalBody>
              )}
            </ModalContent>
          </Modal>
        </section>
      </div>
    )
  }
)

PlaceListItem.displayName = 'PlaceListItem'

export default PlaceListItem