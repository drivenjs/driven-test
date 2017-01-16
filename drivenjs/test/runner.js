const register = require('./register')
const chalk = require('chalk')
var exports = module.exports = {}

function showLog(error) {
  try {
    console.log(error.prettyStack())
  } catch(err) {
    console.log(error.stack)
  }
}

function printHeader(text) {
  console.log('===========================================================================================')
  console.log(text)
  console.log('===========================================================================================')
}

exports.run = () => {
  var totalPassed = 0
  var totalError = 0

  console.time("Total time");
  register.describes.forEach((describe) => {
    printHeader(describe.description)
    for(test of describe.runTests()) {
      if (test.passed) {
        totalPassed++
        console.log(chalk.bold.green('✔') + ' ' + test.description)
      } else {
        totalError++
        console.log(chalk.bold.red('✖') + ' ' + test.description)
        showLog(test.error)
      }
    }
  })
  console.log('===========================================================================================')
  console.timeEnd("Total time")
  console.log("Ran " + (totalPassed + totalError) + " tests in. " + chalk.green(totalPassed) + " with success and " + chalk.red(totalError) + " with errors.")
}
