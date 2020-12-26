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

function findContainerBags (input, findBags, outermostBags) {
  let i = 0

  while (i < findBags.length) {
    const found = Object.keys(input).filter(outermostBag => {
      return Object.keys(input[outermostBag]).some(r => r === findBags[i])
    })

    found.forEach(f => outermostBags.add(f))

    outermostBags = findContainerBags(
      input,
      found,
      outermostBags
    )
    i++
  }

  return outermostBags
}

function main (input) {
  const result = findContainerBags(input, ['shiny gold'], new Set())

  return result.size
}

console.log(main(parseFile()))
