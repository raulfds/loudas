import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Loudas</h1>
      <p className="text-xl mb-8">Create and share your Call of Duty weapon loadouts</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/weapons">Browse Weapons</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/loadouts">My Loadouts</Link>
        </Button>
      </div>
    </div>
  )
}