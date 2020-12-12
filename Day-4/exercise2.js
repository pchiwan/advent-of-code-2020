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

const PROP_RULES = {
  byr: value => parseInt(value) >= 1920 && parseInt(value) <= 2002,
  iyr: value => parseInt(value) >= 2010 && parseInt(value) <= 2020,
  eyr: value => parseInt(value) >= 2020 && parseInt(value) <= 2030,
  hgt: value => {
    const match = value.match(/^\d*/)
    const number = parseInt(match[0])

    if (value.endsWith('cm')) {
      return number >= 150 && number <= 193
    }

    if (value.endsWith('in')) {
      return number >= 59 && number <= 76
    }

    return false
  },
  hcl: value => /^#[0-9a-f]{6}$/.test(value),
  ecl: value => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
  pid: value => /^\d{9}$/.test(value),
  cid: () => true,
}

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

    if (!MANDATORY_PROPS.every(p => props.includes(p))) {
      return acc
    }

    if (!Object.keys(PROP_RULES).every(key => {
      return PROP_RULES[key](passport[key])
    })) {
      return acc
    }

    return acc + 1
  }, 0)

  return validPassports
}

console.log(main())
