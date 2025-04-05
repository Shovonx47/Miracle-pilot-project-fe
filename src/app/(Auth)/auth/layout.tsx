import type { Metadata } from "next";

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
    <div className="w-full flex flex-col min-h-screen relative">
      {children}
    </div>
  );
}
