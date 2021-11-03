'use strict'

const { promisify } = require('util');
const { boat } = require('../../model');
const { uid } = boat;
const create = promisify(boat.create);
const read = promisify(boat.read);

module.exports = async (fastify, opts) =>  {
  const {notFound} = fastify.httpErrors

  fastify.post('/', async (request, reply) => {
    const { data } = request.body
    const id = uid();

    await create(id, data)
    reply.code(201)
    return { id }
  })

  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params;

    try {
      return await read(id);
    }
    catch (err) {
      if (err.message === 'not found')
        throw notFound()

      throw err
    }
  })
}
