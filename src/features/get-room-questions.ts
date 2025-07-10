import { desc, eq } from 'drizzle-orm'
import { db } from '../db/connection.ts'
import { schema } from '../db/schema/index.ts'

export type GetRoomQuestionsParams = {
  roomId: string
}

export const getRoomQuestions = async ({ roomId }: GetRoomQuestionsParams) => {
  const result = await db
    .select({
      id: schema.questions.id,
      question: schema.questions.question,
      answer: schema.questions.answer,
      createdAt: schema.questions.createdAt,
    })
    .from(schema.questions)
    .where(eq(schema.questions.roomId, roomId))
    .orderBy(desc(schema.questions.createdAt))

  return { questions: result }
}

export type GetRoomQuestionsResponse = Awaited<ReturnType<typeof getRoomQuestions>>
