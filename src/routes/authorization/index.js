const { db } = require('../../db')
const hash = require('../../utils/auth.js')

async function register(req) {
  const jwt = this.jwt
  const { username, password, organization } = req.body
  const hashedPassword = await hash.generate(password)

  const biologist = {
    username: username,
    password: hashedPassword,
    organization: organization
  }

  const result = await db.oneOrNone(
    'insert into biologists ($/columns:name/) values ($/values:csv/) returning *',
    {
      columns: Object.keys(biologist),
      values: Object.values(biologist)
    }
  )

  const token = jwt.sign({
    sub: result.username,
    role: result.user_role,
    isVerified: result.is_verified
  })

  return { token }
}

async function login(req, reply) {
  const jwt = this.jwt
  const { username, password } = req.body

  const biologist = await db.oneOrNone(
    'select username, password, user_role, is_verified from biologists where username = $/username/',
    { username }
  )

  if (!biologist) {
    reply.code(401)
    return new Error('username or password not found')
    // return { message: 'username or password not found' }
  }

  const passwordIsValid = await hash.isEqual(password, biologist.password)
  if (!passwordIsValid) {
    reply.code(401)
    return new Error('username or password not found')
  }

  const token = jwt.sign({
    sub: biologist.username,
    role: biologist.userRole,
    isVerified: biologist.is_verified
  })

  return { token }
}

module.exports = (fastify, opts, next) => {
  fastify.post('/register', register)
  fastify.post('/login', login)

  next()
}

module.exports.prefixOverride = ''
