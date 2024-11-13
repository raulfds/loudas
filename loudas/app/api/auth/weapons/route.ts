import { NextResponse } from 'next/server'
import clientPromise from "@/lib/mongodb"

export async function GET() {
  const client = await clientPromise
  const db = client.db()

  const weapons = await db.collection('weapons').find({}).toArray()

  return NextResponse.json(weapons)
}