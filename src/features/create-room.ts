import { db } from '../db/connection.ts'
import { schema } from '../db/schema/index.ts'

export type CreateRoomsParams = {
  name: string
  description?: string
}

export const createRooms = async ({ name, description }: CreateRoomsParams) => {
  const result = await db
    .insert(schema.rooms)
    .values({
      name,
      description,
    })
    .returning()

  const room = result[0]

  return { roomId: room.id }
}

export type CreateRoomsResponse = Awaited<ReturnType<typeof createRooms>>
