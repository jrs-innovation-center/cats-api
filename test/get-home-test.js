const test = require('tape')
const request = require('supertest')
const app = require('../app')

test('Get/', t => {
  request(app)
    .get('/')
    .then(res => {
      t.plan(2)
      t.equals(res.statusCode, 200)
      t.equals(res.text, 'Welcome to the Cats API, meow.')
      t.end()
    })
})
