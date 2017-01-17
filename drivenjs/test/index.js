const chalk = require('chalk')
const exceptions = require('./exceptions')
const register = require('./register')
const runner = require('./runner')


var drivenTest = {
  /**
   * This is the test function this is used to describe your drivenTest.
   * @example
   * test("1 + 1 is 2", () => {
   *   assert(1 + 1 === 2)
   * }
   * @param {string} description - The description of the test
   * @param {function} fn - The test function 
   */
  test(description, fn) {
    register.lastDescribe.addTest(
      new register.TestRegister(description, fn)
    )
  },

  describe(msg, discoverTests) {
    new register.DescribeRegister(msg)
    discoverTests()
  },

  /**
   * Run before execute all tests
   */
  setup(fn) {
    register.lastDescribe.setup = fn
  },

  /**
   * Run after execute all tests
   */
  teardown(fn) {
    register.lastDescribe.teardown = fn
  },

  /**
   * Set the beforeAll function
   */
  beforeAll(fn) { 
    register.lastDescribe.beforeAll = fn
  },

  /**
   * Set the afterAll function
   */
  afterAll(fn) { 
    register.lastDescribe.afterAll = fn
  },

  /**
   * Simple assert function
   * @ param {Boolean} truth
   * @throws {AssertError} if truth is false
   */
  assert(truth, msg="") {
    if (truth !== true)
      throw new exceptions.AssertError(msg)
  },

  /**
   * Assert if is true function
   * @ param {Boolean} truth
   * @throws {AssertError} if truth is false
   */
  assertTrue(truth, msg="") {
    var errorMsg = msg + " " + truth + " is not true"
    this.assert(truth === true, errorMsg)
  },

  /**
   * Assert if is false function
   * @ param {Boolean} truth
   * @throws {AssertError} if truth is false
   */
  assertFalse(falsely, msg="") {
    var errorMsg = msg + " " + falsely + " is not false"
    this.assert(falsely === false, errorMsg)
  },

  /**
   * Assert if two values are equals function
   * @ param val1
   * @ param val2
   * @throws {AssertError} if truth is false
   */
  assertEqual(val1, val2, msg="") {
    var errorMsg = msg + " " + val1 + " is not equal to " + val2
    this.assert(val1 === val2, errorMsg)
  },

  /**
   * Assert if two values are not equals function
   * @ param val1
   * @ param val2
   * @throws {AssertError} if truth is false
   */
  assertNotEqual(val1, val2, msg="") {
    var errorMsg = msg + " " + val1 + " is equal to " + val2
    this.assert(val1 !== val2, errorMsg)
  },

  /**
   * Assert if a value is in list a function
   * @ param val
   * @ param iter
   * @throws {AssertError} if truth is false
   */
  assertIn(val, iter, msg="") {
    var errorMsg = msg + " " + val + " is not in [" + iter + "]"
    this.assert(iter.find((elem) => elem === val) !== undefined, errorMsg)
  },

  /**
   * Assert if a value is not in a list function
   * @ param val
   * @ param iter
   * @throws {AssertError} if truth is false
   */
  assertNotIn(val, iter, msg="") {
    var errorMsg = msg + " " + val + " is in [" + iter + "]"
    this.assert(iter.find((elem) => elem === val) === undefined, errorMsg)
  },

  /**
   * Assert if an exception is raised
   * @ param {function} fn - A function then raises exception
   * @ param {exception} exception - A optional exception type
   * @returns {Bolean}
   * @throws {AssertInvalidThrowError} if exception is diferent then expected
   * @throws {AssertNonThrowError} if no exception raised
   */
  assertThrow(fn, exception) {
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
  },

  exceptions: exceptions,
  runner: runner,
  register: register
}

module.exports = drivenTest
