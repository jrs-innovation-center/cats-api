const test = require('tape')
const dal = require('../dal.js')

test('Nuke Test Database', t => {
  dal.nukeDocs((err, data) => {
    err ? console.log('the err', err) : console.log('the data', data)
    t.end()
  })
})
