import input from './puzzle-input'

const INSTRUCTION_REGEXP = /(\w+)\s([\+|-]\d+)/

function main (input) {
  let accumulator = 0
  let index = 0
  const visitedIndexSet = new Set()

  do {
    visitedIndexSet.add(index)

    const inst = input[index]
    const [_, op, value] = inst.match(INSTRUCTION_REGEXP)

    switch (op) {
      case 'jmp':
        index += parseInt(value, 10)
        break
      case 'acc':
        accumulator += parseInt(value, 10)
      default:
        index++
        break
    }
  } while (!visitedIndexSet.has(index))

  return accumulator
}

console.log(main(input))
