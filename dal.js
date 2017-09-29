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

////////////////////////
//     HELPERS
////////////////////////

const add = doc => db.put(doc)
const get = id => db.get(id)
const update = doc => db.put(doc)
const deleteDoc = id => db.get(id).then(doc => db.remove(doc))

//////////////////////
//      CATS
//////////////////////
const addCat = cat => {
  // example _id -- "cat_big_time_owner_333"
  cat._id = pkGenerator('cat_', trim(cat.name) + ' ' + trim(cat.ownerId))
  return add(cat)
}
const getCat = catId => get(catId)
const updateCat = updatedCat => update(updatedCat)
const deleteCat = catId => deleteDoc(catId)
const listCats = (lastItem, limit, filter) => {
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
  return findDocs(query)
}

//////////////////////
//      BREEDS
//////////////////////
const addBreed = breed => {
  // example _id -- "breed_pixie-bob"
  breed._id = pkGenerator('breed_', trim(breed.breed))
  return add(breed)
}
const getBreed = breedId => get(breedId)
const updateBreed = updatedBreed => update(updatedBreed)
const deleteBreed = breedId => deleteDoc(breedId)

const listBreeds = (lastItem, limit) => {
  const query = lastItem
    ? { selector: { _id: { $gt: lastItem }, type: 'breed' }, limit }
    : { selector: { _id: { $gt: null }, type: 'breed' }, limit }

  return findDocs(query)
}

const findDocs = query => (query ? db.find(query).then(res => res.docs) : [])

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
  addBreed,
  getBreed,
  updateBreed,
  deleteBreed,
  listBreeds
}

module.exports = dal

// function deleteCat(id, callback) {
//   catsData = reject(c => c.id === id, catsData)
//
//   callback(null, { deleted: true })
// }
