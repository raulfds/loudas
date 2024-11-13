import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from 'mongodb'

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const client = await clientPromise
  const db = client.db()

  const { name, weapon, attachments } = await req.json()

  const result = await db.collection('loadouts').insertOne({
    userId: new ObjectId(session.user.id),
    name,
    weapon,
    attachments,
    createdAt: new Date(),
  })

  return NextResponse.json({ id: result.insertedId }, { status: 201 })
}

export async function GET(req: Request) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const client = await clientPromise
  const db = client.db()

  const loadouts = await db.collection('loadouts')
    .find({ userId: new ObjectId(session.user.id) })
    .toArray()

  return NextResponse.json(loadouts)
}