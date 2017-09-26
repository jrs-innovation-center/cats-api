const test = require('tape')
const request = require('supertest')
const app = require('../../app.js')
const { prop } = require('ramda')

test('DELETE /cats/:id', function(assert) {
  request(app)
    .delete('/cats/cat_mr_x_owner_ottinger_william_0105')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      const deletedCat = prop('body', res)
      assert.error(err, 'No error')
      assert.deepEqual(
        prop('id', deletedCat),
        'cat_mr_x_owner_ottinger_william_0105'
      )
      assert.equals(prop('ok', deletedCat), true)
      assert.end()
    })
})
