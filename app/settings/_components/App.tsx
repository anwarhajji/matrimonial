'use client'
import { Avatar, Button, Spacer, Tab, Tabs } from '@nextui-org/react'
import { Icon } from '@iconify/react'

import ProfileSetting from './profile-setting'
import AppearanceSetting from './appearance-setting'
import AccountSetting from './account-setting'
import BillingSetting from './billing-setting'
import TeamSetting from './team-setting'

/**
 * This example requires installing the `usehooks-ts` and `lodash` packages.
 * `npm install usehooks-ts lodash`
 *
 * import {useMediaQuery} from "usehooks-ts";
 * import {isEqual, uniqWith} from "lodash";
 *
 *
 * 💡 TIP: You can use the usePathname hook from Next.js App Router to get the current pathname
 * and use it as the active key for the Sidebar component.
 *
 * ```tsx
 * import {usePathname} from "next/navigation";
 *
 * const pathname = usePathname();
 * const currentPath = pathname.split("/")?.[1]
 *
 * <Sidebar defaultSelectedKey="home" selectedKeys={[currentPath]} />
 * ```
 */
export default function Component() {
  const tabTitles = [
    'Personalized Tab 1',
    'Personalized Tab 2',
    'Personalized Tab 3'
  ]

  return (
    <div className="bg-black flex h-dvh w-full gap-4">
      {/* Sidebar */}
      {/*  Settings Content */}
      <div className="w-full max-w-2xl flex-1 p-4">
        {/* Title */}
        <div className="flex items-center gap-x-3">
          <Button
            isIconOnly
            className="sm:hidden"
            size="sm"
            variant="flat"
            // onPress={onOpenChange}
          >
            <Icon
              className="text-default-500"
              icon="solar:sidebar-minimalistic-linear"
              width={20}
            />
          </Button>
          <h1 className="text-3xl font-bold leading-9 text-default-foreground">
            Settings
          </h1>
        </div>
        <h2 className="mt-2 text-small text-default-500">
          Customize settings, email preferences, and web appearance.
        </h2>
        {/*  Tabs */}
        <Tabs
          fullWidth
          classNames={{
            base: 'mt-6',
            cursor: 'bg-content1 dark:bg-content1',
            panel: 'w-full p-0 pt-4'
          }}
          aria-label="Options"
        >
          <Tab key="profile" title="Profile" aria-label="Profile">
            <ProfileSetting />
          </Tab>
          {/*  <Tab key="appearance" title="Appearance" aria-label="Appearance">
            <AppearanceSetting ref="appearance" />
          </Tab> */}
          <Tab key="account" title="Account" aria-label="Account">
            <AccountSetting />
          </Tab>
          {/* <Tab key="billing" title="Billing" aria-label="Billing">
            <BillingSetting ref="billing" />
          </Tab>
          <Tab key="team" title="Team" aria-label="Team">
            <TeamSetting ref="team" />
          </Tab> */}
        </Tabs>
        <Spacer y={2} />
      </div>
    </div>
  )
}
