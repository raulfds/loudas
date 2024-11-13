import WeaponCard from "@/components/WeaponCard"

async function getWeapons() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/weapons`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch weapons')
  return res.json()
}

export default async function WeaponsPage() {
  const weapons = await getWeapons()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Weapons Catalog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weapons.map((weapon) => (
          <WeaponCard key={weapon._id} weapon={weapon} />
        ))}
      </div>
    </div>
  )
}