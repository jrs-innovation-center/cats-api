require('dotenv').config()

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
const dbName =
  process.env.NODE_ENV === 'test'
    ? process.env.COUCHDB_TEST_NAME
    : process.env.COUCHDB_NAME

const couchDBURL =
  process.env.NODE_ENV === 'test'
    ? process.env.COUCHDB_TEST_URL
    : process.env.COUCHDB_URL

console.log(couchDBURL + dbName)

const db = new PouchDB(couchDBURL + dbName)
const pkGenerator = require('./lib/build-pk')
const {
  append,
  find,
  reject,
  compose,
  trim,
  merge,
  split,
  head,
  last,
  map,
  assoc,
  prop
} = require('ramda')

//////////////////////
//      CATS
//////////////////////
const addCat = (cat, callback) => {
  // example _id -- "cat_big_time_owner_333"
  cat._id = pkGenerator('cat_', trim(cat.name) + ' ' + trim(cat.ownerId))
  add(cat, callback)
}
const getCat = (catId, callback) => get(catId, callback)
const updateCat = (updatedCat, callback) => update(updatedCat, callback)
const updateCat2 = updatedCat => {
  return update2(updatedCat)
}

const deleteCat = (catId, callback) => deleteDoc(catId, callback)

const listCats = (lastItem, filter, limit, callback) => {
  var query = {}

  if (filter) {
    //split "ownerId:owner_2222" into an array of ['ownerId','owner_2222']
    //arrFilter = ['ownerId','owner_2222']
    const arrFilter = split(':', filter)
    const filterField = head(arrFilter)
    const filterValue = last(arrFilter)

    //   why?  the filter is limiting our records.  no need to paginate
    const selectorValue = {}
    selectorValue[filterField] = Number(filterValue)
      ? Number(filterValue)
      : filterValue

    // { foo: "bar", name: 'Fatty Butterpants' }
    // { breedId: 'breed_siamese' }
    // { ownerId: 'owner_2222' }
    // { gender: 'M' }

    query = { selector: selectorValue, limit }
  } else if (lastItem) {
    // They are asking to paginate.  Give them the next page of results
    query = { selector: { _id: { $gt: lastItem }, type: 'cat' }, limit }
  } else {
    // Give the first page of results.
    query = { selector: { _id: { $gt: null }, type: 'cat' }, limit }
  }

  console.log('query:', query)
  findDocs(query, callback)
}

//////////////////////
//      BREEDS
//////////////////////
const addBreed = (breed, callback) => {
  // example _id -- "breed_pixie-bob"
  breed._id = pkGenerator('breed_', trim(breed.breed))
  add(breed, callback)
}
const getBreed = (breedId, callback) => get(breedId, callback)
const updateBreed = (updatedBreed, callback) => update(updatedBreed, callback)
const deleteBreed = (breedId, callback) => deleteDoc(breedId, callback)

const listBreeds = (lastItem, limit, callback) => {
  const query = lastItem
    ? { selector: { _id: { $gt: lastItem }, type: 'breed' }, limit }
    : { selector: { _id: { $gt: null }, type: 'breed' }, limit }

  findDocs(query, callback)
}

////////////////////////////
//    helper functions
////////////////////////////
// function list(options, callback) {
//   db.allDocs(options, function(err, data) {
//     if (err) callback(err)
//     callback(null, map(row => row.doc, data.rows))
//   })
// }

function add(doc, callback) {
  db.put(doc, function(err, doc) {
    if (err) callback(err)
    callback(null, doc)
  })
}

function get(id, callback) {
  db.get(id, function(err, doc) {
    if (err) callback(err)
    callback(null, doc)
  })
}

function update(doc, callback) {
  db.put(doc, function(err, doc) {
    if (err) callback(err)
    callback(null, doc)
  })
}

function update2(doc) {
  return db.put(doc)
}

function deleteDoc(id, callback) {
  db
    .get(id)
    .then(function(doc) {
      return db.remove(doc)
    })
    .then(function(result) {
      callback(null, result)
    })
    .catch(function(err) {
      callback(err)
    })
}

const findDocs = (query, cb) =>
  query
    ? db
        .find(query)
        .then(res => cb(null, res.docs))
        .catch(err => cb(err))
    : cb(null, [])

function nukeDocs(cb) {
  db
    .allDocs()
    .then(function(getAllDocsResults) {
      db
        .bulkDocs(
          compose(map(r => assoc('_deleted', true, r)), prop('rows'))(
            getAllDocsResults
          )
        )
        .then(function(deletedResult) {
          cb(null, deletedResult)
        })
        .catch(function(err) {
          console.log(err)
        })
    })
    .catch(function(err) {
      console.log(err)
    })
}

const dal = {
  addCat,
  listCats,
  getCat,
  deleteCat,
  updateCat,
  updateCat2,
  addBreed,
  getBreed,
  updateBreed,
  deleteBreed,
  listBreeds,
  nukeDocs
}

module.exports = dal

// function deleteCat(id, callback) {
//   catsData = reject(c => c.id === id, catsData)
//
//   callback(null, { deleted: true })
// }
