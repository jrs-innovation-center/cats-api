const test = require('tape')
const request = require('supertest')
const app = require('../app')
const { head } = require('ramda')

const cat = {
	_id: 'cat_fluffy_owner_2222',
	_rev: '13-28b3f1c8e673a260424727fe5d1eadd1',
	type: 'cat',
	name: 'fluffy',
	ownerId: 'owner_2222',
	weightLbs: 3,
	breedId: 'breed_tabby',
	gender: 'F'
}

test('DELETE /cat/:id', t => {
	request(app)
		.delete('/cats/cat_fluffy_owner_2222')
		.then(res => {
			t.equal(res.statusCode, 200)
			t.equal(res.body.id, 'cat_fluffy_owner_2222')
			t.end()
		})
})
