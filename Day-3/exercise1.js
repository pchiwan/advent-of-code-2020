import input from './puzzle-input'

function main (input) {
  let trees = 0
  let x = 0
  const l = input.length
  const rowLength = input[0].length

  for (let i = 1; i < l; i++) {
    const nextX = x + 3

    x = nextX < rowLength
      ? nextX
      : nextX % rowLength

    if (input[i][x] === '#') {
      trees++
    }
  }

  return trees
}

console.log(main(input))
