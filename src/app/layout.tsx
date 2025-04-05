import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/lib/Providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'School Management System',
  description: 'A comprehensive school management solution'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen overflow-y-auto overflow-x-hidden`}>
        <Providers>
          <main className="w-full flex flex-col min-h-screen relative">
            {children}
            {/* <div className="lg:-ml-[16rem]"> */}
              {/* <Footer /> */}
            {/* </div> */}
            <Toaster position="top-right" richColors duration={2000} />
          </main>
        </Providers>
      </body>
    </html>
  );
}
