import input from './puzzle-input'

function getPosition (input, rangeStart, rangeEnd) {
  const isLowerHalf = input[0] === 'F' || input[0] === 'L'

  if (input.length === 1) {
    return isLowerHalf ? rangeStart : rangeEnd
  }

  const middle = (rangeStart + rangeEnd) / 2
  const lowerHalfEnd = Math.floor(middle)
  const upperHalfStart = Math.ceil(middle)

  return isLowerHalf
    ? getPosition(input.substring(1), rangeStart, lowerHalfEnd)
    : getPosition(input.substring(1), upperHalfStart, rangeEnd)
}

function getSeatId (boardingPassCode) {
  const row = getPosition(boardingPassCode.substring(0, 7), 0, 127)
  const seat = getPosition(boardingPassCode.substring(7), 0, 7)

  return row * 8 + seat
}

function main (input) {
  const seatIds = input.map(getSeatId)

  return Math.max(...seatIds)
}

console.log(main(input))
