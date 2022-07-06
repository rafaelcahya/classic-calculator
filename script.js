//function
class Calculator {
  //inisialisasi untuk display
  constructor(prevOperandText, currOperandText) {
    this.prevOperandText = prevOperandText
    this.currOperandText = currOperandText
    this.clear()
  }

  clear() {
    this.currOperand = ''
    this.prevOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    //allow single period
    if (number === "." && this.currOperand.includes(".")) return
    //number must be appended not added
    this.currOperand = this.currOperand.toString() + number.toString()
  }

  addOperation(operation) {
    if (this.currOperand === "") return
    if (this.prevOperand !== "") {
      this.compute()
    }
    this.operation = operation
    //ketika operation diclick maka currOperand akan ke tampung di prevOperand
    this.prevOperand = this.currOperand
    this.currOperand = ""
  }

  compute() {
    //insialisasi untuk hasil peritungan
    let computation
    //insialisasi actual number dan convert dari string ke number
    const prev = parseFloat(this.prevOperand)
    const curr = parseFloat(this.currOperand)
    //jika di prevOperand dan currOperand tidak memungkinkan untuk menghitung, maka tidak ada hasil perhitungan(equalsBtn)
    if (isNaN(prev) || isNaN(curr)) return

    switch (this.operation) {
      case '+':
        computation = prev + curr
        break
      case '-':
        computation = prev - curr
        break
      case '*':
        computation = prev * curr
        break
      case '/':
        computation = prev / curr
        break
      default:
        return
    }
    //letakkan hasil perhitungan di currOperand
    //tidak ada operation
    //hapus prevOperand
    this.currOperand = computation
    this.operation = undefined
    this.prevOperand = ""
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const intNumber = parseFloat(stringNumber.split(".")[0])
    const decimalNumber = stringNumber.split(".")[1]
    let intDisplay
    if (isNaN(intNumber)) {
      intDisplay = ""
    } else {
      intDisplay = intNumber.toLocaleString("en", {
        maximumFractionDigits: 0
      })
    }
    if (decimalNumber != null) {
      return `${intDisplay}.${decimalNumber}`
    } else {
      return intDisplay
    }
  }

  updateDisplay() {
    //currOperandText akan ditempatkan di currOperand
    this.currOperandText.innerText = this.getDisplayNumber(this.currOperand)
    if (this.operation != null) {
      //prevOperandText akan ditempatkan di prevOperand dan menampilkan operation juga
      this.prevOperandText.innerText =
        `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
    } else {
      this.prevOperandText.innerText = ""
    }
  }
}

// initialize
const numberBtn = document.querySelectorAll("[number]")
const operationBtn = document.querySelectorAll("[operation]")
const equalsBtn = document.querySelector("[equals]")
const allClearBtn = document.querySelector("[all-clear]")
const deleteBtn = document.querySelector("[delete]")
const prevOperandText = document.querySelector("[prev-operand]")
const currOperandText = document.querySelector("[curr-operand]")

//define class
const calculator = new Calculator(prevOperandText, currOperandText)

numberBtn.forEach(td => {
  td.addEventListener('click', () => {
    calculator.appendNumber(td.innerText)
    calculator.updateDisplay()
  })
})

operationBtn.forEach(td => {
  td.addEventListener('click', () => {
    calculator.addOperation(td.innerText)
    calculator.updateDisplay()
  })
})

equalsBtn.addEventListener("click", td => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearBtn.addEventListener("click", td => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteBtn.addEventListener("click", td => {
  calculator.delete()
  calculator.updateDisplay()
})