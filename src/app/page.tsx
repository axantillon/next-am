import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <Link href="/api/auth/signin">
        <div className="flex items-center justify-center px-4 py-2 border border-black">
          <span>Sign In</span>
        </div>
      </Link>
    </main>
  )
}
