const fp = require('fastify-plugin')
const { db } = require('../db')

module.exports = fp(async (fastify) => {
  fastify.decorate('authenticate', async function (req, reply, done) {
    try {
      const jwt = await req.jwtVerify()

      if (!jwt.isVerified) {
        return done(new Error('Token is not valid, user not verified'))
      }

      const biologist = await db.oneOrNone(
        'select username, password, user_role, is_verified from biologists where username = $/username/',
        { username: jwt.sub }
      )

      if (!biologist) {
        return done(new Error('Token is not valid, user not found'))
      }

      return jwt
    } catch (err) {
      reply.send(err)
    }

    done()
  })
})
