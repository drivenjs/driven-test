const chalk = require('chalk')
const exceptions = require('./exceptions')

/**
 * This is the test function this is used to describe your test.
 * @example
 * test("1 + 1 is 2", () => {
 *   test.assert(1 + 1 === 2)
 * }
 * @param {string} description - The description of the test
 * @param {function} fn - The test function 
 */
const test = function(description, fn) {
  test.queue.push({description: description, fn: fn})
}

test.exceptions = exceptions

// queue of tests
test.queue = []

/**
 * Print all passed tests to the console 
 */
test.outputPassed = function() {
  test.queue.filter((item) => { return  item.passed }).forEach((item) => {
      console.log(chalk.bold.green('✔') + ' ' + item.description)
  })
}

/**
 * Print all not passed tests to the console 
 */
test.outputNotPassed = function() {
  test.queue.filter((item) => { return  !item.passed }).forEach((item) => {
    console.log(chalk.bold.red('✖') + ' ' + item.description)
    if(item.err instanceof exceptions.AssertError) {
      item.err.prettyStack()
    } else {
      console.log(item.err.stack)
    }
  });
}

/**
 * Print all tests to console. 
 * It will be print first the passed tests
 */
test.output = function() {
  test.outputPassed()
  test.outputNotPassed()
}

test.runTest = function(item) {
  try {
    item.fn()
    item.passed = true
  } catch (err) {
    item.passed = false
    item.err = err
  }
}

/**
 * Run all queued tests
 */
test.run = function(verbose=false) {
  test.queue.forEach(test.runTest)
}

/**
 * Check if all tests are passed
 * @returns {Boolean}
 */
test.passed = function() {
  return test.queue.find((item) => item.passed === false) === undefined
}

/**
 * Simple assert function
 * @ param {Boolean} truth
 * @returns {Bolean}
 * @throws {AssertError} if truth is false
 */
test.assert = function(truth) {
  if (truth !== true)
    throw new exceptions.AssertError()
}

/**
 * Assert if an exception is raised
 * @ param {function} fn - A function then raises exception
 * @ param {exception} exception - A optional exception type
 * @returns {Bolean}
 * @throws {AssertInvalidThrowError} if exception is diferent then expected
 * @throws {AssertNonThrowError} if no exception raised
 */
test.assertThrow = function(fn, exception) {
  var raised = false;
  debugger;
  try{
    fn()
  } catch (err) {
    raised = true
    debugger
    if (exception !== undefined && !(err instanceof exception))
      throw new exceptions.AssertInvalidThrowError()
  }

  if (!raised) 
    throw new exceptions.AssertNonThrowError()
}

module.exports = test
