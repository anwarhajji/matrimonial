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
import { Icon } from '@iconify/react'

import { cn } from '@/lib/utils'
import { CheckIcon } from 'lucide-react'
import SendIvitation from '@/app/notification/_components/sendIvitation'
import { iUserPropstatus } from '@/actions/userdata'
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
          {/* <Button
            isIconOnly
            className="absolute right-3 top-3  bg-background/60 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
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
          </Button> */}
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
              <p className="text-black text-tiny">Available soon.</p>
              <p className="text-black text-tiny">Get notified.</p>
            </div>
            <Button
              className="text-tiny"
              color="primary"
              radius="full"
              size="sm"
            >
              Notify Me
            </Button>
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

        <section className="mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-20 sm:py-32 lg:px-8 lg:py-40">
          {/* <Button variant="bordered" onPress={onOpen}>
            Give Feedback
          </Button> */}
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
                    <h1 className="text-xl">{name}</h1>
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
                    <div className="flex justify-between">
                      <Chip
                        radius="full"
                        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                      >
                        AGE: {age}
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
                    {/*  <Textarea
                      aria-label="Feedback"
                      minRows={8}
                      name="feedback"
                      placeholder="Ideas or suggestions to improve our product"
                      variant="faded"
                    /> */}
                    <div className="mt-1 flex w-full items-center justify-end gap-2 px-1">
                      {/* <p className="text-tiny text-default-400 dark:text-default-300">
                        <Link
                          className="text-tiny text-default-500"
                          color="foreground"
                          href="https://guides.github.com/features/mastering-markdown/"
                          rel="noreferrer"
                          target="_blank"
                        >
                          Markdown
                          <Icon
                            className="[&>path]:stroke-[2px]"
                            icon="solar:arrow-right-up-linear"
                          />
                        </Link>
                        &nbsp;supported.
                      </p> */}
                    </div>
                    <Divider className="my-2" />
                    <div className="flex w-full items-center justify-between pb-4">
                      <div className="flex gap-2">
                        <Button
                          color="danger"
                          type="button"
                          variant="flat"
                          onPress={onClose}
                        >
                          Cancel
                        </Button>
                        {/*  <Button color="primary" type="submit">
                          Send invitation to {name}
                        </Button> */}
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
        {/* 
         {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <div className="flex flex-col gap-3 text-center text-black">
              <h2>fffffff{name}</h2>
              <p>fffffffff{country}</p>
            </div>
          </Modal>
        )}  */}
      </div>
    )
  }
)

PlaceListItem.displayName = 'PlaceListItem'

export default PlaceListItem
