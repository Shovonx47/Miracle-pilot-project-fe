'use client'

import { store, persistor } from '@/redux/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'next-themes'
import { PersistGate } from 'redux-persist/integration/react'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>  
  )
}
