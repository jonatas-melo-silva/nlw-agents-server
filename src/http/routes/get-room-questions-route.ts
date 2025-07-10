import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z4 from 'zod/v4'
import { getRoomQuestions } from '../../features/get-room-questions.ts'

export const getRoomQuestionsRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/rooms/:roomId/questions',
    {
      schema: {
        tags: ['Rooms', 'Questions'],
        summary: 'Get all questions for a room',
        description:
          'Fetches all questions for a specific room from the database',
        params: z4.object({
          roomId: z4.string(),
        }),
        response: {
          200: z4.object({
            questions: z4.array(
              z4.object({
                id: z4.string(),
                question: z4.string(),
                answer: z4.string().nullable(),
                createdAt: z4.date(),
              })
            ),
          }),
          404: z4.object({
            message: z4.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { roomId } = request.params
      const { questions } = await getRoomQuestions({ roomId })

      if (!questions || questions.length === 0) {
        return reply.status(404).send({
          message: 'No questions found for this room',
        })
      }

      return reply.status(200).send({
        questions,
      })
    }
  )
}
