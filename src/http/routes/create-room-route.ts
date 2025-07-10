import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z4 from 'zod/v4'
import { createRooms } from '../../features/create-room.ts'

export const createRoomRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/rooms',
    {
      schema: {
        tags: ['Rooms'],
        summary: 'Create a new room',
        description:
          'Creates a new room with the provided name and optional description',
        body: z4.object({
          name: z4.string().min(1, 'Room name is required'),
          description: z4.string().optional(),
        }),
        response: {
          201: z4.object({
            roomId: z4.string(),
          }),
          500: z4.object({
            message: z4.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, description } = request.body

      const { roomId } = await createRooms({ name, description })

      if (!roomId) {
        return reply.status(500).send({
          message: 'Failed to create room',
        })
      }

      return reply.status(201).send({
        roomId,
      })
    }
  )
}
