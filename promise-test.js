const add = (x, y) => {
  return new Promise((resolve, reject) => {
    if (x < y) {
      resolve(x + y)
    } else {
      reject('add error x has to be less than y')
    }
  })
}

const subtract = (x, y) => {
  return new Promise((resolve, reject) => {
    if (x < y) {
      resolve(x - y)
    } else {
      reject('subtract error! x has to be less than y')
    }
  })
}

const math = {
  add,
  subtract
}

module.exports = math
