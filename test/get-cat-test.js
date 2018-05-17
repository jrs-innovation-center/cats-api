const test = require('tape')
const request = require('supertest')
const app = require('../app')

test('GET /cats/:id', t => {
	request(app)
		.get('/cats/cat_fatty_butterpants_owner_2222')
		.then(res => {
			t.plan(3)
			t.equal(res.statusCode, 200)
			t.equal(res.body.name, 'Fatty Butterpants')
			t.same(res.body, {
				_id: 'cat_fatty_butterpants_owner_2222',
				_rev: '8-2378f1a6e4227fd1dad482836255498e',
				type: 'cat',
				name: 'Fatty Butterpants',
				ownerId: 'owner_2222',
				weightLbs: 22,
				breedId: 'breed_tabby',
				gender: 'M'
			})
			t.end()
		})
})
