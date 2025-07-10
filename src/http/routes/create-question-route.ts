import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z4 from 'zod/v4'
import { createQuestion } from '../../features/create-question.ts'

export const createQuestionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/rooms/:roomId/questions',
    {
      schema: {
        tags: ['Rooms', 'Questions'],
        summary: 'Create a new question in a room',
        description:
          'Creates a new question in the specified room with the provided question text',
        params: z4.object({
          roomId: z4.string().min(1, 'Room ID is required'),
        }),
        body: z4.object({
          question: z4.string().min(1, 'Room name is required'),
        }),
        response: {
          201: z4.object({
            questionId: z4.string(),
          }),
          500: z4.object({
            message: z4.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { question } = request.body
      const { roomId } = request.params

      const { questionId } = await createQuestion({ roomId, question })

      if (!questionId) {
        return reply.status(500).send({
          message: 'Failed to create question',
        })
      }

      return reply.status(201).send({
        questionId,
      })
    }
  )
}
