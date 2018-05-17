const test = require('tape')
const request = require('supertest')
const app = require('../app')

test ('GET/cats', t => {
  request(app).get('/cats').then(res => {
    t.plan(2)
    t.equals(res.statusCode, 200)
    t.equals(res.body.length, 10)
    t.end()
  })
})
