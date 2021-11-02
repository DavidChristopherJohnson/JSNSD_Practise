'use strict'

module.exports  = async (fasitfy, opts) => {
    fasitfy.get('/', async (request, reply) => {
        return reply.view('me.hbs')
    })
}