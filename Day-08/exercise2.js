import input from './puzzle-input'

const INSTRUCTION_REGEXP = /(\w+)\s([\+|-]\d+)/

function isInfiniteLoop (input, initialIndex, visitedIndexSet) {
  let index = initialIndex

  do {
    visitedIndexSet.add(index)

    const inst = input[index]
    const [_, op, value] = inst.match(INSTRUCTION_REGEXP)

    switch (op) {
      case 'jmp':
        index += index === initialIndex ? 1 : parseInt(value, 10)
        break
      default:
        index++
        break
    }
  } while (!visitedIndexSet.has(index) && index < input.length )

  return visitedIndexSet.has(index)
}

function main (input) {
  const visitedIndexSet = new Set()
  let replaceJump = true
  let accumulator = 0
  let index = 0

  do {
    visitedIndexSet.add(index)

    const inst = input[index]
    const [_, op, value] = inst.match(INSTRUCTION_REGEXP)

    switch (op) {
      case 'jmp':
        if (
          // check whether jump would result in infinite loop
          isInfiniteLoop(input, index, new Set(Array.from(visitedIndexSet))) ||
          !replaceJump
        ) {
          index += parseInt(value, 10)
        } else {
          console.log(`Replaced ${input[index]} at index ${index} with nop`)
          replaceJump = false
          index += 1
        }

        break
      case 'acc':
        accumulator += parseInt(value, 10)
      case 'nop':
        index++
        break
      default:
        break
    }
  } while (index < input.length)

  return accumulator
}

console.log(main(input))
