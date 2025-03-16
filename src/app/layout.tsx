import { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Providers from '@/lib/Providers/Providers'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'School Management System',
  description: 'A comprehensive school management solution'
<<<<<<< HEAD
}
=======
};
>>>>>>> c38625351189f98dd9f42ca581637079d3864abf

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<<<<<<< HEAD
    <html lang="en" suppressHydrationWarning>
      <body className={geist.className}>
        <Providers>
          {children}
        </Providers>
      </body>
=======
    <html lang="en">
      <Providers>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <main className="w-full flex flex-col min-h-screen relative">
            <div>{children}</div>
            <div className="lg:-ml-[16rem]">
              {/* <Footer /> */}
            </div>
            <Toaster position="top-right" richColors duration={2000} />
          </main>
        </body>
      </Providers>
>>>>>>> c38625351189f98dd9f42ca581637079d3864abf
    </html>
  )
}
