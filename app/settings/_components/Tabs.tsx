// app/components/Tabs.tsx

'use client'

import { Tabs, Tab } from '@nextui-org/react'
import { ReactNode } from 'react'

interface CustomTabsProps {
  titles: string[]
  children: ReactNode[]
}

const CustomTabs = ({ titles, children }: CustomTabsProps) => {
  return (
    <Tabs>
      {children.map((child, index) => (
        <Tab key={index} title={titles[index]}>
          {child}
        </Tab>
      ))}
    </Tabs>
  )
}

export default CustomTabs
