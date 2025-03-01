import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    title: "Secure Login & Registration | Miracle",
    description: "Sign in to your account or create a new one to access all features of Miracle.",
  };
  

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <main className="w-full flex flex-col min-h-screen relative">
              <div>{children}</div>
               
            </main>
          
        </body>
      
    </html>
  );
}
