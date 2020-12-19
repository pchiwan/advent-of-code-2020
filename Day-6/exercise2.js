import fs from 'fs'
import path from 'path'

function parseFile () {
  const file = fs.readFileSync(path.resolve(__dirname, './puzzle-input.txt'), 'utf8')

  const answers = file.split('\n\n')

  return answers.map(p => p.split('\n'))
}

function main (input) {
  const groupAnswers = input.reduce((acc, group) => {
    const answers = {}
    group.forEach(person => {
      person.split('').forEach(q => {
        answers[q] = answers[q] !== undefined ? answers[q] + 1 : 1
      })
    })

    const yesAnswers = Object.keys(answers).reduce((acc, q) => {
      return answers[q] === group.length ? acc + 1 : acc
    }, 0)

    return acc + yesAnswers
  }, 0)

  return groupAnswers
}

console.log(main(parseFile()))
