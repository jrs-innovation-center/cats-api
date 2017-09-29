const groupTestCRUD = require('./lib/group-test-crud')
const groupTestLists = require('./lib/group-test-lists')

groupTestCRUD(
  'BREEDS CRUD TEST',
  '/breeds',
  {
    type: 'breed',
    breed: 'Maine Coon',
    desc:
      'The Maine Coon is one of the largest domesticated breeds of cat. It has a distinctive physical appearance and valuable hunting skills.'
  },
  { desc: 'The description has been changed' },
  'breed_maine_coon'
)
  .then(body =>
    groupTestCRUD(
      'CATS CRUD TEST',
      '/cats',
      {
        type: 'cat',
        name: 'Mr X',
        ownerId: 'owner_ottinger_william_0105',
        breed: 'Siamese',
        gender: 'M'
      },
      { breed: 'Tabby' },
      'cat_mr_x_owner_ottinger_william_0105'
    )
  )
  .then(body =>
    groupTestLists('LIST CATS TEST', '/cats', [
      {
        _id: 'cat_mr._handsome_owner_ottinger_william_0105',
        type: 'cat',
        name: 'Mr. Handsome',
        ownerId: 'owner_ottinger_william_0105',
        breed: 'Siamese',
        gender: 'M'
      },
      {
        _id: 'cat_tom_owner_ottinger_william_0105',
        type: 'cat',
        name: 'Tom',
        ownerId: 'owner_ottinger_william_0105',
        breed: 'Tabby',
        gender: 'M'
      }
    ])
  )
  .then(body =>
    groupTestLists('LIST BREEDS TEST', '/breeds', [
      {
        _id: 'breed_maine_coon',
        type: 'breed',
        breed: 'Maine Coon',
        desc:
          'The Maine Coon is one of the largest domesticated breeds of cat. It has a distinctive physical appearance and valuable hunting skills.'
      },
      {
        _id: 'breed_tabby',
        type: 'breed',
        breed: 'Tabby',
        desc: 'The tabby is great.'
      }
    ])
  )
  .then(body => console.log('success:', body))
  .catch(err => console.log('error:', err))
