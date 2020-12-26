import input from './puzzle-input'

function findNextAdapterIndex (input, value) {
  let smallestValidAdapterIndex = -1

  for (let i = 0; i < input.length; i++) {
    if (value + 1 <= input[i] && input[i] <= value + 3) {
      if (
        smallestValidAdapterIndex === -1 ||
        input[i] < input[smallestValidAdapterIndex]
      ) {
        smallestValidAdapterIndex = i
      }
    }
  }

  return smallestValidAdapterIndex
}

function main (input) {
  const joltageDifferences = {
    '1': 0,
    '2': 0,
    '3': 0,
  }
  let value = 0
  let index = 0

  do {
    const nextAdapterIndex = findNextAdapterIndex(input, value)
    const [nextAdapter] = input.splice(nextAdapterIndex, 1)
    joltageDifferences[nextAdapter - value]++
    value = nextAdapter
  } while (input.length > 0)

  // always add a 3 joltage difference to account for
  // the device's built-in adapter
  joltageDifferences[3]++

  return joltageDifferences[1] * joltageDifferences[3]
}

console.log(main(input))
