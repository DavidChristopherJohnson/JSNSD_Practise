'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const pontOfView = require('point-of-view')
const handlebars = require('handlebars')
const { default: pointOfView } = require('point-of-view')

module.exports = async function (fastify, opts) {
  fastify.register(pointOfView, {
    engine: { handlebars},
    root: path.join(__dirname, 'views'),
    layout: 'layout.hbs'
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })


  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
