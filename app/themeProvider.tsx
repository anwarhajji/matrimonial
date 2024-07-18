// app/providers.tsx

import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      themes={['light', 'dark', 'modern']}
    >
      {children}
    </NextThemesProvider>
  )
}
