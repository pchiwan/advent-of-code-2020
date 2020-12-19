import fs from 'fs'
import path from 'path'

function parseFile () {
  const file = fs.readFileSync(path.resolve(__dirname, './puzzle-input.txt'), 'utf8')

  const answers = file.split('\n\n')

  return answers.map(p => p.split('\n').join(''))
}

function main (input) {
  const groupAnswers = input.reduce((acc, group) => {
    const yesAnswers = group.split('').reduce((acc, q) => acc.add(q), new Set()).size
    return acc + yesAnswers
  }, 0)

  return groupAnswers
}

console.log(main(parseFile()))
