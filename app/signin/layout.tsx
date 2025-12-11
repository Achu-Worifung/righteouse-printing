import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Sign in / Log in",
  description:
    "Access your account by signing in or logging in to manage orders and settings.",
};

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-screen h-screen bg-white  flex justify-center items-center">
        {children}
    </main>
  )
}
