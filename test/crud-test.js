const testCrud = require('./lib/test-crud')

testCrud(
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
    testCrud(
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
  .then(body => console.log('success:', body))
  .catch(err => console.log('error:', err))
