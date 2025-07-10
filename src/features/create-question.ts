import { db } from '../db/connection.ts'
import { schema } from '../db/schema/index.ts'

export type CreateQuestionParams = {
  roomId: string
  question: string
}

export const createQuestion = async ({ roomId, question }: CreateQuestionParams) => {
  const result = await db
    .insert(schema.questions)
    .values({
      roomId,
      question
    })
    .returning()

  const insertedQuestion = result[0]

  return { questionId: insertedQuestion.id }
}

export type CreateQuestionResponse = Awaited<ReturnType<typeof createQuestion>>
