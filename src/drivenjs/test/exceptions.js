const chalk = require('chalk')
const fs = require('fs-sync')

// colors
const errorLine = chalk.red
const defaultLine = chalk.white
const header = chalk.gray


// Simple class to raise assertion errors
class AssertError extends Error {
  constructor(msg) {
    super()
    this.msg = msg

    try {
      const line = this.getTestLine()
      const [file, row, col] = this.parseLine(line)

      this.row = row
      this.col = col
      this.canShowLine = true
      this.file = file

    } catch (err) {
      this.canShowLine = false
    }
  }

  getTestLine() {
    var lineNum = 0
    const lines = this.stack.split('\n')
    const notExists = lines.every((line, index) => {
      lineNum = index
      return line.indexOf('at Assert.') === -1
    })

    if(!notExists) {
      return lines[lineNum + 1]
    }
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
    const formated = ("    " + (num + 1)).slice(-4)
    return header(formated + " ")
  }

  getLine(line, current) {
    const strRow = this.formatLineNum(current + 1)
    if (current === this.row) {
      return strRow + errorLine(line)
    } else {
      return defaultLine(strRow + line)
    }
  }

  formatHeader(text) {
    text = text || ''
    return header(text)
  }

  getInfoHeader() {
    if(!this.msg) {
      return header.bold("Assert Error")
    } else {
      return header.bold("Assert Error: ") + header(' ' + this.msg)
    }
  }

  getHeader() {
    const info = this.getInfoHeader()
    return info + '\n' + this.formatHeader(this.file)
  }

  getOutput(lines) {
    const minRow = Math.max(0, this.row - 3)
    const maxRow = Math.min(lines.length, this.row + 3)
    var output = ''

    for (let i = minRow; i < maxRow; i++) {
      output += '\n'
      output += this.getLine(lines[i], i)
    }

    return output
  }
  
  prettyStack() {
    var output = this.getHeader()

    if (this.canShowLine) {
      try {
        const data = fs.read(this.file)
        const lines = data.split('\n')
        return output + this.getOutput(lines)
      } catch (err) {
        return this.stack
      }
    } else {
      return output + this.stack
    }
  }  
}

class AssertNonThrowError extends AssertError {
  getInfoHeader() {
    return header.bold("Non Throw error - The method does not throw an exception")
  }
}

class AssertInvalidThrowError extends AssertError {
  getInfoHeader() {
    return header.bold("Invalid throw error - The method raised an eception but the type is diferent then expected")
  }
}

module.exports = {
  AssertError: AssertError,
  AssertNonThrowError: AssertNonThrowError,
  AssertInvalidThrowError: AssertInvalidThrowError
}
