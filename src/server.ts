import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { createQuestionRoute } from './http/routes/create-question-route.ts'
import { createRoomRoute } from './http/routes/create-room-route.ts'
import { getRoomQuestionsRoute } from './http/routes/get-room-questions-route.ts'
import { getRoomsRoute } from './http/routes/get-rooms-route.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Agents API',
      description: 'API for the NLW Agents project',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.get('/health', () => {
  return { status: 'OK' }
})

app.register(getRoomsRoute)
app.register(createRoomRoute)
app.register(getRoomQuestionsRoute)
app.register(createQuestionRoute)

app.listen({ port: env.PORT })
