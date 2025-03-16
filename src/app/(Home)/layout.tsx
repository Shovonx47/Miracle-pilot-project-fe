import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
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

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full flex flex-col min-h-screen relative">

              <div>{children}</div>

              <div className="lg:-ml-[16rem]">
                {/* <Footer /> */}
              </div>
              <Toaster position="top-right" richColors duration={2000} />
            </main>
          </SidebarProvider>
        </body>
      </Providers>
    </html>
  );
}
