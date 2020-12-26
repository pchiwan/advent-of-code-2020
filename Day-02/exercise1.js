import input from './puzzle-input'

function parseInput (input) {
  const regexp = /(\d*)-(\d*) (\w): (\w*)/
  return input.match(regexp).slice(1)
}

function main (input) {
  const l = input.length
  let validPasswords = 0

  for (let i = 0; i < l; i++) {
    const [min, max, mandatoryChar, password] = parseInput(input[i])

    const regexp = new RegExp(mandatoryChar, 'g')

    const matches = password.match(regexp) !== null
     ? password.match(regexp).length
     : 0

    if (matches >= parseInt(min) && matches <= parseInt(max)) {
      validPasswords++
    }
  }

  return validPasswords
}

console.log(main(input))
