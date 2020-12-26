import input from './puzzle-input'

function calculateSlopeTrees (input, rightIncrement, downIncrement) {
  let trees = 0
  let x = 0
  const l = input.length
  const rowLength = input[0].length

  for (let i = downIncrement; i < l; i += downIncrement) {
    const nextX = x + rightIncrement

    x = nextX < rowLength
      ? nextX
      : nextX % rowLength

    if (input[i][x] === '#') {
      trees++
    }
  }

  return trees
}

function main (input) {
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]

  const treeTotal = slopes.reduce((acc, slope) => {
    const slopeTrees = calculateSlopeTrees(input, slope[0], slope[1])
    return acc * slopeTrees
  }, 1)

  return treeTotal
}

console.log(main(input))
