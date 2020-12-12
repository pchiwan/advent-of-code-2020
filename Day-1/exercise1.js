import input from './puzzle-input'

const numbersSum2020 = (num1, num2) => num1 + num2 === 2020

function main (input) {
  const l = input.length
  let number1
  let number2

  for (let i = 0; i < l; i++) {
    number1 = input[i]

    for (let j = i + 1; j < l; j++) {
      number2 = input[j]

      if (numbersSum2020(number1, number2)) {
        break
      }
    }

    if (numbersSum2020(number1, number2)) {
      break
    }
  }

  return number1 * number2
}

console.log(main(input))
