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
   * @returns {Bolean}
   * @throws {AssertError} if truth is false
   */
  assert(truth) {
    if (truth !== true)
      throw new exceptions.AssertError()
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
