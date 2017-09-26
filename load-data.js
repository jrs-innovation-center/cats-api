require('dotenv').config()

const PouchDB = require('pouchdb')
const db = new PouchDB(process.env.COUCHDB_URL + process.env.COUCHDB_NAME)

db
  .bulkDocs([
    {
      _id: 'breed_american_bobtail',
      type: 'breed',
      breed: 'American Bobtail',
      desc:
        "The American Bobtail is an uncommon breed of domestic cat developed in the late 1960s. It is most notable for its stubby 'bobbed' tail about one-third to one-half the length of a normal cat's tail."
    },
    {
      _id: 'breed_pixie-bob',
      type: 'breed',
      breed: 'pixie bob',
      desc: 'This breed is very, very, very, very good.'
    },
    {
      _id: 'breed_siamese',
      type: 'breed',
      breed: 'Siamese',
      desc:
        'The Siamese cat is one of the first distinctly recognized breeds of Asian cat. Derived from the rtgs: wichianmat landrace, one of several varieties of cat native to Thailand.'
    },
    {
      _id: 'breed_tabby',

      type: 'breed',
      breed: 'tabby',
      desc: 'Stripped cat...'
    },
    {
      _id: 'cat_fluffikins_owner_1234',

      type: 'cat',
      name: 'fluffikins',
      ownerId: 'owner_1234',
      weightLbs: 8,
      breedId: 'breed_siamese'
    },
    {
      _id: 'cat_jinx_owner_111',

      type: 'cat',
      name: 'Jinx',
      ownerId: 'owner_111',
      weightLbs: 8,
      breedId: 'breed_tabby',
      gender: 'M'
    },
    {
      _id: 'cat_tootles_owner_2222',
      type: 'cat',
      name: 'tootles',
      ownerId: 'owner_2222',
      weightLbs: 10,
      breedId: 'breed_tabby',
      gender: 'F'
    },
    {
      _id: 'cat_fluffy_owner_2222',
      type: 'cat',
      name: 'fluffy',
      ownerId: 'owner_2222',
      weightLbs: 3,
      breedId: 'breed_tabby',
      gender: 'F'
    },
    {
      _id: 'cat_jr_owner_2222',
      type: 'cat',
      name: 'jr',
      ownerId: 'owner_2222',
      weightLbs: 12,
      breedId: 'breed_siamese',
      gender: 'M'
    },
    {
      _id: 'cat_fatty_butterpants_owner_2222',
      type: 'cat',
      name: 'Fatty Butterpants',
      ownerId: 'owner_2222',
      weightLbs: 22,
      breedId: 'breed_tabby',
      gender: 'M'
    },
    {
      _id: 'cat_nancy_owner_2222',
      type: 'cat',
      name: 'Nancy',
      ownerId: 'owner_111',
      weightLbs: 14,
      breedId: 'breed_tabby',
      gender: 'F'
    },
    {
      _id: 'cat_tom_owner_2222',
      type: 'cat',
      name: 'Tom',
      ownerId: 'owner_111',
      weightLbs: 11,
      breedId: 'breed_tabby',
      gender: 'M'
    },
    {
      _id: 'cat_muffin_owner_2222',
      type: 'cat',
      name: 'Muffin',
      ownerId: 'owner_111',
      weightLbs: 15,
      breedId: 'breed_tabby',
      gender: 'F'
    },
    {
      _id: 'cat_rj_owner_2222',
      type: 'cat',
      name: 'RJ',
      ownerId: 'owner_1234',
      weightLbs: 15,
      breedId: 'breed_tabby',
      gender: 'M'
    },
    {
      _id: 'cat_jimi_hendrix_owner_2222',
      type: 'cat',
      name: 'Jimi Hendrix',
      ownerId: 'owner_1234',
      weightLbs: 17,
      breedId: 'breed_tabby',
      gender: 'M'
    }
  ])
  .then(function(result) {
    console.log('attempting to load data. Inspect each result item below: ')
    console.log(JSON.stringify(result, null, 2))
  })
  .catch(function(err) {
    console.log(err)
  })
