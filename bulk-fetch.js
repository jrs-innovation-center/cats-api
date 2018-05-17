require('dotenv').config()
const PouchDB = require('pouchdb')
const db = new PouchDB(process.env.COUCHDB_URL)
const { map } = require('ramda')

db.allDocs(
	{
		include_docs: true,
		keys: ['breed_american_bobtail', 'breed_tabby']
	},
	function(err, result) {
		if (err) console.log(err)
		console.log(JSON.stringify(map(row => row.doc, result.rows), null, 2))
	}
)
