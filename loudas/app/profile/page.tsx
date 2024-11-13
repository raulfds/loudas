import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import UserProfile from "@/components/UserProfile"

export default async function ProfilePage() {
  const session = await getServerSession()
  if (!session) redirect('/api/auth/signin')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <UserProfile user={session.user} />
    </div>
  )
}