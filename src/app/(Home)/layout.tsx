import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import SearchFilterBar from '@/components/common/SearchFilterBar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'School Management System - Dashboard',
  description: 'A comprehensive school management solution'
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full flex flex-col min-h-screen relative">
        <div className="p-6">
          <SearchFilterBar />
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
