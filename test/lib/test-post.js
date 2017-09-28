const request = require('supertest')
const app = require('../../app.js')
const { prop, compose, omit } = require('ramda')

module.exports = (assert, path, requestBody, pk) => {
  return new Promise((resolve, reject) => {
    request(app)
      .post(path)
      .send(requestBody)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(res => {
        assert.equals(
          prop('id', prop('body', res)),
          pk,
          `POST ${path} expected PK value passed.`
        )
        assert.equals(
          prop('ok', prop('body', res)),
          true,
          `POST ${path} expected "ok" value passed`
        )
        resolve(prop('body', res))
      })
      .catch(err => reject(err))
  })
}
