import fs, { access } from 'fs'
import path from 'path'

const MANDATORY_PROPS = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
]

function parseFile () {
  const file = fs.readFileSync(path.resolve(__dirname, './puzzle-input.txt'), 'utf8')

  const passports = file.split('\n\n')

  return passports.map(p => {
    return p.split('\n').join(' ').split(' ').reduce((acc, a) => {
      const attribute = a.split(':')
      return {
        ...acc,
        [attribute[0]]: attribute[1]
      }
    }, {})
  })
}

function main () {
  const passports = parseFile()

  const validPassports = passports.reduce((acc, passport) => {
    const props = Object.keys(passport)

    return MANDATORY_PROPS.every(p => props.includes(p)) ? acc + 1 : acc
  }, 0)

  return validPassports
}

console.log(main())
