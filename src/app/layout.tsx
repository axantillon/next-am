import NavBar from '@/components/layout/NavBar'
import '@/lib/styles/globals.css'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TTU@CR Answering Maching',
  description: 'Project using Next.js with Supabase and HuggingFace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "flex flex-col px-4 sm:px-8")}>
        <NavBar className='h-24' />
        {children}
      </body>
    </html>
  )
}
