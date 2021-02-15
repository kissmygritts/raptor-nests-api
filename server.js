const path = require('path')
const fastify = require('fastify')({ logger: true })
const autoload = require('fastify-autoload')
require('dotenv').config()

// fastify plugins
fastify.register(require('fastify-cors'), {
  origin: '*'
})
fastify.register(require('fastify-compress'), {
  customTypes: /^text\/|\+json$|\+text$|\+xml|x-protobuf$/,
  encodings: ['gzip', 'deflate']
})

// auth plugins
fastify.register(require('fastify-jwt'), { secret: process.env.JWT_SECRET })

fastify.register(autoload, {
  dir: path.join(__dirname, 'src/plugins')
})

fastify.get(
  '/',
  {
    preValidation: fastify.authenticate
  },
  async () => {
    return { api: 'raptor nest api' }
  }
)

// register routes
fastify.register(autoload, {
  dir: path.join(__dirname, 'src/routes')
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
