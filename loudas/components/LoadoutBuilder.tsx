"use client"

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface Weapon {
  id: string
  name: string
  attachments: {
    [key: string]: string[]
  }
}

interface Loadout {
  id?: string
  name: string
  weapon: string
  attachments: {
    [key: string]: string
  }
}

export default function LoadoutBuilder({ weapon }: { weapon: Weapon }) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [loadout, setLoadout] = useState<Loadout>({
    name: '',
    weapon: weapon.id,
    attachments: {}
  })

  const handleAttachmentChange = (type: string, value: string) => {
    setLoadout(prev => ({
      ...prev,
      attachments: {
        ...prev.attachments,
        [type]: value
      }
    }))
  }

  const handleSave = async () => {
    if (!session) {
      toast({
        title: "Error",
        description: "You must be logged in to save a loadout",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch('/api/loadouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loadout),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Loadout saved successfully",
        })
      } else {
        throw new Error('Failed to save loadout')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save loadout",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="p-4 bg-background rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-primary">Create Loadout for {weapon.name}</h2>
      <Input
        type="text"
        placeholder="Loadout Name"
        value={loadout.name}
        onChange={(e) => setLoadout(prev => ({ ...prev, name: e.target.value }))}
        className="mb-4"
      />
      {Object.entries(weapon.attachments).map(([type, options]) => (
        <div key={type} className="mb-4">
          <label className="block text-sm font-medium text-muted-foreground mb-1">{type}</label>
          <Select onValueChange={(value) => handleAttachmentChange(type, value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select ${type}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
      <Button onClick={handleSave} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Save Loadout</Button>
    </div>
  )
}