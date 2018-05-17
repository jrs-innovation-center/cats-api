const test = require('tape')
const request = require('supertest')
const app = require('../app')
const { path, length } = require('ramda')

const newCat = {
	type: 'cat',
	name: 'Jimi Hendrix',
	ownerId: 'owner_1234',
	weightLbs: 17,
	breedId: 'breed_tabby',
	gender: 'M'
}

test('POST /cats', t => {
	request(app)
		.post('/cats')
		.send(newCat)
		.expect(201)
		.then(res => {
			t.plan(4)
			t.equals(res.statusCode, 201)
			t.equals(path(['body', 'id'], res), 'cat_jimi_hendrix_owner_1234')
			t.equals(path(['body', 'ok'], res), true)
			t.equals(length(path(['body', 'rev'], res)) > 0, true)
			t.end()
		})
})
