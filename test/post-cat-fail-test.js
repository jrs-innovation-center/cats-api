const test = require('tape')
const request = require('supertest')
const app = require('../app')
const { path, length } = require('ramda')
const checkRequiredFields = require('../lib/check-required-fields')

const newCatFail = {
	ownerId: 'owner_5678',
	weightLbs: 18,
	breedId: 'breed_tabby',
	gender: 'M'
}



test ('POST / cats', t => {
  request(app)
  .post('/cats')
  .send(newCatFail)
  .then(res => {
    const arrFieldsFailedValidation = checkRequiredFields(['type', 'name', 'ownerId'], newCatFail)
    t.plan(3)
    t.equals(res.statusCode, 400 )
    t.equals(res.body.message, 'Missing Required Fields')
    t.same(res.body.fields, arrFieldsFailedValidation)
    t.end()
  })
} )
