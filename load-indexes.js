require('dotenv').config()
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

const db = new PouchDB(process.env.COUCHDB_URL)

db
	.createIndex({ index: { fields: ['type'] } })
	.then(() => {
		console.log('Created an index on the type field.')
	})
	.catch(err => console.log(err))

db
	.createIndex({ index: { fields: ['name'] } })
	.then(() => {
		console.log('Created an index on the name field.')
	})
	.catch(err => console.log(err))

// fat cats
db
	.createIndex({ index: { fields: ['weightLbs'] } })
	.then(() => {
		console.log('Created an index on the weightLbs field.')
	})
	.catch(err => console.log(err))

db
	.createIndex({ index: { fields: ['ownerId'] } })
	.then(() => {
		console.log('Created an index on the ownerId field.')
	})
	.catch(err => console.log(err))
