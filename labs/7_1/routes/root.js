'use strict'

const got = require('got')
const { BOAT_SERVICE_PORT, BRAND_SERVICE_PORT } = process.env;

const brandService = `http://localhost:${BRAND_SERVICE_PORT}`;
const boatService = `http://localhost:${BOAT_SERVICE_PORT}`

module.exports = async function (fastify, opts) {
  const {httpErrors} = fastify

  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params 
    console.log('ID: ', id, process.env.PORT, boatService, brandService)
    try {
      const boat = await got(`${boatService}/${id}`).json()
      const brand = await got(`${brandService}/${boat.brand}`).json()
      return {
        id: boat.id,
        color: boat.color,
        brand: brand.name
      }
    }
    catch (err) {
      if(!err.response) throw err      

      if(err.response.statusCode === 404) throw httpErrors.notFound()
      if(err.response.statusCode === 400) throw httpErrors.badRequest()
      
      throw err
    }
  })
}
