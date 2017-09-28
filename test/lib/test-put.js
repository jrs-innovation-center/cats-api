const request = require('supertest')
const app = require('../../app.js')
const { prop, compose, omit } = require('ramda')

module.exports = (assert, path, requestBody) => {
  return new Promise((resolve, reject) => {
    request(app)
      .put(path)
      .send(requestBody)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        const updatedResult = compose(omit(['rev']), prop('body'))(res)
        assert.equals(
          prop('statusCode', res),
          200,
          `PUT ${path} Status Code: ${prop('statusCode', res)}`
        )

        assert.equals(
          prop('id', updatedResult),
          prop('_id', requestBody),
          `PUT ${path} expected PK value passed.`
        )
        assert.equals(
          prop('ok', updatedResult),
          true,
          `PUT ${path} expected "ok" value passed.`
        )

        resolve(prop('body', res))
      })
      .catch(err => reject(err))
  })
}
