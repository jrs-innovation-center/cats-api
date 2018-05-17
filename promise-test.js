const add = (x, y) =>
  new Promise(
    (resolve, reject) =>
      x < y ? resolve(x + y) : reject('add error x has to be less than y')
  )

const subtract = (x, y) =>
  new Promise(
    (resolve, reject) =>
      x < y ? resolve(x - y) : reject('subtract error! x has to be less than y')
  )

module.exports = {
  add,
  subtract
}
