const chalk = require('chalk')
const fs = require('fs-sync')

// colors
const errorLine = chalk.red
const defaultLine = chalk.white
const header = chalk.gray


// Simple class to raise assertion errors
class AssertError extends Error {
  constructor() {
    super()
    const line = this.stack.split('\n')[2]
    const [file, row, col] = this.parseLine(line)

    this.file = file
    this.row = row
    this.col = col
  }
  parseLine(line) {
		const regex = /\((.+)\:\d+\:\d+/g
    const matches = regex.exec(line)
    if (matches) {
      const [file, row, col] = matches[0].split(':')
      // remove the first character '(' of regex
      return [file.substring(1), parseInt(row) - 1, parseInt(col)]
    }
  }
  formatLineNum(num) {
    const formated = ("    " + num + 1).slice(-4)
    return header(formated + " ")
  }
  printLine(line, current) {
    const strRow = this.formatLineNum(current + 1)
    if (current === this.row) {
      console.log(strRow + errorLine(line))
    } else {
      console.log(defaultLine(strRow + line))
    }
  }
  formatHeader(text) {
    const formater = "                                                                               "
    const textLimit = Math.max(80, text.length)
    return header(
      (text + formater).substring(0, textLimit)
    )
  }
  printInfoHeader() {
    console.log(header.bold("Assert Error"))
  }
  printHeader() {
    this.printInfoHeader()
    console.log(this.formatHeader(this.file))
  }
  printFooter() {
    console.log("Full stack")
    console.log(this.stack)
  }
  prettyStack() {
    const data = fs.read(this.file)
    const lines = data.split('\n')
    const minRow = Math.max(0, this.row - 3)
    const maxRow = Math.min(lines.length, this.row + 3)
    this.printHeader()

    for (var i = minRow; i < maxRow; i++) {
      this.printLine(lines[i], i)
    }

    this.printFooter()
  }  
}

class AssertNonThrowError extends AssertError {
  printInfoHeader() {
    console.log(header.bold("Non Throw error - The method does not throw an exception"))
  }
}

class AssertInvalidThrowError extends AssertError {
  printInfoHeader() {
    console.log(header.bold("Invalid throw error - The method raised an eception but the type is diferent then expected"))
  }
}

module.exports = {
  AssertError: AssertError,
  AssertNonThrowError: AssertNonThrowError,
  AssertInvalidThrowError: AssertInvalidThrowError
}
