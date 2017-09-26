require('dotenv').config()
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
const db = new PouchDB(process.env.COUCHDB_URL + process.env.COUCHDB_NAME)

// There are two steps to running a query:
//   1) createIndex() - to define which fields to index
//   2) find() - to query the index

db
  .createIndex({
    index: { fields: ['type'] }
  })
  .then(() => {
    return db.find({
      selector: {
        type: 'cat'
      }
    })
  })
  .then(results => {
    console.log(
      "Created index on type.  Here's a sample query where type ='cat':"
    )
    console.log(results)
  })
  .then(() => {
    return db.find({
      selector: {
        type: 'breed'
      }
    })
  })
  .then(results => {
    console.log("Here's a sample query where type ='breed':")
    console.log(results)
  })
  .catch(err => console.log(err))
