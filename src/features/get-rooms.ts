import { count, eq } from 'drizzle-orm'
import { db } from '../db/connection.ts'
import { schema } from '../db/schema/index.ts'

export const getRooms = async () => {
  const result = await db
    .select({
      id: schema.rooms.id,
      name: schema.rooms.name,
      createdAt: schema.rooms.createdAt,
      questionCount: count(schema.questions.id),
    })
    .from(schema.rooms)
    .leftJoin(schema.questions, eq(schema.questions.roomId, schema.rooms.id))
    .groupBy(schema.rooms.id)
    .orderBy(schema.rooms.createdAt)

  return { rooms: result }
}

export type GetRoomsResponse = Awaited<ReturnType<typeof getRooms>>
