// models/Loadout.ts
import { ObjectId } from 'mongodb'

export interface Loadout {
  _id: ObjectId
  userId: ObjectId
  name: string
  weapon: string
  attachments: {
    [key: string]: string
  }
}