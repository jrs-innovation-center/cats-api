const test = require('tape')
const request = require('supertest')
const app = require('../../app.js')
const { prop } = require('ramda')

test('GET /', t => {
  request(app)
    .get('/')
    .end((err, res) => {
      t.equals(prop('text', res), 'Welcome to the Cats API, meow.')
      t.equals(prop('statusCode', res), 200)
      t.end()
    })
})
