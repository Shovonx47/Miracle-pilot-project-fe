import { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Providers from '@/lib/Providers/Providers'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'School Management System',
  description: 'A comprehensive school management solution'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
