import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z4 from 'zod/v4'
import { getRooms } from '../../features/get-rooms.ts'

export const getRoomsRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/rooms',
    {
      schema: {
        tags: ['Rooms'],
        summary: 'Get all rooms',
        description: 'Fetches all rooms from the database',
        response: {
          200: z4.object({
            rooms: z4.array(
              z4.object({
                id: z4.string(),
                name: z4.string(),
                createdAt: z4.date(),
                questionCount: z4.number(),
              })
            ),
          }),
        },
      },
    },
    async (__, reply) => {
      const { rooms } = await getRooms()

      return reply.status(200).send({
        rooms,
      })
    }
  )
}
