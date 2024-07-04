'use client'

import React from 'react'
import { Tabs, Tab } from '@nextui-org/react'

interface ClientTabsProps {
  photos: React.ReactNode
  music: React.ReactNode
  videos: React.ReactNode
}

const ClientTabs: React.FC<ClientTabsProps> = ({ photos, music, videos }) => {
  return (
    <div className="flex w-full items-center flex-col">
      <Tabs
        aria-label="Tabs colors"
        radius="full"
        color="primary"
        variant="light"
        classNames={{
          tabList:
            ' lg:gap-40 md:gap-20      gap-12 w-full relative items-center rounded-none  border-b border-divider',
          //cursor: 'w-full bg-[#22d3ee]',
          tab: 'max-w-fit w-full h-12 items-center justify-center text-base',
          tabContent: 'group-data-[selected=true]:text-[#06b6d4]'
        }}
      >
        <Tab key="photos" title="liked">
          {photos}
        </Tab>
        <Tab key="music" title="Match">
          {music}
        </Tab>
        <Tab key="videos" title="interested">
          {videos}
        </Tab>
      </Tabs>
    </div>
  )
}

export default ClientTabs
