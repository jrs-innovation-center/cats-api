/*
a function that takes another function and wraps it in a promise.
In our use case the function it will take is an express route handler,
and since we are passing that handler into Promise.resolve it will resolve
with whatever value our route handler returns. If, however, one of the
await statements in our handler gives us a rejected promise, it will go
into the .catch on line 4 and be passed to next which will eventually
give the error to our express error middleware to handle. 

See https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
*/

module.exports = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
