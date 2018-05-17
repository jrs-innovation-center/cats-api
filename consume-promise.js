const { add, subtract } = require('./promise-test')

add(3, 4)
  .then(addResult => subtract(2, addResult))
  .then(subtractResult => console.log('the number is ', subtractResult))
  .catch(err => console.log(err))
