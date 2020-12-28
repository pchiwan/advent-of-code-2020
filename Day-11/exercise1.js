import fs from 'fs'
import path from 'path'

function parseFile () {
  const file = fs.readFileSync(path.resolve(__dirname, './puzzle-input.txt'), 'utf8')
  return file.split('\n').map(r => r.split(''))
}

/*
 * If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
 * If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
 * Otherwise, the seat's state does not change.
 */

function matrixToString (array) {
  return array.map(a => a.join('')).join('')
}

function hasLayoutChanged (layout1, layout2) {
  return matrixToString(layout1) !== matrixToString(layout2)
}

function countOccupiedSeats (layout, row, col) {
  const nRows = layout.length
  const nCols = layout[0].length
  let occupiedSeats = 0

  // check seats clockwise
  if (row >= 1 && layout[row-1][col] === '#') occupiedSeats++ // top
  if (row >= 1 && (col+1 < nCols) && layout[row-1][col+1] === '#') occupiedSeats++ // top right
  if ((col+1 < nCols) && layout[row][col+1] === '#') occupiedSeats++ // right
  if ((row+1 < nRows) && (col+1 < nCols) && layout[row+1][col+1] === '#') occupiedSeats++ // bottom right
  if ((row+1 < nRows) && layout[row+1][col] === '#') occupiedSeats++ // bottom
  if (col >= 1 && (row+1 < nRows) && layout[row+1][col-1] === '#') occupiedSeats++ // bottom left
  if (col >= 1 && layout[row][col-1] === '#') occupiedSeats++ // left
  if (col >= 1 && row >= 1 && layout[row-1][col-1] === '#') occupiedSeats++ // top left

  return occupiedSeats
}

function copyMatrix (matrix) {
  return matrix.map(a => a.slice(0))
}

function getTotalOccupiedSeats (layout) {
  const nRows = layout.length
  const nCols = layout[0].length
  let totalOccupiedSeats = 0

  for (let row = 0; row < nRows; row++) {
    for (let col = 0; col < nCols; col++) {
      totalOccupiedSeats += layout[row][col] === '#'
    }
  }

  return totalOccupiedSeats
}

function main (input) {
  const nRows = input.length
  const nCols = input[0].length
  let nextLayout = copyMatrix(input)
  let prevLayout
  let cycles = 0

  do {
    prevLayout = copyMatrix(nextLayout)
    for (let row = 0; row < nRows; row++) {
      for (let col = 0; col < nCols; col++) {
        if (
          prevLayout[row][col] === 'L' &&
          countOccupiedSeats(prevLayout, row, col) === 0
        ) {
          // seat becomes occupied
          nextLayout[row][col] = '#'
        }

        if (
          prevLayout[row][col] === '#' &&
          countOccupiedSeats(prevLayout, row, col) >= 4
        ) {
          // seat becomes empty
          nextLayout[row][col] = 'L'
        }
      }
    }
    cycles++
  } while (hasLayoutChanged(prevLayout, nextLayout))

  return getTotalOccupiedSeats(nextLayout)
}

console.log(main(parseFile()))
