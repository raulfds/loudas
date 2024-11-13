import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import LoadoutCard from "@/components/LoadoutCard"

async function getLoadouts() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/loadouts`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch loadouts')
  return res.json()
}

export default async function LoadoutsPage() {
  const session = await getServerSession()
  if (!session) redirect('/api/auth/signin')

  const loadouts = await getLoadouts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Loadouts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loadouts.map((loadout) => (
          <LoadoutCard key={loadout._id} loadout={loadout} />
        ))}
      </div>
    </div>
  )
}