// models/Weapon.ts
import { ObjectId } from 'mongodb'

export interface Weapon {
  _id: ObjectId
  name: string
  attachments: {
    [key: string]: string[]
  }
}