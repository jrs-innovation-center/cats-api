# Cats API

This API manages cats and cat breeds for all cat service worldwide.

## Getting Started

Instructions on how to get a developer up and running on the cats api in a local, development environment.

> The instructions assume node >= 7x and you have access to a CouchDB installation on either your local machine or in the cloud as a DBaas, such as Cloudant.

```
$ git clone https://github.com/tripott/cats-api
$ cd cats-api
```

## Create a database in CouchDB

Using either a local installation of CouchDB or a DBaaS such as Cloudant, create a new database.  Once created, create an API key and/or ensure the key as admin rights to the database.  Admin rights are needed for creating indexes within the database.  

Using the principle of least privilege, you may wish to create a second API key for your API.  This key may only provide read, write access to the database.  

> Tip: After creating your API Key or keys, you will need to write both the key and password down and keep it secure and safe.  In the following step, you will use the key and password to create a `COUCHDB_URL` as an environment variable.

## Environment Variables

### **.env**

- At the root of your project, copy the **.env-sample** file as **.env** file.  Modify the following environment variables.  Use the key, password, and base user to derive the value of `COUCHDB_URL`.  See example below.  Use your newly created database name as the value of `COUCHDB_NAME`.  Provide a `PORT` number, such as 4000, that does not conflict with other port numbers in your project.:

  - `COUCHDB_URL`
  - `COUCHDB_NAME`
  - `PORT`

For example, here are example values for `COUCHDB_URL` and `COUCHDB_NAME` environment variables for an instance of CouchDB running in IBM Blue Mix's Cloudant service:

> Warning:  Keep your API password/secret safe!  Be sure your **.env** file is referenced within your **.gitignore**.  Do not expose the secret in GitHub or anywhere else.  If your secret is compromised, you will need to regenerate a new API key and secret and update your application.

```
COUCHDB_URL=https://<API KEY>:<API PASSWORD>@<BASE URL TO CLOUDANT.com>/
COUCHDB_NAME=cats
```

**Complete URL Example**

```
const db = new PouchDB(process.env.COUCHDB_URL + process.env.COUCHDB_NAME)

// would produce something such as:
// const db = new PouchDB(https://arencharlynaturousfeli7:287bb97bafee05f3d2fb7840371182d3d2534red@90629927-b1a9-4251-9b99-f76bd577tedx8-bluemix.cloudant.com/cats)

```

### Installing Dependencies and starting our API

After you have successfully provided the values for your environment variables, install dependencies, load data, load indexes, and start the api.  See `scripts` within the **package.json** for details:

```
$ npm install
$ npm run load
$ npm run loadIndex
$ npm start
```

Check your terminal and verify the API starts.  Attempt the following HTTP requests using a client such as your browser or POSTman.

```
GET http://localhost:5555/cats
```

## Basics

### Base URL

All endpoints within the API are located at the following URL: `http://localhost:5555`.


### Scheme

Once deployed, this API will communicate over HTTPS.  Locally on your development environment, you can run this API under HTTP.

### Authorization

No authorization at this time.  Authorization will be included in future releases.

### Request Headers

The following request headers are required when calling the API:

- `Content-Type` - The `Content-Type` request header should include a value of `application/json` and is required when providing content within the body of a request.


### HTTP Verbs

VERB     | Description
-------- | ----------------------------
GET      | Use to retrieve all cats and breeds via `\cats`, `\breeds` and a single cat and single breed via `\cats\{:id}`, and `\breeds\{:id}`.
POST     | Used to create cats and breeds via `\cats` and `\breeds`.
PUT      | Used to update a cat via `\cats\{:id}` and a breed via `\breeds\{:id}`.
DELETE   | Used to delete `\cats\{:id}` and `\breeds\{:id}`.

### Date Format

Date are formatted to the ISO 8601 standard.

### Content Types

All endpoints accept and return data formatted as JSON.   See Request Headers.

### Status Code

- [200 - OK](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_Success)
- 201 - Created
- 400 - Bad Request
- 404 - Not Found
- 500 - Internal Server Error
- 429 - Too Many Request

### Filtering

TODO: talk about the endpoints that have a filter query string and provide a couple of examples.

### Pagination

TODO: how does pagination work and provide a couple of examples.

## Endpoints

Verb   | Endpoint                 |  Description                
-------|--------------------------|-----------------------------
`GET`  | `/cats`                  | Get a collection of cats.  Optional `filter` query string provides the ability to filter by `name`, `ownerId`, `weightLbs`, and `breedId`.

## Use Cases

### Retrieve a list of cats

`GET /cats`

### Search a cat by name

** Sample Request **
`GET /cats?filter=name:fluffikins`

*** Sample Response **

```
[
    {
        "_id": "cat_fluffikins_owner_1234",
        "_rev": "6-3c7e00b9d8dd077920c322086153b650",
        "type": "cat",
        "name": "fluffikins",
        "ownerId": "owner_1234",
        "weightLbs": 8,
        "breedId": "breed_siamese"
    }
]
```
