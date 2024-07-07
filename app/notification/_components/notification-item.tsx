'use client'

import React, { useCallback } from 'react'
import { Avatar, Badge, Button } from '@nextui-org/react'
import { cn } from '@/lib/utils'
import { iUserProps } from '@/actions/userdata'
import SendIvitation from './sendIvitation'
import { useRouter } from 'next/navigation'

export type NotificationType = 'match' | 'interested' | 'liked'

/* export type NotificationItem = {
  id: string
  isRead?: boolean
  avatar: string
  description: string
  name: string
  time: string
  type?: NotificationType
} */
/* export type Userlike = {
  userId: string
  name: string
  imagePath: string
  age: string
  //isRead?: boolean
  // type?: likeType

  //description: string
} */

export type NotificationItemProps = React.HTMLAttributes<HTMLDivElement> &
  iUserProps & { type: NotificationType }

const NotificationItem = React.forwardRef<
  HTMLDivElement,
  NotificationItemProps
>(
  (
    {
      children,
      imagePath,
      name,
      //description,

      age,
      userId,
      // isRead,
      className,
      type,
      ...props
    },
    ref
  ) => {
    const router = useRouter()

    /**
     * Defines the content for different types of notifications.
     */
    const contentByType: Record<NotificationType, React.ReactNode> = {
      match: (
        <div className="flex gap-2 pt-2">
          <Button
            color="primary"
            onPress={() => router.push(`/users`)}
            size="sm"
          >
            Message
          </Button>
          <SendIvitation receiverId={userId!} islike={true} ismatch={true} />

          {/* <Button size="sm" variant="flat" color="danger">
            Delete your match
          </Button> */}
        </div>
      ),
      liked: (
        <div className="flex gap-2 pt-2">
          <SendIvitation receiverId={userId!} islike={true} ismatch={false} />
          {/* <Button size="sm" variant="flat" color="danger">
            Cancel your invitation
          </Button> */}
          {/*           <UnlikeButton receiverId={userId!} />
           */}{' '}
        </div>
      ),
      interested: (
        /*  <div className="flex items-center gap-2">
          <Icon
            className="text-secondary"
            icon="solar:figma-file-linear"
            width={30}
          />
          <div className="flex flex-col">
            <strong className="text-small font-medium">
              Brand_Logo_v1.2.fig
            </strong>
            <p className="text-tiny text-default-400">3.4 MB</p>
          </div>
        </div> */
        <div className="flex gap-2 pt-2">
          {/* <Button size="sm" color="success" variant="shadow">
            Accept invitation
          </Button> */}
          <SendIvitation
            text="Accept invitation"
            receiverId={userId!}
            islike={false}
            ismatch={false}
            color="success"
          />

          {/* <Button size="sm" variant="flat" color="warning">
            Decline
          </Button> */}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-3 border-b border-divider px-6 py-4',
          /* {
            'bg-primary-50/50': !isRead
          }, */
          className
        )}
        {...props}
      >
        <div className="relative flex-none">
          <Badge
            color="primary"
            content=""
            //isInvisible={isRead}
            placement="bottom-right"
            shape="circle"
          >
            <Avatar src={imagePath} />
          </Badge>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-small text-foreground">
            <strong className="font-medium">{name}</strong>{' '}
            {/*             {description || children}
             */}{' '}
            {children}{' '}
          </p>
          <time className="text-tiny text-default-400">{age}</time>
          {type && contentByType[type]}
        </div>
      </div>
    )
  }
)

NotificationItem.displayName = 'NotificationItem'

export default NotificationItem
