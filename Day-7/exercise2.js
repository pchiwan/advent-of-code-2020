import fs from 'fs'
import path, { parse } from 'path'

function parseFile () {
  const file = fs.readFileSync(path.resolve(__dirname, './puzzle-input.txt'), 'utf8')

  const lines = file.split('\n')

  const rules = lines.reduce((acc, l) => {
    const outmostBag = l.match(/\w+\s\w+/)[0]
    const bagRules = l.substring(l.indexOf('contain') + 7)
      .split(',')
      .reduce((acc, r) => {
        const match = r.trim().match(/(\d+)\s(\w+\s\w+)/)

        return match !== null
          ?
            {
              ...acc,
              [match[2]]: parseInt(match[1])
            }
          : acc
      }, {})

    return {
      ...acc,
      [outmostBag]: bagRules,
    }
  }, {})

  return rules
}

function countTotalBags (input, bag) {
  const count = Object.keys(input[bag]).reduce((acc, innerBag) => {
    const totalBags = countTotalBags(input, innerBag)
    return acc + input[bag][innerBag] * totalBags
  }, 0)

  return count + 1 // count bag itself
}

function main (input) {
  const result = countTotalBags(input, 'shiny gold')

  return result - 1 // subtract the shiny gold bag
}

console.log(main(parseFile()))
