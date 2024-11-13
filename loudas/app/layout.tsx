import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import { Toaster } from "@/components/ui/toaster"
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Loudas - Call of Duty Loadout Builder',
  description: 'Create and share your Call of Duty weapon loadouts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}