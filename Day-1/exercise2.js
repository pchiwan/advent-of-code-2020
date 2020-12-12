import input from './puzzle-input'

const numbersSum2020 = (num1, num2, num3) => num1 + num2 + num3 === 2020

function main (input) {
  const l = input.length
  let number1
  let number2
  let number3

  for (let i = 0; i < l; i++) {
    number1 = input[i]

    for (let j = i + 1; j < l; j++) {
      number2 = input[j]

      for (let k = j + 1; k < l; k++) {
        number3 = input[k]

        if (numbersSum2020(number1, number2, number3)) {
          break
        }
      }

      if (numbersSum2020(number1, number2, number3)) {
        break
      }
    }

    if (numbersSum2020(number1, number2, number3)) {
      break
    }
  }

  return number1 * number2 * number3
}

console.log(main(input))
