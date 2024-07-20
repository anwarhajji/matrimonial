'use client'

import * as React from 'react'
import {
  RadioGroup,
  Select,
  SelectItem,
  Spacer,
  Button
} from '@nextui-org/react'
import { ThemeCustomRadio } from './theme-custom-radio'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

interface AppearanceSettingCardProps {
  className?: string
}

const fontSizeOptions = [
  { label: 'Small', value: 'small', description: 'font size 14px' },
  { label: 'Medium', value: 'medium', description: 'font size 16px' },
  { label: 'Large', value: 'large', description: 'font size 18px' }
]

const AppearanceSetting = () => {
  //const [theme, setTheme] = React.useState<string>('light')
  const [fontSize, setFontSize] = React.useState<string>('large')
  //const [isTranslucent, setIsTranslucent] = React.useState<boolean>(false)
  // const [usePointerCursor, setUsePointerCursor] = React.useState<boolean>(false)

  const handleSaveSettings = () => {
    // Example action function to save settings
    console.log('Settings saved:', {
      theme,
      fontSize
    })
  }
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = (themeValue: string) => {
    setTheme(themeValue)
  }

  if (!mounted) return null

  return (
    <div className="p-2">
      {/* Theme */}
      <div>
        <p className="text-base font-medium text-default-700">Theme</p>
        <p className="mt-1 text-sm font-normal text-default-400">
          Change the appearance of the web.
        </p>
        {/* Theme radio group */}
        <RadioGroup className="mt-4 flex-wrap" orientation="horizontal">
          <ThemeCustomRadio
            value="light"
            variant="light"
            onChange={() => handleThemeChange('light')}
            checked={theme === 'light'}
          >
            Light
          </ThemeCustomRadio>
          <ThemeCustomRadio
            value="dark"
            variant="dark"
            onChange={() => handleThemeChange('dark')}
            checked={theme === 'dark'}
          >
            Dark
          </ThemeCustomRadio>
        </RadioGroup>
      </div>
      <Spacer y={4} />
      {/* Font size */}
      <div className="flex items-start justify-between gap-2 py-2">
        <div>
          <p className="text-base font-medium text-default-700">Font size</p>
          <p className="mt-1 text-sm font-normal text-default-400">
            Adjust the web font size.
          </p>
        </div>
        <Select
          className="max-w-[200px]"
          selectedKeys={[fontSize]}
          defaultSelectedKeys={['large']}
        >
          {fontSizeOptions.map((fontSizeOption) => (
            <SelectItem key={fontSizeOption.value} value={fontSizeOption.value}>
              {fontSizeOption.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Spacer y={4} />
      {/* Translucent UI */}

      <Spacer y={6} />
      {/* Save button */}
      <Button onClick={handleSaveSettings}>Save Settings</Button>
    </div>
  )
}

AppearanceSetting.displayName = 'AppearanceSetting'

export default AppearanceSetting
