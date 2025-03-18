import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/lib/Providers/Providers'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'School Management System',
  description: 'A comprehensive school management solution'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster position="top-right" richColors duration={2000} />
        </Providers>
      </body>
    </html>
  )
}
