require('dotenv').config()

const express = require('express')
const app = express()
const dal = require('./dal.js')
const port = process.env.PORT || 4000
const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const { pathOr, keys, difference, path, prop, propOr } = require('ramda')

const checkRequiredFields = require('./lib/check-required-fields')

app.use(bodyParser.json())

app.get('/', function(req, res, next) {
  res.send('Welcome to the Cats API, meow.')
})

/////////////////////////
///   CATS, CATS, CATS!
////////////////////////

//   CREATE  - POST /cats
app.post('/cats', function(req, res, next) {
  const arrFieldsFailedValidation = checkRequiredFields(
    ['type', 'name', 'ownerId'],
    prop('body', req)
  )

  if (arrFieldsFailedValidation.length > 0) {
    return next(
      new HTTPError(400, 'Missing Required Fields', {
        fields: arrFieldsFailedValidation
      })
    )
  }

  if (path(['body', 'type'], req) !== 'cat') {
    return next(new HTTPError(400, "'type' field value must be equal to 'cat'"))
  }

  dal
    .addCat(prop('body', req))
    .then(addedCat => res.status(201).send(addedCat))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

// READ - GET /cats/:id
app.get('/cats/:id', function(req, res, next) {
  dal
    .getCat(path(['params', 'id'], req))
    .then(cat => res.status(200).send(cat))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

//   UPDATE -  PUT /cats/:id

app.put('/cats/:id', function(req, res, next) {
  const catId = req.params.id
  const requestBodyCat = pathOr('no body', ['body'], req)

  if (requestBodyCat === 'no body') {
    return next(new HTTPError(400, 'Missing cat json in request body.'))
  }

  const arrFieldsFailedValidation = checkRequiredFields(
    ['_id', '_rev', 'type', 'name', 'ownerId'],
    requestBodyCat
  )

  if (arrFieldsFailedValidation.length > 0) {
    return next(
      new HTTPError(400, 'Missing Required Fields', {
        fields: arrFieldsFailedValidation
      })
    )
  }

  if (requestBodyCat.type != 'cat') {
    return next(new HTTPError(400, "'type' field value must be equal to 'cat'"))
  }

  if (catId != requestBodyCat._id) {
    return next(
      new HTTPError(
        400,
        'The cat id in the path must match the cat id in the request body'
      )
    )
  }

  dal
    .updateCat(requestBodyCat)
    .then(updatedCat => res.status(200).send(updatedCat))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

app.delete('/cats/:id', function(req, res, next) {
  dal
    .deleteCat(path(['params', 'id'], req))
    .then(deletedCat => res.status(200).send(deletedCat))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

//   LIST - GET /cats
app.get('/cats', function(req, res, next) {
  var limit = pathOr(10, ['query', 'limit'], req)
  limit = Number(limit)

  // TODO: refactor the ownerId filter to a generic filter query string
  //   ex:  /cats?filter=ownerId:owner_2222

  const filter = pathOr(null, ['query', 'filter'], req)
  const lastItem = pathOr(null, ['query', 'lastItem'], req)

  dal.listCats(lastItem, filter, limit, function(err, data) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    res.status(200).send(data)
  })
})

/////////////////////////
//      BREEDS
/////////////////////////
// CREATE - POST /breeds
app.post('/breeds', function(req, res, next) {
  const arrFieldsFailedValidation = checkRequiredFields(
    ['type', 'breed', 'desc'],
    prop('body', req)
  )

  if (arrFieldsFailedValidation.length > 0) {
    return next(
      new HTTPError(
        400,
        `Missing Required Fields. Provide a valid breed json document in the request body.  Example: {'type': 'breed','breed': 'persian','desc': 'The Persian cat is a long-haired breed of cat characterized by its round face and short muzzle. It is also known as the Persian Longhair.'}`,
        {
          fields: arrFieldsFailedValidation
        }
      )
    )
  }

  if (path(['body', 'type'], req) != 'breed') {
    return next(
      new HTTPError(
        400,
        `'type' field value must be equal to 'breed'. Provide a valid breed json document in the request body.  Example: {'type': 'breed','breed': 'persian','desc': 'The Persian cat is a long-haired breed of cat characterized by its round face and short muzzle. It is also known as the Persian Longhair.'}`
      )
    )
  }

  // dal.addBreed(req.body, function(err, data) {
  //   if (err) return next(new HTTPError(err.status, err.message, err))
  //   res.status(201).send(data)
  // })

  dal
    .addBreed(prop('body', req))
    .then(addedBreed => res.status(201).send(addedBreed))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

// READ - GET /breeds/:id
app.get('/breeds/:id', function(req, res, next) {
  dal
    .getBreed(path(['params', 'id'], req))
    .then(breed => res.status(200).send(breed))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

// UPDATE - PUT /breeds/:id   (Hint: need a req.body)
app.put('/breeds/:id', function(req, res, next) {
  const breedId = req.params.id
  const requestBodyBreed = propOr('no body', 'body', req)

  if (requestBodyBreed === 'no body') {
    return next(new HTTPError(400, 'Missing breed json in request body.'))
  }

  const arrFieldsFailedValidation = checkRequiredFields(
    ['_id', '_rev', 'type', 'breed', 'desc'],
    requestBodyBreed
  )

  if (arrFieldsFailedValidation.length > 0) {
    return next(
      new HTTPError(400, 'Missing Required Fields', {
        fields: arrFieldsFailedValidation
      })
    )
  }

  if (requestBodyBreed.type != 'breed') {
    return next(
      new HTTPError(400, "'type' field value must be equal to 'breed'")
    )
  }

  if (breedId != requestBodyBreed._id) {
    return next(
      new HTTPError(
        400,
        'The breed id in the path must match the breed id in the request body'
      )
    )
  }
  //
  // dal.updateBreed(requestBodyBreed, function(err, data) {
  //   if (err) return next(new HTTPError(err.status, err.message, err))
  //   res.status(200).send(data)
  // })

  dal
    .updateBreed(requestBodyBreed)
    .then(response => res.status(200).send(response))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

// DELETE - DELETE /breeds/:id
app.delete('/breeds/:id', function(req, res, next) {
  dal
    .deleteBreed(path(['params', 'id'], req))
    .then(deletedBreed => res.status(200).send(deletedBreed))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

//  LIST - GET /breeds
app.get('/breeds', function(req, res, next) {
  const limit = pathOr(10, ['query', 'limit'], req)

  const lastItem = pathOr(null, ['query', 'lastItem'], req)

  dal.listBreeds(lastItem, Number(limit), function(err, data) {
    if (err) return next(new HTTPError(err.status, err.message, err))
    res.status(200).send(data)
  })
})

app.use(function(err, req, res, next) {
  console.log(req.method, ' ', req.path, ' ', 'error: ', err)
  res.status(err.status || 500)
  res.send(err)
})

if (!module.parent) {
  app.listen(port, () => console.log('API Running on port:', port))
}

module.exports = app
