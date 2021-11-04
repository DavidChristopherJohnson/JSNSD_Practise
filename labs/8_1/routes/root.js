'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const { url } = request.query

    try {
      new URL(url)
    }
    catch(err) {
      throw fastify.httpErrors.badRequest()
    }

    reply.from(url)
  })
}
