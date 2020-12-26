import input from './puzzle-input'

function parseInput (input) {
  const regexp = /(\d*)-(\d*) (\w): (\w*)/
  return input.match(regexp).slice(1)
}

function main (input) {
  const l = input.length
  let validPasswords = 0

  for (let i = 0; i < l; i++) {
    let charFound = false
    const [pos1, pos2, mandatoryChar, password] = parseInput(input[i])

    if (password[parseInt(pos1) - 1] === mandatoryChar) {
      charFound = !charFound
    }

    if (password[parseInt(pos2) - 1] === mandatoryChar) {
      charFound = !charFound
    }

    if (charFound) {
      validPasswords++
    }
  }

  return validPasswords
}

console.log(main(input))
