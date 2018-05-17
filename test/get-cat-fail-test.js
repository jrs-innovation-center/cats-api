const test = require('tape')
const request = require('supertest')
const app = require('../app')

test('GET /cats/:id', t => {
	request(app)
		.get('/cats/little_bunny_foo_foo')
		.then(res => {
			t.plan(3)
			t.equal(res.statusCode, 404)
			t.equal(res.body.message, 'missing')
			t.equal(res.body.error, 'not_found')
			t.end()
		})
})
