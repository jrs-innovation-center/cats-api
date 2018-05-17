const test = require('tape')
const request = require('supertest')
const app = require('../app')

const newCat =
		{
        "type": "cat",
        "name": "jr",
        "ownerId": "owner_2222",
        "weightLbs": 12,
        "breedId": "breed_siamese",
        "gender": "M"
    }

test ('post/cats', t => {
	request(app)
	.post('/cats')
	.send(newCat)
	.then(res => {
		t.plan(2)
		t.equals(res.statusCode, 409)
		t.equals(res.body.message, 'Document update conflict.')
		t.end()

	})
} )
