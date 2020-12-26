import input from './puzzle-input'

function findOperands (input, value) {
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (input[i] + input[j] === value) {
        return true
      }
    }
  }

  return false
}

function main (input, preambleLen) {
  let index = 0
  let value

  do {
    value = input[preambleLen + index]
    if (!findOperands(input.slice(index, preambleLen + index), value)) {
      break
    }
    index++
  } while (true)

  return value
}

console.log(main(input, 25))