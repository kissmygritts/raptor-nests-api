// const path = require('path')
const fastify = require('fastify')({ logger: true })
// const autoload = require('fastify-autoload')

fastify.register(require('fastify-cors'), {
  origin: '*'
})
fastify.register(require('fastify-compress'), {
  customTypes: /^text\/|\+json$|\+text$|\+xml|x-protobuf$/,
  encodings: ['gzip', 'deflate']
})

fastify.get('/', async () => {
  return { api: 'raptor nest api' }
})

const start = async () => {
  try {
    await fastify.listen({
      port: process.env.PORT || 8000,
      host: process.env.HOST || '0.0.0.0'
    })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()