'use strict'

const { promisify } = require('util')
const { boat } = require('../../model')
const del = promisify(boat.del);
const read = promisify(boat.read);

module.exports = async function (fastify, opts) {
  const { notFound } = fastify.httpErrors;

  fastify.delete('/:id', async function (request, reply) {
    const { id } = request.params     

    try {
      await del(id)
      reply.code(204)
      return {}
    }
    catch (err) {
      if(err.message === 'not found')
        throw notFound()

      throw err;
    }
  })

  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params

    try {
      return await read(id)
    }
    catch (err) {
      if(err.message === 'not found')
        throw notFound()

      return err
    }
  })
}
