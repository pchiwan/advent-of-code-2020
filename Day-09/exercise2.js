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

function findInvalidNumber (input, preambleLen) {
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


function main (input, preambleLen) {
  const invalidNumber = findInvalidNumber(input, preambleLen)

  let consecutiveNumbers = []
  let value = 0
  let index = 0
  let i = 0

  do {
    consecutiveNumbers.push(input[i])
    value += input[i]

    if (value === invalidNumber) {
      break
    }

    if (value < invalidNumber) {
      i++
      continue
    }

    consecutiveNumbers = []
    value = 0
    index++
    i = index
  } while (true)

  const smallest = Math.min(...consecutiveNumbers)
  const largest = Math.max(...consecutiveNumbers)

  return smallest + largest
}

console.log(main(input, 25))
