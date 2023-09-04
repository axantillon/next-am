import UserBox from '@/components/UserBox'
import UserList from '@/components/UserList'
import { Suspense } from 'react'

export default async function Home() {

  return (
    <main className="flex flex-col items-center w-full space-y-12">
      <UserBox />
      <Suspense fallback={<div>Loading...</div>}>
        <UserList />
      </Suspense>
    </main>
  )
}
