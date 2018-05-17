const test = require('tape')
const request = require('supertest')
const app = require('../app')
const checkRequiredFields = require('../lib/check-required-fields')

const { isEmpty, head } = require('ramda')

const updateCat = {
	_id: 'cat_fluffikins_owner_1234',
	_rev: '8-35aba4890a29fe15cd15e04e229e1692',
	type: 'cat',
	name: 'fluffikins',
	ownerId: 'owner_1234',
	weightLbs: 4,
	breedId: 'breed_siamese'
}

test('PUT /cats/:id', t => {
	request(app)
		.put('/cats/cat_fluffikins_owner_1234')
		.send(updateCat)
		.then(res => {
			const arrFieldsFailedValidation = checkRequiredFields(
				['_id', '_rev', 'type', 'name', 'ownerId'],
				updateCat
			)
			t.plan(5)
			t.equal(isEmpty(arrFieldsFailedValidation), true)
			t.equal(res.statusCode, 200)
			t.equal(res.body.ok, true)
			t.equal(res.body.id, 'cat_fluffikins_owner_1234')
			t.equal(head(updateCat._rev) < head(res.body.rev), true)
			t.end()
		})
})
