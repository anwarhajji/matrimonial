'use client'

import type { CardProps } from '@nextui-org/react'

import React, { use, useEffect } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Tabs,
  Tab,
  ScrollShadow,
  CardFooter
} from '@nextui-org/react'

import { useQuery } from '@tanstack/react-query'
import {
  getUsersILikenomatch,
  getUsersWhoLikedMeButNoMatch,
  listMatches,
  listUserMatches
} from '@/actions/userdata'
import LikeCard from './CardLike'
import MatchCard from './CardMatch'
import InterestedCard from './CardInterested'

enum NotificationTabs {
  LIKE = 'like',
  MATCH = 'match',

  Interested = 'interested'
}

export const Notifications = (props: CardProps) => {
  const [activeTab, setActiveTab] = React.useState<NotificationTabs>(
    NotificationTabs.Interested
  )
  // quety for list of liked
  const likedQueryusers = useQuery({
    queryKey: ['listIliked'],
    queryFn: async () => await getUsersILikenomatch()
  })
  const likedusers = likedQueryusers.data!
  // query for list of interested
  const InterestedusersQuery = useQuery({
    queryKey: ['getUsersWhoLikedMeButNoMatch'],
    queryFn: async () => await getUsersWhoLikedMeButNoMatch()
  })

  const lisltInterested = InterestedusersQuery.data!
  console.log('listusers', InterestedusersQuery.data)
  // query for list of matches
  const MatchQuery = useQuery({
    queryKey: ['matchusers'],
    queryFn: async () => await listMatches()
  })
  const matchusers = MatchQuery.data!

  return (
    <Card className="w-full max-w-[420px]" {...props}>
      <CardHeader className="flex flex-col px-0 pb-0">
        <div className="flex w-full items-center justify-between px-5 py-2">
          <div className="inline-flex items-center gap-1">
            <h4 className="inline-block align-middle text-large font-medium">
              Notifications
            </h4>
            <Chip size="sm" variant="flat"></Chip>
          </div>
          {/*  <Button
            className="h-8 px-3"
            color="primary"
            radius="full"
            variant="light"
          >
            Mark all as read
          </Button> */}
        </div>
      </CardHeader>
      <Tabs
        aria-label="Notifications"
        classNames={{
          base: 'w-full',
          tabList:
            'gap-6 px-6 py-0 w-full relative rounded-none border-b border-divider',
          cursor: 'w-full',
          tab: 'max-w-fit px-2 h-12'
        }}
        color="primary"
        selectedKey={activeTab}
        variant="underlined"
        onSelectionChange={(selected) =>
          setActiveTab(selected as NotificationTabs)
        }
      >
        <Tab
          key="interested"
          title={
            <div className="flex items-center space-x-2">
              <span>interested</span>
              <Chip size="sm" variant="flat">
                {lisltInterested?.length}
              </Chip>
            </div>
          }
        >
          {/* <CardBody className="w-full gap-0 p-0">
            <ScrollShadow className="h-[500px] w-full">
              {lislikeds!?.length > 0 ? (
                lislikeds!.map((userlike) => (
                  <NotificationItem key={userlike?.userId!} {...userlike} />
                ))
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                  <Icon
                    className="text-default-400"
                    icon="solar:bell-off-linear"
                    width={40}
                  />
                  <p className="text-small text-default-400">
                    No notifications yet.
                  </p>
                </div>
              )}
            </ScrollShadow>
          </CardBody> */}
          <InterestedCard listinterested={lisltInterested} />
        </Tab>

        <Tab
          key="match"
          title={
            <div className="flex items-center space-x-2">
              <span>Matched users</span>
              <Chip size="sm" variant="flat">
                {matchusers?.length}
              </Chip>
            </div>
          }
        >
          <MatchCard matchedusers={matchusers} />
        </Tab>
        <Tab
          key="like"
          title={
            <div className="flex items-center space-x-2">
              <span> Liked</span>
              <Chip size="sm" variant="flat">
                {likedusers?.length}
              </Chip>
            </div>
          }
        >
          <LikeCard listiked={likedusers} />
        </Tab>
      </Tabs>
      {/*  <CardFooter className="justify-end gap-2 px-4">
        <Button
          variant={activeTab === NotificationTabs.Archive ? 'flat' : 'light'}
        >
          Settings
        </Button>
        {activeTab !== NotificationTabs.Archive && (
          <Button variant="flat">Archive All</Button>
        )}
      </CardFooter> */}
    </Card>
  )
}
